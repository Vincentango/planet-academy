export const ISSUES = [
  { id: 'nature', name: '人与自然' },
  { id: 'tech', name: '人与技术' },
  { id: 'people', name: '人与人' },
] as const

export type IssueId = (typeof ISSUES)[number]['id']

export const SCENES = [
  {
    slug: 'nature-ecology',
    code: '01',
    name: '自然生态',
    nameEn: 'Nature & Ecology',
    focus: '把身边的生命系统做成可观察、可论证的探究现场。',
  },
  {
    slug: 'climate-energy',
    code: '02',
    name: '气候、能源与资源',
    nameEn: 'Climate, Energy & Resources',
    focus: '从能耗、气候与资源约束里提出可行动的问题。',
  },
  {
    slug: 'food-agri-water',
    code: '03',
    name: '食物、农业与水系统',
    nameEn: 'Food, Agriculture & Water',
    focus: '从土地、食物与水重新认识生产与生命联结。',
  },
  {
    slug: 'health-care',
    code: '04',
    name: '身心健康与生命照护',
    nameEn: 'Health & Life Care',
    focus: '在身体、心理与照护关系中理解人的完整。',
  },
  {
    slug: 'city-community',
    code: '05',
    name: '城市、社区与公共空间',
    nameEn: 'Cities, Community & Public Space',
    focus: '构想更公平、更宜居的共同生活。',
  },
  {
    slug: 'making-engineering',
    code: '06',
    name: '工程、建造与未来制造',
    nameEn: 'Engineering & Future Making',
    focus: '把想法做成可迭代的结构、机构与产品。',
  },
  {
    slug: 'digital-intel',
    code: '07',
    name: '数字智能与虚拟世界',
    nameEn: 'Digital Intelligence & Virtual Worlds',
    focus: '在数字系统与虚拟空间里保持人的判断与创造。',
  },
  {
    slug: 'culture-arts',
    code: '08',
    name: '文化艺术与公共表达',
    nameEn: 'Culture, Arts & Public Expression',
    focus: '以表达与形式回应真实的公共问题。',
  },
  {
    slug: 'economy-governance',
    code: '09',
    name: '经济组织、公共治理与社会协作',
    nameEn: 'Economy, Governance & Collaboration',
    focus: '理解价值如何被组织，以及人如何共同行动。',
  },
] as const

export type SceneSlug = (typeof SCENES)[number]['slug']

export const ALL_COURSES = {
  slug: 'all',
  name: '课程总览',
  nameEn: 'All Courses',
  focus: '资源库总览，不是必修课表。用议题、学段与教学弧点选查看，空结果表示这类课还在设计。',
  code: '00',
} as const

export const STAGES = [
  { id: 'g1-3', label: 'G1-G3', name: '小学低段1-3', min: 1, max: 3 },
  { id: 'g4-6', label: 'G4-G6', name: '小学高段4-6', min: 4, max: 6 },
  { id: 'g7-9', label: 'G7-G9', name: '初中7-9', min: 7, max: 9 },
  { id: 'g10-12', label: 'G10-G12', name: '高中10-12', min: 10, max: 12 },
] as const

export type StageId = (typeof STAGES)[number]['id']

export const ARCS = [
  { id: 'inquiry', name: '探究驱动' },
  { id: 'design', name: '设计思维' },
  { id: 'agile', name: '敏捷创造' },
  { id: 'game', name: '游戏化探险' },
  { id: 'action', name: '社会行动' },
] as const

export type ArcId = (typeof ARCS)[number]['id']

export const GROWTH_LAYERS = [
  { id: 'subject', name: '学科素养' },
  { id: 'method', name: '方法与技能' },
  { id: 'transfer', name: '可迁移能力' },
] as const

export const FRAMEWORK_LINE = '学什么＝议题×场景×学段；怎么学＝五种教学弧；学会什么＝三层成长'

export const LEGACY_LAB_TO_SCENE: Record<string, SceneSlug> = {
  earth: 'nature-ecology',
  interaction: 'culture-arts',
  embodied: 'digital-intel',
  logic: 'economy-governance',
  city: 'city-community',
  agri: 'food-agri-water',
  culture: 'culture-arts',
  art: 'culture-arts',
  making: 'making-engineering',
}

