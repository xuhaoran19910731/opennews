/**
 * 虚拟分析师角色定义 & 评论模板库
 *
 * 每个分析师包含：id, name, role, avatar, color, triggerCategories, templates[]
 * 每个模板包含：triggerKeywords[], variants[], tone
 * 槽位占位符：{TOPIC} {COUNTRY} {ORG} {NUMBER}
 */

export const analysts = [
  // ─────────────────────────────────────────
  // 1. 李明 — 财经分析师
  // ─────────────────────────────────────────
  {
    id: 'li_ming',
    name: '李明',
    role: '财经分析师',
    avatar: 'LM',
    color: '#3B82F6',
    triggerCategories: ['economy', 'tech'],
    templates: [
      {
        triggerKeywords: ['inflation', 'cpi', '通胀', '通货膨胀', 'price'],
        tone: 'analytical',
        variants: [
          '此次{COUNTRY}通胀数据的走向，将直接影响{ORG}的利率决策节奏，投资者需警惕短端收益率的波动风险。',
          '通胀压力的持续，意味着{ORG}收紧货币政策的窗口仍然开放。{COUNTRY}消费市场的韧性值得持续跟踪。',
          '{TOPIC}背景下通胀数据超预期，预计市场将重新定价未来{NUMBER}个月内的降息预期。',
        ],
      },
      {
        triggerKeywords: ['interest rate', 'federal reserve', 'central bank', '利率', '央行', '美联储'],
        tone: 'authoritative',
        variants: [
          '{ORG}此番政策信号明确，短期内市场流动性将维持偏紧格局，成长股估值面临重估压力。',
          '从历史规律看，{ORG}每次转向前都有{NUMBER}至{NUMBER}次的预期铺垫，当前节奏与以往高度吻合。',
          '全球主要央行政策分化加剧，{COUNTRY}资本市场承压，汇率波动或将成为下一个风险点。',
          '{ORG}加息周期接近尾声的信号释放，有助于修复风险资产估值，但"更高更久"的叙事尚未结束。',
        ],
      },
      {
        triggerKeywords: ['gdp', 'growth', 'recession', '经济增长', '衰退', 'economy'],
        tone: 'cautious',
        variants: [
          '{COUNTRY}GDP数据低于预期，软着陆叙事受到挑战。接下来的就业数据将是关键验证窗口。',
          '当前宏观数据呈现出"外冷内暖"的分化格局，{COUNTRY}经济的结构性韧性依然存在，但下行风险不可忽视。',
          '若{TOPIC}持续演化，{NUMBER}%的经济增长预测可能面临下修，建议关注防御性资产配置机会。',
        ],
      },
      {
        triggerKeywords: ['trade', 'tariff', 'export', 'import', '贸易', '关税', '出口'],
        tone: 'analytical',
        variants: [
          '{COUNTRY}对{ORG}加征关税的举措，将进一步重塑全球供应链版图，亚洲制造业替代效应值得关注。',
          '贸易摩擦升级背景下，{TOPIC}相关供应链企业的盈利能见度下降，建议审慎看待估值溢价。',
          '若{COUNTRY}关税措施落地，短期内进口通胀压力将向消费端传导，幅度预计在{NUMBER}%左右。',
        ],
      },
      {
        triggerKeywords: ['ipo', 'merger', 'acquisition', 'stock', '上市', '并购', '股市'],
        tone: 'optimistic',
        variants: [
          '{ORG}此次并购彰显了{TOPIC}领域的战略价值，溢价率{NUMBER}%在行业横向对比中属于合理区间。',
          '当前IPO窗口期收窄，优质标的的估值回归理性，对长线投资者而言反而是入场良机。',
          '资本市场对{TOPIC}的热度，折射出机构资金在新一轮产业周期中的早期布局逻辑。',
          '{COUNTRY}股市在{TOPIC}消息刺激下的反应，表明市场对政策预期仍然高度敏感。',
        ],
      },
      {
        triggerKeywords: ['oil', 'energy', 'opec', '石油', '能源', '油价', 'fuel'],
        tone: 'analytical',
        variants: [
          '{ORG}减产协议的延续，将在未来{NUMBER}个季度内维持能源价格的中枢上移。',
          '油价波动对{COUNTRY}贸易条件的影响是双向的，能源净进口国将首先感受到输入性通胀压力。',
          '{TOPIC}事件推升能源价格，航运和化工板块的成本端压力需纳入投资决策框架。',
        ],
      },
      {
        triggerKeywords: ['cryptocurrency', 'bitcoin', 'digital currency', '比特币', '加密货币', 'crypto'],
        tone: 'cautious',
        variants: [
          '{TOPIC}再度引发市场对监管落地时间线的讨论，加密资产的短期波动率将维持高位。',
          '机构资金对{TOPIC}的态度分化，折射出数字资产在传统投资组合中定位的本质分歧尚未解决。',
          '比特币在{NUMBER}美元关口的攻防，背后是宏观流动性预期与避险情绪的博弈。',
        ],
      },
      {
        triggerKeywords: ['semiconductor', 'chip', 'supply chain', '芯片', '半导体', '供应链'],
        tone: 'strategic',
        variants: [
          '半导体供应链的地缘政治化趋势不可逆，{COUNTRY}本土化产能建设将在未来{NUMBER}年内持续获得政策支撑。',
          '{ORG}在{TOPIC}方向的资本开支扩张，预示着新一轮科技产业周期的启动信号正在形成。',
          '芯片产能的区域再平衡，将深刻改变全球电子制造业的成本结构与定价权分布。',
        ],
      },
      {
        triggerKeywords: ['unemployment', 'jobs', 'labor', '失业', '就业', '劳动力'],
        tone: 'analytical',
        variants: [
          '{COUNTRY}就业市场的韧性超出预期，这为{ORG}维持偏紧货币政策提供了空间。',
          '劳动力市场的降温是{ORG}期待看到的软着陆迹象，但{NUMBER}万的新增就业仍高于趋势水平。',
          '工资增速黏性是当前通胀最顽固的分项，{COUNTRY}劳动力市场结构性变化将制约降息节奏。',
        ],
      },
      {
        triggerKeywords: ['budget', 'deficit', 'debt', 'fiscal', '预算', '赤字', '债务', '财政'],
        tone: 'cautious',
        variants: [
          '{COUNTRY}财政赤字扩张路径若持续，主权信用评级面临下调压力，长端利率或将被动上行。',
          '债务上限谈判的不确定性是市场的尾部风险，短期内{ORG}相关资产的避险溢价将有所体现。',
          '财政政策与货币政策的合力方向，将在未来{NUMBER}个季度内决定{COUNTRY}经济的复苏斜率。',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2. 张伟 — 地缘政治分析师
  // ─────────────────────────────────────────
  {
    id: 'zhang_wei',
    name: '张伟',
    role: '地缘政治分析师',
    avatar: 'ZW',
    color: '#8B5CF6',
    triggerCategories: ['politics', 'military'],
    templates: [
      {
        triggerKeywords: ['election', 'vote', '选举', '投票', '大选'],
        tone: 'insightful',
        variants: [
          '{COUNTRY}此次选举结果将重塑{TOPIC}的政策走向，执政党能否兑现经济承诺是未来执政合法性的核心变量。',
          '选举结果的不确定性折射出{COUNTRY}社会内部的深层撕裂，后选举时期的政策连续性值得观察。',
          '{TOPIC}选举释放出明确的民粹主义信号，这一趋势对{ORG}的多边合作框架构成系统性挑战。',
        ],
      },
      {
        triggerKeywords: ['sanction', 'sanctions', '制裁', 'embargo', 'ban'],
        tone: 'authoritative',
        variants: [
          '{ORG}对{COUNTRY}实施新一轮制裁，短期内将加剧双边经济脱钩，但制裁的长期有效性历来存在争议。',
          '制裁工具的滥用正在推动{COUNTRY}加速推进去美元化布局，这一战略转向的影响将是深远的。',
          '{TOPIC}制裁方案的精准程度，折射出{ORG}在平衡盟友利益与战略目标方面的困境。',
          '历史经验表明，单边制裁在缺乏多边协调的情况下，往往难以产生预期的政治压力效果。',
        ],
      },
      {
        triggerKeywords: ['summit', 'diplomatic', 'treaty', 'agreement', '峰会', '外交', '条约', '协议'],
        tone: 'diplomatic',
        variants: [
          '{COUNTRY}与{ORG}峰会的实质性成果，将为地区局势降温提供外交缓冲期，但结构性矛盾仍待化解。',
          '此次外交接触的时间节点耐人寻味，双方都有意在关键议题上留有余地，真正的博弈在幕后。',
          '{TOPIC}协议的签署标志着双边关系正常化迈出关键一步，但执行层面的细节分歧或将引发后续摩擦。',
        ],
      },
      {
        triggerKeywords: ['nato', 'alliance', 'security', '北约', '联盟', '安全'],
        tone: 'strategic',
        variants: [
          '{ORG}在{TOPIC}上的集体表态，强化了盟友间的战略协调，但内部的能力差异仍将制约实际行动能力。',
          '安全架构的重塑是一个长期进程，{COUNTRY}的加入将深刻改变地区安全博弈的力量对比。',
          '{TOPIC}再次验证了集体安全机制在应对非传统威胁时的内在局限性。',
          '盟友扩大的战略价值，需要与由此带来的战略纵深收缩风险相互权衡。',
        ],
      },
      {
        triggerKeywords: ['coup', 'protest', 'opposition', 'democracy', '政变', '抗议', '民主', '反对派'],
        tone: 'analytical',
        variants: [
          '{COUNTRY}政治动荡的根源在于长期积累的治理赤字，单纯的政权更迭难以从根本上化解社会矛盾。',
          '此次{TOPIC}的规模与持续性，表明现执政当局的合法性基础已发生明显侵蚀。',
          '{ORG}对{COUNTRY}局势的暧昧态度，折射出其在干涉与不干涉之间的战略困境。',
        ],
      },
      {
        triggerKeywords: ['china', 'us', 'russia', 'ukraine', 'taiwan', '中国', '美国', '俄罗斯', '乌克兰', '台湾'],
        tone: 'geopolitical',
        variants: [
          '{COUNTRY}在{TOPIC}上的战略意图越来越清晰，大国博弈的焦点已从意识形态转向规则与标准之争。',
          '此次{TOPIC}事件是大国战略竞争格局下的一个缩影，任何单一事件都难以孤立解读。',
          '{COUNTRY}与{ORG}的结构性矛盾在{TOPIC}上再次浮出水面，短期管控有助于防止误判，但根本分歧依然存在。',
          '大国关系的稳定需要双方都具备战略克制，当前信号表明这一共识正面临空前压力。',
        ],
      },
      {
        triggerKeywords: ['immigration', 'refugee', 'border', '移民', '难民', '边境'],
        tone: 'empathetic',
        variants: [
          '{COUNTRY}边境危机的人道主义维度，正在与国家安全考量形成复杂的政策张力。',
          '{NUMBER}万难民的涌入，将对{COUNTRY}社会凝聚力和福利体系构成多维度压力测试。',
          '{TOPIC}折射出国际难民保护机制在应对大规模人口流动时的系统性不足。',
        ],
      },
      {
        triggerKeywords: ['sovereignty', 'territorial', 'independence', '主权', '领土', '独立'],
        tone: 'authoritative',
        variants: [
          '{COUNTRY}领土主张的背后，是国内政治合法性需求与国际规范之间的持续角力。',
          '领土问题的历史遗产难以在短期内化解，任何试图以武力单方面改变现状的举动都将付出高昂代价。',
          '{TOPIC}的走向将检验{ORG}是否有意愿维护以规则为基础的国际秩序。',
        ],
      },
      {
        triggerKeywords: ['united nations', 'un', 'security council', '联合国', '安理会', '国际社会'],
        tone: 'critical',
        variants: [
          '{ORG}在{TOPIC}上的分裂，再次暴露了多边主义在大国博弈面前的脆弱性。',
          '安理会的否决权机制在{TOPIC}上形成僵局，这并非制度失效，而是大国政治现实的如实映射。',
          '国际社会的呼吁缺乏强制力支撑，若无实质行动跟进，只会进一步消耗{ORG}的公信力。',
        ],
      },
      {
        triggerKeywords: ['espionage', 'intelligence', 'spy', 'surveillance', '间谍', '情报', '监控', '网络间谍'],
        tone: 'measured',
        variants: [
          '情报战的升温是大国战略竞争的常态延伸，此次{TOPIC}的公开化处理本身即是一种外交信号。',
          '{COUNTRY}对{ORG}情报渗透指控的公开，折射出双边信任赤字已下降至新的低点。',
          '网络空间的主权博弈日趋激烈，{TOPIC}为相关国家加速推进数字主权立法提供了新的动因。',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3. 陈静 — 科技分析师
  // ─────────────────────────────────────────
  {
    id: 'chen_jing',
    name: '陈静',
    role: '科技分析师',
    avatar: 'CJ',
    color: '#06B6D4',
    triggerCategories: ['tech', 'economy'],
    templates: [
      {
        triggerKeywords: ['artificial intelligence', 'ai', 'machine learning', '人工智能', 'AI', '机器学习'],
        tone: 'excited',
        variants: [
          '{ORG}在{TOPIC}方向的突破，标志着大模型能力边界的再次扩展，行业格局或将因此重塑。',
          'AI技术的迭代速度已超出大多数监管框架的设计预设，{COUNTRY}如何在创新与治理之间找到平衡是核心命题。',
          '{TOPIC}的落地应用展示了AI从实验室走向产业化的加速路径，但数据与算力的门槛依然高企。',
          'AI能力的跃升正在倒逼各行业的商业模式重构，率先完成认知升级的企业将获得不对称竞争优势。',
        ],
      },
      {
        triggerKeywords: ['semiconductor', 'chip', 'nvidia', 'tsmc', '芯片', '半导体', '台积电'],
        tone: 'strategic',
        variants: [
          '{ORG}最新一代芯片的性能指标，将重新定义AI训练集群的算力天花板，同时也拉高了竞争者的入场门槛。',
          '半导体产业链的地缘政治化已从供应链风险演变为技术主权竞争，{COUNTRY}的本土化路径选择至关重要。',
          '{NUMBER}nm制程的突破，对{ORG}巩固其工艺技术领先地位具有重要战略意义。',
        ],
      },
      {
        triggerKeywords: ['cybersecurity', 'hacking', 'data breach', 'cyberattack', '网络安全', '黑客', '数据泄露'],
        tone: 'cautious',
        variants: [
          '此次{TOPIC}暴露了关键基础设施在网络威胁面前的系统性脆弱点，零信任架构的推广已刻不容缓。',
          '{ORG}遭受大规模数据泄露，涉及{NUMBER}条用户记录，折射出企业数据治理与安全投入之间的结构性失衡。',
          '国家级网络攻击的归因难题，持续制约着国际社会建立有效网络空间规则的努力。',
        ],
      },
      {
        triggerKeywords: ['space', 'satellite', 'rocket', 'launch', '太空', '卫星', '火箭', '发射'],
        tone: 'enthusiastic',
        variants: [
          '{ORG}本次发射任务成功，标志着商业航天进入规模化降本的新阶段，低轨卫星互联网的全球覆盖进程加速。',
          '太空经济的竞争已从国家项目演变为多主体博弈，{COUNTRY}的政策激励机制将决定本土企业的竞争起点。',
          '{TOPIC}的技术验证，为深空探测的下一步布局铺垫了关键节点。',
        ],
      },
      {
        triggerKeywords: ['social media', 'platform', 'regulation', 'antitrust', '社交媒体', '平台', '监管', '反垄断'],
        tone: 'critical',
        variants: [
          '{ORG}面临的反垄断调查，折射出超大型平台在创新激励与市场竞争之间日益突出的结构性张力。',
          '平台经济的监管趋严是全球性趋势，{COUNTRY}的立法进展将对{ORG}的商业模式产生深远影响。',
          '算法推荐机制的社会影响已远超平台的技术边界，相关治理框架的建立迫在眉睫。',
        ],
      },
      {
        triggerKeywords: ['quantum', 'computing', '量子', '量子计算'],
        tone: 'forward-looking',
        variants: [
          '量子计算的突破将对现有加密体系构成根本性挑战，各国在后量子密码学标准上的竞争正在白热化。',
          '{ORG}量子处理器{NUMBER}量子比特的里程碑，让商用量子计算的时间线提前进入现实讨论范畴。',
          '{TOPIC}领域的技术竞争，本质上是下一代算力主权的争夺，战略意义远超短期商业价值。',
        ],
      },
      {
        triggerKeywords: ['electric vehicle', 'ev', 'tesla', 'battery', '电动汽车', '新能源汽车', '电池'],
        tone: 'analytical',
        variants: [
          '{ORG}最新电池技术指标的披露，将对整个新能源产业链的定价逻辑产生连锁影响。',
          '{COUNTRY}新能源汽车市场的竞争格局正在从技术领先转向规模效应与品牌力的综合较量。',
          '固态电池技术的商业化进程将是重塑{TOPIC}产业价值链分配的关键变量。',
        ],
      },
      {
        triggerKeywords: ['biotech', 'gene', 'drug', 'vaccine', 'pharmaceutical', '生物技术', '基因', '药物', '制药'],
        tone: 'scientific',
        variants: [
          '{ORG}的{TOPIC}临床试验数据，将为该适应症的治疗方案带来新的循证依据，市场前景值得期待。',
          '基因编辑技术的监管框架尚不完善，{COUNTRY}在推动{TOPIC}产业化的同时，伦理边界的划定同样关键。',
          '生物科技领域的研发周期长、风险高，但{TOPIC}方向的突破有望为患者带来根本性的治疗范式转变。',
        ],
      },
      {
        triggerKeywords: ['cloud', 'data center', 'aws', 'azure', '云计算', '数据中心', '算力'],
        tone: 'analytical',
        variants: [
          '{ORG}大规模数据中心的布局，折射出AI算力军备竞赛的资本密集度已进入全新量级。',
          '云计算基础设施的地缘政治化趋势，将深刻改变跨国数据流通的合规成本结构。',
          '{COUNTRY}算力基础设施的战略投资，是数字经济竞争力的重要底座，其回报周期将以十年计。',
        ],
      },
      {
        triggerKeywords: ['startup', 'venture', 'funding', 'unicorn', '创业', '融资', '独角兽', '风投'],
        tone: 'optimistic',
        variants: [
          '{ORG}完成{NUMBER}亿融资，估值的上调反映了资本市场对{TOPIC}赛道长期成长逻辑的认可。',
          '在宏观流动性收紧的背景下，{TOPIC}领域仍能吸引优质资本，这本身就是一个强烈的产业信号。',
          '独角兽企业的估值回调是健康的市场出清，为真正具备商业价值的项目提供了更合理的定价基准。',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4. 王芳 — 社会评论员
  // ─────────────────────────────────────────
  {
    id: 'wang_fang',
    name: '王芳',
    role: '社会评论员',
    avatar: 'WF',
    color: '#EC4899',
    triggerCategories: ['society', 'environment', 'politics'],
    templates: [
      {
        triggerKeywords: ['climate', 'global warming', 'carbon', '气候', '全球变暖', '碳排放'],
        tone: 'urgent',
        variants: [
          '{TOPIC}再次提醒我们，气候承诺与实际政策行动之间的鸿沟，需要的不是更多宣言，而是可核查的执行机制。',
          '{COUNTRY}的碳减排路径能否兑现，不仅取决于技术与资本，更取决于政治意愿在选举周期内的连贯性。',
          '极端气候事件的高频化，是大自然对人类治理失灵最直白的反馈，而{ORG}的响应速度远落后于科学预警。',
        ],
      },
      {
        triggerKeywords: ['human rights', 'freedom', 'civil rights', '人权', '自由', '公民权利'],
        tone: 'passionate',
        variants: [
          '{COUNTRY}在{TOPIC}上的立场，再次引发国际社会对其人权承诺兑现能力的质疑。',
          '人权不是西方专利，也不是国家主权可以随意遮蔽的议题，{TOPIC}中受难者的声音理应被听见。',
          '{ORG}发布的{TOPIC}报告，为国际社会施压提供了新的依据，但施压本身需要配套问责机制才有意义。',
        ],
      },
      {
        triggerKeywords: ['poverty', 'inequality', 'hunger', '贫困', '不平等', '饥饿'],
        tone: 'compassionate',
        variants: [
          '{NUMBER}亿人仍生活在极端贫困线以下，全球化的收益分配从未如其倡导者描述的那般公平。',
          '{COUNTRY}在{TOPIC}问题上的政策滞后，折射出政治精英与底层民众在认知与利益上的结构性断裂。',
          '减贫不仅是道德使命，也是社会稳定的基础设施，忽视这一点的政策迟早将以其他社会代价偿还。',
        ],
      },
      {
        triggerKeywords: ['protest', 'demonstration', 'riot', 'strike', '抗议', '示威', '罢工', '骚乱'],
        tone: 'empathetic',
        variants: [
          '走上街头的人们不是在制造混乱，而是在体制内渠道失灵后发出的最后一声呼喊。',
          '{COUNTRY}此次大规模抗议折射出长期积累的社会怨气，政府若仅以维稳视之而非倾听诉求，将错失治理窗口。',
          '{TOPIC}引发的社会动荡，需要理解其深层成因，而非简单地将参与者标签化。',
        ],
      },
      {
        triggerKeywords: ['health', 'pandemic', 'disease', 'hospital', '健康', '疫情', '医疗', '医院'],
        tone: 'concerned',
        variants: [
          '{COUNTRY}医疗体系在{TOPIC}压力下的应对表现，是衡量一个社会公共卫生承诺的最真实镜子。',
          '公共卫生危机的应对往往暴露出平时看不见的社会裂缝，{TOPIC}也不例外。',
          '{NUMBER}例死亡背后，是每一个具体的家庭和故事，政策决策者不应让这个数字沦为纯粹的统计数据。',
        ],
      },
      {
        triggerKeywords: ['education', 'school', 'university', 'student', '教育', '学校', '大学', '学生'],
        tone: 'hopeful',
        variants: [
          '教育机会的不平等是所有不平等中最难以被接受的一种，它在出生的那一刻就开始累积。',
          '{COUNTRY}对{TOPIC}的教育投入，将在未来{NUMBER}年以人力资本的方式得到回报，但前提是投入必须到达真正需要的地方。',
          '当年轻人开始用脚投票选择离开，{COUNTRY}应当认真思考其教育与就业生态出了什么问题。',
        ],
      },
      {
        triggerKeywords: ['gender', 'women', 'lgbtq', 'discrimination', '性别', '女性', '歧视'],
        tone: 'committed',
        variants: [
          '{TOPIC}再次证明，性别平等不是自然而然实现的，它需要持续的制度设计与文化变革来支撑。',
          '在{COUNTRY}，{TOPIC}相关立法的推进阻力，折射出传统性别观念在公共政策领域的顽固延伸。',
          '每一次针对弱势群体的歧视性政策，都是对"所有人平等"这一文明共识的具体侵蚀。',
        ],
      },
      {
        triggerKeywords: ['flood', 'drought', 'wildfire', 'disaster', '洪水', '干旱', '野火', '灾害'],
        tone: 'alarmed',
        variants: [
          '{COUNTRY}遭遇的{TOPIC}，是气候变化从统计数字变为人间悲剧的又一次残酷验证。',
          '极端天气事件的常态化，迫使我们重新审视城市规划、基础设施投资和社区韧性建设的优先级。',
          '{NUMBER}人受灾的背后，是一个长期政策不作为的账单——现在，是自然在替它们买单。',
        ],
      },
      {
        triggerKeywords: ['immigration', 'refugee', 'migrant', '移民', '难民', '流亡'],
        tone: 'humanistic',
        variants: [
          '难民不是安全威胁，而是人道危机的承受者，将二者混同是政客的话术，也是道德的失守。',
          '{COUNTRY}的边境政策选择，是其如何定义"文明"与"人道"的一面镜子。',
          '{NUMBER}万人背井离乡，这数字的背后是无数个被{TOPIC}打碎的人生轨迹，值得每一个有良知的人停下来思考。',
        ],
      },
      {
        triggerKeywords: ['religion', 'church', 'mosque', 'faith', '宗教', '信仰', '教堂', '清真寺'],
        tone: 'reflective',
        variants: [
          '{TOPIC}事件折射出宗教认同与国家世俗权力之间的长期张力，这一关系的处理方式将影响社会凝聚力的底色。',
          '宗教自由是基本人权，但当信仰被工具化为政治动员手段时，社会包容性将面临严峻考验。',
          '{COUNTRY}在处理{TOPIC}方面的做法，将成为其宗教少数群体权利保障承诺的试金石。',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5. 赵磊 — 军事战略分析师
  // ─────────────────────────────────────────
  {
    id: 'zhao_lei',
    name: '赵磊',
    role: '军事战略分析师',
    avatar: 'ZL',
    color: '#EF4444',
    triggerCategories: ['military', 'politics'],
    templates: [
      {
        triggerKeywords: ['war', 'warfare', 'invasion', 'offensive', '战争', '入侵', '进攻', '战役'],
        tone: 'strategic',
        variants: [
          '{COUNTRY}的军事行动已进入{TOPIC}阶段，从战场态势看，速决战的条件并不成熟，持久消耗的可能性正在上升。',
          '{TOPIC}战局的走向，将在很大程度上取决于后勤供应链的持续性与外部支援力度的博弈结果。',
          '大规模地面战争在21世纪的重现，迫使战略界重新审视诸多被视为过时的军事理论。',
          '{COUNTRY}此次攻势的战略纵深有限，若无法在{NUMBER}天内取得决定性成果，将陷入战略被动。',
        ],
      },
      {
        triggerKeywords: ['nuclear', 'missile', 'icbm', '核武器', '弹道导弹', '洲际导弹', '核威慑'],
        tone: 'grave',
        variants: [
          '{COUNTRY}核态势的调整是当前最需要密切追踪的战略信号，任何误判都将带来不可逆的后果。',
          '核威慑的稳定性建立在双方对红线的共同理解之上，当前局势下这一共识正面临侵蚀风险。',
          '{TOPIC}的发展打破了{NUMBER}年来核不扩散努力的既有框架，国际社会的响应将决定新的底线在哪里。',
          '有限核使用的"门槛下降"论在战略界的抬头，是比任何具体军事行动都更令人警惕的危险信号。',
        ],
      },
      {
        triggerKeywords: ['drone', 'uav', 'unmanned', '无人机', '无人系统'],
        tone: 'technical',
        variants: [
          '无人系统在{TOPIC}冲突中的规模化运用，标志着战争形态正经历自机械化时代以来最深刻的范式转变。',
          '{ORG}无人机战术的成熟，使低成本消耗战成为新的战略选项，这对传统军事优势的有效性提出了严峻挑战。',
          '{COUNTRY}在无人系统领域的技术积累，已形成显著的不对称优势，将深刻影响未来地区安全格局。',
        ],
      },
      {
        triggerKeywords: ['ceasefire', 'peace', 'negotiation', '停火', '和谈', '谈判'],
        tone: 'measured',
        variants: [
          '{TOPIC}停火协议若能落地，其持久性取决于各方是否愿意接受政治解决，而非仅仅将其作为重整旗鼓的喘息窗口。',
          '历史上，在军事均势格局下达成的停火协议，往往比建立在胜负之上的结果更具可持续性。',
          '{COUNTRY}与{ORG}之间的停火谈判，能否触及根本政治分歧，将是决定和平能否持久的核心变量。',
        ],
      },
      {
        triggerKeywords: ['sanction', 'arms', 'weapons supply', 'military aid', '武器', '军援', '军火'],
        tone: 'analytical',
        variants: [
          '{ORG}向{COUNTRY}提供的{TOPIC}武器系统，将在一定程度上改变战场力量对比，但能否扭转战略态势取决于交付时机与操作培训。',
          '武器供应的升级是对交战方能力的赋能，但同时也需要评估其是否可能触发对方的升级响应。',
          '军事援助的质量与数量差异，正在成为区分{TOPIC}冲突各外部参与方战略意图的重要维度。',
        ],
      },
      {
        triggerKeywords: ['cyber', 'information warfare', 'hybrid war', '网络战', '信息战', '混合战'],
        tone: 'technical',
        variants: [
          '{TOPIC}中的网络攻击已超出纯技术范畴，演变为影响战场信息优势与后方民心士气的复合型武器。',
          '混合战争模糊了战争与和平的传统边界，使得威慑框架的构建面临从未有过的概念挑战。',
          '{COUNTRY}的信息战能力已成为其整体军事力量的重要倍增器，这一维度在传统战力评估中往往被低估。',
        ],
      },
      {
        triggerKeywords: ['military exercise', 'navy', 'fleet', 'aircraft carrier', '军演', '海军', '航母', '舰队'],
        tone: 'observational',
        variants: [
          '{COUNTRY}此次大规模军演的规模与科目设计，明显超出例行训练的范畴，释放出清晰的威慑信号。',
          '航母战斗群的部署，是一种无需言语的战略声明，其政治意涵往往大于实际军事意图。',
          '{ORG}在{TOPIC}海域的军事存在升级，将对地区海上安全架构产生持续性的结构压力。',
        ],
      },
      {
        triggerKeywords: ['terrorism', 'attack', 'isis', 'extremism', '恐怖主义', '恐袭', '极端主义'],
        tone: 'grave',
        variants: [
          '{TOPIC}袭击事件造成{NUMBER}人伤亡，再次揭示了非国家武装力量对全球安全秩序的非对称威胁属性。',
          '反恐行动的有效性不仅取决于军事打击，更取决于能否切断极端主义的意识形态根源与财务网络。',
          '{COUNTRY}此次遭受的袭击，将不可避免地影响其国内安全政策的优先排序与执法力度。',
        ],
      },
      {
        triggerKeywords: ['defense', 'military budget', 'spending', '国防', '军费', '国防预算'],
        tone: 'analytical',
        variants: [
          '{COUNTRY}将国防预算提升至GDP的{NUMBER}%，是一个重要的政策信号，也将引发盟友与对手对其战略意图的重新解读。',
          '军费增长的背后是战略威胁认知的升级，但军备竞赛的螺旋效应本身也是一种系统性安全风险。',
          '{ORG}成员国在国防开支上的持续分化，将在未来{NUMBER}年内成为制约其集体防御能力的主要瓶颈。',
        ],
      },
      {
        triggerKeywords: ['space', 'military satellite', 'space weapon', '军事卫星', '太空武器', '太空战'],
        tone: 'forward-looking',
        variants: [
          '太空正在成为大国战略博弈的新前沿，{COUNTRY}军事卫星体系的扩展将深刻改变战场感知与精确打击能力。',
          '{TOPIC}表明太空武器化的进程远超国际社会的治理准备，相关规则的缺失将使冲突风险难以管控。',
          '侦察卫星与通信卫星的战略重要性，意味着其在未来冲突中将首先成为打击目标，这是各方都需认真对待的现实。',
        ],
      },
    ],
  },
];

/**
 * 根据分类获取匹配的分析师列表
 * @param {string} category
 * @returns {object[]}
 */
export function getAnalystsForCategory(category) {
  return analysts.filter((a) => a.triggerCategories.includes(category));
}

export default analysts;
