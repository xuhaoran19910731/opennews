/**
 * 新闻分类器 — 双维度分类
 *
 * 维度 1: 地理分类 (category) — 用于前端 Tab 过滤
 *   china / germany / usa / asia / global / bigtech
 *
 * 维度 2: 主题分类 (topic) — 用于立场解读模板匹配
 *   economy / military / politics / technology / society / environment / domestic / general
 */

// ─────────────────────────────────────────
// 地理分类定义
// ─────────────────────────────────────────

export const GEO_CATEGORIES = {
  china: { label: '中国', labelEn: 'China' },
  germany: { label: '德国', labelEn: 'Germany' },
  usa: { label: '美国', labelEn: 'USA' },
  asia: { label: '亚洲', labelEn: 'Asia' },
  global: { label: '全球', labelEn: 'Global' },
  bigtech: { label: '大公司头条', labelEn: 'Big Corp' },
};

// ─────────────────────────────────────────
// 主题分类定义（保留原有分类，用于分析师模板匹配）
// ─────────────────────────────────────────

export const TOPIC_CATEGORIES = {
  politics: { label: '政治', labelEn: 'Politics' },
  economy: { label: '财经', labelEn: 'Economy' },
  technology: { label: '科技', labelEn: 'Technology' },
  society: { label: '社会', labelEn: 'Society' },
  military: { label: '军事', labelEn: 'Military' },
  environment: { label: '环境', labelEn: 'Environment' },
  domestic: { label: '国内', labelEn: 'Domestic' },
  general: { label: '综合', labelEn: 'General' },
};

// 向后兼容
export const CATEGORIES = TOPIC_CATEGORIES;

// ─────────────────────────────────────────
// 大公司关键词（标题匹配优先）
// ─────────────────────────────────────────

const BIGTECH_KEYWORDS = {
  // 这些关键词在标题和摘要中均可匹配
  safe: [
    // 中文公司名（不易误触）
    '阿里巴巴', '腾讯', '华为', '字节跳动', '百度', '小米', '京东', '比亚迪',
    '网易', '拼多多', '美团', '蚂蚁集团', '滴滴', '大疆',
    '特斯拉', '英伟达', '微软', '亚马逊', '英特尔', '高通', '甲骨文',
    '奈飞', '台积电', '三星', '索尼', '丰田', '本田', '现代',
    '大众汽车', '西门子', '宝马', '奔驰', '拜耳', '博世', '德意志银行',
    '高盛', '摩根大通', '摩根士丹利', '贝莱德', '汇丰', '伯克希尔',
    '壳牌', '埃克森美孚', '雀巢', '联合利华', '软银', '任天堂',
    // 英文公司名（不易误触）
    'nvidia', 'openai', 'chatgpt', 'spacex', 'tsmc', 'bytedance', 'tiktok',
    'alibaba', 'tencent', 'huawei', 'xiaomi', 'pinduoduo', 'meituan',
    'volkswagen', 'siemens', 'mercedes-benz', 'deutsche bank',
    'goldman sachs', 'jpmorgan', 'morgan stanley', 'blackrock',
    'berkshire hathaway', 'exxonmobil', 'nestlé', 'nestle', 'unilever',
    'softbank', 'nintendo', 'samsung', 'toyota', 'honda', 'hyundai',
    'boeing', 'airbus', 'qualcomm', 'oracle', 'salesforce', 'adobe',
    'uber', 'airbnb', 'netflix', 'spotify',
  ],
  // 这些关键词仅在标题中匹配（容易在其他语境出现）
  titleOnly: [
    'apple', 'google', 'alphabet', 'microsoft', 'amazon', 'meta',
    'tesla', 'intel', 'amd', 'ibm', 'sap', 'bp', 'shell',
    'sony', 'baidu', 'jd', 'byd', 'bmw', 'bayer', 'basf', 'bosch',
    '苹果', '谷歌',
  ],
};

// ─────────────────────────────────────────
// 地理关键词词典
// ─────────────────────────────────────────