export const SYSTEMS = [
  { id: 'interest', name: '兴趣体系' },
  { id: 'fusion', name: '融合体系' },
  { id: 'pioneer', name: '拔创体系' },
] as const

export type CourseSystem = (typeof SYSTEMS)[number]['id']

export type CatalogCourse = {
  slug: string
  title: string
  subtitle?: string
  designed: boolean
  issue: IssueId
  scene: SceneSlug
  stage: StageId
  arc?: ArcId
  gradeMin?: number
  gradeMax?: number
  totalHours?: number
  subjects?: string[]
  system?: CourseSystem
  cover?: string
  research?: string
  lab?: string
}

const LIVE: CatalogCourse[] = [
  {
    slug: 'heliu-tegongdui',
    title: '河流特攻队',
    subtitle: '把一条身边的河变成可论证的系统问题',
    designed: true,
    issue: 'nature',
    scene: 'nature-ecology',
    stage: 'g7-9',
    arc: 'inquiry',
    system: 'fusion',
    lab: '地球科学研究室',
    cover: '/samples/courses/heliu-tegongdui.svg',
    research: '学生走进真实河流开展水质调查，设计水质监测或垃圾清理装置，形成可持续的河流治理解决方案。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['科学探究', '工程设计', '智能硬件'],
  },
  {
    slug: 'tansuo-xiaoyuan',
    title: '碳索校园',
    subtitle: '把校园能耗变成可行动的低碳问题',
    designed: true,
    issue: 'nature',
    scene: 'climate-energy',
    stage: 'g7-9',
    arc: 'action',
    system: 'fusion',
    lab: '地球科学研究室',
    cover: '/samples/courses/tansuo-xiaoyuan.svg',
    research: '学生调查校园碳排放，研发智能照明、自动浇水和分类垃圾桶等低碳产品，并提出校园改造建议。',
    gradeMin: 7,
    gradeMax: 11,
    totalHours: 32,
    subjects: ['科学探究', '数据分析', '智能硬件'],
  },

  {
    slug: 'chongqing-jiaotong-ai',
    title: '重庆立体交通与AI系统设计',
    subtitle: '用AI视觉与控制逻辑搭建立体交通智能系统',
    designed: true,
    issue: 'tech',
    scene: 'digital-intel',
    stage: 'g7-9',
    arc: 'design',
    system: 'fusion',
    lab: '具身智能研究室',
    cover: '/samples/courses/manghe.svg',
    research: '学生以重庆山地交通为真实情境，运用AI视觉、传感器与控制逻辑搭建立体交通智能系统。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['逻辑推理', '系统思维', '智能硬件'],
  },
  {
    slug: 'xunhuan-dushi-nongchang',
    title: '可持续未来：循环经济都市农场',
    subtitle: '把循环、种植和物联网做成一座都市农场',
    designed: true,
    issue: 'nature',
    scene: 'food-agri-water',
    stage: 'g7-9',
    arc: 'design',
    system: 'fusion',
    lab: '未来农业研究室',
    cover: '/samples/courses/xiaoyuan-shiwu-ditu.svg',
    research: '学生围绕城市食物供应与废弃物处理，设计并搭建融合循环经济、立体种植和物联网控制的未来都市农场。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['科学探究', '系统思维', '智能硬件'],
  },
  {
    slug: 'liti-gongyuan-chengshi',
    title: '立体公园城市',
    subtitle: '把居住、交通、绿化与公共服务叠进一座立体城市',
    designed: true,
    issue: 'tech',
    scene: 'city-community',
    stage: 'g7-9',
    arc: 'design',
    system: 'fusion',
    lab: '未来都市研究室',
    cover: '/samples/courses/gonggong-qianghui.svg',
    research: '学生通过空间规划、结构实验和生态能源计算，设计一座集居住、交通、绿化与公共服务于一体的立体城市。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['系统思维', '工程设计', '数据分析'],
  },
  {
    slug: 'shikong-yunsuan-shequ',
    title: '时空运算：学校出发的社区再造',
    subtitle: '用数据和交互模型重做校园与社区的时段服务',
    designed: true,
    issue: 'people',
    scene: 'city-community',
    stage: 'g7-9',
    arc: 'action',
    system: 'fusion',
    lab: '未来都市研究室',
    cover: '/samples/courses/shiwufenzhong-jiequ.svg',
    research: '学生调查校园与社区的时空利用情况，用数据和交互模型设计能够在不同时段服务不同人群的未来社区。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['数据分析', '系统思维', '交互设计'],
  },
  {
    slug: 'hanzi-lishi-chuancheng',
    title: '汉字博物馆·历史传承',
    subtitle: '从符号、甲骨文到造纸，看见汉字如何推动文明',
    designed: true,
    issue: 'nature',
    scene: 'culture-arts',
    stage: 'g7-9',
    arc: 'inquiry',
    system: 'fusion',
    lab: '文化传承研究室',
    cover: '/samples/courses/koushushi-gongzuofang.svg',
    research: '学生从早期符号、甲骨文、书体演变和造纸工艺入手，理解汉字如何记录并推动人类文明发展。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', '科学探究', '审美表达'],
  },
  {
    slug: 'hanzi-duoyang-fangyan',
    title: '汉字博物馆·多样方言',
    subtitle: '用采集、声调和地图理解语言与地域文化',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g7-9',
    arc: 'inquiry',
    system: 'fusion',
    lab: '文化传承研究室',
    cover: '/samples/courses/guize-yugongping.svg',
    research: '学生通过方言采集、声调分析、地域地图和朗诵展示，探究语言与地理、历史及地域文化之间的联系。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', '数据分析', '叙事表达'],
  },
  {
    slug: 'hanzi-wenhua-pengzhuang',
    title: '汉字博物馆·文化碰撞',
    subtitle: '比较汉字在不同文化中的冲突、适应与创新',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g10-12',
    arc: 'inquiry',
    system: 'fusion',
    lab: '文化传承研究室',
    cover: '/samples/courses/zhuomian-jigou-gongfang.svg',
    research: '学生比较汉字在不同地区和文化中的演变，通过分析、讨论与视觉设计理解文字交流中的冲突、适应与创新。',
    gradeMin: 7,
    gradeMax: 12,
    totalHours: 24,
    subjects: ['文化理解', '逻辑推理', '审美表达'],
  },
  {
    slug: 'hanzi-shikong-tansuo',
    title: '汉字博物馆·时空探索',
    subtitle: '用AI字体与互动装置让濒危文字重新被看见',
    designed: true,
    issue: 'tech',
    scene: 'culture-arts',
    stage: 'g7-9',
    arc: 'design',
    system: 'fusion',
    lab: '文化传承研究室',
    cover: '/samples/courses/huoxing-jidi.svg',
    research: '学生围绕东巴文、女书等濒危文字，利用AI字体设计与互动装置探索传统文字在数字时代的保护与新生。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['文化理解', 'AI创作', '交互设计'],
  },
  {
    slug: 'huoxing-jidi',
    title: '火星基地',
    subtitle: '在极端约束中设计人类如何共同生活',
    designed: true,
    issue: 'tech',
    scene: 'digital-intel',
    stage: 'g10-12',
    arc: 'design',
    system: 'pioneer',
    cover: '/samples/courses/huoxing-jidi.svg',
    research: '在水、氧、能源与治理的极限约束里，设计不能交给机器单独决定的共同生活规则。',
    gradeMin: 8,
    gradeMax: 12,
    totalHours: 48,
    subjects: ['科学', '信息技术', '人文社科'],
  },
  {
    slug: 'shengtai-jiqiren-diduan',
    title: '生态机器人智造营·低段',
    subtitle: '用手作、电路与图形化编程做出会感知的生态机器人',
    designed: true,
    issue: 'tech',
    scene: 'making-engineering',
    stage: 'g1-3',
    arc: 'design',
    system: 'interest',
    lab: '具身智能研究室',
    cover: '/samples/courses/manghe.svg',
    research: '学生通过手工、电路与图形化编程，制作会发光、会追光、会感知植物状态的生态机器人。',
    gradeMin: 1,
    gradeMax: 3,
    totalHours: 16,
    subjects: ['科学探究', '工程设计', '智能硬件'],
  },
  {
    slug: 'shengtai-jiqiren-gaoduan',
    title: '生态机器人智造营·高段',
    subtitle: '设计、搭建并调试多传感器生态智能系统',
    designed: true,
    issue: 'tech',
    scene: 'making-engineering',
    stage: 'g4-6',
    arc: 'design',
    system: 'interest',
    lab: '具身智能研究室',
    cover: '/samples/courses/xiaoyuan-shiwu-ditu.svg',
    research: '学生围绕智能温室、AI气象站和智能回收秤等任务，完成多传感器生态智能系统的设计、搭建与调试。',
    gradeMin: 4,
    gradeMax: 6,
    totalHours: 24,
    subjects: ['系统思维', '工程设计', '智能硬件'],
  },
  {
    slug: 'sdg-ip-manghe',
    title: 'SDG的IP潮玩盲盒',
    subtitle: '从可持续议题走到可发布的潮玩产品',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g4-6',
    arc: 'agile',
    system: 'interest',
    lab: '艺术设计研究室',
    cover: '/samples/courses/gonggong-qianghui.svg',
    research: '学生从可持续发展议题出发，完成IP角色、三维模型、实体潮玩、包装及产品发布的完整创作过程。',
    gradeMin: 4,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['AI创作', '数字制造', '产品思维'],
  },
  {
    slug: '3d-dayin-manghe-diduan',
    title: '3D打印盲盒·低段',
    subtitle: '从手绘潮玩角色走到可拿在手里的3D打印盲盒',
    designed: true,
    issue: 'tech',
    scene: 'culture-arts',
    stage: 'g1-3',
    arc: 'agile',
    system: 'interest',
    lab: '艺术设计研究室',
    cover: '/samples/courses/heliu-tegongdui.svg',
    research: '学生从手绘潮玩角色开始，借助AI生成三维模型并体验3D打印与盲盒封装，让想象变成实体作品。',
    gradeMin: 1,
    gradeMax: 3,
    totalHours: 16,
    subjects: ['AI创作', '三维建模', '数字制造'],
  },
  {
    slug: '3d-dayin-manghe-gaoduan',
    title: '3D打印盲盒·高段',
    subtitle: '独立完成系列IP、三维建模、打印、包装与产品展示',
    designed: true,
    issue: 'tech',
    scene: 'culture-arts',
    stage: 'g4-6',
    arc: 'agile',
    system: 'interest',
    lab: '艺术设计研究室',
    cover: '/samples/courses/tansuo-xiaoyuan.svg',
    research: '学生独立完成系列IP设定、三维建模、3D打印、包装设计和产品展示，体验潮玩产品的完整开发过程。',
    gradeMin: 4,
    gradeMax: 6,
    totalHours: 24,
    subjects: ['三维建模', '数字制造', '产品思维'],
  },
  {
    slug: 'ai-xinwenchuang-diduan',
    title: 'AI新文创·低段',
    subtitle: '从非遗故事做出可触摸、可使用的新文创',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g1-3',
    arc: 'design',
    system: 'interest',
    lab: '文化传承研究室',
    cover: '/samples/courses/huoxing-jidi.svg',
    research: '学生从非遗故事和经典纹样出发，运用AI生图、3D打印、热转印与纸雕创作可触摸、可使用的新文创作品。',
    gradeMin: 1,
    gradeMax: 3,
    totalHours: 16,
    subjects: ['文化理解', '审美表达', '数字制造'],
  },
  {
    slug: 'ai-xinwenchuang-gaoduan',
    title: 'AI新文创·高段',
    subtitle: '从纹样提取到IP动画，做成可传播的作品集',
    designed: true,
    issue: 'nature',
    scene: 'culture-arts',
    stage: 'g4-6',
    arc: 'design',
    system: 'interest',
    lab: '文化传承研究室',
    cover: '/samples/courses/koushushi-gongzuofang.svg',
    research: '学生独立完成非遗纹样提取、AI视觉创作、实体文创制作与IP动画展示，形成具有现代传播力的作品集。',
    gradeMin: 4,
    gradeMax: 6,
    totalHours: 24,
    subjects: ['文化理解', 'AI创作', '数字制造'],
  },
  {
    slug: 'ai-shengtai-kapai',
    title: 'AI生态卡牌：共生世界',
    subtitle: '用食物链和共生关系设计一套可试玩的生态卡牌',
    designed: true,
    issue: 'nature',
    scene: 'economy-governance',
    stage: 'g4-6',
    arc: 'game',
    system: 'interest',
    lab: '逻辑博弈研究室',
    cover: '/samples/courses/guize-yugongping.svg',
    research: '学生以食物链和生态共生关系为科学基础，借助AI创作角色与卡牌，并通过试玩持续优化游戏规则。',
    gradeMin: 4,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['科学探究', '规则设计', 'AI创作'],
  },
  {
    slug: 'ai-celue-zhuoyou-yueqiu',
    title: 'AI策略桌游：月球基地',
    subtitle: '把探月、基地建设与生命保障做成一局策略桌游',
    designed: true,
    issue: 'tech',
    scene: 'economy-governance',
    stage: 'g7-9',
    arc: 'game',
    system: 'interest',
    lab: '逻辑博弈研究室',
    cover: '/samples/courses/zhuomian-jigou-gongfang.svg',
    research: '学生围绕探月任务、基地建设与生命保障，将资源管理、概率机制和任务规划转化为月球基地策略桌游。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['逻辑推理', '系统思维', '规则设计'],
  },
]

