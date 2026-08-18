import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { CourseCard } from '@/components/courses/CourseCard'
import { payloadClient } from '@/lib/payload'
import Link from 'next/link'

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
    return <RenderBlocks blocks={page.layout} courses={courses} concepts={concepts} />
  }

  return (
    <>
      <section className="container-wide pb-10 pt-14">
        <p className="text-xs tracking-[0.24em] text-lime">PLANET ACADEMY · B1.0</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
          帮助每一个学生找到作为人类的不可替代性
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          AI 时代的教育，不是“人机竞争”的教育，而是“人机协作”的教育。星球学院以六大核心能力目标（C1-C6）为顶层设计，以 XYZ 三维坐标课程框架为核心结构，以五种教学弧为实施路径，以四维标签为评价语言，以五重闭环实现可持续运行。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/paradigm" className="rounded-full bg-lime px-5 py-2 text-sm font-semibold text-[#102016] no-underline">阅读教育范式</Link>
          <Link href="/courses" className="rounded-full border border-line px-5 py-2 text-sm no-underline">进入课程中心</Link>
        </div>
      </section>
      <section className="container-wide py-10">
        <h2 className="text-2xl font-semibold">WHY → WHAT → HOW → PROVE</h2>
        <p className="mt-3 max-w-3xl text-muted">四层不是并列，而是严格的因果推导。每一层设计都必须通过一个核心检验：这个设计如何服务于 C1-C6 的培养目标？</p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            ['WHY', '范式基础', '/paradigm/why', 'AI 边界、七大独特能力、C1-C6、人机边界'],
            ['WHAT', '课程框架', '/paradigm/xyz', 'X 议题、Y 透镜、Z 双层能力'],
            ['HOW', '教学实施', '/paradigm/teaching-arcs', '五种教学弧与 L1-L6'],
            ['PROVE', '评价体系', '/paradigm/assessment', '四维标签与赛道倾向'],
            ['SUSTAIN', '五重闭环', '/paradigm/ecosystem', '范式、课程、教师、生态、个体'],
          ].map(([code, title, href, summary]) => (
            <Link key={code} href={href} className="rounded-2xl border border-line bg-card p-4 no-underline">
              <p className="text-xs tracking-[0.2em] text-lime">{code}</p>
              <p className="mt-2 font-semibold">{title}</p>
              <p className="mt-2 text-sm text-muted">{summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-wide py-10">
        <h2 className="text-2xl font-semibold">C1-C6</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(concepts.length ? concepts : [
            { shortCode: 'C1', layer: '基础层', name: '批判性感知与伦理判断', shortDefinition: '通过真实体验形成感知，在价值冲突中做出有担当的判断。' },
            { shortCode: 'C2', layer: '核心层', name: '创造性表达与原创生产', shortDefinition: '突破已有模式，产生真正原创性的作品、方案或想法。' },
            { shortCode: 'C3', layer: '核心层', name: '深度连接与协作共情', shortDefinition: '建立真实的人际信任，在团队中实现真正的协作与共情。' },
            { shortCode: 'C4', layer: '核心层', name: '复杂系统思维与问题解决', shortDefinition: '理解复杂系统的动态关系，在不确定情境中做出有效判断。' },
            { shortCode: 'C5', layer: '基础层', name: '意义建构与自我驱动', shortDefinition: '为自己的学习和行动赋予意义，建立持久的内在动机。' },
            { shortCode: 'C6', layer: '整合层', name: '共同行动与社会变革', shortDefinition: '在复杂社会系统中组织、动员他人，推动真实的共同行动。' },
          ]).map((c) => (
            <article key={String((c as { shortCode?: string }).shortCode)} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs text-lime">{String((c as { shortCode?: string }).shortCode)} · {String((c as { layer?: string }).layer || '')}</p>
              <h3 className="mt-2 text-lg font-semibold">{String((c as { name?: string }).name)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{String((c as { shortDefinition?: string }).shortDefinition)}</p>
            </article>
          ))}
        </div>
        <p className="mt-4"><Link href="/paradigm/capabilities" className="text-sm text-lime">查看能力详情</Link></p>
      </section>
      <section className="container-wide py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">示例课程</h2>
          <Link href="/courses" className="text-sm text-lime">课程中心</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={String((course as { slug?: string }).slug)} course={course as never} />
          ))}
        </div>
      </section>
    </>
  )
}
