/**
 * 新闻聚类模块（原去重模块升级）
 *
 * 核心变化：从"删除重复"变为"聚类同类报道"
 * 保留最权威的文章作为代表，同时记录有多少不同来源报道了同一事件
 *
 * 输出：每篇代表文章附加 sourceCount 和 clusterSources 字段
 *
 * 算法：
 *   Step 1: URL 精确去重
 *   Step 2: Union-Find 标题相似度聚类 (Jaccard > 0.5 且时间差 < 12h)
 *   Step 3: 从每个聚类中选出代表文章，附加 sourceCount
 */

// ─────────────────────────────────────────
// Union-Find 数据结构
// ─────────────────────────────────────────

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 路径压缩
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;

    // 按秩合并
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  /**
   * 获取所有聚类 Map<root, index[]>
   */
  getClusters() {
    const clusters = new Map();
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      if (!clusters.has(root)) clusters.set(root, []);
      clusters.get(root).push(i);
    }
    return clusters;
  }
}

// ─────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────

/**
 * 分词：提取英文单词（小写）和中文单字符
 */
export function tokenize(text) {
  if (!text) return [];
  const tokens = [];

  const enWords = text.match(/[a-zA-Z]+/g);
  if (enWords) {
    for (const w of enWords) tokens.push(w.toLowerCase());
  }

  const zhChars = text.match(/[\u4e00-\u9fff]/g);
  if (zhChars) {
    for (const c of zhChars) tokens.push(c);
  }

  return tokens;
}

/**
 * Jaccard 相似度
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
 */
function hoursDiff(dateA, dateB) {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  if (isNaN(a) || isNaN(b)) return Infinity;
  return Math.abs(a - b) / (1000 * 60 * 60);
}

/**
 * 获取文章来源 tier（数字越小越权威）
 */
function getTier(article) {
  return article?.source?.tier ?? article?.tier ?? 3;
}

// ─────────────────────────────────────────
// Step 1: URL 精确去重
// ─────────────────────────────────────────

function dedupeByUrl(articles) {
  const seen = new Set();
  return articles.filter((a) => {
    const url = a.url?.trim();
    if (!url) return true;
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

// ─────────────────────────────────────────
// Step 2 & 3: 聚类 + 选代表
// ─────────────────────────────────────────

/**
 * 使用 Union-Find 对文章进行标题相似度聚类
 * 条件：Jaccard > 0.5 且时间差 < 12h
 * 从每个聚类中选出代表文章（tier 最小/最权威，同 tier 取最新）
 * 附加 sourceCount 和 clusterSources
 */
function clusterArticles(articles) {
  const n = articles.length;
  if (n === 0) return [];

  // 预计算 tokens
  const tokenCache = articles.map((a) => tokenize(a.title || ''));

  // 构建 Union-Find
  const uf = new UnionFind(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const sim = jaccardSimilarity(tokenCache[i], tokenCache[j]);
      if (sim > 0.5) {
        const diff = hoursDiff(articles[i].publishedAt, articles[j].publishedAt);
        if (diff < 12) {
          uf.union(i, j);
        }
      }
    }
  }

  // 提取聚类
  const clusters = uf.getClusters();
  const result = [];

  for (const [, indices] of clusters) {
    // 选代表：tier 最小（最权威），同 tier 取发布时间最新的
    indices.sort((a, b) => {
      const tierDiff = getTier(articles[a]) - getTier(articles[b]);
      if (tierDiff !== 0) return tierDiff;
      // 同 tier 取最新
      const timeA = new Date(articles[a].publishedAt).getTime() || 0;
      const timeB = new Date(articles[b].publishedAt).getTime() || 0;
      return timeB - timeA;
    });

    const representative = { ...articles[indices[0]] };

    // 统计不同来源
    const sourceIds = new Set();
    const sourceNames = new Set();
    for (const idx of indices) {
      const srcId = articles[idx].source?.id || articles[idx].source?.name || 'unknown';
      const srcName = articles[idx].source?.name || 'Unknown';
      sourceIds.add(srcId);
      sourceNames.add(srcName);
    }

    representative.sourceCount = sourceIds.size;
    representative.clusterSources = [...sourceNames];

    result.push(representative);
  }

  return result;
}

// ─────────────────────────────────────────
// 主函数
// ─────────────────────────────────────────

/**
 * 对文章列表进行 URL 去重 + 标题聚类
 * 返回代表文章数组，每篇附带 sourceCount 和 clusterSources
 */
export function deduplicateArticles(articles) {
  if (!Array.isArray(articles) || articles.length === 0) return [];

  // Step 1: URL 精确去重
  const step1 = dedupeByUrl(articles);

  // Step 2 & 3: 标题聚类 + 选代表
  const step2 = clusterArticles(step1);

  return step2;
}

export default deduplicateArticles;
