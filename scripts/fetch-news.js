/**
 * 主数据采集脚本
 *
 * 流程：
 * 1. 并行获取所有 RSS feed（15s 超时，单个失败不影响整体）
 * 2. 若有 NEWS_API_KEY，同时调用 NewsAPI
 * 3. 过滤无日期和过时文章（>72h）
 * 4. 聚类（URL去重 + 标题聚类）→ 双维分类(地理+主题) → 评分(含sourceCount) → 选取
 * 5. 翻译非中文文章
 * 6. 计算扩展阅读（相关文章 + 维基百科链接）
 * 7. 写入 data/news.json 和 data/meta.json
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import https from 'https';
import Parser from 'rss-parser';
import axios from 'axios';

// ─────────────────────────────────────────
// 信任所有TLS证书（许多权威媒体RSS源的证书链不完整）
// ─────────────────────────────────────────
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

import RSS_SOURCES, { getSourceById } from './rss-sources.js';
import { classifyArticle } from './category-classifier.js';
import { scoreArticle } from './news-scorer.js';
import { deduplicateArticles, tokenize, jaccardSimilarity } from './deduplicator.js';
import { extractEntities } from './analyst-engine.js';
import { translateArticles } from './translator.js';

// ─────────────────────────────────────────
// 路径常量
// ─────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../public/data');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const META_FILE = path.join(DATA_DIR, 'meta.json');

// ─────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────

/**
 * 生成文章唯一 ID（source_date_hash）
 */
function generateArticleId(source, publishedAt, url) {
  const raw = `${source}_${publishedAt}_${url}`;
  const hash = crypto.createHash('md5').update(raw).digest('hex').slice(0, 8);
  const dateStr = publishedAt
    ? new Date(publishedAt).toISOString().slice(0, 10).replace(/-/g, '')
    : 'unknown';
  return `${source}_${dateStr}_${hash}`;
}

/**
 * 截断文本到指定字符数
 */
function truncate(text, maxLen = 2000) {
  if (!text) return '';
  const stripped = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return stripped.length > maxLen ? stripped.slice(0, maxLen) + '…' : stripped;
}

/**
 * 从 RSS 条目中提取发布时间（ISO 字符串）
 * 如果 RSS 条目没有有效日期，返回 null 而非伪造当前时间
 */
