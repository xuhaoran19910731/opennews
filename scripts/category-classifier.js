/**
 * 新闻分类器
 * 支持中英文关键词匹配，将文章分入7个分类
 */

/**
 * 分类定义（含中英文标签）
 */
export const CATEGORIES = {
  politics: { label: '国际政治', labelEn: 'Politics' },
  economy: { label: '财经', labelEn: 'Economy' },
  technology: { label: '科技', labelEn: 'Technology' },
  society: { label: '社会', labelEn: 'Society' },
  military: { label: '军事', labelEn: 'Military' },
  environment: { label: '环境', labelEn: 'Environment' },
  general: { label: '综合', labelEn: 'General' },
};

/**
 * 分类关键词词典（按权重从高到低排列，越靠前权重越高）
 */
const CATEGORY_KEYWORDS = {
  military: {
    en: [
      'war', 'warfare', 'military', 'army', 'navy', 'air force', 'troops',
      'missile', 'weapon', 'weapons', 'nuclear', 'bomb', 'airstrike', 'drone strike',
      'soldiers', 'combat', 'battlefield', 'invasion', 'offensive', 'ceasefire',
      'nato', 'pentagon', 'defense', 'defence', 'conflict', 'attack', 'strike',
      'artillery', 'tank', 'warship', 'aircraft carrier', 'munitions',
      'armed forces', 'general', 'admiral', 'battalion', 'regiment',
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
      'chatgpt', 'openai', 'google', 'microsoft', 'apple', 'meta', 'amazon',
      'semiconductor', 'chip', 'processor', 'nvidia', 'intel', 'tsmc',
      'technology', 'tech', 'software', 'hardware', 'cloud computing',
      'cybersecurity', 'hacking', 'data breach', 'cyberattack',
      'robot', 'automation', 'autonomous', 'self-driving',
      'social media', 'internet', 'digital', 'platform', 'app',
      'quantum computing', 'biotech', 'space', 'satellite', 'launch',
      'innovation', 'startup', '5g', '6g', 'blockchain',
      'regulation', 'antitrust', 'privacy', 'data protection',
    ],
    zh: [
      '人工智能', 'AI', '机器学习', '深度学习', 'ChatGPT', '谷歌', '微软',
      '苹果', '英伟达', '芯片', '半导体', '处理器', '台积电', '科技',
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
      'human rights', 'protest', 'demonstration', 'strike', 'riot',
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
      'china domestic', 'beijing', 'shanghai', 'guangdong', 'shenzhen',
      'state council', 'npc', 'national people congress', 'cppcc',
      'cpc', 'chinese government', 'two sessions', 'reform',
      'provinces', 'mainland china', 'chinese economy',
    ],
    zh: [
      '国务院', '全国人大', '两会', '政协', '中央', '改革', '民生',
      '扶贫', '乡村振兴', '医保', '社保', '公积金', '户口', '城镇化',
      '高考', '春运', '发改委', '住建部', '国内', '中国经济', 'A股',
      '北京', '上海', '广东', '深圳', '双减', '三中全会', '中纪委',
      '反腐', '一带一路', '脱贫攻坚', '内循环', '双循环', '共同富裕',
      '房地产', '楼市', '户籍', '新基建', '自贸区',
    ],
  },
};

/**
 * 对文本进行小写化和标准化处理
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  return (text || '').toLowerCase();
}

/**
 * 统计某分类在文本中的关键词命中数
 * @param {string} normalizedText
 * @param {string} category
 * @returns {number}
 */
function countKeywordHits(normalizedText, category) {
  const dict = CATEGORY_KEYWORDS[category];
  if (!dict) return 0;

  let hits = 0;
  for (const kw of dict.en) {
    if (normalizedText.includes(kw)) hits++;
  }
  for (const kw of dict.zh) {
    if (normalizedText.includes(kw)) hits++;
  }
  return hits;
}

/**
 * 对文章进行分类
 * @param {{ title: string, summary: string }} article
 * @returns {{ category: string, categoryLabel: string }}
 */
export function classifyArticle(article) {
  const text = normalizeText(`${article.title || ''} ${article.summary || ''}`);

  // 按命中数对所有分类打分（排除 general）
  const classifiableCategories = Object.keys(CATEGORY_KEYWORDS);

  let bestCategory = 'general';
  let bestScore = 0;

  for (const cat of classifiableCategories) {
    const score = countKeywordHits(text, cat);
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }

  // 命中 0 时回退到 general
  const finalCategory = bestScore > 0 ? bestCategory : 'general';

  return {
    category: finalCategory,
    categoryLabel: CATEGORIES[finalCategory]?.label ?? '综合',
  };
}

/**
 * 批量分类文章
 * @param {Array<{title: string, summary: string}>} articles
 * @returns {Array}
 */
export function classifyArticles(articles) {
  return articles.map((article) => ({
    ...article,
    ...classifyArticle(article),
  }));
}

export default classifyArticle;