function issueName(id: IssueId) {
  return ISSUES.find((item) => item.id === id)?.name || id
}

function sceneName(slug: SceneSlug) {
  return SCENES.find((item) => item.slug === slug)?.name || slug
}

function stageLabel(id: StageId) {
  return STAGES.find((item) => item.id === id)?.label || id
}

function liveKey(course: Pick<CatalogCourse, 'issue' | 'scene' | 'stage'>) {
  return `${course.scene}:${course.issue}:${course.stage}`
}

const liveByCell = new Map(LIVE.map((course) => [liveKey(course), course]))

export const CATALOG: CatalogCourse[] = SCENES.flatMap((scene) =>
  ISSUES.flatMap((issue) =>
    STAGES.map((stage) => {
      const hit = liveByCell.get(`${scene.slug}:${issue.id}:${stage.id}`)
      if (hit) return hit
      return {
        slug: `seed-${scene.slug}-${issue.id}-${stage.id}`,
        title: `${scene.name} · ${issue.name} · ${stage.label}`,
        designed: false,
        issue: issue.id,
        scene: scene.slug,
        stage: stage.id,
      } satisfies CatalogCourse
    }),
  ),
)

const CURRICULUM_EXTRAS: CatalogCourse[] = [
  {
    slug: 'guize-yugongping',
    title: '规则与公平',
    subtitle: '用一场可见的博弈理解规则如何分配机会',
    designed: true,
    issue: 'people',
    scene: 'economy-governance',
    stage: 'g7-9',
    arc: 'game',
    gradeMin: 6,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['数学', '人文社科'],
    system: 'fusion',
    cover: '/samples/courses/guize-yugongping.svg',
    research: '设计并修订一套课堂博弈规则，观察策略如何改变结果，区分赢得比赛与规则是否公平。',
  },
  {
    slug: 'shiwufenzhong-jiequ',
    title: '十五分钟街区',
    subtitle: '把日常出行半径做成可设计的城市问题',
    designed: true,
    issue: 'people',
    scene: 'city-community',
    stage: 'g7-9',
    arc: 'action',
    gradeMin: 7,
    gradeMax: 10,
    totalHours: 32,
    subjects: ['人文社科', '综合实践'],
    system: 'fusion',
    cover: '/samples/courses/shiwufenzhong-jiequ.svg',
    research: '测绘十五分钟生活圈，识别服务缺口，提出一个可被社区讨论的微型公共方案。',
  },
  {
    slug: 'koushushi-gongzuofang',
    title: '口述史工作坊',
    subtitle: '让一段地方记忆被听见，也被质疑',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g7-9',
    arc: 'inquiry',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 24,
    subjects: ['语文', '人文社科'],
    system: 'fusion',
    cover: '/samples/courses/koushushi-gongzuofang.svg',
    research: '采访一位同意参与的讲述者，对照第二手材料，区分记忆、叙事与证据。',
  },
  {
    slug: 'zhuomian-jigou-gongfang',
    title: '桌面机构工坊',
    subtitle: '让一个机构在桌面上可被看见、被修好',
    designed: true,
    issue: 'tech',
    scene: 'making-engineering',
    stage: 'g7-9',
    arc: 'design',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['信息技术', '综合实践'],
    system: 'pioneer',
    cover: '/samples/courses/zhuomian-jigou-gongfang.svg',
    research: '设计一个解决具体动作问题的桌面机构，完成原型、测试与一次公开的故障复盘。',
  },
]