const GEO_KEYWORDS = {
  china: {
    en: [
      'china', 'chinese', 'beijing', 'shanghai', 'guangzhou', 'shenzhen',
      'hong kong', 'xi jinping', 'state council', 'npc', 'cpc', 'cppcc',
      'chinese government', 'chinese economy', 'pla', 'renminbi', 'rmb', 'yuan',
      'mainland china', 'two sessions', 'guangdong', 'chengdu', 'wuhan',
      'hangzhou', 'nanjing', 'tianjin', 'chongqing', 'tibet', 'xinjiang',
      'inner mongolia', 'zhongnanhai', 'ccp',
    ],
    zh: [
      '中国', '北京', '上海', '广州', '深圳', '香港', '习近平', '国务院',
      '全国人大', '政协', '中共', '中央', '人民币', '两会', '广东', '成都',
      '武汉', '杭州', '南京', '天津', '重庆', '西藏', '新疆', '内蒙古',
      '中国经济', 'A股', '沪深', '上证', '深证', '人民日报', '新华社',
      '央视', '发改委', '住建部', '中纪委', '反腐', '改革', '民生',
      '扶贫', '乡村振兴', '医保', '社保', '户口', '高考', '春运',
      '一带一路', '内循环', '双循环', '共同富裕', '房地产', '楼市',
      '新基建', '自贸区', '三中全会', '国内', '中方', '中美', '中欧',
      '中日', '中俄', '台海',
    ],
  },

  germany: {
    en: [
      'germany', 'german', 'berlin', 'munich', 'frankfurt', 'hamburg',
      'bundestag', 'bundesrat', 'scholz', 'merkel', 'merz',
      'bundeswehr', 'autobahn', 'deutsche', 'dax',
      'bavaria', 'saxony', 'north rhine-westphalia', 'baden-württemberg',
      'cologne', 'düsseldorf', 'stuttgart', 'hanover', 'bremen', 'dresden',
    ],
    zh: [
      '德国', '柏林', '慕尼黑', '法兰克福', '汉堡', '联邦议院',
      '朔尔茨', '默克尔', '默茨', '联邦国防军',
      '巴伐利亚', '萨克森', '北莱茵', '科隆', '杜塞尔多夫',
      '斯图加特', '德军', '德方', '德美', '德中', '德法',
    ],
  },

  usa: {
    en: [
      'united states', 'usa', 'u.s.', 'american', 'americans',
      'washington', 'white house', 'capitol hill', 'pentagon', 'congress',
      'senate', 'house of representatives', 'democrat', 'republican',
      'trump', 'biden', 'harris', 'cia', 'fbi', 'nsa',
      'federal reserve', 'fed ', 'wall street', 'nasdaq', 'dow jones', 's&p 500',
      'new york', 'los angeles', 'chicago', 'texas', 'california', 'florida',
      'silicon valley', 'hollywood',
    ],
    zh: [
      '美国', '华盛顿', '白宫', '国会山', '五角大楼', '美军',
      '参议院', '众议院', '民主党', '共和党', '特朗普', '拜登', '哈里斯',
      '美联储', '华尔街', '纳斯达克', '道琼斯', '标普',
      '纽约', '洛杉矶', '芝加哥', '德克萨斯', '加利福尼亚', '佛罗里达',
      '硅谷', '好莱坞', '美方', '美中', '美欧', '美日', '美俄',
    ],
  },

  asia: {
    en: [
      'japan', 'japanese', 'tokyo', 'osaka', 'abe', 'kishida',
      'south korea', 'korean', 'seoul', 'pyongyang', 'north korea', 'kim jong',
      'india', 'indian', 'new delhi', 'mumbai', 'modi', 'bollywood',
      'vietnam', 'vietnamese', 'hanoi', 'ho chi minh',
      'indonesia', 'indonesian', 'jakarta', 'joko widodo',
      'thailand', 'thai', 'bangkok',
      'philippines', 'filipino', 'manila', 'marcos', 'duterte',
      'malaysia', 'malaysian', 'kuala lumpur',
      'singapore', 'singaporean',
      'myanmar', 'cambodia', 'laos',
      'taiwan', 'taiwanese', 'taipei', 'tsai ing-wen', 'lai ching-te',
      'pakistan', 'pakistani', 'islamabad', 'karachi',
      'bangladesh', 'sri lanka', 'nepal',
      'asean', 'asia pacific', 'indo-pacific',
    ],
    zh: [
      '日本', '东京', '大阪', '岸田', '石破',
      '韩国', '首尔', '平壤', '朝鲜', '金正恩', '尹锡悦',
      '印度', '新德里', '孟买', '莫迪',
      '越南', '河内', '胡志明市',
      '印尼', '雅加达', '佐科',
      '泰国', '曼谷',
      '菲律宾', '马尼拉', '马科斯',
      '马来西亚', '吉隆坡',
      '新加坡',
      '缅甸', '柬埔寨', '老挝',
      '台湾', '台北', '赖清德', '蔡英文',
      '巴基斯坦', '伊斯兰堡',
      '孟加拉', '斯里兰卡', '尼泊尔',
      '东盟', '亚太', '印太',
    ],
  },
};