function parseDate(item) {
  const raw = item.pubDate || item.isoDate || item.date || '';
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

/**
 * 过滤掉过时文章（无日期或超过 72 小时）
 */
const MAX_AGE_HOURS = 72;

function filterStaleArticles(articles) {
  const now = Date.now();
  return articles.filter(a => {
    if (!a.publishedAt) return false;
    const age = (now - new Date(a.publishedAt).getTime()) / (1000 * 60 * 60);
    return age >= 0 && age <= MAX_AGE_HOURS;
  });
}

/**
 * 为每篇文章计算扩展阅读（相关文章 + 维基百科链接）
 */
function computeRelatedArticles(articles) {
  const tokenCache = articles.map(a => tokenize(a.title || ''));

  return articles.map((article, i) => {
    const candidates = [];
    for (let j = 0; j < articles.length; j++) {
      if (i === j) continue;
      let score = 0;
      if (article.topic && article.topic === articles[j].topic) score += 3;
      if (article.category === articles[j].category) score += 1;
      const sim = jaccardSimilarity(tokenCache[i], tokenCache[j]);
      score += sim * 5;
      if (score > 2) candidates.push({ idx: j, score });
    }
    candidates.sort((a, b) => b.score - a.score);

    const relatedArticles = candidates.slice(0, 3).map(r => ({
      title: articles[r.idx].title,
      source: articles[r.idx].source?.name,
      url: articles[r.idx].url,
      publishedAt: articles[r.idx].publishedAt,
    }));

    const text = `${article.title || ''} ${article.summary || ''}`;
    const entities = extractEntities(text);
    const wikiTerms = [...new Set([
      ...entities.countries.slice(0, 2),
      ...entities.orgs.slice(0, 2),
    ])];
    const wikiLinks = wikiTerms.slice(0, 3).map(term => ({
      term,
      url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(term)}`,
    }));

    return { ...article, relatedArticles, wikiLinks, analysts: [] };
  });
}

// ─────────────────────────────────────────
// RSS 采集
// ─────────────────────────────────────────

const rssParser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; NewsAggregatorBot/1.0; +https://example.com)',
    Accept:
      'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
  },
  requestOptions: {
    agent: httpsAgent,
  },
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail'],
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
    ],
  },
});

/**
 * 获取单个 RSS 源
 * @param {object} source
 * @returns {Promise<object[]>} 规范化文章数组
 */
async function fetchRSSSource(source) {
  try {
    const feed = await rssParser.parseURL(source.url);

    const articles = (feed.items || []).map((item) => {
      const publishedAt = parseDate(item);
      const url = item.link || item.guid || '';
      const summary = truncate(
        item.contentSnippet || item.content || item.summary || item.description || '',
        200
      );
      const title = (item.title || '').replace(/\s+/g, ' ').trim();

      return {
        id: generateArticleId(source.id, publishedAt, url),
        title,
        summary,
        url,
        source: {
          id: source.id,
          name: source.name,
          tier: source.tier,
          logoColor: source.logoColor,
        },
        publishedAt,
        // 占位，后续填充
        category: '',
        categoryLabel: '',
        keywords: [],
        importance: {},
        analysts: [],
      };
    });

    console.log(`  ✅ ${source.name}: ${articles.length} 条`);
    return articles;
  } catch (err) {
    console.warn(`  ⚠️  ${source.name} 获取失败: ${err.message}`);
    return [];
  }
}

/**
 * 并行获取所有 RSS 源
 */
async function fetchAllRSS() {
  console.log(`\n📡 开始采集 ${RSS_SOURCES.length} 个 RSS 源...`);
  const results = await Promise.allSettled(
    RSS_SOURCES.map((src) => fetchRSSSource(src))
  );
  const articles = results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value);
  console.log(`  📦 RSS 合计: ${articles.length} 条原始文章`);
  return articles;
}

// ─────────────────────────────────────────
// NewsAPI 采集（可选）
// ─────────────────────────────────────────

/**
 * 从 NewsAPI 获取头条新闻
 * @param {string} apiKey
 * @returns {Promise<object[]>}
 */
async function fetchNewsAPI(apiKey) {
  try {
    console.log('\n🔑 检测到 NEWS_API_KEY，正在调用 NewsAPI...');
    const resp = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        language: 'en',
        pageSize: 50,
        apiKey,
      },
      timeout: 10000,
    });

    const articles = (resp.data?.articles || [])
      .filter((a) => a.url && a.title)
      .map((a) => {
        const publishedAt = a.publishedAt || null;
        const sourceId = a.source?.name
          ? a.source.name.toLowerCase().replace(/\s+/g, '_')
          : 'newsapi';

        return {
          id: generateArticleId(sourceId, publishedAt, a.url),
          title: (a.title || '').replace(/\s+/g, ' ').trim(),
          summary: truncate(a.description || a.content || '', 200),
          url: a.url,
          source: {
            id: sourceId,
            name: a.source?.name || 'NewsAPI',
            tier: 2,
            logoColor: '#6B7280',
          },
          publishedAt,
          category: '',
          categoryLabel: '',
          keywords: [],
          importance: {},
          analysts: [],
        };
      });

    console.log(`  ✅ NewsAPI: ${articles.length} 条`);
    return articles;
  } catch (err) {
    console.warn(`  ⚠️  NewsAPI 调用失败: ${err.message}`);
    return [];
  }
}

// ─────────────────────────────────────────
// 主流程
// ─────────────────────────────────────────

async function main() {
  console.log('🚀 新闻采集脚本启动');
  console.log(`   时间: ${new Date().toISOString()}`);
  console.log('─'.repeat(50));

  // 确保 data 目录存在
  await fs.mkdir(DATA_DIR, { recursive: true });

  // Step 1 & 2: 并行采集 RSS + NewsAPI
  const [rssArticles, newsApiArticles] = await Promise.all([
    fetchAllRSS(),
    process.env.NEWS_API_KEY
      ? fetchNewsAPI(process.env.NEWS_API_KEY)
      : Promise.resolve([]),
  ]);

  let allArticles = [...rssArticles, ...newsApiArticles];
  console.log(`\n📊 合并后总计: ${allArticles.length} 条`);

  // Step 2.5: 过滤无日期和过时文章
  console.log('\n🕐 过滤过时文章（无日期或超过 72 小时）...');
  const beforeFilter = allArticles.length;
  allArticles = filterStaleArticles(allArticles);
  console.log(`   过滤前: ${beforeFilter} 条 → 过滤后: ${allArticles.length} 条（移除 ${beforeFilter - allArticles.length} 条）`);

  // Step 3: 聚类（URL去重 + 标题相似度聚类）
  console.log('\n🔍 执行聚类去重...');
  allArticles = deduplicateArticles(allArticles);
  console.log(`   聚类后: ${allArticles.length} 条（含 sourceCount 字段）`);
  const multiSourceCount = allArticles.filter(a => (a.sourceCount || 1) > 1).length;
  if (multiSourceCount > 0) {
    console.log(`   📊 其中 ${multiSourceCount} 条被多家媒体报道`);
  }

  // Step 4: 双维分类（地理 + 主题）
  console.log('\n🏷️  执行双维分类（地理+主题）...');
  allArticles = allArticles.map((a) => {
    const { category, categoryLabel, topic, topicLabel } = classifyArticle(a);
    return { ...a, category, categoryLabel, topic, topicLabel };
  });

  // Step 5: 评分
  console.log('\n📈 执行重要性评分...');
  allArticles = allArticles.map((a) => {
    const sourceCfg = getSourceById(a.source?.id) || { tier: a.source?.tier ?? 3 };
    const importance = scoreArticle(a, sourceCfg);
    return { ...a, importance };
  });

  // Step 6: 按地理分类保证至少10条，再按分数填充
  const MIN_PER_CATEGORY = 10;
  const categoryGroups = {};
  for (const a of allArticles) {
    const cat = a.category || 'global';
    if (!categoryGroups[cat]) categoryGroups[cat] = [];
    categoryGroups[cat].push(a);
  }

  // 每个分类先取前10（按分数降序已排好）
  const selectedIds = new Set();
  const guaranteed = [];
  for (const [cat, items] of Object.entries(categoryGroups)) {
    items.sort((a, b) => (b.importance?.score ?? 0) - (a.importance?.score ?? 0));
    const topN = items.slice(0, MIN_PER_CATEGORY);
    for (const a of topN) {
      if (!selectedIds.has(a.id)) {
        selectedIds.add(a.id);
        guaranteed.push(a);
      }
    }
  }

  // 剩余名额用全局最高分填充
  const MAX_TOTAL = Math.max(100, guaranteed.length);
  const remaining = allArticles.filter(a => !selectedIds.has(a.id));
  remaining.sort((a, b) => (b.importance?.score ?? 0) - (a.importance?.score ?? 0));
  const filler = remaining.slice(0, MAX_TOTAL - guaranteed.length);
  const topArticles = [...guaranteed, ...filler];
  topArticles.sort((a, b) => (b.importance?.score ?? 0) - (a.importance?.score ?? 0));

  // 统计各地理分类数量
  const catCounts = {};
  for (const a of topArticles) {
    const cat = a.category || 'global';
    catCounts[cat] = (catCounts[cat] || 0) + 1;
  }
  console.log(`\n🏆 选取 ${topArticles.length} 条文章（每地理分类至少 ${MIN_PER_CATEGORY} 条）`);
  for (const [cat, count] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count} 条`);
  }

  // Step 6.5: 翻译非中文文章为中文
  console.log('\n🌐 翻译非中文文章...');
  await translateArticles(topArticles);

  // Step 7: 计算扩展阅读（相关文章 + 维基百科链接）
  console.log('\n📖 计算扩展阅读...');
  const finalArticles = computeRelatedArticles(topArticles);

  // ─────────────────────────────────────────
  // 写入 data/news.json
  // ─────────────────────────────────────────
  const newsOutput = {
    generatedAt: new Date().toISOString(),
    totalCount: finalArticles.length,
    articles: finalArticles,
  };
  await fs.writeFile(NEWS_FILE, JSON.stringify(newsOutput, null, 2), 'utf-8');
  console.log(`\n✅ 写入 ${NEWS_FILE}`);

  // ─────────────────────────────────────────
  // 生成 & 写入 data/meta.json
  // ─────────────────────────────────────────
  const now = new Date();
  const nextUpdate = new Date(now.getTime() + 60 * 60 * 1000); // +1h

  // 来源统计
  const sourceStats = {};
  for (const a of finalArticles) {
    const name = a.source?.name || 'Unknown';
    sourceStats[name] = (sourceStats[name] || 0) + 1;
  }

  // 地理分类统计
  const categoryStats = {};
  for (const a of finalArticles) {
    const cat = a.category || 'global';
    categoryStats[cat] = (categoryStats[cat] || 0) + 1;
  }

  // 主题分类统计
  const topicStats = {};
  for (const a of finalArticles) {
    const t = a.topic || 'general';
    topicStats[t] = (topicStats[t] || 0) + 1;
  }

  const meta = {
    lastUpdated: now.toISOString(),
    nextUpdate: nextUpdate.toISOString(),
    totalCount: finalArticles.length,
    sourceStats,
    categoryStats,
    topicStats,
  };

  await fs.writeFile(META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
  console.log(`✅ 写入 ${META_FILE}`);

  // ─────────────────────────────────────────
  // 打印统计信息
  // ─────────────────────────────────────────
  console.log('\n' + '─'.repeat(50));
  console.log('📋 采集统计报告');
  console.log('─'.repeat(50));
  console.log(`总文章数:    ${finalArticles.length}`);
  console.log(`最后更新:    ${meta.lastUpdated}`);
  console.log(`下次更新:    ${meta.nextUpdate}`);

  console.log('\n📰 来源分布:');
  Object.entries(sourceStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      const bar = '█'.repeat(count);
      console.log(`  ${name.padEnd(25)} ${count.toString().padStart(3)} ${bar}`);
    });

  console.log('\n🌍 地理分类分布:');
  Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat.padEnd(15)} ${count}`);
    });

  console.log('\n🏷️  主题分类分布:');
  Object.entries(topicStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat.padEnd(15)} ${count}`);
    });

  const breakingCount = finalArticles.filter((a) => a.importance?.isBreaking).length;
  console.log(`\n🔴 Breaking News: ${breakingCount} 条`);
  console.log('─'.repeat(50));
  console.log('🎉 采集完成！\n');
}

// 执行
main().catch((err) => {
  console.error('❌ 脚本执行失败:', err);
  process.exit(1);
});
