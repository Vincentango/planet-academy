export const LABS = [
  {
    slug: 'earth',
    name: '地球科学',
    nameEn: 'Earth Systems',
    focus: '把身边的地球系统做成可论证的探究现场。',
  },
  {
    slug: 'interaction',
    name: '交互设计',
    nameEn: 'Interaction Design',
    focus: '设计人与物、人与系统之间可感知的交互。',
  },
  {
    slug: 'embodied',
    name: '具身智能',
    nameEn: 'Embodied Intelligence',
    focus: '在身体、空间与机器协作中理解智能。',
  },
  {
    slug: 'logic',
    name: '逻辑博弈',
    nameEn: 'Logic & Games',
    focus: '用规则、策略与公平理解复杂决策。',
  },
  {
    slug: 'city',
    name: '未来都市',
    nameEn: 'Future Cities',
    focus: '构想更公平、更宜居的人类聚居方式。',
  },
  {
    slug: 'agri',
    name: '未来农业',
    nameEn: 'Future Agriculture',
    focus: '从土地、食物与生命联结重新认识生产。',
  },
  {
    slug: 'culture',
    name: '文化传承',
    nameEn: 'Cultural Continuity',
    focus: '让叙事、记忆与地方知识进入当下创造。',
  },
  {
    slug: 'art',
    name: '艺术设计',
    nameEn: 'Art & Design',
    focus: '以表达与形式回应真实的公共问题。',
  },
  {
    slug: 'making',
    name: '智能制造',
    nameEn: 'Intelligent Making',
    focus: '把想法做成可迭代的结构、机构与产品。',
  },
] as const


export const ALL_COURSES = {
  slug: 'all',
  name: '课程总览',
  nameEn: 'All Courses',
  focus: '全部已发布课程，跨九间研究室。按年级、学科、课时、教学弧与认知阶梯筛选。',
} as const

export type LabSlug = (typeof LABS)[number]['slug']

export const LAB_SELECT_OPTIONS = LABS.map((lab) => ({
  label: lab.name,
  value: lab.slug,
}))

export const GRADE_BANDS = [
  { id: 'g1-2', label: 'G1-G2', min: 1, max: 2 },
  { id: 'g3-6', label: 'G3-G6', min: 3, max: 6 },
  { id: 'g7-9', label: 'G7-G9', min: 7, max: 9 },
  { id: 'g10-12', label: 'G10-G12', min: 10, max: 12 },
] as const

export type GradeBandId = (typeof GRADE_BANDS)[number]['id']

export function getLab(slug: string) {
  if (slug === ALL_COURSES.slug) return ALL_COURSES
  return LABS.find((lab) => lab.slug === slug) ?? null
}

export function matchingGradeBands(min?: number | null, max?: number | null) {
  const a = min ?? max ?? 1
  const b = max ?? min ?? a
  return GRADE_BANDS.filter((band) => a <= band.max && b >= band.min)
}

export function gradeBandLabel(min?: number | null, max?: number | null) {
  const bands = matchingGradeBands(min, max)
  if (!bands.length) return 'G—'
  if (bands.length === 1) return bands[0].label
  return bands.map((band) => band.label).join(' · ')
}

export const COURSE_LAB_BY_SLUG: Record<string, LabSlug> = {
  manghe: 'interaction',
  'heliu-tegongdui': 'earth',
  'tansuo-xiaoyuan': 'earth',
  'huoxing-jidi': 'embodied',
}

export const FALLBACK_FEATURED = [
  {
    title: '盲盒课程',
    slug: 'manghe',
    subtitle: '把“惊喜”做成可设计的价值体验',
    gradeMin: 3,
    gradeMax: 6,
    totalHours: 16,
    subjects: ['艺术', '综合实践'],
    lab: 'interaction' as LabSlug,
  },
  {
    title: '河流特攻队',
    slug: 'heliu-tegongdui',
    subtitle: '把一条身边的河变成可论证的系统问题',
    gradeMin: 6,
    gradeMax: 9,
    totalHours: 32,
    subjects: ['科学', '人文社科'],
    lab: 'earth' as LabSlug,
  },
  {
    title: '碳索校园',
    slug: 'tansuo-xiaoyuan',
    subtitle: '把校园能耗变成可行动的低碳问题',
    gradeMin: 7,
    gradeMax: 11,
    totalHours: 32,
    subjects: ['科学', '数学', '综合实践'],
    lab: 'earth' as LabSlug,
  },
  {
    title: '火星基地',
    slug: 'huoxing-jidi',
    subtitle: '在极端约束中设计人类如何共同生活',
    gradeMin: 8,
    gradeMax: 12,
    totalHours: 48,
    subjects: ['科学', '信息技术', '人文社科'],
    lab: 'embodied' as LabSlug,
  },
]

export type LabTagKey = 'grade' | 'subject' | 'hours' | 'arc' | 'level'

export function labFilterHref(
  slug: string,
  current: Partial<Record<LabTagKey, string>>,
  key: LabTagKey,
  value: string,
) {
  const next = new URLSearchParams()
  for (const item of ['grade', 'subject', 'hours', 'arc', 'level'] as const) {
    const selected = item === key ? (current[item] === value ? '' : value) : current[item]
    if (selected) next.set(item, selected)
  }
  const qs = next.toString()
  return qs ? `/labs/${slug}?${qs}` : `/labs/${slug}`
}
