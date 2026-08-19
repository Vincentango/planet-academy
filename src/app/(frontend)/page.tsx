import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { SampleVideo } from '@/components/site/SampleVideo'
import { FALLBACK_FEATURED } from '@/lib/labs'
import { payloadClient } from '@/lib/payload'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const CLIPS = [
  {
    src: '/samples/sample-01.mp4',
    label: '示例影像 01',
    title: '研究室现场',
    body: '占位影像。待替换为研究室现场与学生工作过程。',
  },
  {
    src: '/samples/sample-02.mp4',
    label: '示例影像 02',
    title: '项目推进',
    body: '占位影像。待替换为提出问题、做出东西、用证据说话的过程。',
  },
  {
    src: '/samples/sample-03.mp4',
    label: '示例影像 03',
    title: '无边界校园',
    body: '占位影像。待替换为学习发生在世界里的真实片段。',
  },
]

const LINES = [
  {
    tone: 'highlighter--yellow',
    text: '当机器能完成大量传统认知任务，教育要守住判断、创造、连接与行动这些不可外包的能力。',
  },
  {
    tone: 'highlighter--peach',
    text: '在真实议题中看见世界，用认知透镜看清结构，朝人的成长维度前进。',
  },
  {
    tone: 'highlighter--charcoal',
    text: '以研究室项目推进学习：提出问题、做出东西、用证据说话，而不是只完成一份作业。',
  },
]

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
      <section className="container-wide pb-6 pt-6 md:pt-8">
        <article className="gsd-split">
          <div className="gsd-split__media gsd-split__media--hero">
            <span className="gsd-split__caption chip-yellow">CRADLE-X</span>
            <p className="headline text-5xl text-white md:text-6xl">星球学院</p>
          </div>
          <div className="gsd-split__copy">
            <p className="kicker">星球学院 · CRADLE-X</p>
            <h1 className="headline mt-5 text-4xl md:text-6xl">未来无边界学校</h1>
            <p className="mt-6 max-w-xl text-xl font-medium leading-8">
              学习发生在世界里，而不是只发生在教室里。
            </p>
            <p className="dek mt-3 max-w-xl text-base">
              九个研究室连接真实议题、认知方法与人的成长。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/labs" className="btn-ink no-underline">
                进入星球研究室
              </Link>
              <Link href="#featured" className="btn-ghost no-underline">
                查看精选课
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="container-wide py-6">
        <article className="panel px-6 py-10 md:px-10 md:py-14">
          <p className="kicker">整体介绍</p>
          <h2 className="headline mt-4 text-3xl md:text-4xl">一所把真实世界当作校园的学校</h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-muted md:text-lg">
            <p>
              星球学院面向未来的学习者、家庭与合作学校。我们不把知识关在分科教室里，而把它放进可以行走、测量、争论和制作的现场。
            </p>
            <p>
              公开门户先讲清这所学校是谁、为何存在；课程则收在星球研究室里。这里不是学习管理系统，而是一所无边界学校的门厅。
            </p>
          </div>
        </article>
      </section>

      <section className="mosaic-bleed">
        <div className="mosaic">
          <article className="mosaic__tile mosaic__tile--v1">
            <SampleVideo
              src={CLIPS[0].src}
              label={CLIPS[0].label}
              title={CLIPS[0].title}
              caption={CLIPS[0].body}
            />
          </article>
          <aside className="mosaic__tile mosaic__tile--t1 highlighter highlighter--yellow">
            <p>{LINES[0].text}</p>
          </aside>
          <article className="mosaic__tile mosaic__tile--v2">
            <SampleVideo
              src={CLIPS[1].src}
              label={CLIPS[1].label}
              title={CLIPS[1].title}
              caption={CLIPS[1].body}
            />
          </article>
          <aside className="mosaic__tile mosaic__tile--t2 highlighter highlighter--peach">
            <p>{LINES[1].text}</p>
          </aside>
          <article className="mosaic__tile mosaic__tile--v3">
            <SampleVideo
              src={CLIPS[2].src}
              label={CLIPS[2].label}
              title={CLIPS[2].title}
              caption={CLIPS[2].body}
            />
          </article>
          <aside className="mosaic__tile mosaic__tile--t3 highlighter highlighter--charcoal">
            <p>{LINES[2].text}</p>
          </aside>
        </div>
      </section>

      <section id="featured" className="container-wide py-10 pb-16">
        <p className="kicker">课程精选</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="headline text-3xl md:text-4xl">从项目进入学校</h2>
          <Link href="/labs" className="text-sm font-semibold no-underline">
            全部研究室
          </Link>
        </div>
        <div className="course-grid mt-8">
          {courses.slice(0, 4).map((course, i) => (
            <CourseFlipCard key={course.slug} course={course} tone={i} />
          ))}
        </div>
      </section>
    </>
  )
}
