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
    cover: '/samples/courses/heliu-tegongdui.svg',
    research: '沿一条身边的河做观察、取证与论证，把传闻压成可公开的系统问题。',
    gradeMin: 7,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['科学', '人文社科'],
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
    cover: '/samples/courses/tansuo-xiaoyuan.svg',
    research: '测绘校园能耗，提出可验证的低碳行动，并评估它对整座微型地球系统的影响。',
    gradeMin: 7,
    gradeMax: 11,
    totalHours: 32,
    subjects: ['科学', '数学', '综合实践'],
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
    slug: 'manghe',
    title: '盲盒课程',
    subtitle: '把“惊喜”做成可设计的价值体验',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g4-6',
    arc: 'agile',
    system: 'interest',
    cover: '/samples/courses/manghe.svg',
    research: '为真实同伴设计一款主题盲盒，把惊喜、成本与公平做成可测试的开箱体验。',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['艺术', '综合实践'],
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
    slug: 'xiaoyuan-shiwu-ditu',
    title: '校园食物地图',
    subtitle: '从一顿午餐看见土地、劳动与选择',
    designed: true,
    issue: 'nature',
    scene: 'food-agri-water',
    stage: 'g4-6',
    arc: 'inquiry',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['科学', '综合实践'],
    system: 'interest',
    cover: '/samples/courses/xiaoyuan-shiwu-ditu.svg',
    research: '追踪午餐里的一种食物回到产地与季节，做成一张可讲解的校园食物地图。',
  },
  {
    slug: 'gonggong-qianghui',
    title: '公共墙绘',
    subtitle: '把一面墙做成可讨论的公共表达',
    designed: true,
    issue: 'people',
    scene: 'culture-arts',
    stage: 'g4-6',
    arc: 'agile',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['艺术', '综合实践'],
    system: 'interest',
    cover: '/samples/courses/gonggong-qianghui.svg',
    research: '为一面被允许的墙提出主题、草图与材料方案，在真实约束下完成一次公共表达。',
  },
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

export function coursesForSystem(list: CatalogCourse[], system: CourseSystem) {
  return list.filter((course) => inferSystem(course) === system)
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
