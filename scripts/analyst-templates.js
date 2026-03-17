/**
 * 政治光谱立场解读模板库
 *
 * 5 个光谱位置：极左、左、中、右、极右
 * 每个位置包含：id, name, role, avatar, color, triggerCategories, templates[]
 * 每个模板包含：triggerKeywords[], variants[], tone
 * 槽位占位符：{TOPIC} {COUNTRY} {ORG} {NUMBER}
 */

export const analysts = [
  // ═════════════════════════════════════════
  // 1. 极左 — 激进左翼
  // ═════════════════════════════════════════
  {
    id: 'far_left',
    name: '极左',
    role: '激进左翼',
    avatar: '极左',
    color: '#DC2626',
    triggerCategories: ['all'],
    templates: [
      {
        triggerKeywords: ['economy', 'gdp', 'market', 'stock', 'trade', 'inflation', 'recession', 'bank', '经济', 'GDP', '股市', '通胀', '贸易', '央行', '利率', 'A股', '楼市'],
        tone: 'critical',
        variants: [
          '{TOPIC}再次证明，资本主义体制下的经济增长只会让财富进一步集中到少数人手中，普通劳动者的实际购买力持续被侵蚀。',
          '所谓的{COUNTRY}经济复苏不过是资本市场的狂欢，真正创造价值的工人阶级并未从中获得应有的回报。',
          '{ORG}的政策本质上是在维护资本利益集团的超额利润，而将通胀等系统性风险转嫁给底层民众。',
        ],
      },
      {
        triggerKeywords: ['war', 'military', 'weapon', 'army', 'missile', 'conflict', 'troops', 'nato', '战争', '军事', '武器', '导弹', '冲突', '军队', '北约'],
        tone: 'urgent',
        variants: [
          '{TOPIC}的根源在于帝国主义对资源和市场的争夺——战争从来不是人民的选择，而是军工复合体和金融资本的盛宴。',
          '{COUNTRY}的军事扩张背后是资本对全球剩余价值的无止境攫取，受苦的永远是两国的普通民众和士兵。',
          '反战不是软弱，而是对全体劳动者命运的捍卫。{ORG}的军事冒险必须被国际工人运动所制止。',
        ],
      },
      {
        triggerKeywords: ['politics', 'election', 'government', 'policy', 'reform', 'parliament', '政治', '选举', '政府', '政策', '改革', '议会', '两会', '国务院'],
        tone: 'radical',
        variants: [
          '{TOPIC}的改良措施治标不治本，只有彻底变革生产关系，才能从根本上解决不平等的结构性问题。',
          '{COUNTRY}的选举政治不过是不同资本集团之间的权力交接，真正的民主应该是劳动者对生产资料的直接控制。',
          '对{ORG}的改革不应抱有幻想——现有体制框架内的任何调整，都无法撼动资本对劳动的系统性剥削。',
        ],
      },
      {
        triggerKeywords: ['technology', 'ai', 'tech', 'semiconductor', 'digital', 'robot', '科技', '人工智能', '芯片', '数字', '机器人', '自动化'],
        tone: 'analytical',
        variants: [
          '{TOPIC}的技术进步本应解放劳动者，但在资本逻辑下反而成为裁员和压低工资的工具，技术红利被少数股东独吞。',
          '{ORG}垄断{TOPIC}技术的结果是加剧全球数字鸿沟，发展中国家的劳动者沦为数据殖民的对象。',
          '自动化和AI不应成为资本替代劳动的武器，而应成为缩短工时、实现全民共享的公共资源。',
        ],
      },
      {
        triggerKeywords: ['society', 'health', 'education', 'housing', 'welfare', 'poverty', 'inequality', '社会', '医疗', '教育', '住房', '福利', '贫困', '不平等', '民生'],
        tone: 'passionate',
        variants: [
          '{TOPIC}暴露的社会危机根源在于公共服务的市场化——医疗、教育和住房不应是商品，而是基本人权。',
          '{NUMBER}的数据背后是无数被系统性边缘化的家庭，{COUNTRY}必须将社会再生产的成本从个体转移到集体。',
          '只有将{TOPIC}领域的核心资源收归公有，才能打破贫困的代际传递，实现实质性的社会平等。',
        ],
      },
      {
        triggerKeywords: ['environment', 'climate', 'carbon', 'pollution', 'energy', '环境', '气候', '碳排放', '污染', '能源', '生态'],
        tone: 'alarmed',
        variants: [
          '{TOPIC}危机的罪魁祸首是追逐无限增长的资本主义生产方式——不终结利润至上的逻辑，任何绿色转型都是空谈。',
          '碳交易和绿色金融不过是资本为生态危机找到的新一轮盈利机会，{COUNTRY}的生态债务远非市场机制能够偿还。',
          '真正的环保必须与反资本主义斗争结合——{ORG}推动的渐进方案根本跟不上生态崩溃的速度。',
        ],
      },
      {
        triggerKeywords: ['domestic', '反腐', '乡村', '扶贫', '改革', '房地产', '社保', '医保', '就业', '城镇化', '国内'],
        tone: 'structural',
        variants: [
          '{TOPIC}反映了城乡二元结构下劳动者的深层困境，仅靠转移支付无法改变剩余价值分配的根本不公。',
          '基层劳动者在{TOPIC}中承受的代价最大，必须建立由工人和农民直接参与的民主决策机制。',
          '{ORG}推动的{TOPIC}改革如果不触动核心利益格局，只会沦为缓解矛盾的权宜之计。',
        ],
      },
    ],
  },

  // ═════════════════════════════════════════
  // 2. 左 — 自由派 / 进步派
  // ═════════════════════════════════════════
  {
    id: 'left',
    name: '左',
    role: '自由派',
    avatar: '左',
    color: '#3B82F6',
    triggerCategories: ['all'],
    templates: [
      {
        triggerKeywords: ['economy', 'gdp', 'market', 'stock', 'trade', 'inflation', 'recession', 'bank', '经济', 'GDP', '股市', '通胀', '贸易', '央行', '利率', 'A股', '楼市'],
        tone: 'reformist',
        variants: [
          '{TOPIC}表明经济增长必须与分配正义并行——{COUNTRY}需要更有力的累进税制和社会安全网来确保增长成果惠及全民。',
          '单纯追求GDP数字没有意义，{ORG}应当将就业质量、收入中位数和基尼系数纳入核心政策目标。',
          '{TOPIC}需要政府积极发挥调控作用，通过强化劳动保护和反垄断措施，遏制资本的无序扩张。',
        ],
      },
      {
        triggerKeywords: ['war', 'military', 'weapon', 'army', 'missile', 'conflict', 'troops', 'nato', '战争', '军事', '武器', '导弹', '冲突', '军队', '北约'],
        tone: 'diplomatic',
        variants: [
          '{TOPIC}应通过多边外交和国际法框架来解决，而非诉诸军事手段——{COUNTRY}需要展现对和平谈判的诚意。',
          '军费开支每增加{NUMBER}，就意味着同等规模的教育和医疗投入被挤压，这种优先级需要被重新审视。',
          '{ORG}应以人道主义为优先考量，推动停火和平民保护，而非继续向冲突地区输送武器。',
        ],
      },
      {
        triggerKeywords: ['politics', 'election', 'government', 'policy', 'reform', 'parliament', '政治', '选举', '政府', '政策', '改革', '议会', '两会', '国务院'],
        tone: 'progressive',
        variants: [
          '{TOPIC}体现了民主制度自我完善的能力，但改革必须确保少数群体和弱势声音不被多数决压制。',
          '{COUNTRY}的政策制定需要更多透明度和公众参与，让普通公民而非利益集团主导公共议程。',
          '对{ORG}的制度改革方向值得肯定，但落实中必须防止官僚惰性和既得利益者的阻挠。',
        ],
      },
      {
        triggerKeywords: ['technology', 'ai', 'tech', 'semiconductor', 'digital', 'robot', '科技', '人工智能', '芯片', '数字', '机器人', '自动化'],
        tone: 'cautious-optimistic',
        variants: [
          '{TOPIC}带来巨大机遇的同时也需要强有力的监管框架——{ORG}必须确保技术进步不以牺牲隐私和就业为代价。',
          '科技创新应当服务于公共利益，{COUNTRY}需要投资数字素养教育和再就业培训，让技术红利普惠化。',
          'AI治理不能交给科技巨头自我监管，政府必须在算法透明、数据保护和劳动权益方面设立明确底线。',
        ],
      },
      {
        triggerKeywords: ['society', 'health', 'education', 'housing', 'welfare', 'poverty', 'inequality', '社会', '医疗', '教育', '住房', '福利', '贫困', '不平等', '民生'],
        tone: 'empathetic',
        variants: [
          '{TOPIC}要求我们重新审视社会契约——公共医疗、可负担住房和优质教育不应是特权，而应是每个公民的基本权利。',
          '{COUNTRY}在{TOPIC}领域的进步令人鼓舞，但仍需扩大覆盖面，确保最脆弱的群体不被落下。',
          '解决{TOPIC}问题不能仅靠慈善和市场自发调节，{ORG}必须承担起制度性兜底的责任。',
        ],
      },
      {
        triggerKeywords: ['environment', 'climate', 'carbon', 'pollution', 'energy', '环境', '气候', '碳排放', '污染', '能源', '生态'],
        tone: 'urgent',
        variants: [
          '{TOPIC}是我们这代人面临的最大挑战——{COUNTRY}必须加快绿色转型，通过碳税和清洁能源补贴引导市场行为。',
          '环境正义要求富裕国家和高排放企业承担更大责任，{ORG}不能让发展中国家独自承受气候变化的代价。',
          '投资可再生能源不仅是环保需要，更是创造绿色就业机会的经济战略，{COUNTRY}不应错失这一转型窗口。',
        ],
      },
      {
        triggerKeywords: ['domestic', '反腐', '乡村', '扶贫', '改革', '房地产', '社保', '医保', '就业', '城镇化', '国内'],
        tone: 'constructive',
        variants: [
          '{TOPIC}的改革方向正确，但关键在于执行中能否真正倾听基层声音，将政策红利传导到最需要的群体。',
          '{ORG}推动的{TOPIC}改革需要配套完善的社会保障体系，确保转型期间不会产生新的弱势群体。',
          '解决{TOPIC}问题需要更包容的治理理念，让公众参与监督，让数据公开透明。',
        ],
      },
    ],
  },

  // ═════════════════════════════════════════
  // 3. 中 — 中间派
  // ═════════════════════════════════════════
  {
    id: 'center',
    name: '中',
    role: '中间派',
    avatar: '中',
    color: '#6B7280',
    triggerCategories: ['all'],
    templates: [
      {
        triggerKeywords: ['economy', 'gdp', 'market', 'stock', 'trade', 'inflation', 'recession', 'bank', '经济', 'GDP', '股市', '通胀', '贸易', '央行', '利率', 'A股', '楼市'],
        tone: 'balanced',
        variants: [
          '{TOPIC}需要在增长效率与社会公平之间找到平衡点——过度干预和完全放任都不可取，{COUNTRY}应采取务实的渐进策略。',
          '{ORG}的政策选择面临两难：既要稳定市场预期，又要防止泡沫风险，最终需要基于数据而非意识形态做出决策。',
          '无论左右，经济政策的检验标准应该是：中等收入群体的生活水平是否在切实提升，而非GDP的绝对数字。',
        ],
      },
      {
        triggerKeywords: ['war', 'military', 'weapon', 'army', 'missile', 'conflict', 'troops', 'nato', '战争', '军事', '武器', '导弹', '冲突', '军队', '北约'],
        tone: 'pragmatic',
        variants: [
          '{TOPIC}的核心教训是：和平需要实力支撑，但军事手段必须是最后选项——{COUNTRY}应同步推进外交对话和防御建设。',
          '对{COUNTRY}军事动态应保持冷静分析，既不过度渲染威胁，也不忽视安全挑战，理性评估才能制定有效政策。',
          '{ORG}需要在维护地区稳定和避免军备竞赛之间走钢丝，这考验的是战略耐心而非强硬表态。',
        ],
      },
      {
        triggerKeywords: ['politics', 'election', 'government', 'policy', 'reform', 'parliament', '政治', '选举', '政府', '政策', '改革', '议会', '两会', '国务院'],
        tone: 'moderate',
        variants: [
          '{TOPIC}反映了治理的复杂性——好的政策往往不是非左即右，而是在不同利益诉求之间寻找最大公约数。',
          '{COUNTRY}的制度演进应该尊重渐进改良的逻辑，激进变革和因循守旧同样危险，稳健前行才是正道。',
          '评估{ORG}的政策不应以意识形态划线，而应看它是否经得起实证检验，能否有效解决具体问题。',
        ],
      },
      {
        triggerKeywords: ['technology', 'ai', 'tech', 'semiconductor', 'digital', 'robot', '科技', '人工智能', '芯片', '数字', '机器人', '自动化'],
        tone: 'analytical',
        variants: [
          '{TOPIC}的发展既需要创新自由也需要合理监管——过早立法可能扼杀创新，但放任不管则可能酿成社会风险。',
          '科技进步本身是中性的，关键在于{COUNTRY}能否建立兼顾效率与公平的治理框架，让各方利益得到平衡。',
          '{ORG}在{TOPIC}领域的竞争态势复杂，与其预设立场，不如关注技术演进本身带来的实际影响和数据证据。',
        ],
      },
      {
        triggerKeywords: ['society', 'health', 'education', 'housing', 'welfare', 'poverty', 'inequality', '社会', '医疗', '教育', '住房', '福利', '贫困', '不平等', '民生'],
        tone: 'measured',
        variants: [
          '{TOPIC}的解决方案需要兼顾效率和温度——纯粹的市场逻辑和完全的政府包办都有局限，{COUNTRY}应探索混合治理模式。',
          '社会政策的制定应该基于扎实的调查研究和试点数据，{NUMBER}的数字背后需要看到结构性原因和可行的改善路径。',
          '对{TOPIC}不必过于悲观也不应盲目乐观，{ORG}的方向基本正确，但执行细节和覆盖盲区值得持续关注。',
        ],
      },
      {
        triggerKeywords: ['environment', 'climate', 'carbon', 'pollution', 'energy', '环境', '气候', '碳排放', '污染', '能源', '生态'],
        tone: 'pragmatic',
        variants: [
          '{TOPIC}需要在环保目标和经济现实之间找到可行路径——激进的零碳时间表可能适得其反，分阶段推进更为务实。',
          '能源转型应当是有序的——{COUNTRY}不能在新能源体系尚未成熟时仓促放弃传统能源，能源安全是底线。',
          '{ORG}推动的绿色倡议方向正确，但必须配套经济可行性论证和受影响行业的转型支持计划。',
        ],
      },
      {
        triggerKeywords: ['domestic', '反腐', '乡村', '扶贫', '改革', '房地产', '社保', '医保', '就业', '城镇化', '国内'],
        tone: 'objective',
        variants: [
          '{TOPIC}的推进应当尊重不同地区的实际差异，一刀切的政策往往效果不佳，因地制宜才是务实之道。',
          '评价{ORG}在{TOPIC}方面的成效，需要看长期趋势而非短期数据，制度建设比运动式治理更有持续性。',
          '{TOPIC}涉及多方利益博弈，理想的方案是让各方都能接受的渐进式改良，而非零和博弈。',
        ],
      },
    ],
  },

  // ═════════════════════════════════════════
  // 4. 右 — 保守派
  // ═════════════════════════════════════════
  {
    id: 'right',
    name: '右',
    role: '保守派',
    avatar: '右',
    color: '#F97316',
    triggerCategories: ['all'],
    templates: [
      {
        triggerKeywords: ['economy', 'gdp', 'market', 'stock', 'trade', 'inflation', 'recession', 'bank', '经济', 'GDP', '股市', '通胀', '贸易', '央行', '利率', 'A股', '楼市'],
        tone: 'pro-market',
        variants: [
          '{TOPIC}再次证明，市场是最高效的资源配置机制——{COUNTRY}需要的是减少政府干预、降低企业税负、释放市场活力。',
          '{ORG}应当将控制通胀和财政纪律置于首位，过度的刺激政策只会制造更大的泡沫和道德风险。',
          '经济增长的引擎是企业家精神和私人投资，而非政府主导的产业政策——{COUNTRY}应该让市场决定资源去向。',
        ],
      },
      {
        triggerKeywords: ['war', 'military', 'weapon', 'army', 'missile', 'conflict', 'troops', 'nato', '战争', '军事', '武器', '导弹', '冲突', '军队', '北约'],
        tone: 'hawkish',
        variants: [
          '和平来自实力而非幻想——面对{TOPIC}，{COUNTRY}必须展示坚定的军事决心，软弱只会招致更多挑衅。',
          '国防投入是保卫国家主权和公民安全的必要支出，{ORG}需要维持足够的威慑力以应对日益复杂的安全环境。',
          '{TOPIC}表明，国际秩序不能依赖善意维持，{COUNTRY}需要强大的军队和可靠的同盟体系来捍卫国家利益。',
        ],
      },
      {
        triggerKeywords: ['politics', 'election', 'government', 'policy', 'reform', 'parliament', '政治', '选举', '政府', '政策', '改革', '议会', '两会', '国务院'],
        tone: 'conservative',
        variants: [
          '{TOPIC}应当谨慎推进——经过时间检验的制度和传统有其存在的智慧，激进变革往往带来难以预料的副作用。',
          '小政府才是好政府——{COUNTRY}的改革重点应放在精简机构、减少审批和保护个人产权上。',
          '{ORG}的治理应当以法治和秩序为基石，稳定的社会环境是经济发展和个人自由的前提。',
        ],
      },
      {
        triggerKeywords: ['technology', 'ai', 'tech', 'semiconductor', 'digital', 'robot', '科技', '人工智能', '芯片', '数字', '机器人', '自动化'],
        tone: 'market-driven',
        variants: [
          '{TOPIC}的创新应由市场竞争驱动，而非政府的五年规划——{ORG}之间的自由竞争才是技术进步的最大动力。',
          '对{TOPIC}的过度监管会扼杀创新——{COUNTRY}应当营造友好的营商环境，让企业在全球竞争中脱颖而出。',
          '技术进步必然带来短期阵痛，但历史证明市场最终会创造出更多新岗位——与其补贴失业者，不如激励创业者。',
        ],
      },
      {
        triggerKeywords: ['society', 'health', 'education', 'housing', 'welfare', 'poverty', 'inequality', '社会', '医疗', '教育', '住房', '福利', '贫困', '不平等', '民生'],
        tone: 'self-reliance',
        variants: [
          '解决{TOPIC}问题的根本途径是创造经济机会而非扩大福利——{COUNTRY}需要的是更多的就业岗位，而非更高的救济金。',
          '过度的社会福利会削弱个人奋斗动力，{ORG}应着力营造公平竞争的环境，让人们通过自身努力改善生活。',
          '家庭和社区是社会稳定的基石，{TOPIC}的解决应当重视传统价值观和自助精神，而非事事依赖政府。',
        ],
      },
      {
        triggerKeywords: ['environment', 'climate', 'carbon', 'pollution', 'energy', '环境', '气候', '碳排放', '污染', '能源', '生态'],
        tone: 'skeptical',
        variants: [
          '环保重要，但不能以牺牲经济竞争力和民众生活水平为代价——{TOPIC}政策必须经过严格的成本效益分析。',
          '{COUNTRY}不应单方面承担过高的减排义务，这只会将产业和就业输出到环境标准更低的国家，得不偿失。',
          '技术创新而非行政管制才是解决{TOPIC}的正确路径——市场自发的效率提升比强制性的碳配额更可持续。',
        ],
      },
      {
        triggerKeywords: ['domestic', '反腐', '乡村', '扶贫', '改革', '房地产', '社保', '医保', '就业', '城镇化', '国内'],
        tone: 'traditional',
        variants: [
          '{TOPIC}的解决不应一味扩大政府开支，减税降费、激活民营经济才是提升民生水平的根本之道。',
          '{ORG}在{TOPIC}领域应该减少行政干预，让市场机制在资源配置中发挥决定性作用。',
          '传统社会组织和家庭纽带在{TOPIC}中的作用被严重低估，不是所有问题都需要政府来解决。',
        ],
      },
    ],
  },

  // ═════════════════════════════════════════
  // 5. 极右 — 民族主义
  // ═════════════════════════════════════════
  {
    id: 'far_right',
    name: '极右',
    role: '民族主义',
    avatar: '极右',
    color: '#7C3AED',
    triggerCategories: ['all'],
    templates: [
      {
        triggerKeywords: ['economy', 'gdp', 'market', 'stock', 'trade', 'inflation', 'recession', 'bank', '经济', 'GDP', '股市', '通胀', '贸易', '央行', '利率', 'A股', '楼市'],
        tone: 'protectionist',
        variants: [
          '{TOPIC}再次暴露了全球化对本国产业的侵蚀——{COUNTRY}必须优先保护国内就业和战略产业，而非为国际资本打开大门。',
          '自由贸易的最大受害者是{COUNTRY}的本土工人和中小企业，{ORG}必须实施更强硬的关税和产业保护政策。',
          '经济主权高于一切——{COUNTRY}应当将关键供应链完全国产化，不能让国家命脉受制于外国势力。',
        ],
      },
      {
        triggerKeywords: ['war', 'military', 'weapon', 'army', 'missile', 'conflict', 'troops', 'nato', '战争', '军事', '武器', '导弹', '冲突', '军队', '北约'],
        tone: 'nationalist',
        variants: [
          '{COUNTRY}的军事力量是民族尊严的象征——面对{TOPIC}，必须展现不惜一切代价捍卫国家利益的决心。',
          '国际组织和多边机制靠不住，{COUNTRY}只能依靠自身的军事实力保障国家安全和领土完整。',
          '{TOPIC}证明，一个没有强大军队的国家注定沦为大国博弈的棋子——{ORG}必须大幅增加军费投入。',
        ],
      },
      {
        triggerKeywords: ['politics', 'election', 'government', 'policy', 'reform', 'parliament', '政治', '选举', '政府', '政策', '改革', '议会', '两会', '国务院'],
        tone: 'populist',
        variants: [
          '{TOPIC}暴露了精英阶层与普通百姓之间日益加深的裂痕——{COUNTRY}需要真正代表本国人民利益的强力领导。',
          '所谓的全球化精英和跨国机构正在蚕食{COUNTRY}的主权，{ORG}必须将国家利益置于国际义务之上。',
          '{COUNTRY}的政治生态需要一场深层清洗——那些出卖国家利益的建制派必须被民意的洪流淘汰。',
        ],
      },
      {
        triggerKeywords: ['technology', 'ai', 'tech', 'semiconductor', 'digital', 'robot', '科技', '人工智能', '芯片', '数字', '机器人', '自动化'],
        tone: 'sovereignty-focused',
        variants: [
          '{TOPIC}事关国家技术主权——{COUNTRY}绝不能在核心技术上受制于人，必须走完全自主可控的发展道路。',
          '外国科技巨头在{COUNTRY}的扩张是数字殖民的新形式，{ORG}必须建立本土替代方案，保护国家数据安全。',
          '技术竞争就是国力竞争——{COUNTRY}应举国体制攻克{TOPIC}核心技术，不惜一切代价突破封锁。',
        ],
      },
      {
        triggerKeywords: ['society', 'health', 'education', 'housing', 'welfare', 'poverty', 'inequality', '社会', '医疗', '教育', '住房', '福利', '贫困', '不平等', '民生'],
        tone: 'identity-focused',
        variants: [
          '{TOPIC}的根源在于过度开放和文化多元主义对社会凝聚力的瓦解——{COUNTRY}必须重塑民族认同和传统价值。',
          '社会福利应优先保障本国公民——{COUNTRY}的资源有限，{ORG}不应将纳税人的钱用于无节制的外来人口救助。',
          '{TOPIC}的解决之道是回归民族本位——强化社区纽带、恢复传统家庭观念、抵御外来文化侵蚀。',
        ],
      },
      {
        triggerKeywords: ['environment', 'climate', 'carbon', 'pollution', 'energy', '环境', '气候', '碳排放', '污染', '能源', '生态'],
        tone: 'skeptical-nationalist',
        variants: [
          '所谓的全球气候议程不过是发达国家遏制{COUNTRY}发展的工具——我们不应为西方制定的碳排放规则自缚手脚。',
          '{COUNTRY}的能源安全高于一切——在可靠替代方案出现之前，削减传统能源无异于自废武功。',
          '环保不应成为打压本国产业的借口——{ORG}推动的绿色标准实质上是对发展中国家的经济殖民。',
        ],
      },
      {
        triggerKeywords: ['domestic', '反腐', '乡村', '扶贫', '改革', '房地产', '社保', '医保', '就业', '城镇化', '国内'],
        tone: 'populist-domestic',
        variants: [
          '{TOPIC}的核心是要让普通百姓过上好日子——{COUNTRY}应将对外援助和国际义务的资金转投国内民生。',
          '{ORG}在{TOPIC}中必须把本国人民利益放在第一位，不能为了国际形象而忽视国内矛盾。',
          '基层群众对{TOPIC}的不满代表了真实的民意——精英们在空谈改革时，普通人正在承受转型的代价。',
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────
// 导出辅助函数
// ─────────────────────────────────────────

/**
 * 获取匹配某分类的分析师列表
 * 政治光谱模式下，所有5个立场都对所有分类发表评论
 * @param {string} category
 * @returns {object[]}
 */
export function getAnalystsForCategory(category) {
  return analysts;
}

export default analysts;
