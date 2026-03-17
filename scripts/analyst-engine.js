/**
 * 立场解读评论生成引擎
 *
 * 流程：
 * 1. 为每篇文章选择全部 5 个政治光谱立场
 * 2. 从标题+摘要中提取实体（国家、组织、数字）
 * 3. 按关键词命中数选取最佳模板
 * 4. 从 variants 中随机选一个
 * 5. 填充槽位（未匹配用通用词替换）
 * 6. 返回评论数组
 */

import { getAnalystsForCategory } from './analyst-templates.js';

// ─────────────────────────────────────────
// 实体提取
// ─────────────────────────────────────────

/** 常见国家名（中英文） */
const COUNTRY_PATTERNS = [
  // 英文
  'United States', 'USA', 'US', 'America',
  'China', 'Russia', 'Ukraine', 'Germany', 'France', 'UK', 'Britain',
  'Japan', 'South Korea', 'North Korea', 'India', 'Pakistan',
  'Iran', 'Israel', 'Saudi Arabia', 'Turkey', 'Australia',
  'Canada', 'Brazil', 'Mexico', 'Italy', 'Spain', 'Poland',
  'NATO', 'EU', 'European Union',
  'Taiwan', 'Palestine', 'Afghanistan', 'Iraq', 'Syria',
  // 中文
  '美国', '中国', '俄罗斯', '乌克兰', '德国', '法国', '英国',
  '日本', '韩国', '朝鲜', '印度', '巴基斯坦', '伊朗', '以色列',
  '沙特', '土耳其', '澳大利亚', '加拿大', '巴西', '台湾',
  '巴勒斯坦', '阿富汗', '伊拉克', '叙利亚',
];

/** 常见组织名 */
const ORG_PATTERNS = [
  'UN', 'NATO', 'WHO', 'IMF', 'WTO', 'World Bank', 'OPEC',
  'EU', 'G7', 'G20', 'BRICS', 'ASEAN', 'SEC',
  'Federal Reserve', 'Fed', 'ECB', 'Pentagon',
  'OpenAI', 'Google', 'Microsoft', 'Apple', 'Meta', 'Amazon',
  'Nvidia', 'TSMC', 'Intel', 'Tesla',
  '联合国', '北约', '世卫组织', '国际货币基金', '欧盟', '欧洲央行',
  '世界银行', '五角大楼', '美联储',
];

/**
 * 从文本中提取实体
 * @param {string} text
 * @returns {{ countries: string[], orgs: string[], numbers: string[] }}
 */
export function extractEntities(text) {
  if (!text) return { countries: [], orgs: [], numbers: [] };

  const countries = [];
  const orgs = [];
  const numbers = [];

  // 提取国家（按长度降序匹配，避免短词遮蔽长词）
  const sortedCountries = [...COUNTRY_PATTERNS].sort((a, b) => b.length - a.length);
  const usedCountryPositions = new Set();
  for (const name of sortedCountries) {
    const idx = text.indexOf(name);
    if (idx !== -1 && !usedCountryPositions.has(idx)) {
      countries.push(name);
      for (let i = idx; i < idx + name.length; i++) usedCountryPositions.add(i);
    }
  }

  // 提取组织（同上）
  const sortedOrgs = [...ORG_PATTERNS].sort((a, b) => b.length - a.length);
  const usedOrgPositions = new Set();
  for (const name of sortedOrgs) {
    const idx = text.indexOf(name);
    if (idx !== -1 && !usedOrgPositions.has(idx)) {
      orgs.push(name);
      for (let i = idx; i < idx + name.length; i++) usedOrgPositions.add(i);
    }
  }

  // 提取数字（含百分比、金额）
  const numMatches = text.match(/\d+(?:\.\d+)?(?:\s*%|\s*billion|\s*million|\s*trillion|\s*亿|\s*万|\s*千)?/g);
  if (numMatches) {
    numbers.push(...numMatches.slice(0, 5));
  }

  return { countries, orgs, numbers };
}

// ─────────────────────────────────────────
// 模板匹配
// ─────────────────────────────────────────

/**
 * 计算文章文本与模板关键词的命中数
 * @param {string} text - 小写化的文章文本
 * @param {string[]} keywords
 * @returns {number}
 */
function countKeywordHits(text, keywords) {
  let hits = 0;
  for (const kw of keywords) {
    if (text.includes(kw.toLowerCase())) hits++;
  }
  return hits;
}

