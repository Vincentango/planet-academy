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

export const DESIGNED_BY_SLUG = Object.fromEntries(LIVE.map((course) => [course.slug, course])) as Record<
  string,
  CatalogCourse
>

export const COURSE_SCENE_BY_SLUG: Record<string, SceneSlug> = Object.fromEntries(
  LIVE.map((course) => [course.slug, course.scene]),
) as Record<string, SceneSlug>

export const FALLBACK_FEATURED = LIVE

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
  return qs ? `/labs/${slug}?${qs}` : `/labs/${slug}`
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

export const LAB_SELECT_OPTIONS = SCENES.map((scene) => ({
  label: scene.name,
  value: scene.slug,
}))

/** Compatibility aliases while admin/seed still say “lab”. */
export const LABS = SCENES
export type LabSlug = SceneSlug
export const GRADE_BANDS = STAGES
export type GradeBandId = StageId
export const getLab = getScene
export const matchingGradeBands = matchingStages
export const gradeBandLabel = stageLabelFromGrades
export const COURSE_LAB_BY_SLUG = COURSE_SCENE_BY_SLUG