// ─────────────────────────────────────────
// 主题关键词词典（保留原有逻辑不变）
// ─────────────────────────────────────────

const TOPIC_KEYWORDS = {
  military: {
    en: [
      'war', 'warfare', 'military', 'army', 'navy', 'air force', 'troops',
      'missile', 'weapon', 'weapons', 'nuclear', 'bomb', 'airstrike', 'drone strike',
      'soldiers', 'combat', 'battlefield', 'invasion', 'offensive', 'ceasefire',
      'nato', 'pentagon', 'defense', 'defence', 'conflict', 'attack', 'strike',
      'artillery', 'tank', 'warship', 'aircraft carrier', 'munitions',
      'armed forces', 'admiral', 'battalion', 'regiment',
      'guerrilla', 'insurgency', 'insurgent', 'rebel', 'militia',
      'occupation', 'siege', 'blockade', 'ammunition', 'arsenal',
    ],
    zh: [
      '战争', '军事', '军队', '导弹', '核武器', '轰炸', '空袭', '无人机',
      '士兵', '战场', '入侵', '进攻', '停火', '北约', '国防部', '冲突',
      '攻击', '战舰', '航母', '武器', '炮兵', '装甲', '武装', '叛军',
      '游击队', '占领', '围攻', '封锁', '弹药', '军备',
    ],
  },

  politics: {
    en: [
      'election', 'vote', 'voting', 'president', 'prime minister', 'government',
      'parliament', 'congress', 'senate', 'democrat', 'republican', 'party',
      'diplomat', 'diplomacy', 'sanction', 'sanctions', 'treaty', 'summit',
      'united nations', 'un security council', 'foreign policy',
      'geopolitical', 'geopolitics', 'bilateral', 'multilateral',
      'ambassador', 'embassy', 'minister', 'secretary', 'chancellor',
      'legislation', 'bill', 'law', 'referendum', 'protest', 'coup',
      'political', 'politician', 'regime', 'opposition', 'coalition',
      'democracy', 'authoritarian', 'constitution', 'sovereignty',
      'territorial', 'annexation', 'independence', 'autonomy',
    ],
    zh: [
      '选举', '投票', '总统', '首相', '政府', '议会', '国会', '参议院',
      '民主党', '共和党', '政党', '外交', '制裁', '条约', '峰会',
      '联合国', '安理会', '地缘政治', '大使', '使馆', '部长', '立法',
      '法案', '公投', '抗议', '政变', '政治', '政治家', '政权', '反对派',
      '联合政府', '民主', '威权', '宪法', '主权', '领土', '吞并', '独立', '自治',
    ],
  },

  economy: {
    en: [
      'economy', 'economic', 'gdp', 'inflation', 'interest rate', 'federal reserve',
      'central bank', 'imf', 'world bank', 'stock market', 'stock', 'shares',
      'nasdaq', 'dow jones', 'wall street', 'recession', 'growth',
      'trade', 'tariff', 'export', 'import', 'supply chain', 'debt',
      'deficit', 'surplus', 'budget', 'tax', 'revenue', 'profit',
      'ipo', 'merger', 'acquisition', 'bankruptcy', 'startup',
      'investment', 'investor', 'fund', 'bond', 'treasury',
      'oil price', 'commodity', 'energy price', 'fuel', 'gas price',
      'cryptocurrency', 'bitcoin', 'digital currency',
      'employment', 'unemployment', 'jobs', 'labor market', 'wage',
    ],
    zh: [
      '经济', 'GDP', '通货膨胀', '利率', '美联储', '央行', 'IMF', '世界银行',
      '股市', '股票', '纳斯达克', '道琼斯', '华尔街', '衰退', '增长',
      '贸易', '关税', '出口', '进口', '供应链', '债务', '赤字', '盈余',
      '预算', '税收', '收入', '利润', 'IPO', '并购', '破产', '创业',
      '投资', '基金', '债券', '国债', '油价', '大宗商品', '能源价格',
      '加密货币', '比特币', '就业', '失业', '劳动力市场', '工资',
    ],
  },

  technology: {
    en: [
      'artificial intelligence', 'ai', 'machine learning', 'deep learning',
      'chatgpt', 'semiconductor', 'chip', 'processor',
      'technology', 'tech', 'software', 'hardware', 'cloud computing',
      'cybersecurity', 'hacking', 'data breach', 'cyberattack',
      'robot', 'automation', 'autonomous', 'self-driving',
      'social media', 'internet', 'digital', 'platform', 'app',
      'quantum computing', 'biotech', 'space', 'satellite', 'launch',
      'innovation', 'startup', '5g', '6g', 'blockchain',
      'regulation', 'antitrust', 'privacy', 'data protection',
    ],
    zh: [
      '人工智能', 'AI', '机器学习', '深度学习', 'ChatGPT',
      '芯片', '半导体', '处理器', '科技',
      '软件', '硬件', '云计算', '网络安全', '黑客', '数据泄露', '网络攻击',
      '机器人', '自动化', '无人驾驶', '社交媒体', '互联网', '数字化', '平台',
      '量子计算', '生物科技', '卫星', '发射', '创新', '5G', '区块链',
      '隐私', '数据保护', '反垄断',
    ],
  },

  environment: {
    en: [
      'climate change', 'global warming', 'carbon', 'emissions', 'greenhouse',
      'fossil fuel', 'renewable energy', 'solar', 'wind energy', 'green energy',
      'deforestation', 'biodiversity', 'species', 'extinction',
      'flood', 'drought', 'wildfire', 'hurricane', 'typhoon', 'earthquake',
      'pollution', 'plastic', 'ocean', 'coral reef', 'glacier', 'ice cap',
      'paris agreement', 'cop', 'ipcc', 'sustainability', 'sustainable',
      'environmental', 'ecology', 'ecosystem', 'conservation',
      'water shortage', 'air quality', 'toxic', 'contamination',
    ],
    zh: [
      '气候变化', '全球变暖', '碳排放', '温室气体', '化石燃料', '可再生能源',
      '太阳能', '风能', '绿色能源', '森林砍伐', '生物多样性', '物种灭绝',
      '洪水', '干旱', '野火', '飓风', '台风', '地震', '污染', '塑料',
      '珊瑚礁', '冰川', '巴黎协定', '可持续', '环境', '生态', '保护',
      '水资源短缺', '空气质量', '有毒', '污染物',
    ],
  },

  society: {
    en: [
      'health', 'pandemic', 'covid', 'vaccine', 'hospital', 'disease',
      'education', 'school', 'university', 'student', 'teacher',
      'crime', 'murder', 'shooting', 'violence', 'police', 'arrest',
      'immigration', 'refugee', 'asylum', 'border', 'migrant',
      'human rights', 'protest', 'demonstration', 'riot',
      'poverty', 'inequality', 'homeless', 'hunger', 'food security',
      'culture', 'religion', 'church', 'mosque', 'faith',
      'gender', 'lgbtq', 'racism', 'discrimination', 'diversity',
      'social', 'community', 'welfare', 'housing', 'healthcare',
    ],
    zh: [
      '健康', '疫情', '新冠', '疫苗', '医院', '疾病', '教育', '学校',
      '大学', '学生', '犯罪', '谋杀', '枪击', '暴力', '警察', '逮捕',
      '移民', '难民', '庇护', '边境', '人权', '抗议', '示威', '罢工',
      '骚乱', '贫困', '不平等', '无家可归', '饥饿', '粮食安全', '文化',
      '宗教', '性别', '种族歧视', '多样性', '社会', '社区', '福利', '住房',
    ],
  },

  domestic: {
    en: [
      'china domestic', 'state council', 'npc', 'national people congress', 'cppcc',
      'cpc', 'chinese government', 'two sessions', 'reform',
      'provinces', 'mainland china', 'chinese economy',
    ],
    zh: [
      '国务院', '全国人大', '两会', '政协', '中央', '改革', '民生',
      '扶贫', '乡村振兴', '医保', '社保', '公积金', '户口', '城镇化',
      '高考', '春运', '发改委', '住建部', '国内', '中国经济', 'A股',
      '双减', '三中全会', '中纪委',
      '反腐', '一带一路', '脱贫攻坚', '内循环', '双循环', '共同富裕',
      '房地产', '楼市', '户籍', '新基建', '自贸区',
    ],
  },
};

