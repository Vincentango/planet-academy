import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLab, gradeBandLabel } from '@/lib/labs'
import { conceptLabel, payloadClient } from '@/lib/payload'

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
  lab?: string | null
  materials?: string | null
  hardware?: string | null
  software?: string | null
  safety?: string | null
  assessments?: string | null
  evidence?: string | null
  targetC?: unknown
  teachingArc?: unknown
  targetL?: unknown
  modules?: unknown
  seo?: { title?: string | null; description?: string | null } | null
}

type Search = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v || ''
}

function list(rel: unknown): { shortCode: string; name: string; shortDefinition?: string }[] {
  const arr = Array.isArray(rel) ? rel : rel ? [rel] : []
  return arr
    .map((item) => {
      const label = conceptLabel(item)
      const extra = item && typeof item === 'object' ? (item as { shortDefinition?: string }).shortDefinition : ''
      return { ...label, shortDefinition: extra || '' }
    })
    .filter((i) => i.name)
}

const TABS = [
  { id: 'outline', label: '理念与纲要' },
  { id: 'modules', label: '模块与材料' },
  { id: 'outcomes', label: '课程成果' },
] as const

type TabId = (typeof TABS)[number]['id']

export const dynamic = 'force-dynamic'

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

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Search>
}) {
  const { slug } = await params
  const sp = await searchParams
  const tabRaw = first(sp.tab)
  const tab: TabId = TABS.some((item) => item.id === tabRaw) ? (tabRaw as TabId) : 'outline'

  let course: Course | null = null
  let projects: { title: string; slug: string; summary: string; processNote?: string | null }[] = []
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'courses',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    course = (res.docs[0] as unknown as Course) || null
    if (course) {
      const projectRes = await payload.find({
        collection: 'projects',
        where: {
          and: [{ status: { equals: 'published' } }, { 'course.slug': { equals: slug } }],
        },
        limit: 12,
      })
      projects = projectRes.docs as unknown as typeof projects
    }
  } catch {
    course = course
  }
  if (!course) notFound()

  const lab = course.lab ? getLab(course.lab) : null
  const growth = list(course.targetC)
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
    <article className="pb-20">
      <section className="container-wide pt-14">
        <p className="kicker">
          {lab ? (
            <Link href={`/labs/${lab.slug}`} className="no-underline">
              {lab.name}
            </Link>
          ) : (
            '课程'
          )}
          {' · '}
          {gradeBandLabel(course.gradeMin, course.gradeMax)}
          {course.totalHours ? ` · ${course.totalHours} 课时` : ''}
          {course.sampleFlag ? ' · 示例课程' : ''}
        </p>
        <h1 className="headline mt-4 max-w-4xl text-4xl md:text-6xl">{course.title}</h1>
        {course.subtitle ? <p className="mt-4 max-w-3xl text-xl text-muted">{course.subtitle}</p> : null}

        <nav className="bookmark-bar" aria-label="课程书签">
          {TABS.map((item) => (
            <Link
              key={item.id}
              href={`/courses/${course.slug}?tab=${item.id}`}
              className="bookmark-tab"
              data-active={tab === item.id ? 'true' : 'false'}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      {tab === 'outline' ? (
        <section className="container-wide pt-10">
          <div className="course-overview">
            <div>
              <p className="kicker">驱动性问题</p>
              <p className="driving-q">{course.drivingQuestion}</p>
              <h2 className="headline mt-12 text-3xl">纲要</h2>
              <p className="mt-5 max-w-3xl text-base leading-8">{course.summary}</p>
              {course.subjects?.length ? (
                <p className="mt-6 text-sm text-muted">学科：{course.subjects.join(' · ')}</p>
              ) : null}
            </div>
            <aside className="course-side">
              <p className="kicker">学生成长维度</p>
              <h2 className="headline mt-2 text-2xl">C1–C6</h2>
              <ol className="mt-6 space-y-5">
                {growth.length ? (
                  growth.map((item) => (
                    <li key={item.shortCode}>
                      <p className="font-semibold">
                        {item.shortCode} {item.name}
                      </p>
                      {item.shortDefinition ? <p className="mt-1 text-sm leading-7 text-muted">{item.shortDefinition}</p> : null}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted">此课程尚未标注成长维度。</li>
                )}
              </ol>
              <p className="mt-8 text-xs leading-6 text-muted">
                {conceptLabel(course.teachingArc).shortCode
                  ? `教学弧 ${conceptLabel(course.teachingArc).shortCode} ${conceptLabel(course.teachingArc).name}`
                  : ''}
                {conceptLabel(course.targetL).shortCode
                  ? ` · 认知阶梯 ${conceptLabel(course.targetL).shortCode}`
                  : ''}
              </p>
            </aside>
          </div>
        </section>
      ) : null}

      {tab === 'modules' ? (
        <section className="container-wide pt-10">
          <h2 className="headline text-3xl">模块</h2>
          <ol className="mt-6 grid gap-4">
            {modules.length ? (
              modules.map((mod, i) => (
                <li key={mod.id || i} className="border border-rule bg-paper p-5">
                  <p className="kicker">
                    模块 {i + 1}
                    {mod.hours ? ` · ${mod.hours} 课时` : ''}
                  </p>
                  <h3 className="headline mt-1 text-lg">{mod.title}</h3>
                  <dl className="mt-3 grid gap-2 text-sm leading-7 md:grid-cols-2">
                    <div>
                      <dt className="text-muted">目标</dt>
                      <dd>{mod.goal}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">任务</dt>
                      <dd>{mod.task}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">输出</dt>
                      <dd>{mod.output}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">证据</dt>
                      <dd>{mod.evidence}</dd>
                    </div>
                  </dl>
                </li>
              ))
            ) : (
              <li className="text-muted">模块尚未发布。</li>
            )}
          </ol>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['物料', course.materials],
              ['硬件', course.hardware],
              ['软件', course.software],
            ].map(([label, body]) => (
              <article key={String(label)} className="border border-rule bg-paper p-5">
                <h3 className="font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{body || '—'}</p>
              </article>
            ))}
          </div>
          {course.safety ? <p className="mt-6 text-sm leading-7 text-muted">安全：{course.safety}</p> : null}
        </section>
      ) : null}

      {tab === 'outcomes' ? (
        <section className="container-wide pt-10">
          <h2 className="headline text-3xl">课程成果</h2>
          {projects.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.slug} className="border border-rule bg-paper p-5">
                  <h3 className="headline text-xl">{project.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{project.summary}</p>
                  {project.processNote ? <p className="mt-3 text-sm text-muted">{project.processNote}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-2xl leading-8 text-muted">此课程尚未公开成果。过程证据与项目故事会在这里出现。</p>
          )}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="border border-rule bg-paper p-5">
              <h3 className="font-semibold">证据要求</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{course.evidence || '—'}</p>
            </article>
            <article className="border border-rule bg-paper p-5">
              <h3 className="font-semibold">评价</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{course.assessments || '—'}</p>
            </article>
          </div>
        </section>
      ) : null}
    </article>
  )
}
