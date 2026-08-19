import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { CourseCard } from '@/components/courses/CourseCard'
import { HeroCarousel } from '@/components/site/HeroCarousel'
import { NewsletterStrip } from '@/components/site/NewsletterStrip'
import { payloadClient } from '@/lib/payload'
import Link from 'next/link'

const FALLBACK_CONCEPTS = [
  { shortCode: 'C1', layer: '基础层', name: '批判性感知与伦理判断', shortDefinition: '通过真实体验形成感知，在价值冲突中做出有担当的判断。' },
  { shortCode: 'C2', layer: '核心层', name: '创造性表达与原创生产', shortDefinition: '突破已有模式，产生真正原创性的作品、方案或想法。' },
  { shortCode: 'C3', layer: '核心层', name: '深度连接与协作共情', shortDefinition: '建立真实的人际信任，在团队中实现真正的协作与共情。' },
  { shortCode: 'C4', layer: '核心层', name: '复杂系统思维与问题解决', shortDefinition: '理解复杂系统的动态关系，在不确定情境中做出有效判断。' },
  { shortCode: 'C5', layer: '基础层', name: '意义建构与自我驱动', shortDefinition: '为自己的学习和行动赋予意义，建立持久的内在动机。' },
  { shortCode: 'C6', layer: '整合层', name: '共同行动与社会变革', shortDefinition: '在复杂社会系统中组织、动员他人，推动真实的共同行动。' },
]

export default async function HomePage() {
  let page: { layout?: Record<string, unknown>[] } | null = null
  let courses: Record<string, unknown>[] = []
  let concepts: Record<string, unknown>[] = []

  try {
    const payload = await payloadClient()
    const [pages, courseRes, conceptRes] = await Promise.all([
      payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 2 }),
      payload.find({
        collection: 'courses',
        where: { status: { equals: 'published' } },
        limit: 4,
        depth: 1,
        sort: '-featured',
      }),
      payload.find({ collection: 'concepts', where: { family: { equals: 'C' } }, sort: 'sort', limit: 6 }),
    ])
    page = pages.docs[0] as unknown as { layout?: Record<string, unknown>[] }
    courses = courseRes.docs as unknown as Record<string, unknown>[]
    concepts = conceptRes.docs as unknown as Record<string, unknown>[]
  } catch {
    page = null
  }

  if (page?.layout?.length) {
    const hasForm = page.layout.some((b) => String((b as { blockType?: string }).blockType) === 'form')
    return (
      <>
        <RenderBlocks blocks={page.layout} courses={courses} concepts={concepts} />
        {hasForm ? null : <NewsletterStrip />}
      </>
    )
  }

  const shown = concepts.length ? concepts : FALLBACK_CONCEPTS

  return (
    <>
      <section className="hero-band">
        <div className="promo-strip">
          <p className="container-wide py-2.5">B1.0 正式基线 →</p>
        </div>
        <div className="container-wide grid gap-6 py-10 md:grid-cols-[1.25fr_0.75fr]">
          <article className="hero-card">
            <p className="kicker">教育范式</p>
            <p className="mt-3"><span className="badge-new">范式</span></p>
            <h1 className="headline mt-4 text-4xl md:text-[3.4rem] md:leading-[1.05]">
              帮助每一个学生找到作为人类的不可替代性
            </h1>
            <p className="dek mt-5 text-base md:text-lg">
              AI 时代的教育，不是“人机竞争”的教育，而是“人机协作”的教育。星球学院以六大核心能力目标（C1-C6）为顶层设计，以 XYZ 三维坐标课程框架为核心结构，以五种教学弧为实施路径，以四维标签为评价语言，以五重闭环实现可持续运行。
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/paradigm" className="link-accent text-sm font-semibold">阅读教育范式</Link>
              <Link href="/courses" className="link-accent text-sm font-semibold">进入课程中心</Link>
            </div>
          </article>
          <HeroCarousel />
        </div>
      </section>

      <section className="band-grey py-16">
        <div className="container-wide collection-rule">
          <p className="badge-collection">Collection</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <h2 className="section-head mb-0 border-0 pt-0">Most Popular / 精选课程</h2>
            <Link href="/courses" className="text-sm font-semibold no-underline">课程中心</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={String((course as { slug?: string }).slug)} course={course as never} />
            ))}
          </div>
        </div>
      </section>

      <section className="band-grey py-16">
        <div className="container-wide collection-rule">
          <p className="badge-collection">Collection</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <h2 className="section-head mb-0 border-0 pt-0">10 Things / C1–C6</h2>
            <Link href="/paradigm/capabilities" className="text-sm font-semibold no-underline">查看能力详情</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {shown.map((c, n) => (
              <article key={String((c as { shortCode?: string }).shortCode)} className="explain-item">
                <p className="kicker">• {n + 1} / {shown.length}</p>
                <p className="kicker mt-2">{String((c as { shortCode?: string }).shortCode)} · {String((c as { layer?: string }).layer || '')}</p>
                <h3 className="headline mt-2 text-xl">{String((c as { name?: string }).name)}</h3>
                <p className="dek mt-2 text-sm">{String((c as { shortDefinition?: string }).shortDefinition)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-black">
        <div className="container-wide grid gap-8 py-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="kicker text-white/55">Magazine</p>
            <p className="mt-3 text-sm tracking-[0.16em] text-white/70">B1.0 范式专刊</p>
            <h2 className="headline mt-4 text-4xl text-white">阅读教育范式</h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-white/80">
              WHY → WHAT → HOW → PROVE，以及五重闭环。把理念做成可检索、可治理的数字基础设施。
            </p>
            <Link href="/paradigm" className="btn-white mt-6 no-underline">阅读教育范式</Link>
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </>
  )
}
