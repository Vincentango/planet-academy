import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { conceptLabel, gradeBand, payloadClient } from '@/lib/payload'

type Course = {
  title: string
  subtitle?: string | null
  slug: string
  summary: string
  sampleFlag?: boolean | null
  gradeMin?: number | null
  gradeMax?: number | null
  totalHours?: number | null
  drivingQuestion?: string | null
  subjects?: string[] | null
  materials?: string | null
  hardware?: string | null
  software?: string | null
  safety?: string | null
  assessments?: string | null
  evidence?: string | null
  primaryX?: unknown
  primaryY?: unknown
  secondaryX?: unknown
  secondaryY?: unknown
  targetC?: unknown
  primaryT?: unknown
  targetL?: unknown
  teachingArc?: unknown
  domainPathways?: unknown
  trackAffinity?: unknown
  modules?: unknown
  seo?: { title?: string | null; description?: string | null } | null
}

function list(rel: unknown): { shortCode: string; name: string }[] {
  const arr = Array.isArray(rel) ? rel : rel ? [rel] : []
  return arr.map((item) => conceptLabel(item)).filter((i) => i.name)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await payloadClient()
    const res = await payload.find({ collection: 'courses', where: { slug: { equals: slug } }, limit: 1 })
    const course = res.docs[0] as unknown as Course | undefined
    if (!course) return { title: '课程' }
    return { title: course.seo?.title || course.title, description: course.seo?.description || course.summary }
  } catch {
    return { title: '课程' }
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let course: Course | null = null
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'courses',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    course = (res.docs[0] as unknown as Course) || null
  } catch {
    course = null
  }
  if (!course) notFound()

  const modules = (Array.isArray(course.modules) ? course.modules : []) as {
    id?: string
    title?: string
    hours?: number
    goal?: string
    task?: string
    output?: string
    evidence?: string
  }[]

  return (
    <article className="container-wide pb-16 pt-12">
      <p className="kicker">
        {gradeBand(course.gradeMin, course.gradeMax)} · {course.totalHours} 课时
        {course.sampleFlag ? ' · 示例课程' : ''}
      </p>
      <h1 className="headline mt-3 text-4xl">{course.title}</h1>
      {course.subtitle ? <p className="mt-2 text-lg text-muted">{course.subtitle}</p> : null}
      <p className="mt-6 max-w-3xl leading-8">{course.summary}</p>
      <section className="mt-10 border border-rule bg-paper p-5">
        <h2 className="text-sm text-muted">驱动性问题</h2>
        <p className="mt-2 text-xl leading-8">{course.drivingQuestion}</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['主 X', list(course.primaryX)],
          ['主 Y', list(course.primaryY)],
          ['教学弧', list(course.teachingArc)],
          ['目标 C', list(course.targetC)],
          ['核心 T', list(course.primaryT)],
          ['目标 L', list(course.targetL)],
          ['领域路径', list(course.domainPathways)],
          ['赛道倾向', list(course.trackAffinity)],
          ['学科', (course.subjects || []).map((name) => ({ shortCode: '', name }))],
        ].map(([label, items]) => (
          <div key={String(label)} className="border border-rule bg-paper p-4">
            <p className="text-xs text-muted">{String(label)}</p>
            <p className="mt-2 text-sm leading-7">
              {(items as { shortCode: string; name: string }[]).map((i) => `${i.shortCode} ${i.name}`.trim()).join('、') || '—'}
            </p>
          </div>
        ))}
      </section>
      <section className="mt-10">
        <h2 className="headline text-2xl">模块时间线</h2>
        <ol className="mt-5 grid gap-4">
          {modules.map((mod, i) => (
            <li key={mod.id || i} className="border border-rule bg-paper p-5">
              <p className="kicker">模块 {i + 1}{mod.hours ? ` · ${mod.hours} 课时` : ''}</p>
              <h3 className="mt-1 headline text-lg">{mod.title}</h3>
              <dl className="mt-3 grid gap-2 text-sm leading-7 md:grid-cols-2">
                <div><dt className="text-muted">目标</dt><dd>{mod.goal}</dd></div>
                <div><dt className="text-muted">任务</dt><dd>{mod.task}</dd></div>
                <div><dt className="text-muted">输出</dt><dd>{mod.output}</dd></div>
                <div><dt className="text-muted">证据</dt><dd>{mod.evidence}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="border border-rule bg-paper p-5">
          <h2 className="font-semibold">物料 / 硬件 / 软件</h2>
          <p className="mt-3 text-sm leading-7 text-muted">物料：{course.materials}</p>
          <p className="mt-2 text-sm leading-7 text-muted">硬件：{course.hardware}</p>
          <p className="mt-2 text-sm leading-7 text-muted">软件：{course.software}</p>
        </article>
        <article className="border border-rule bg-paper p-5">
          <h2 className="font-semibold">安全、评价与证据</h2>
          <p className="mt-3 text-sm leading-7 text-muted">安全：{course.safety}</p>
          <p className="mt-2 text-sm leading-7 text-muted">评价：{course.assessments}</p>
          <p className="mt-2 text-sm leading-7 text-muted">证据：{course.evidence}</p>
        </article>
      </section>
    </article>
  )
}
