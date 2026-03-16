/**
 * 新闻去重模块
 *
 * 三级去重策略：
 *   Level 1: URL 精确匹配
 *   Level 2: 标题 Jaccard 相似度 > 0.6，保留 tier 更高的（tier 数字越小越权威）
 *   Level 3: 同分类内 Jaccard 相似度 > 0.5 且时间差 < 6h，保留最新的
 */

// ─────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────

/**
 * 分词：提取英文单词（小写）和中文单字符
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  if (!text) return [];
  const tokens = [];

  // 英文单词（只保留纯字母，去掉标点）
  const enWords = text.match(/[a-zA-Z]+/g);
  if (enWords) {
    for (const w of enWords) tokens.push(w.toLowerCase());
  }

  // 中文字符（每个字单独作为 token）
  const zhChars = text.match(/[\u4e00-\u9fff]/g);
  if (zhChars) {
    for (const c of zhChars) tokens.push(c);
  }

  return tokens;
}

/**
 * 计算两个 token 数组之间的 Jaccard 相似度
 * @param {string[]} tokensA
 * @param {string[]} tokensB
 * @returns {number} 0–1
 */
export function jaccardSimilarity(tokensA, tokensB) {
  if (!tokensA.length && !tokensB.length) return 1;
  if (!tokensA.length || !tokensB.length) return 0;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }

  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * 计算两篇文章的发布时间差（小时）
 * @param {string} dateA
 * @param {string} dateB
 * @returns {number}
 */
function hoursDiff(dateA, dateB) {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  if (isNaN(a) || isNaN(b)) return Infinity;
  return Math.abs(a - b) / (1000 * 60 * 60);
}

/**
 * 获取文章来源 tier（数字越小越权威）
 * @param {object} article
 * @returns {number}
 */
function getTier(article) {
  return article?.source?.tier ?? article?.tier ?? 3;
}

// ─────────────────────────────────────────
// 三级去重
// ─────────────────────────────────────────

/**
 * Level 1: URL 精确去重，保留第一次出现的
 * @param {object[]} articles
 * @returns {object[]}
 */
function dedupeByUrl(articles) {
  const seen = new Set();
  return articles.filter((a) => {
    const url = a.url?.trim();
    if (!url) return true; // 无 URL 时保留
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

/**
 * Level 2: 标题 Jaccard 相似度 > 0.6 → 保留 tier 更高的（tier 数字越小越优先）
 * @param {object[]} articles
 * @returns {object[]}
 */
function dedupeByTitleSimilarity(articles) {
  // 预先计算每篇文章的标题 tokens
  const tokenCache = articles.map((a) => tokenize(a.title || ''));

  const removed = new Set();

  for (let i = 0; i < articles.length; i++) {
    if (removed.has(i)) continue;
    for (let j = i + 1; j < articles.length; j++) {
      if (removed.has(j)) continue;

      const sim = jaccardSimilarity(tokenCache[i], tokenCache[j]);
      if (sim > 0.6) {
        // 保留 tier 数字更小的（权威度更高）；tier 相同则保留 i（先出现的）
        const tierI = getTier(articles[i]);
        const tierJ = getTier(articles[j]);
        if (tierJ < tierI) {
          removed.add(i);
        } else {
          removed.add(j);
        }
      }
    }
  }

  return articles.filter((_, idx) => !removed.has(idx));
}

/**
 * Level 3: 同分类内相似度 > 0.5 且时间差 < 6h → 保留最新的
 * @param {object[]} articles
 * @returns {object[]}
 */
function dedupeWithinCategory(articles) {
  // 按分类分组
  const byCategory = {};
  for (const a of articles) {
    const cat = a.category || 'general';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(a);
  }

  const keptIds = new Set();

  for (const catArticles of Object.values(byCategory)) {
    const tokenCache = catArticles.map((a) => tokenize(a.title || ''));
    const localRemoved = new Set();

    for (let i = 0; i < catArticles.length; i++) {
      if (localRemoved.has(i)) continue;
      for (let j = i + 1; j < catArticles.length; j++) {
        if (localRemoved.has(j)) continue;

        const sim = jaccardSimilarity(tokenCache[i], tokenCache[j]);
        const diff = hoursDiff(catArticles[i].publishedAt, catArticles[j].publishedAt);

        if (sim > 0.5 && diff < 6) {
          // 保留较新的
          const timeI = new Date(catArticles[i].publishedAt).getTime() || 0;
          const timeJ = new Date(catArticles[j].publishedAt).getTime() || 0;
          if (timeJ >= timeI) {
            localRemoved.add(i);
          } else {
            localRemoved.add(j);
          }
        }
      }
    }

    catArticles.forEach((a, idx) => {
      if (!localRemoved.has(idx)) keptIds.add(a.id ?? a.url ?? a.title);
    });
  }

  return articles.filter((a) => {
    const key = a.id ?? a.url ?? a.title;
    return keptIds.has(key);
  });
}

// ─────────────────────────────────────────
// 主函数
// ─────────────────────────────────────────

/**
 * 对文章列表进行三级去重
 * @param {object[]} articles
 * @returns {object[]}
 */
export function deduplicateArticles(articles) {
  if (!Array.isArray(articles) || articles.length === 0) return [];

  const step1 = dedupeByUrl(articles);
  const step2 = dedupeByTitleSimilarity(step1);
  const step3 = dedupeWithinCategory(step2);

  return step3;
}

export default deduplicateArticles;
