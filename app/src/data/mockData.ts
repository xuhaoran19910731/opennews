import type { NewsItem, Analyst, Topic, AnalystRanking, PoliticalStance } from '@/types';

// 7个分析师角色定义
export const analysts: Analyst[] = [
  {
    id: '1',
    name: '王建国',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang&backgroundColor=b91c1c',
    stance: 'far-right',
    title: '保守派经济学家',
    description: '强调市场自由，反对政府过度干预'
  },
  {
    id: '2',
    name: '李明智',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li&backgroundColor=dc2626',
    stance: 'right',
    title: '金融分析师',
    description: '自由市场支持者，关注企业利益'
  },
  {
    id: '3',
    name: '张伟',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang&backgroundColor=f97316',
    stance: 'center-right',
    title: '政策研究员',
    description: '温和保守，注重传统价值观'
  },
  {
    id: '4',
    name: '陈平',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen&backgroundColor=8b5cf6',
    stance: 'center',
    title: '独立评论员',
    description: '中立分析师，追求平衡观点'
  },
  {
    id: '5',
    name: '刘思远',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu&backgroundColor=3b82f6',
    stance: 'center-left',
    title: '社会学者',
    description: '温和进步，关注社会公平'
  },
  {
    id: '6',
    name: '赵晓燕',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao&backgroundColor=0ea5e9',
    stance: 'left',
    title: '公共政策专家',
    description: '自由派，强调社会福利'
  },
  {
    id: '7',
    name: '孙文清',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sun&backgroundColor=06b6d4',
    stance: 'far-left',
    title: '政治评论员',
    description: '激进改革派，主张结构性变革'
  }
];

// 立场颜色映射
export const stanceColors: Record<PoliticalStance, string> = {
  'far-right': '#dc2626',
  'right': '#ef4444',
  'center-right': '#f97316',
  'center': '#8b5cf6',
  'center-left': '#3b82f6',
  'left': '#0ea5e9',
  'far-left': '#06b6d4'
};

// 立场中文名称
export const stanceNames: Record<PoliticalStance, string> = {
  'far-right': '极右',
  'right': '右',
  'center-right': '中右',
  'center': '中',
  'center-left': '中左',
  'left': '左',
  'far-left': '极左'
};