/**
 * 为单个分析师选取最佳模板（按关键词命中数）
 * @param {object} analyst
 * @param {string} lowerText
 * @returns {object|null} 选中的模板
 */
function selectBestTemplate(analyst, lowerText) {
  let best = null;
  let bestScore = -1;

  for (const template of analyst.templates) {
    const score = countKeywordHits(lowerText, template.triggerKeywords);
    if (score > bestScore) {
      bestScore = score;
      best = template;
    }
  }

  // 即使没有命中也返回第一个模板（fallback）
  return best ?? analyst.templates[0] ?? null;
}

// ─────────────────────────────────────────
// 槽位填充
// ─────────────────────────────────────────

/** 通用槽位默认值 */
const SLOT_DEFAULTS = {
  TOPIC: ['此次事件', '这一局势', '最新动态', '相关进展', '当前形势'],
  COUNTRY: ['相关国家', '各方', '当事国', '主要经济体'],
  ORG: ['相关机构', '主要组织', '国际机构', '相关方'],
  NUMBER: ['多', '若干', '相当数量的'],
};

/**
 * 用实体填充模板变体中的槽位
 * @param {string} variant
 * @param {object} entities - { countries, orgs, numbers }
 * @param {string} topicHint - 文章标题（用于提取主题词）
 * @returns {string}
 */
function fillSlots(variant, entities, topicHint) {
  let result = variant;

  // {TOPIC} — 从标题中提取前 10 个字作为主题
  const topicText = topicHint
    ? topicHint.slice(0, 20).replace(/\s+/g, ' ').trim()
    : randomFrom(SLOT_DEFAULTS.TOPIC);
  result = result.replace(/\{TOPIC\}/g, topicText || randomFrom(SLOT_DEFAULTS.TOPIC));

  // {COUNTRY} — 从实体中取第一个，否则用默认
  const country = entities.countries[0] || randomFrom(SLOT_DEFAULTS.COUNTRY);
  result = result.replace(/\{COUNTRY\}/g, country);

  // {ORG} — 从实体中取第一个，否则用默认
  const org = entities.orgs[0] || randomFrom(SLOT_DEFAULTS.ORG);
  result = result.replace(/\{ORG\}/g, org);

  // {NUMBER} — 从实体中取第一个数字，否则用默认
  const number = entities.numbers[0] || randomFrom(SLOT_DEFAULTS.NUMBER);
  result = result.replace(/\{NUMBER\}/g, number);

  return result;
}

/**
 * 从数组中随机取一个元素
 * @param {any[]} arr
 * @returns {any}
 */
function randomFrom(arr) {
  if (!arr || arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─────────────────────────────────────────
// 主函数
// ─────────────────────────────────────────

/**
 * 为一篇文章生成分析师评论
 * @param {{ title: string, summary: string, category: string }} article
 * @param {object[]} [analystsOverride] - 可选，覆盖默认分析师列表
 * @returns {Array<{ id, name, role, avatar, color, comment }>}
 */
export function generateComments(article, analystsOverride) {
  const category = article.category || 'general';
  const allText = `${article.title || ''} ${article.summary || ''}`;
  const lowerText = allText.toLowerCase();

  // 1. 使用全部传入的光谱立场
  const candidates = analystsOverride ?? getAnalystsForCategory(category);

  if (candidates.length === 0) {
    return [];
  }

  const chosen = candidates;

  // 2. 提取实体
  const entities = extractEntities(allText);

  // 3-6. 为每个选中的分析师生成评论
  const comments = chosen.map((analyst) => {
    // 选取最佳模板
    const template = selectBestTemplate(analyst, lowerText);
    if (!template) return null;

    // 随机选 variant
    const variant = randomFrom(template.variants);

    // 填充槽位
    const comment = fillSlots(variant, entities, article.title);

    return {
      id: analyst.id,
      name: analyst.name,
      role: analyst.role,
      avatar: analyst.avatar,
      color: analyst.color,
      comment,
    };
  });

  return comments.filter(Boolean);
}

/**
 * 批量生成评论（带全量分析师注入，用于跨分类 fallback）
 * @param {object[]} articles
 * @param {object[]} allAnalysts
 * @returns {object[]}
 */
export function generateCommentsForAll(articles, allAnalysts) {
  return articles.map((article) => {
    // 政治光谱模式：所有立场都对所有文章发表评论
    const analysts = generateComments(article, allAnalysts);
    return { ...article, analysts };
  });
}

export default generateComments;