// 向后兼容（旧代码可能引用 CATEGORY_KEYWORDS）
export const CATEGORY_KEYWORDS = TOPIC_KEYWORDS;

// ─────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────

function normalizeText(text) {
  return (text || '').toLowerCase();
}

/**
 * 统计某关键词列表在文本中的命中数
 */
function countHits(normalizedText, dict) {
  if (!dict) return 0;
  let hits = 0;
  if (dict.en) {
    for (const kw of dict.en) {
      if (normalizedText.includes(kw.toLowerCase())) hits++;
    }
  }
  if (dict.zh) {
    for (const kw of dict.zh) {
      if (normalizedText.includes(kw)) hits++;
    }
  }
  return hits;
}

// ─────────────────────────────────────────
// 地理分类
// ─────────────────────────────────────────

/**
 * 检测是否为大公司头条
 * @param {string} normalizedTitle - 小写化的标题
 * @param {string} normalizedFull - 小写化的标题+摘要
 * @returns {boolean}
 */
function isBigtech(normalizedTitle, normalizedFull) {
  // safe 关键词在标题+摘要中匹配
  for (const kw of BIGTECH_KEYWORDS.safe) {
    if (normalizedFull.includes(kw.toLowerCase())) return true;
  }
  // titleOnly 关键词仅在标题中匹配（避免误触）
  for (const kw of BIGTECH_KEYWORDS.titleOnly) {
    if (normalizedTitle.includes(kw.toLowerCase())) return true;
  }
  return false;
}

