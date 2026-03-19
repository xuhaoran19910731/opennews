/**
 * RSS 数据源配置
 * 三级权威度分级：Tier-1(10分), Tier-2(7分), Tier-3(5分)
 * 覆盖语言：英语、中文、德语、法语、阿拉伯语、俄语、西班牙语、日语
 */

export const RSS_SOURCES = [
  // ═════════════════════════════════════════
  // 英语 (English) 媒体
  // ═════════════════════════════════════════

  // ── Tier-1：国际顶级通讯社 / 广播机构（基础分 10）──
  {
    id: 'reuters',
    name: 'Reuters',
    url: 'https://feedx.net/rss/reuters.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'economy', 'general'],
    language: 'en', logoColor: '#FF8000',
  },
  {
    id: 'ap_news',
    name: 'AP News',
    url: 'https://feedx.net/rss/ap.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#CC0000',
  },
  {
    id: 'bbc_world',
    name: 'BBC World',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#BB1919',
  },
  {
    id: 'bbc_business',
    name: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['economy'],
    language: 'en', logoColor: '#BB1919',
  },
  {
    id: 'bbc_tech',
    name: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['technology'],
    language: 'en', logoColor: '#BB1919',
  },
  {
    id: 'bbc_science',
    name: 'BBC Science',
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['environment', 'technology'],
    language: 'en', logoColor: '#BB1919',
  },

  // ── Tier-2：主流国际英语媒体（基础分 7）──
  {
    id: 'cnn_world',
    name: 'CNN World',
    url: 'https://rss.cnn.com/rss/edition_world.rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#CC0000',
  },
  {
    id: 'cnn_business',
    name: 'CNN Business',
    url: 'https://rss.cnn.com/rss/money_latest.rss',
    tier: 2, baseScore: 7,
    categories: ['economy'],
    language: 'en', logoColor: '#CC0000',
  },
  {
    id: 'guardian_world',
    name: 'The Guardian',
    url: 'https://www.theguardian.com/world/rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#052962',
  },
  {
    id: 'guardian_tech',
    name: 'The Guardian Tech',
    url: 'https://www.theguardian.com/technology/rss',
    tier: 2, baseScore: 7,
    categories: ['technology'],
    language: 'en', logoColor: '#052962',
  },
  {
    id: 'guardian_env',
    name: 'The Guardian Env',
    url: 'https://www.theguardian.com/environment/rss',
    tier: 2, baseScore: 7,
    categories: ['environment'],
    language: 'en', logoColor: '#052962',
  },
  {
    id: 'nyt_world',
    name: 'New York Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#000000',
  },
  {
    id: 'nyt_business',
    name: 'NYT Business',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    tier: 1, baseScore: 10,
    categories: ['economy'],
    language: 'en', logoColor: '#000000',
  },
  {
    id: 'nyt_tech',
    name: 'NYT Technology',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    tier: 1, baseScore: 10,
    categories: ['technology'],
    language: 'en', logoColor: '#000000',
  },
  {
    id: 'npr_news',
    name: 'NPR News',
    url: 'https://feeds.npr.org/1001/rss.xml',
    tier: 2, baseScore: 7,
    categories: ['general', 'society'],
    language: 'en', logoColor: '#232323',
  },
  {
    id: 'npr_world',
    name: 'NPR World',
    url: 'https://feeds.npr.org/1004/rss.xml',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#232323',
  },
  {
    id: 'wsj_world',
    name: 'Wall Street Journal',
    url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'economy', 'general'],
    language: 'en', logoColor: '#0274B6',
  },
  {
    id: 'wsj_business',
    name: 'WSJ Business',
    url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    tier: 1, baseScore: 10,
    categories: ['economy'],
    language: 'en', logoColor: '#0274B6',
  },
  {
    id: 'wapo_world',
    name: 'Washington Post',
    url: 'https://feeds.washingtonpost.com/rss/world',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#000000',
  },
  {
    id: 'ft_en',
    name: 'Financial Times',
    url: 'https://www.ft.com/rss/home',
    tier: 1, baseScore: 10,
    categories: ['economy', 'politics'],
    language: 'en', logoColor: '#FFF1E0',
  },

  // ═════════════════════════════════════════
  // 中文媒体
  // ═════════════════════════════════════════
  {
    id: 'bbc_zhongwen',
    name: 'BBC中文',
    url: 'https://feeds.bbci.co.uk/zhongwen/simp/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#BB1919',
  },
  {
    id: 'rfi_cn',
    name: 'RFI中文',
    url: 'https://www.rfi.fr/cn/rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#00205B',
  },
  {
    id: 'dw_cn',
    name: 'DW中文',
    url: 'https://rss.dw.com/rdf/rss-chi-all',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#006DAB',
  },
  {
    id: 'ftchinese',
    name: 'FT中文网',
    url: 'https://www.ftchinese.com/rss/feed',
    tier: 2, baseScore: 7,
    categories: ['economy', 'politics'],
    language: 'zh', logoColor: '#FFF1E0',
  },

  // ═════════════════════════════════════════
  // 中国国内媒体
  // ═════════════════════════════════════════

  // ── Tier-1：中央级媒体 ──
  {
    id: 'xinhua',
    name: '新华社',
    url: 'http://www.news.cn/rss/politics.xml',
    tier: 1, baseScore: 10,
    categories: ['domestic', 'politics'],
    language: 'zh', logoColor: '#D71920',
  },
  {
    id: 'people_daily',
    name: '人民日报',
    url: 'https://www.people.com.cn/rss/politics.xml',
    tier: 1, baseScore: 10,
    categories: ['domestic', 'politics'],
    language: 'zh', logoColor: '#CC0000',
  },
  {
    id: 'cctv',
    name: '央视新闻',
    url: 'https://news.cctv.com/rss/china.xml',
    tier: 1, baseScore: 10,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#1A6FB4',
  },
  {
    id: 'cnr',
    name: '央广网',
    url: 'https://rsshub.app/cnr/news',
    tier: 1, baseScore: 10,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#D71920',
  },
  {
    id: 'gmw',
    name: '光明日报',
    url: 'https://rsshub.app/gmw/news',
    tier: 1, baseScore: 10,
    categories: ['domestic', 'politics'],
    language: 'zh', logoColor: '#CC0000',
  },
  {
    id: 'chinadaily',
    name: '中国日报',
    url: 'https://www.chinadaily.com.cn/rss/china_rss.xml',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#003366',
  },

  // ── Tier-2：全国性主流媒体 ──
  {
    id: 'ce',
    name: '经济日报',
    url: 'https://rsshub.app/ce/important',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'economy'],
    language: 'zh', logoColor: '#1A5276',
  },
  {
    id: 'caixin',
    name: '财新网',
    url: 'https://rsshub.app/caixin/latest',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'economy'],
    language: 'zh', logoColor: '#0066CC',
  },
  {
    id: 'jiemian',
    name: '界面新闻',
    url: 'https://rsshub.app/jiemian/list/4',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'economy'],
    language: 'zh', logoColor: '#1A1A1A',
  },
  {
    id: 'thepaper',
    name: '澎湃新闻',
    url: 'https://rsshub.app/thepaper/featured',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'society'],
    language: 'zh', logoColor: '#1A1A1A',
  },
  {
    id: 'yicai',
    name: '第一财经',
    url: 'https://rsshub.app/yicai/brief',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'economy'],
    language: 'zh', logoColor: '#0066CC',
  },
  {
    id: 'globaltimes',
    name: '环球时报',
    url: 'https://rsshub.app/huanqiu/world',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'politics'],
    language: 'zh', logoColor: '#BD0000',
  },
  {
    id: 'bjrb',
    name: '北京日报',
    url: 'https://rsshub.app/bjd/news',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#CC0000',
  },
  {
    id: 'jfrb',
    name: '解放日报',
    url: 'https://rsshub.app/jfdaily/news',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#CC0000',
  },
  {
    id: 'nanfang',
    name: '南方日报',
    url: 'https://rsshub.app/southcn/nfapp/important',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'general'],
    language: 'zh', logoColor: '#003399',
  },
  {
    id: 'nfzm',
    name: '南方周末',
    url: 'https://rsshub.app/infzm/2',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'society'],
    language: 'zh', logoColor: '#1A1A1A',
  },
  {
    id: 'bjnews',
    name: '新京报',
    url: 'https://rsshub.app/bjnews/news',
    tier: 2, baseScore: 7,
    categories: ['domestic', 'society'],
    language: 'zh', logoColor: '#E74C3C',
  },

  // ── Tier-3：杂志 / 周刊 ──
  {
    id: 'lifeweek',
    name: '三联生活周刊',
    url: 'https://rsshub.app/lifeweek/index',
    tier: 3, baseScore: 5,
    categories: ['society', 'general'],
    language: 'zh', logoColor: '#333333',
  },

  // ═════════════════════════════════════════
  // 德语 (Deutsch) 媒体
  // ═════════════════════════════════════════
  {
    id: 'dw_de',
    name: 'Deutsche Welle DE',
    url: 'https://rss.dw.com/rdf/rss-de-all',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'de', logoColor: '#006DAB',
  },
  {
    id: 'tagesschau',
    name: 'Tagesschau',
    url: 'https://www.tagesschau.de/xml/rss2/',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'de', logoColor: '#004B93',
  },
  {
    id: 'spiegel',
    name: 'Der Spiegel',
    url: 'https://www.spiegel.de/schlagzeilen/tops/index.rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'economy', 'general'],
    language: 'de', logoColor: '#E64415',
  },
  {
    id: 'faz',
    name: 'FAZ',
    url: 'https://www.faz.net/rss/aktuell/',
    tier: 2, baseScore: 7,
    categories: ['politics', 'economy'],
    language: 'de', logoColor: '#333333',
  },
  {
    id: 'zeit',
    name: 'Die Zeit',
    url: 'https://newsfeed.zeit.de/index',
    tier: 2, baseScore: 7,
    categories: ['politics', 'society'],
    language: 'de', logoColor: '#000000',
  },
  {
    id: 'sz',
    name: 'Süddeutsche Zeitung',
    url: 'https://rss.sueddeutsche.de/alles',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'de', logoColor: '#333333',
  },

  // ═════════════════════════════════════════
  // 法语 (Français) 媒体
  // ═════════════════════════════════════════
  {
    id: 'france24_fr',
    name: 'France 24 FR',
    url: 'https://www.france24.com/fr/actualit%C3%A9s/rss',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'fr', logoColor: '#E8002D',
  },
  {
    id: 'rfi_fr',
    name: 'RFI',
    url: 'https://www.rfi.fr/fr/rss',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'fr', logoColor: '#00205B',
  },
  {
    id: 'lemonde',
    name: 'Le Monde',
    url: 'https://www.lemonde.fr/rss/une.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'fr', logoColor: '#222222',
  },
  {
    id: 'lefigaro',
    name: 'Le Figaro',
    url: 'https://www.lefigaro.fr/rss/figaro_actualites.xml',
    tier: 2, baseScore: 7,
    categories: ['politics', 'economy'],
    language: 'fr', logoColor: '#1D4B8F',
  },
  {
    id: 'afp_fr',
    name: 'AFP',
    url: 'https://www.france24.com/fr/france/rss',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'fr', logoColor: '#325FA2',
  },

  // ═════════════════════════════════════════
  // 阿拉伯语 (العربية) 媒体
  // ═════════════════════════════════════════
  {
    id: 'aljazeera_ar',
    name: 'الجزيرة (Al Jazeera AR)',
    url: 'https://www.aljazeera.net/aljazeerarss/a7730e48-f395-4c08-a8ed-3990e73ade7f/73d0e1b4-532f-45ef-b135-bfdff8b8cab9',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ar', logoColor: '#F5A623',
  },
  {
    id: 'bbc_arabic',
    name: 'BBC Arabic',
    url: 'https://feeds.bbci.co.uk/arabic/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ar', logoColor: '#BB1919',
  },
  {
    id: 'france24_ar',
    name: 'France 24 AR',
    url: 'https://www.france24.com/ar/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ar', logoColor: '#E8002D',
  },
  {
    id: 'dw_ar',
    name: 'DW Arabic',
    url: 'https://rss.dw.com/rdf/rss-ar-all',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ar', logoColor: '#006DAB',
  },
  {
    id: 'alarabiya',
    name: 'العربية (Al Arabiya)',
    url: 'https://www.alarabiya.net/feed/rss2/ar.xml',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ar', logoColor: '#FF6600',
  },

  // ═════════════════════════════════════════
  // 俄语 (Русский) 媒体
  // ═════════════════════════════════════════
  {
    id: 'bbc_russian',
    name: 'BBC Russian',
    url: 'https://feeds.bbci.co.uk/russian/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ru', logoColor: '#BB1919',
  },
  {
    id: 'dw_ru',
    name: 'DW Russian',
    url: 'https://rss.dw.com/rdf/rss-ru-all',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ru', logoColor: '#006DAB',
  },
  {
    id: 'meduza',
    name: 'Meduza',
    url: 'https://meduza.io/rss/all',
    tier: 2, baseScore: 7,
    categories: ['politics', 'society'],
    language: 'ru', logoColor: '#2A2A2A',
  },

  // ═════════════════════════════════════════
  // 西班牙语 (Español) 媒体
  // ═════════════════════════════════════════
  {
    id: 'bbc_mundo',
    name: 'BBC Mundo',
    url: 'https://feeds.bbci.co.uk/mundo/rss.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'es', logoColor: '#BB1919',
  },
  {
    id: 'elpais',
    name: 'El País',
    url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
    tier: 2, baseScore: 7,
    categories: ['politics', 'economy', 'general'],
    language: 'es', logoColor: '#1A1A1A',
  },
  {
    id: 'france24_es',
    name: 'France 24 ES',
    url: 'https://www.france24.com/es/rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'es', logoColor: '#E8002D',
  },
  {
    id: 'dw_es',
    name: 'DW Spanish',
    url: 'https://rss.dw.com/rdf/rss-sp-all',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'es', logoColor: '#006DAB',
  },

  // ═════════════════════════════════════════
  // 日语 (日本語) 媒体
  // ═════════════════════════════════════════
  {
    id: 'nhk_world',
    name: 'NHK World',
    url: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ja', logoColor: '#0076D1',
  },
  {
    id: 'nhk_economy',
    name: 'NHK Economy',
    url: 'https://www3.nhk.or.jp/rss/news/cat5.xml',
    tier: 2, baseScore: 7,
    categories: ['economy'],
    language: 'ja', logoColor: '#0076D1',
  },
  {
    id: 'yomiuri',
    name: '読売新聞 (Yomiuri)',
    url: 'https://www.yomiuri.co.jp/feed/',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ja', logoColor: '#000000',
  },
  {
    id: 'asahi',
    name: '朝日新聞 (Asahi)',
    url: 'https://rss.asahi.com/rss/asahi/newsheadlines.rdf',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'ja', logoColor: '#003B8E',
  },
  {
    id: 'nikkei',
    name: '日経新聞 (Nikkei)',
    url: 'https://feedx.net/rss/nikkei.xml',
    tier: 1, baseScore: 10,
    categories: ['economy', 'technology'],
    language: 'zh', logoColor: '#003F87',
  },

  // ═════════════════════════════════════════
  // 韩语 (한국어) 媒体
  // ═════════════════════════════════════════
  {
    id: 'yonhap',
    name: 'Yonhap News (韩联社)',
    url: 'https://en.yna.co.kr/RSS/news.xml',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#004A94',
  },
  {
    id: 'chosun',
    name: '朝鮮日報 (Chosun Ilbo)',
    url: 'https://rsshub.app/chosun/sisa-news',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ko', logoColor: '#1A1A1A',
  },
  {
    id: 'joongang',
    name: '中央日報 (JoongAng Ilbo)',
    url: 'https://rsshub.app/joins/news',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'ko', logoColor: '#000080',
  },

  // ═════════════════════════════════════════
  // 香港媒体
  // ═════════════════════════════════════════
  {
    id: 'rthk',
    name: 'RTHK 香港电台',
    url: 'https://rthk.hk/rss/news/clocal.xml',
    tier: 2, baseScore: 7,
    categories: ['politics', 'society'],
    language: 'zh', logoColor: '#8B0000',
    region: 'hk',
  },
  {
    id: 'hk01',
    name: 'HK01',
    url: 'https://rsshub.app/hk01/hot',
    tier: 3, baseScore: 5,
    categories: ['general', 'society'],
    language: 'zh', logoColor: '#E74C3C',
    region: 'hk',
  },
  {
    id: 'mingpao',
    name: '明报',
    url: 'https://rsshub.app/mingpao/pns/s00001',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#1B5E20',
    region: 'hk',
  },
  {
    id: 'singtao',
    name: '星岛日报',
    url: 'https://rsshub.app/singtao/daily/hongkong',
    tier: 3, baseScore: 5,
    categories: ['general', 'society'],
    language: 'zh', logoColor: '#0D47A1',
    region: 'hk',
  },

  // ═════════════════════════════════════════
  // 台湾媒体
  // ═════════════════════════════════════════
  {
    id: 'cna',
    name: '中央通讯社',
    url: 'https://rsshub.app/cna/aall',
    tier: 1, baseScore: 10,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#003B6F',
    region: 'tw',
  },
  {
    id: 'ltn',
    name: '自由时报',
    url: 'https://rsshub.app/ltn/rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#00A651',
    region: 'tw',
  },
  {
    id: 'udn',
    name: '联合报',
    url: 'https://rsshub.app/udn/news/breakingnews/1',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'zh', logoColor: '#333333',
    region: 'tw',
  },
  {
    id: 'chinatimes',
    name: '中时新闻网',
    url: 'https://rsshub.app/chinatimes/realtimenews',
    tier: 3, baseScore: 5,
    categories: ['general', 'society'],
    language: 'zh', logoColor: '#C62828',
    region: 'tw',
  },
  {
    id: 'pts',
    name: '公视新闻',
    url: 'https://rsshub.app/pts/latest',
    tier: 2, baseScore: 7,
    categories: ['politics', 'society'],
    language: 'zh', logoColor: '#1565C0',
    region: 'tw',
  },

  // ═════════════════════════════════════════
  // 英语 - 区域性国际媒体
  // ═════════════════════════════════════════
  {
    id: 'aljazeera_en',
    name: 'Al Jazeera EN',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#F5A623',
  },
  {
    id: 'dw_en',
    name: 'Deutsche Welle EN',
    url: 'https://rss.dw.com/rdf/rss-en-all',
    tier: 3, baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#006DAB',
  },
  {
    id: 'france24_en',
    name: 'France 24 EN',
    url: 'https://www.france24.com/en/rss',
    tier: 3, baseScore: 5,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#E8002D',
  },
  {
    id: 'scmp',
    name: 'South China Morning Post',
    url: 'https://www.scmp.com/rss/4/feed',
    tier: 3, baseScore: 5,
    categories: ['politics', 'economy'],
    language: 'en', logoColor: '#FFCA2D',
  },

  // ── 印度媒体 ──
  {
    id: 'thehindu',
    name: 'The Hindu',
    url: 'https://www.thehindu.com/feeder/default.rss',
    tier: 2, baseScore: 7,
    categories: ['politics', 'society'],
    language: 'en', logoColor: '#003B73',
  },
  {
    id: 'toi',
    name: 'Times of India',
    url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#E42529',
  },
  {
    id: 'ndtv',
    name: 'NDTV',
    url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
    tier: 2, baseScore: 7,
    categories: ['politics', 'general'],
    language: 'en', logoColor: '#E42529',
  },
  {
    id: 'hindustan_times',
    name: 'Hindustan Times',
    url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
    tier: 3, baseScore: 5,
    categories: ['politics', 'society'],
    language: 'en', logoColor: '#004B8D',
  },
];

/**
 * 根据 id 获取单个 RSS 源配置
 */
export function getSourceById(id) {
  return RSS_SOURCES.find((s) => s.id === id);
}

/**
 * 按 tier 获取 RSS 源列表
 */
export function getSourcesByTier(tier) {
  return RSS_SOURCES.filter((s) => s.tier === tier);
}

/**
 * 获取某分类下的所有 RSS 源
 */
export function getSourcesByCategory(category) {
  return RSS_SOURCES.filter((s) => s.categories.includes(category));
}

/**
 * 获取某语言的所有 RSS 源
 */
export function getSourcesByLanguage(language) {
  return RSS_SOURCES.filter((s) => s.language === language);
}

export default RSS_SOURCES;