// 模拟新闻数据
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '美联储宣布维持利率不变，市场反应积极',
    summary: '美联储在最新货币政策会议上决定维持基准利率在5.25%-5.50%区间不变，符合市场预期。美联储主席鲍威尔表示，通胀数据持续改善，但仍需更多证据确认通胀稳定回落。',
    source: {
      id: 'reuters',
      name: '路透社',
      type: 'international'
    },
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    weight: 94.5,
    weightBreakdown: {
      timeliness: 95,
      importance: 98,
      spread: 90
    },
    tags: ['美联储', '利率', '货币政策', '通胀'],
    analystComments: [
      {
        id: 'a1',
        analystId: '1',
        analyst: analysts[0],
        content: '美联储的决定符合预期，但市场不应过于乐观。通胀压力仍然存在，过早降息可能引发新一轮通胀。建议关注核心PCE数据的变化。',
        likes: 342,
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a2',
        analystId: '2',
        analyst: analysts[1],
        content: '从市场反应来看，投资者对美联储的耐心表示认可。科技股和金融股都有不错的表现，说明市场对软着陆的信心增强。',
        likes: 256,
        createdAt: new Date(Date.now() - 1.2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a3',
        analystId: '4',
        analyst: analysts[3],
        content: '鲍威尔的讲话释放了谨慎但积极的信号。美联储正在平衡通胀控制和经济增长，这种渐进式的方法有助于市场稳定。',
        likes: 189,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a4',
        analystId: '6',
        analyst: analysts[5],
        content: '高利率环境对中小企业和普通家庭的压力不容忽视。虽然通胀在回落，但就业市场也开始出现疲态，美联储需要更灵活地应对。',
        likes: 278,
        createdAt: new Date(Date.now() - 0.8 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [
      {
        id: 'u1',
        userId: 'user1',
        username: '投资者小王',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
        content: '终于等到这个结果了，我的科技股今天涨了不少！',
        likes: 45,
        replies: [],
        createdAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString()
      }
    ],
    userCommentCount: 128
  },
  {
    id: '2',
    title: '中国新能源汽车出口量创历史新高，全球市场占比持续提升',
    summary: '据海关总署数据，2024年上半年中国新能源汽车出口量达到120万辆，同比增长35%，在全球新能源汽车市场的份额提升至65%。',
    source: {
      id: 'xinhua',
      name: '新华社',
      type: 'domestic'
    },
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    weight: 88.2,
    weightBreakdown: {
      timeliness: 85,
      importance: 90,
      spread: 89
    },
    tags: ['新能源汽车', '出口', '制造业', '贸易'],
    analystComments: [
      {
        id: 'a5',
        analystId: '3',
        analyst: analysts[2],
        content: '中国新能源汽车的成功不是偶然的，而是产业链完整、技术创新和规模效应共同作用的结果。传统汽车强国需要认真对待这一挑战。',
        likes: 412,
        createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a6',
        analystId: '5',
        analyst: analysts[4],
        content: '这是中国制造向中国创造转型的典型案例。但在欢欣鼓舞的同时，也要关注海外市场的贸易保护主义倾向。',
        likes: 298,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a7',
        analystId: '7',
        analyst: analysts[6],
        content: '数据背后是普通工人的辛勤付出。我们应该关注产业工人的待遇和权益，让发展成果惠及更多人。',
        likes: 356,
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [],
    userCommentCount: 89
  },
  {
    id: '3',
    title: '欧盟通过人工智能法案，全球AI监管进入新阶段',
    summary: '欧盟议会正式通过《人工智能法案》，这是全球首部全面规范AI发展的法律。法案将AI系统按风险等级分类管理，对高风险AI应用设定严格要求。',
    source: {
      id: 'bbc',
      name: 'BBC',
      type: 'international'
    },
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    weight: 91.8,
    weightBreakdown: {
      timeliness: 88,
      importance: 95,
      spread: 92
    },
    tags: ['人工智能', '欧盟', '监管', '科技政策'],
    analystComments: [
      {
        id: 'a8',
        analystId: '2',
        analyst: analysts[1],
        content: '欧盟再次在科技监管方面走在前列。虽然这会增加合规成本，但长期来看有助于建立用户信任，促进AI健康发展。',
        likes: 267,
        createdAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a9',
        analystId: '4',
        analyst: analysts[3],
        content: '这部法案的通过标志着AI发展从野蛮生长进入规范发展阶段。其他国家很可能会跟进，形成全球性的AI治理框架。',
        likes: 324,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a10',
        analystId: '6',
        analyst: analysts[5],
        content: '法案对AI在就业、隐私等方面的影响给予了足够重视。特别是关于算法透明度的要求，有助于防止AI歧视和滥用。',
        likes: 289,
        createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [],
    userCommentCount: 156
  },
  {
    id: '4',
    title: '国内消费复苏势头强劲，暑期旅游预订量同比增长40%',
    summary: '随着经济复苏和居民信心恢复，国内消费市场呈现强劲增长态势。各大旅游平台数据显示，暑期旅游预订量同比增长40%，超出市场预期。',
    source: {
      id: 'caijing',
      name: '财经网',
      type: 'domestic'
    },
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    weight: 76.5,
    weightBreakdown: {
      timeliness: 75,
      importance: 78,
      spread: 76
    },
    tags: ['消费', '旅游', '经济复苏', '内需'],
    analystComments: [
      {
        id: 'a11',
        analystId: '3',
        analyst: analysts[2],
        content: '消费复苏是经济企稳的重要信号。但需要注意这种增长是否具有持续性，以及不同收入群体的消费分化问题。',
        likes: 198,
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a12',
        analystId: '5',
        analyst: analysts[4],
        content: '旅游消费的增长说明人们对未来收入预期有所改善。建议进一步出台支持消费的政策，巩固复苏势头。',
        likes: 245,
        createdAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [],
    userCommentCount: 67
  },
  {
    id: '5',
    title: 'OpenAI发布GPT-5，多模态能力实现重大突破',
    summary: 'OpenAI正式发布GPT-5模型，在文本、图像、音频和视频理解方面都有显著提升。新模型支持实时语音对话和视频分析，被认为是AGI发展的重要里程碑。',
    source: {
      id: 'techcrunch',
      name: 'TechCrunch',
      type: 'international'
    },
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    weight: 96.3,
    weightBreakdown: {
      timeliness: 92,
      importance: 99,
      spread: 97
    },
    tags: ['OpenAI', 'GPT-5', '人工智能', 'AGI'],
    analystComments: [
      {
        id: 'a13',
        analystId: '1',
        analyst: analysts[0],
        content: '技术进步令人瞩目，但我们必须警惕AI对就业市场的冲击。政府应该提前规划，为可能的结构性失业做好准备。',
        likes: 378,
        createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a14',
        analystId: '4',
        analyst: analysts[3],
        content: 'GPT-5的发布标志着人机交互进入新时代。多模态能力的突破将开启无数新的应用场景，从教育到医疗都将被深刻改变。',
        likes: 456,
        createdAt: new Date(Date.now() - 10.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a15',
        analystId: '7',
        analyst: analysts[6],
        content: '技术发展不能以牺牲隐私和安全为代价。GPT-5如此强大的能力，如果被滥用后果不堪设想。我们需要更严格的监管。',
        likes: 312,
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [],
    userCommentCount: 234
  },
  {
    id: '6',
    title: '房地产市场政策优化，多地取消限购措施',
    summary: '为进一步稳定房地产市场，多个城市宣布取消或优化住房限购政策。业内专家认为，这将有助于释放刚需和改善性需求，促进市场回暖。',
    source: {
      id: '21cbh',
      name: '21世纪经济报道',
      type: 'domestic'
    },
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    weight: 82.1,
    weightBreakdown: {
      timeliness: 80,
      importance: 85,
      spread: 81
    },
    tags: ['房地产', '限购', '政策', '楼市'],
    analystComments: [
      {
        id: 'a16',
        analystId: '2',
        analyst: analysts[1],
        content: '政策调整是必要的，但效果有待观察。房地产市场的根本问题在于居民收入预期和人口结构变化，单纯放开限购难以扭转趋势。',
        likes: 289,
        createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a17',
        analystId: '5',
        analyst: analysts[4],
        content: '取消限购有助于满足合理的住房需求，但也要防止投机炒作卷土重来。建议配合房产税等政策，建立长效机制。',
        likes: 334,
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
      }
    ],
    userComments: [],
    userCommentCount: 178
  }
];

// 热门话题
export const hotTopics: Topic[] = [
  { id: '1', name: '美联储利率决议', count: 2341, trend: 'up' },
  { id: '2', name: '人工智能监管', count: 1856, trend: 'up' },
  { id: '3', name: '新能源汽车', count: 1623, trend: 'stable' },
  { id: '4', name: '房地产市场', count: 1456, trend: 'down' },
  { id: '5', name: 'GPT-5发布', count: 1234, trend: 'up' }
];

// 分析师排行
export const analystRankings: AnalystRanking[] = [
  { analyst: analysts[3], commentCount: 45, likesReceived: 3240 },
  { analyst: analysts[0], commentCount: 38, likesReceived: 2890 },
  { analyst: analysts[5], commentCount: 42, likesReceived: 2650 },
  { analyst: analysts[1], commentCount: 35, likesReceived: 2180 },
  { analyst: analysts[4], commentCount: 40, likesReceived: 1950 }
];

// 来源分布
export const sourceDistribution = [
  { name: '国际财经', value: 35, color: '#3b82f6' },
  { name: '国内财经', value: 28, color: '#0ea5e9' },
  { name: '科技', value: 20, color: '#8b5cf6' },
  { name: '政策', value: 12, color: '#f97316' },
  { name: '社会', value: 5, color: '#10b981' }
];
