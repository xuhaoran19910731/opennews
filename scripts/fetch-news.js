/**
 * 主数据采集脚本
 *
 * 流程：
 * 1. 并行获取所有 RSS feed（10s 超时，单个失败不影响整体）
 * 2. 若有 NEWS_API_KEY，同时调用 NewsAPI
 * 3. 合并所有文章 → 规范化格式
 * 4. 去重 → 分类 → 评分 → 降序排列 → 取前50条
 * 5. 生成分析师评论
 * 6. 写入 data/news.json 和 data/meta.json
 * 7. 打印统计信息
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
import { deduplicateArticles } from './deduplicator.js';
import analysts from './analyst-templates.js';
import { generateCommentsForAll } from './analyst-engine.js';
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
function truncate(text, maxLen = 200) {
  if (!text) return '';
  const stripped = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return stripped.length > maxLen ? stripped.slice(0, maxLen) + '…' : stripped;
}

/**
 * 从 RSS 条目中提取发布时间（ISO 字符串）
 */
function parseDate(item) {
  const raw = item.pubDate || item.isoDate || item.date || '';
  if (!raw) return new Date().toISOString();
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
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
        const publishedAt = a.publishedAt || new Date().toISOString();
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

  // Step 3: 去重
  console.log('\n🔍 执行三级去重...');
  allArticles = deduplicateArticles(allArticles);
  console.log(`   去重后: ${allArticles.length} 条`);

  // Step 4: 分类
  console.log('\n🏷️  执行新闻分类...');
  allArticles = allArticles.map((a) => {
    const { category, categoryLabel } = classifyArticle(a);
    return { ...a, category, categoryLabel };
  });

  // Step 5: 评分
  console.log('\n📈 执行重要性评分...');
  allArticles = allArticles.map((a) => {
    const sourceCfg = getSourceById(a.source?.id) || { tier: a.source?.tier ?? 3 };
    const importance = scoreArticle(a, sourceCfg);
    return { ...a, importance };
  });

  // Step 6: 按分类保证至少10条，再按分数填充
  const MIN_PER_CATEGORY = 10;
  const categoryGroups = {};
  for (const a of allArticles) {
    const cat = a.category || 'general';
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

  // 统计各分类数量
  const catCounts = {};
  for (const a of topArticles) {
    const cat = a.category || 'general';
    catCounts[cat] = (catCounts[cat] || 0) + 1;
  }
  console.log(`\n🏆 选取 ${topArticles.length} 条文章（每分类至少 ${MIN_PER_CATEGORY} 条）`);
  for (const [cat, count] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count} 条`);
  }

  // Step 6.5: 翻译非中文文章为中文
  console.log('\n🌐 翻译非中文文章...');
  await translateArticles(topArticles);

  // Step 7: 生成分析师评论
  console.log('\n💬 生成分析师评论...');
  const finalArticles = generateCommentsForAll(topArticles, analysts);

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

  // 分类统计
  const categoryStats = {};
  for (const a of finalArticles) {
    const cat = a.category || 'general';
    categoryStats[cat] = (categoryStats[cat] || 0) + 1;
  }

  const meta = {
    lastUpdated: now.toISOString(),
    nextUpdate: nextUpdate.toISOString(),
    totalCount: finalArticles.length,
    sourceStats,
    categoryStats,
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

  console.log('\n🏷️  分类分布:');
  Object.entries(categoryStats)
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
