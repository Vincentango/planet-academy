import type { Payload } from 'payload'

function rich(text: string) {
  return {
    root: {
      type: 'root',
      children: text.split('\n\n').map((p) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p, version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const HOME_LAYOUT = [
  {
    blockType: 'hero',
    variant: 'split',
    eyebrow: '星球学院 · CRADLE-X',
    heading: '无边界未来学校',
    dek: 'BORDERLESS FUTURE SCHOOL',
    subheading: '',
    mediaCaption: 'CRADLE-X',
    mediaTitle: '星球学院',
    surface: 'paper',
    padding: 'normal',
    container: 'wide',
    actions: [],
  },
  {
    blockType: 'richText',
    kicker: '',
    display: 'editorial',
    heading: 'Driving Interdisciplinary\nIntegration with\nEmergent Technology',
    body: rich(
      '以前沿科技构建跨学科融合课程体系\n\n以真实世界问题驱动项目制学习方式',
    ),
    surface: 'paper',
    padding: 'normal',
    container: 'wide',
  },
  {
    blockType: 'videoQuote',
    url: '/samples/home-quote.mp4',
    english: 'Committed to Educational Sharing and Equity',
    chinese: '推动课程内容到基础设施再到运营模式的多维度升级',
  },
  {
    blockType: 'courseFeed',
    kicker: '课程精选',
    heading: '',
    moreLabel: '了解更多',
    moreHref: '/curriculum',
    mode: 'featured',
    limit: 4,
    display: 'flip',
    anchor: 'featured',
  },
]

const PHILOSOPHY_LAYOUT = [
  {
    blockType: 'hero',
    variant: 'split',
    eyebrow: '星球学院 · CRADLE-X',
    heading: '真实世界项目课',
    dek: '学习发生在世界里。课程是可以走进的资源库，不是一张必修课表。',
    subheading: '学生在真实议题中提出问题、做出东西、用证据说话。',
    mediaCaption: 'B3.0',
    mediaTitle: '关于理念',
    actions: [
      { label: '查看课程体系', href: '/curriculum', style: 'primary', visible: true },
      { label: '联系合作', href: '/contact', style: 'ghost', visible: true },
    ],
  },
  {
    blockType: 'richText',
    heading: '用真实世界项目课组织一所无边界学校',
    body: rich(
      '星球学院面向未来的学习者、家庭与合作学校。当机器能完成大量传统认知任务，教育要守住判断、创造、连接与行动这些不可外包的能力。\n\n学什么，由三个议题穿过九个场景、四个学段。怎么学，走五种教学弧。学会什么，看三层成长。',
    ),
  },
  {
    blockType: 'metrics',
    items: [
      { value: '议题', label: '人与自然', note: '' },
      { value: '议题', label: '人与技术', note: '' },
      { value: '议题', label: '人与人', note: '' },
    ],
  },
  {
    blockType: 'sceneGrid',
    kicker: '九个场景',
    heading: '学习发生的现场',
    items: [],
  },
  {
    blockType: 'cta',
    kicker: '三层成长',
    heading: '学会什么',
    body: '学科素养 · 方法与技能 · 可迁移能力。学什么＝议题×场景×学段；怎么学＝五种教学弧；学会什么＝三层成长',
    buttonLabel: '查看课程体系',
    buttonHref: '/curriculum',
  },
]

const SCENES_LAYOUT = [
  {
    blockType: 'hero',
    variant: 'stacked',
    eyebrow: 'NINE SCENES',
    heading: '九个场景',
    subheading: '课程是资源库：三个议题穿过九个场景、四个学段。先点场景，再按标签查看已开放与筹备中的课。',
  },
  {
    blockType: 'sceneGrid',
    kicker: '3 × 3',
    heading: '',
    items: [],
  },
]

const ABOUT_LAYOUT = [
  {
    blockType: 'hero',
    variant: 'stacked',
    eyebrow: '关于星球学院',
    heading: '把教育范式做成可检索、可治理的数字基础设施',
    subheading:
      '星球学院门户不是现有官网的翻新，也不是若干课程详情页的集合，而是以 B3.0 为内容中枢的数字化课程门户：品牌门户、课程知识库、内容生产系统与持续迭代基础设施。',
  },
  {
    blockType: 'richText',
    heading: '第一阶段边界',
    body: rich(
      '本站第一阶段提供理念展示、课程档案、Payload CMS、数据库与媒体上传（图片与视频）。不提供完整 LMS、支付、SIS、社交或学生账号。\n\nB3.0 是公开课程系统。如需合作或课程共创，请前往联系页。',
    ),
  },
]

const PAGES = [
  {
    slug: 'home',
    title: '首页',
    excerpt: '星球学院公开门户。',
    seo: { title: '星球学院 / CRADLE-X', description: '未来无边界学校。真实世界项目课。' },
    layout: HOME_LAYOUT,
  },
  {
    slug: 'philosophy',
    title: '理念',
    excerpt: '真实世界项目课。',
    seo: { title: '关于理念', description: '三个议题、九个场景、四个学段、五种教学弧、三层成长。' },
    layout: PHILOSOPHY_LAYOUT,
  },
  {
    slug: 'scenes',
    title: '场景',
    excerpt: '九个场景。',
    seo: { title: '九个场景', description: '九个真实世界场景，是资源库的浏览脊骨。' },
    layout: SCENES_LAYOUT,
  },
  {
    slug: 'about',
    title: '关于',
    excerpt: '关于星球学院。',
    seo: { title: '关于我们', description: '星球学院 / CRADLE-X' },
    layout: ABOUT_LAYOUT,
  },
]

export async function ensurePublicComposer(payload: Payload) {
  for (const page of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs[0]) {
      const doc = existing.docs[0] as { id: string | number; layout?: { blockType?: string }[] }
      const layoutText = JSON.stringify(doc.layout || [])
      const homeCopyStale =
        page.slug === 'home' &&
        (['学习发生在世界里', '当机器能完成大量传统认知任务', '一所把真实世界当作校园的学校', '在真实议题中看见世界', '从项目进入学校', '进入九个场景', '整体介绍', '未来无边界学校', 'sample-01.mp4', 'sample-02', 'sample-03', 'five-pillars.png'].some((s) =>
          layoutText.includes(s),
        ) ||
          !layoutText.includes('videoQuote'))
      const stale =
        !doc.layout ||
        !doc.layout.length ||
        (page.slug === 'home' && homeCopyStale)
      if (stale) {
        await payload.update({
          collection: 'pages',
          id: doc.id,
          overrideAccess: true,
          data: { layout: page.layout as never, status: 'published', title: page.title, seo: page.seo },
        })
      }
      continue
    }
    await payload.create({
      collection: 'pages',
      overrideAccess: true,
      data: {
        title: page.title,
        slug: page.slug,
        excerpt: page.excerpt,
        seo: page.seo,
        status: 'published',
        layout: page.layout as never,
      },
    })
  }

  const curriculum = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'curriculum' } },
    limit: 1,
    overrideAccess: true,
  })
  if (curriculum.docs[0]) {
    const doc = curriculum.docs[0] as { id: string | number; layout?: { blockType?: string }[] }
    const layout = (doc.layout || []).filter((b) => b.blockType !== 'sceneGrid')
    if (layout.length !== (doc.layout || []).length) {
      await payload.update({
        collection: 'pages',
        id: doc.id,
        overrideAccess: true,
        data: { layout: layout as never },
      })
    }
  }

  const settings = (await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })) as Record<string, unknown>
  const nav = settings.nav as unknown[] | undefined
  const tokens = (settings.tokens as Record<string, string> | undefined) || {}
  const interaction = (settings.interaction as Record<string, unknown> | undefined) || {}
  const patch: Record<string, unknown> = {}
  if (!settings.siteName) patch.siteName = '星球学院'
  if (!settings.siteNameEn || settings.siteNameEn === 'PLANET ACADEMY') patch.siteNameEn = 'CRADLE-X'
  if (!settings.tagline) patch.tagline = '未来无边界学校'
  const footerDefault = '星球学院是一所未来无边界学校。公开门户先定位学校，再进入课程体系。'
  if (!settings.footerNote) {
    patch.footerNote = footerDefault
  } else if (
    String(settings.footerNote).includes('公开成果默认匿名') ||
    String(settings.footerNote).includes('进入九个场景')
  ) {
    const cleaned = String(settings.footerNote)
      .replace(/公开成果默认匿名[。.]?/g, '')
      .replace(/进入九个场景里的课程/g, '进入课程体系')
      .replace(/进入九个场景/g, '进入课程体系')
      .replace(/\s{2,}/g, ' ')
      .replace(/。[。]+/g, '。')
      .trim()
    patch.footerNote = cleaned || footerDefault
  }
  if (!settings.paradigmVersion) patch.paradigmVersion = 'B3.0'
  const navText = JSON.stringify(nav || [])
  const navDirty =
    !nav ||
    !nav.length ||
    navText.includes('/philosophy') ||
    navText.includes('/scenes"') ||
    navText.includes('理念') ||
    navText.includes('/paradigm') ||
    navText.includes('/projects') ||
    navText.includes('教育范式') ||
    navText.includes('项目成果') ||
    navText.includes('档案')
  if (navDirty) {
    patch.nav = [
      { label: '首页', href: '/', visible: true },
      { label: '课程体系', href: '/curriculum', visible: true },
      { label: '关于', href: '/about', visible: true },
    ]
  }
  const cream = new Set(['#EDEDE8', '#F4F1EA', '#f4f1ea', '#ede8e0'])
  const yellow = new Set(['#f5d84c', '#F5D84C'])
  const peach = new Set(['#f5ad6e', '#F5AD6E'])
  const plump = new Set(['1.75rem', '0.75rem'])
  patch.tokens = {
    paper: tokens.paper && !cream.has(tokens.paper) ? tokens.paper : '#F7F6F3',
    ink: tokens.ink || '#111111',
    panel: tokens.panel || '#ffffff',
    chipYellow: tokens.chipYellow && !yellow.has(tokens.chipYellow) ? tokens.chipYellow : '#111111',
    chipPeach: tokens.chipPeach && !peach.has(tokens.chipPeach) ? tokens.chipPeach : '#d8d4cc',
    accent: tokens.accent && !yellow.has(tokens.accent) ? tokens.accent : '#111111',
    radius: tokens.radius && !plump.has(tokens.radius) ? tokens.radius : '0.125rem',
    maxWidth: tokens.maxWidth || '74rem',
  }
  patch.interaction = {
    cardFlip: interaction.cardFlip || 'hover',
    videoAutoplay: Boolean(interaction.videoAutoplay),
    chipFilter: 'chips',
    motion: interaction.motion || 'on',
  }
  await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, data: patch as never })
}