export const DESIGNED_BY_SLUG = Object.fromEntries(
  [...LIVE, ...CURRICULUM_EXTRAS].map((course) => [course.slug, course]),
) as Record<string, CatalogCourse>

export const COURSE_SCENE_BY_SLUG: Record<string, SceneSlug> = Object.fromEntries(
  [...LIVE, ...CURRICULUM_EXTRAS].map((course) => [course.slug, course.scene]),
) as Record<string, SceneSlug>

export const FALLBACK_FEATURED = LIVE

export const CURRICULUM_FALLBACK: CatalogCourse[] = [...LIVE, ...CURRICULUM_EXTRAS]

const SYSTEM_BY_SLUG: Record<string, CourseSystem> = Object.fromEntries(
  CURRICULUM_FALLBACK.filter((course) => course.system).map((course) => [course.slug, course.system as CourseSystem]),
)

export function getSystem(id?: string | null) {
  return SYSTEMS.find((item) => item.id === id) ?? null
}

export function inferSystem(course: Pick<CatalogCourse, 'slug' | 'stage' | 'arc' | 'scene' | 'gradeMin' | 'gradeMax' | 'system'>): CourseSystem {
  if (course.system && SYSTEMS.some((item) => item.id === course.system)) return course.system
  const known = SYSTEM_BY_SLUG[course.slug]
  if (known) return known
  if (course.stage === 'g10-12' || (course.gradeMin && course.gradeMin >= 10) || course.arc === 'design') return 'pioneer'
  if (course.stage === 'g1-3' || course.stage === 'g4-6' || (course.gradeMax && course.gradeMax <= 6) || course.arc === 'game' || course.arc === 'agile') {
    return 'interest'
  }
  if (course.scene === 'making-engineering' || course.scene === 'digital-intel') return 'pioneer'
  return 'fusion'
}

