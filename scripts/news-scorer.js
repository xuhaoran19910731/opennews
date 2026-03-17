/**
 * 新闻重要性评分算法
 *
 * 综合分 = 权威分×0.15 + 关键词分×0.15 + 时效分×0.35 + 来源数量分×0.20 + 热度分×0.15
 *
 * 多源报道的新闻获得更高排名（sourceCount 权重 0.20）
 * 时效性权重 0.35（仍是最高单项）
 * 24小时内的新闻额外获得置顶加分
 *
 * 最终 score 范围 0–10，level 1–5，score > 9 为 Breaking News
 */

// ─────────────────────────────────────────
// 关键词权重配置（多语言）
// ─────────────────────────────────────────

/** 超高权重词（×2.0）— 覆盖英/中/德/法/俄/阿/西/日 */
const ULTRA_HIGH_KEYWORDS = [
  // 英文
  'war', 'nuclear', 'nuclear attack', 'ww3', 'world war',
  'election', 'election result', 'presidential election',
  'central bank', 'federal reserve', 'fed rate', 'interest rate',
  'gdp', 'recession', 'financial crisis', 'stock market crash',
  'artificial intelligence', 'ai breakthrough',
  'pandemic', 'outbreak', 'epidemic', 'virus',
  'coup', 'assassination', 'terrorist attack', 'terrorism',
  'ceasefire', 'peace deal', 'war crime', 'invasion',
  // 中文
  '战争', '核战争', '核攻击', '世界大战', '入侵',
  '大选', '总统选举', '选举结果',
  '央行', '美联储', '利率', '加息', '降息',
  'GDP', '经济衰退', '金融危机', '股市崩溃',
  '人工智能', '疫情', '爆发', '病毒',
  '政变', '暗杀', '恐袭', '停火', '和平协议', '战争罪行',
  '两会', '全国人大', '国务院', '中央经济工作会议', '三中全会', '反腐', '重大改革',
  // 德语
  'Krieg', 'Wahl', 'Bundestagswahl', 'Zentralbank', 'Rezession',
  'Finanzkrise', 'Atomangriff', 'Terroranschlag', 'Putsch',
  'Waffenstillstand', 'Pandemie', 'Staatsstreich', 'Invasion',
  // 法语
  'guerre', 'élection', 'présidentielle', 'banque centrale',
  'récession', 'crise financière', 'attentat', 'terrorisme',
  'cessez-le-feu', 'pandémie', 'coup d\'état', 'invasion',
  // 俄语
  'война', 'выборы', 'центральный банк', 'рецессия',
  'финансовый кризис', 'теракт', 'вторжение', 'пандемия',
  'перемирие', 'переворот',
  // 阿拉伯语
  'حرب', 'انتخابات', 'أزمة مالية', 'هجوم', 'غزو', 'وباء',
  'انقلاب', 'وقف إطلاق النار', 'إرهاب',
  // 西班牙语
  'guerra', 'elección', 'banco central', 'recesión',
  'crisis financiera', 'atentado', 'terrorismo', 'invasión',
  'pandemia', 'golpe de estado',
  // 日语
  '戦争', '選挙', '中央銀行', '景気後退', '金融危機',
  'テロ', '侵攻', 'パンデミック',
];

/** 高权重词（×1.5）— 多语言 */
const HIGH_KEYWORDS = [
  // 英文
  'sanction', 'sanctions', 'summit', 'ipo', 'merger', 'acquisition',
  'inflation', 'tariff', 'trade war', 'supply chain',
  'climate change', 'global warming', 'carbon',
  'missile', 'weapons', 'military', 'troops', 'nato',
  'protest', 'demonstration', 'riot',
  'immigration', 'refugee', 'border crisis',
  'human rights', 'democracy', 'authoritarian',
  'space', 'launch', 'satellite', 'moon', 'mars',
  'oil price', 'energy crisis', 'fuel',
  'cybersecurity', 'hacking', 'data breach',
  'semiconductor', 'chip shortage',
  'bitcoin', 'cryptocurrency',
  'unemployment', 'jobs report',
  'earthquake', 'hurricane', 'typhoon', 'tsunami', 'flood',
  // 中文
  '制裁', '峰会', '通货膨胀', '贸易战', '供应链',
  '气候变化', '全球变暖', '碳排放',
  '导弹', '军队', '北约', '抗议', '示威', '暴乱',
  '移民', '难民', '边境危机',
  '民主', '威权', '太空', '卫星',
  '油价', '能源危机', '网络安全', '芯片短缺',
  '比特币', '加密货币', '失业率', '就业报告',
  '地震', '飓风', '台风', '海啸', '洪水',
  '发改委', 'A股', '社保', '医保', '乡村振兴', '双减',
  '户籍改革', '房地产', '楼市', '内循环', '共同富裕',
  // 德语
  'Sanktionen', 'Gipfel', 'Inflation', 'Klimawandel',
  'Rakete', 'Protest', 'Flüchtling', 'Erdbeben',
  // 法语
  'sanctions', 'sommet', 'inflation', 'changement climatique',
  'missile', 'manifestation', 'réfugiés', 'séisme',
  // 俄语
  'санкции', 'саммит', 'инфляция', 'ракета', 'протест',
  // 阿拉伯语
  'عقوبات', 'قمة', 'تضخم', 'صاروخ', 'احتجاج', 'زلزال',
  // 西班牙语
  'sanciones', 'cumbre', 'inflación', 'misil', 'protesta', 'terremoto',
  // 日语
  '制裁', 'サミット', 'インフレ', 'ミサイル', '抗議', '地震',
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
  // 德语
  'Diplomatie', 'Vertrag', 'Investition', 'Technologie',
  // 法语
  'diplomatie', 'traité', 'investissement', 'technologie',
];