/**
 * 地理分类
 * 优先级：bigtech > 按命中数排序(china/germany/usa/asia) > global
 */
function classifyGeo(article) {
  const title = normalizeText(article.title || '');
  const full = normalizeText(`${article.title || ''} ${article.summary || ''}`);

  // 1. 大公司头条 — 最高优先级
  if (isBigtech(title, full)) {
    return { category: 'bigtech', categoryLabel: GEO_CATEGORIES.bigtech.label };
  }

  // 2. 按命中数对地理区域评分
  const geoScores = {};
  const geoPriority = ['china', 'germany', 'usa', 'asia']; // 同分时的优先级

  for (const geo of geoPriority) {
    geoScores[geo] = countHits(full, GEO_KEYWORDS[geo]);
  }

  // 找到命中数最高的地理区域
  let bestGeo = 'global';
  let bestScore = 0;

  for (const geo of geoPriority) {
    if (geoScores[geo] > bestScore) {
      bestScore = geoScores[geo];
      bestGeo = geo;
    }
  }

  // 命中 0 → global
  const finalGeo = bestScore > 0 ? bestGeo : 'global';

  return {
    category: finalGeo,
    categoryLabel: GEO_CATEGORIES[finalGeo]?.label ?? '全球',
  };
}

// ─────────────────────────────────────────
// 主题分类
// ─────────────────────────────────────────

function classifyTopic(article) {
  const text = normalizeText(`${article.title || ''} ${article.summary || ''}`);

  const topicKeys = Object.keys(TOPIC_KEYWORDS);
  let bestTopic = 'general';
  let bestScore = 0;

  for (const topic of topicKeys) {
    const score = countHits(text, TOPIC_KEYWORDS[topic]);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  const finalTopic = bestScore > 0 ? bestTopic : 'general';

  return {
    topic: finalTopic,
    topicLabel: TOPIC_CATEGORIES[finalTopic]?.label ?? '综合',
  };
}

// ─────────────────────────────────────────
// 主函数
// ─────────────────────────────────────────

/**
 * 对文章进行双维度分类
 * @param {{ title: string, summary: string }} article
 * @returns {{ category: string, categoryLabel: string, topic: string, topicLabel: string }}
 */
export function classifyArticle(article) {
  const geo = classifyGeo(article);
  const topic = classifyTopic(article);

  return {
    ...geo,
    ...topic,
  };
}

/**
 * 批量分类文章
 */
export function classifyArticles(articles) {
  return articles.map((article) => ({
    ...article,
    ...classifyArticle(article),
  }));
}

export default classifyArticle;