export const INTEREST_TAB_SLUGS = [
  'shengtai-jiqiren-diduan',
  'shengtai-jiqiren-gaoduan',
  'sdg-ip-manghe',
  '3d-dayin-manghe-diduan',
  '3d-dayin-manghe-gaoduan',
  'ai-xinwenchuang-diduan',
  'ai-xinwenchuang-gaoduan',
  'ai-shengtai-kapai',
  'ai-celue-zhuoyou-yueqiu',
] as const

export const FUSION_TAB_SLUGS = [
  'chongqing-jiaotong-ai',
  'xunhuan-dushi-nongchang',
  'liti-gongyuan-chengshi',
  'shikong-yunsuan-shequ',
  'hanzi-lishi-chuancheng',
  'hanzi-duoyang-fangyan',
  'hanzi-wenhua-pengzhuang',
  'hanzi-shikong-tansuo',
  'heliu-tegongdui',
  'tansuo-xiaoyuan',
] as const

const RETIRED_INTEREST_SLUGS = new Set(['manghe', 'xiaoyuan-shiwu-ditu', 'gonggong-qianghui'])

const TAB_SLUGS: Partial<Record<CourseSystem, readonly string[]>> = {
  interest: INTEREST_TAB_SLUGS,
  fusion: FUSION_TAB_SLUGS,
}