// ─────────────────────────────────────────
// 来源权威分
// ─────────────────────────────────────────
const TIER_SCORE = { 1: 10, 2: 7, 3: 5 };

// ─────────────────────────────────────────
// 时效分 — 更细粒度，强化最新新闻优势
// ─────────────────────────────────────────
function calcFreshnessScore(publishedAt) {
  if (!publishedAt) return 1;
  const now = Date.now();
  const pub = new Date(publishedAt).getTime();
  if (isNaN(pub)) return 1;

  const diffHours = (now - pub) / (1000 * 60 * 60);

  if (diffHours < 0.5) return 10;   // 30分钟内
  if (diffHours < 1) return 9.5;    // 1小时内
  if (diffHours < 2) return 9;      // 2小时内
  if (diffHours < 3) return 8;      // 3小时内
  if (diffHours < 6) return 7;      // 6小时内
  if (diffHours < 12) return 5;     // 12小时内
  if (diffHours < 24) return 3;     // 24小时内
  if (diffHours < 48) return 1.5;   // 48小时内
  return 1;                          // 超过48小时
}

/**
 * 判断文章是否在24小时内发布
 */
export function isWithin24Hours(publishedAt) {
  if (!publishedAt) return false;
  const pub = new Date(publishedAt).getTime();
  if (isNaN(pub)) return false;
  return (Date.now() - pub) < 24 * 60 * 60 * 1000;
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

  const cap = maxPossible * 0.08;
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
// 来源数量分（多源报道提权）
// ─────────────────────────────────────────
function calcSourceCountScore(sourceCount) {
  const count = sourceCount || 1;
  if (count >= 9) return 10;
  if (count >= 6) return 8.5;
  if (count >= 4) return 7;
  if (count >= 3) return 5;
  if (count >= 2) return 3;
  return 1;
}

// ─────────────────────────────────────────
// 主评分函数
// ─────────────────────────────────────────

/**
 * 对单篇文章进行重要性评分
 * @param {{ title: string, summary: string, publishedAt: string, sourceCount?: number }} article
 * @param {{ tier: number, baseScore: number }} sourceConfig
 * @returns {{ score: number, level: number, isBreaking: boolean, isRecent: boolean }}
 */
export function scoreArticle(article, sourceConfig) {
  const tier = sourceConfig?.tier ?? 3;
  const authorityScore = TIER_SCORE[tier] ?? 5;

  const text = `${article.title || ''} ${article.summary || ''}`;
  const keywordScore = calcKeywordScore(text);
  const freshnessScore = calcFreshnessScore(article.publishedAt);
  const popularityScore = calcPopularityScore(article);
  const sourceCountScore = calcSourceCountScore(article.sourceCount);

  // 加权综合分 — 时效性 0.35 最高，来源数量 0.20 第二
  const raw =
    authorityScore    * 0.15 +
    keywordScore      * 0.15 +
    freshnessScore    * 0.35 +
    sourceCountScore  * 0.20 +
    popularityScore   * 0.15;

  const score = Math.min(Math.round(raw * 10) / 10, 10);
  const level = Math.min(Math.max(Math.ceil(score / 2), 1), 5);
  const isBreaking = score > 9;
  const isRecent = isWithin24Hours(article.publishedAt);

  return { score, level, isBreaking, isRecent };
}

/**
 * 批量评分
 */
export function scoreArticles(articles, getSourceConfig) {
  return articles.map((article) => {
    const sourceCfg = getSourceConfig ? getSourceConfig(article) : {};
    const importance = scoreArticle(article, sourceCfg);
    return { ...article, importance };
  });
}

export default scoreArticle;
