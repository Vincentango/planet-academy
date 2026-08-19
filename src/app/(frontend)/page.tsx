import { LabCourseCard } from '@/components/courses/LabCourseCard'
import { FALLBACK_FEATURED } from '@/lib/labs'
import { payloadClient } from '@/lib/payload'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let courses = FALLBACK_FEATURED
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'courses',
      where: { status: { equals: 'published' } },
      limit: 4,
      depth: 1,
      sort: '-featured',
    })
    if (res.docs.length) {
      courses = res.docs as unknown as typeof FALLBACK_FEATURED
    }
  } catch {
    courses = FALLBACK_FEATURED
  }

  return (
    <>
      <section className="hero-minerva">
        <div className="container-wide py-24 md:py-32">
          <p className="kicker">星球学院 · PLANET ACADEMY</p>
          <h1 className="headline mt-6 max-w-5xl text-5xl md:text-7xl lg:text-[5.4rem]">
            未来无边界学校
          </h1>
          <p className="mt-8 max-w-xl text-xl font-medium leading-8 md:text-2xl">
            学习发生在世界里，而不是只发生在教室里。
          </p>
          <p className="dek mt-4 max-w-xl text-base md:text-lg">
            九个研究室连接真实议题、认知方法与人的成长。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/labs" className="btn-ink no-underline">
              进入星球研究室
            </Link>
            <Link href="#featured" className="btn-ghost no-underline">
              查看精选课
            </Link>
          </div>
        </div>
      </section>

      <section className="container-content py-24">
        <p className="kicker">整体介绍</p>
        <h2 className="headline mt-4 text-3xl md:text-4xl">一所把真实世界当作校园的学校</h2>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted md:text-lg">
          <p>
            星球学院面向未来的学习者、家庭与合作学校。我们不把知识关在分科教室里，而把它放进可以行走、测量、争论和制作的现场。
          </p>
          <p>
            公开门户先讲清这所学校是谁、为何存在；课程则收在星球研究室里。这里不是学习管理系统，而是一所无边界学校的门厅。
          </p>
        </div>
      </section>

      <section className="band-grey py-24">
        <div className="container-wide">
          <p className="kicker">教育理念</p>
          <h2 className="headline mt-4 text-3xl md:text-4xl">先问为什么，再决定学什么、怎么学</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ['WHY', '当机器能完成大量传统认知任务，教育要守住判断、创造、连接与行动这些不可外包的能力。'],
              ['WHAT', '在真实议题中看见世界，用认知透镜看清结构，朝人的成长维度前进。'],
              ['HOW', '以研究室项目推进学习：提出问题、做出东西、用证据说话，而不是只完成一份作业。'],
            ].map(([code, body]) => (
              <article key={code}>
                <p className="kicker">{code}</p>
                <p className="mt-4 text-base leading-8">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="container-wide py-24">
        <p className="kicker">课程精选</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="headline text-3xl md:text-4xl">从项目进入学校</h2>
          <Link href="/labs" className="text-sm font-semibold no-underline">
            全部研究室
          </Link>
        </div>
        <div className="mt-10 grid gap-4">
          {courses.slice(0, 4).map((course) => (
            <LabCourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </>
  )
}