export function coursesForSystem(list: CatalogCourse[], system: CourseSystem) {
  const filtered = list.filter((course) => inferSystem(course) === system && !RETIRED_INTEREST_SLUGS.has(course.slug))
  const ordered = TAB_SLUGS[system]
  if (!ordered) return filtered
  const bySlug = new Map(filtered.map((course) => [course.slug, course]))
  return ordered.map((slug) => bySlug.get(slug)).filter((course): course is CatalogCourse => Boolean(course))
}

export type SceneView = {
  slug: string
  name: string
  nameEn?: string
  focus?: string
  code?: string
}

export function getScene(slug: string): SceneView | null {
  if (slug === ALL_COURSES.slug) return ALL_COURSES
  return SCENES.find((scene) => scene.slug === slug) ?? null
}

export function resolveSceneSlug(slug: string) {
  if (slug === ALL_COURSES.slug) return slug
  if (getScene(slug)) return slug
  return LEGACY_LAB_TO_SCENE[slug] || null
}

export function getIssue(id: string) {
  return ISSUES.find((item) => item.id === id) ?? null
}

export function getStage(id: string) {
  return STAGES.find((item) => item.id === id) ?? null
}

export function getArc(id: string) {
  return ARCS.find((item) => item.id === id) ?? null
}

export function matchingStages(min?: number | null, max?: number | null) {
  const a = min ?? max ?? 1
  const b = max ?? min ?? a
  return STAGES.filter((band) => a <= band.max && b >= band.min)
}

