/**
 * 新闻重要性评分算法
 *
 * 综合分 = 来源权威分 × 0.3 + 关键词分 × 0.3 + 时效分 × 0.2 + 热度分 × 0.2
 *
 * 最终 score 范围 0–10，level 1–5，score > 9 为 Breaking News
 */

// ─────────────────────────────────────────
// 关键词权重配置
// ─────────────────────────────────────────

/** 超高权重词（×2.0） */
const ULTRA_HIGH_KEYWORDS = [
  // 英文
  'war', 'nuclear', 'nuclear attack', 'ww3', 'world war',
  'election', 'election result', 'presidential election',
  'central bank', 'federal reserve', 'fed rate', 'interest rate hike',
  'gdp', 'recession', 'financial crisis', 'stock market crash',
  'artificial intelligence', 'ai breakthrough',
  'pandemic', 'outbreak', 'epidemic', 'virus',
  'coup', 'assassination', 'terrorist attack',
  'ceasefire', 'peace deal', 'war crime',
  // 中文
  '战争', '核战争', '核攻击', '世界大战',
  '大选', '总统选举', '选举结果',
  '央行', '美联储', '利率',
  'GDP', '经济衰退', '金融危机', '股市崩溃',
  '人工智能突破', '疫情', '爆发', '病毒',
  '政变', '暗杀', '恐袭', '停火', '和平协议', '战争罪行',
];

/** 高权重词（×1.5） */
const HIGH_KEYWORDS = [
  // 英文
  'sanction', 'sanctions', 'summit', 'ipo', 'merger', 'acquisition',
  'inflation', 'tariff', 'trade war', 'supply chain',
  'climate change', 'global warming', 'carbon',
  'missile', 'weapons', 'military', 'troops',
  'protest', 'demonstration', 'riot',
  'immigration', 'refugee', 'border crisis',
  'human rights', 'democracy', 'authoritarian',
  'space', 'launch', 'satellite', 'moon',
  'oil price', 'energy crisis', 'fuel',
  'cybersecurity', 'hacking', 'data breach',
  'semiconductor', 'chip shortage',
  'bitcoin', 'cryptocurrency',
  'unemployment', 'jobs report',
  // 中文
  '制裁', '峰会', '通货膨胀', '贸易战', '供应链',
  '气候变化', '全球变暖', '碳排放',
  '导弹', '军队', '抗议', '示威', '暴乱',
  '移民', '难民', '边境危机',
  '民主', '威权', '太空', '卫星',
  '油价', '能源危机', '网络安全', '芯片短缺',
  '比特币', '加密货币', '失业率', '就业报告',
];

/** 中等权重词（×1.0） */
const MEDIUM_KEYWORDS = [
  // 英文
  'diplomacy', 'diplomatic', 'treaty', 'agreement',
  'parliament', 'congress', 'legislation',
  'investment', 'fund', 'bond', 'stock',
  'hospital', 'vaccine', 'health',
  'education', 'university',
  'environment', 'pollution',
  'technology', 'tech', 'innovation',
  'infrastructure', 'energy',
  // 中文
  '外交', '条约', '协议', '议会', '立法',
  '投资', '基金', '债券', '医院', '疫苗', '健康',
  '教育', '大学', '环境', '污染', '科技', '创新', '基础设施',
];

// 最大可能关键词分（用于 normalize 到 0-10）
const MAX_KEYWORD_RAW = ULTRA_HIGH_KEYWORDS.length * 2.0 * 1; // 实际动态计算

// ─────────────────────────────────────────
// 来源权威分
// ─────────────────────────────────────────
const TIER_SCORE = { 1: 10, 2: 7, 3: 5 };

// ─────────────────────────────────────────
// 时效分
// ─────────────────────────────────────────
function calcFreshnessScore(publishedAt) {
  if (!publishedAt) return 2;
  const now = Date.now();
  const pub = new Date(publishedAt).getTime();
  if (isNaN(pub)) return 2;

  const diffHours = (now - pub) / (1000 * 60 * 60);

  if (diffHours < 1) return 10;
  if (diffHours < 3) return 8;
  if (diffHours < 6) return 6;
  if (diffHours < 12) return 4;
  return 2;
}

// ─────────────────────────────────────────
// 关键词分
// ─────────────────────────────────────────
function calcKeywordScore(text) {
  const lower = (text || '').toLowerCase();
  let rawScore = 0;
  let maxPossible = 0;

  for (const kw of ULTRA_HIGH_KEYWORDS) {
    maxPossible += 2.0;
    if (lower.includes(kw.toLowerCase())) rawScore += 2.0;
  }
  for (const kw of HIGH_KEYWORDS) {
    maxPossible += 1.5;
    if (lower.includes(kw.toLowerCase())) rawScore += 1.5;
  }
  for (const kw of MEDIUM_KEYWORDS) {
    maxPossible += 1.0;
    if (lower.includes(kw.toLowerCase())) rawScore += 1.0;
  }

  // 动态 normalize 到 0–10（按实际词库上限的 10% 封顶，避免超量词拉满）
  const cap = maxPossible * 0.10;
  const normalized = Math.min(rawScore / cap, 1) * 10;
  return Math.round(normalized * 10) / 10;
}

// ─────────────────────────────────────────
// 热度分（默认 5，可后续接入真实热度 API）
// ─────────────────────────────────────────
function calcPopularityScore(/* article */) {
  return 5;
}

// ─────────────────────────────────────────
// 主评分函数
// ─────────────────────────────────────────

/**
 * 对单篇文章进行重要性评分
 * @param {{ title: string, summary: string, publishedAt: string }} article
 * @param {{ tier: number, baseScore: number }} sourceConfig - RSS 源配置
 * @returns {{ score: number, level: number, isBreaking: boolean }}
 */
export function scoreArticle(article, sourceConfig) {
  const tier = sourceConfig?.tier ?? 3;
  const authorityScore = TIER_SCORE[tier] ?? 5;

  const text = `${article.title || ''} ${article.summary || ''}`;
  const keywordScore = calcKeywordScore(text);
  const freshnessScore = calcFreshnessScore(article.publishedAt);
  const popularityScore = calcPopularityScore(article);

  // 加权综合分
  const raw =
    authorityScore * 0.3 +
    keywordScore   * 0.3 +
    freshnessScore * 0.2 +
    popularityScore * 0.2;

  // 保留一位小数，限制在 0–10
  const score = Math.min(Math.round(raw * 10) / 10, 10);

  // level 1–5（ceil(score/2) 并 clamp）
  const level = Math.min(Math.max(Math.ceil(score / 2), 1), 5);

  // Breaking News 阈值
  const isBreaking = score > 9;

  return { score, level, isBreaking };
}

/**
 * 批量评分
 * @param {Array} articles
 * @param {Function} getSourceConfig - (article) => sourceConfig
 * @returns {Array}
 */
export function scoreArticles(articles, getSourceConfig) {
  return articles.map((article) => {
    const sourceCfg = getSourceConfig ? getSourceConfig(article) : {};
    const importance = scoreArticle(article, sourceCfg);
    return { ...article, importance };
  });
}

export default scoreArticle;
