/**
 * RSS 数据源配置
 * 三级权威度分级：Tier-1(10分), Tier-2(7分), Tier-3(5分)
 */

export const RSS_SOURCES = [
  // ─────────────────────────────────────────
  // Tier-1：国际顶级通讯社 / 广播机构（基础分 10）
  // ─────────────────────────────────────────
  {
    id: 'reuters',
    name: 'Reuters',
    url: 'https://feeds.reuters.com/reuters/topNews',
    tier: 1,
    baseScore: 10,
    categories: ['politics', 'economy', 'general'],
    language: 'en',
    logoColor: '#FF8000',
  },
  {
    id: 'reuters_world',
    name: 'Reuters World',
    url: 'https://feeds.reuters.com/Reuters/worldNews',
    tier: 1,
    baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#FF8000',
  },
  {
    id: 'reuters_business',
    name: 'Reuters Business',
    url: 'https://feeds.reuters.com/reuters/businessNews',
    tier: 1,
    baseScore: 10,
    categories: ['economy'],
    language: 'en',
    logoColor: '#FF8000',
  },
  {
    id: 'ap_news',
    name: 'AP News',
    url: 'https://rsshub.app/apnews/topics/apf-topnews',
    tier: 1,
    baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#CC0000',
  },
  {
    id: 'ap_world',
    name: 'AP World News',
    url: 'https://rsshub.app/apnews/topics/apf-intlnews',
    tier: 1,
    baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#CC0000',
  },
  {
    id: 'bbc_world',
    name: 'BBC World',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    tier: 1,
    baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#BB1919',
  },
  {
    id: 'bbc_business',
    name: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    tier: 1,
    baseScore: 10,
    categories: ['economy'],
    language: 'en',
    logoColor: '#BB1919',
  },
  {
    id: 'bbc_tech',
    name: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    tier: 1,
    baseScore: 10,
    categories: ['tech'],
    language: 'en',
    logoColor: '#BB1919',
  },

  // ─────────────────────────────────────────
  // Tier-2：主流国际媒体（基础分 7）
  // ─────────────────────────────────────────
  {
    id: 'cnn_world',
    name: 'CNN World',
    url: 'http://rss.cnn.com/rss/edition_world.rss',
    tier: 2,
    baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#CC0000',
  },
  {
    id: 'cnn_business',
    name: 'CNN Business',
    url: 'http://rss.cnn.com/rss/money_latest.rss',
    tier: 2,
    baseScore: 7,
    categories: ['economy'],
    language: 'en',
    logoColor: '#CC0000',
  },
  {
    id: 'guardian_world',
    name: 'The Guardian World',
    url: 'https://www.theguardian.com/world/rss',
    tier: 2,
    baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#052962',
  },
  {
    id: 'guardian_tech',
    name: 'The Guardian Technology',
    url: 'https://www.theguardian.com/technology/rss',
    tier: 2,
    baseScore: 7,
    categories: ['tech'],
    language: 'en',
    logoColor: '#052962',
  },
  {
    id: 'guardian_env',
    name: 'The Guardian Environment',
    url: 'https://www.theguardian.com/environment/rss',
    tier: 2,
    baseScore: 7,
    categories: ['environment'],
    language: 'en',
    logoColor: '#052962',
  },
  {
    id: 'nyt_world',
    name: 'New York Times World',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    tier: 2,
    baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#000000',
  },
  {
    id: 'nyt_business',
    name: 'New York Times Business',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    tier: 2,
    baseScore: 7,
    categories: ['economy'],
    language: 'en',
    logoColor: '#000000',
  },
  {
    id: 'nyt_tech',
    name: 'New York Times Technology',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    tier: 2,
    baseScore: 7,
    categories: ['tech'],
    language: 'en',
    logoColor: '#000000',
  },
  {
    id: 'npr_news',
    name: 'NPR News',
    url: 'https://feeds.npr.org/1001/rss.xml',
    tier: 2,
    baseScore: 7,
    categories: ['general', 'society'],
    language: 'en',
    logoColor: '#232323',
  },
  {
    id: 'npr_world',
    name: 'NPR World',
    url: 'https://feeds.npr.org/1004/rss.xml',
    tier: 2,
    baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#232323',
  },

  // ─────────────────────────────────────────
  // Tier-3：区域性国际媒体（基础分 5）
  // ─────────────────────────────────────────
  {
    id: 'aljazeera_world',
    name: 'Al Jazeera',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    tier: 3,
    baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#F5A623',
  },
  {
    id: 'dw_world',
    name: 'Deutsche Welle',
    url: 'https://rss.dw.com/rdf/rss-en-all',
    tier: 3,
    baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#006DAB',
  },
  {
    id: 'dw_europe',
    name: 'DW Europe',
    url: 'https://rss.dw.com/rdf/rss-en-eu',
    tier: 3,
    baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#006DAB',
  },
  {
    id: 'france24_world',
    name: 'France 24',
    url: 'https://www.france24.com/en/rss',
    tier: 3,
    baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en',
    logoColor: '#E8002D',
  },
  {
    id: 'france24_eco',
    name: 'France 24 Economy',
    url: 'https://www.france24.com/en/economy/rss',
    tier: 3,
    baseScore: 5,
    categories: ['economy'],
    language: 'en',
    logoColor: '#E8002D',
  },
];

/**
 * 根据 id 获取单个 RSS 源配置
 * @param {string} id
 * @returns {object|undefined}
 */
export function getSourceById(id) {
  return RSS_SOURCES.find((s) => s.id === id);
}

/**
 * 按 tier 获取 RSS 源列表
 * @param {number} tier - 1 | 2 | 3
 * @returns {object[]}
 */
export function getSourcesByTier(tier) {
  return RSS_SOURCES.filter((s) => s.tier === tier);
}

/**
 * 获取某分类下的所有 RSS 源
 * @param {string} category
 * @returns {object[]}
 */
export function getSourcesByCategory(category) {
  return RSS_SOURCES.filter((s) => s.categories.includes(category));
}

export default RSS_SOURCES;