export function stageLabelFromGrades(min?: number | null, max?: number | null) {
  const bands = matchingStages(min, max)
  if (!bands.length) return ''
  if (bands.length === 1) return bands[0].label
  return bands.map((band) => band.label).join(' · ')
}

export function catalogForScene(slug: string) {
  if (slug === ALL_COURSES.slug) return CATALOG
  return CATALOG.filter((course) => course.scene === slug)
}

export type BrowseTagKey = 'issue' | 'stage' | 'arc'

export function browseFilterHref(
  slug: string,
  current: Partial<Record<BrowseTagKey, string>>,
  key: BrowseTagKey,
  value: string,
) {
  const next = new URLSearchParams()
  for (const item of ['issue', 'stage', 'arc'] as const) {
    const selected = item === key ? (current[item] === value ? '' : value) : current[item]
    if (selected) next.set(item, selected)
  }
  const qs = next.toString()
  return qs ? `/scenes/${slug}?${qs}` : `/scenes/${slug}`
}

export function filterCatalog(
  list: CatalogCourse[],
  current: Partial<Record<BrowseTagKey, string>>,
) {
  return list.filter((course) => {
    if (current.issue && course.issue !== current.issue) return false
    if (current.stage && course.stage !== current.stage) return false
    if (current.arc && course.arc !== current.arc) return false
    return true
  })
}

export function courseTags(course: CatalogCourse) {
  if (course.subjects?.length) return [...course.subjects]
  const tags: string[] = []
  if (course.issue) tags.push(issueName(course.issue))
  if (course.scene) tags.push(sceneName(course.scene))
  if (course.stage) tags.push(stageLabel(course.stage))
  if (course.arc) {
    const arc = getArc(course.arc)
    if (arc) tags.push(arc.name)
  }
  return tags
}

export const LAB_SELECT_OPTIONS = [
  { label: '地球科学', value: 'earth' },
  { label: '交互设计', value: 'interaction' },
  { label: '具身智能', value: 'embodied' },
  { label: '逻辑博弈', value: 'logic' },
  { label: '未来都市', value: 'city' },
  { label: '未来农业', value: 'agri' },
  { label: '文化传承', value: 'culture' },
  { label: '艺术设计', value: 'art' },
  { label: '智能制造', value: 'making' },
]

/** Compatibility aliases while admin/seed still say “lab”. */
export const LABS = SCENES
export type LabSlug = SceneSlug
export const GRADE_BANDS = STAGES
export type GradeBandId = StageId
export const getLab = getScene
export const matchingGradeBands = matchingStages
export const gradeBandLabel = stageLabelFromGrades
export const COURSE_LAB_BY_SLUG = COURSE_SCENE_BY_SLUG
