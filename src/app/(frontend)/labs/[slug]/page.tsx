import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LabCourseCard, type LabCourseCardData } from '@/components/courses/LabCourseCard'
import { LabTagBar, type TagGroup } from '@/components/labs/LabTagBar'
import { FALLBACK_FEATURED, GRADE_BANDS, getLab, matchingGradeBands, type LabTagKey } from '@/lib/labs'
import { conceptLabel, payloadClient } from '@/lib/payload'

type Search = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v || ''
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const lab = getLab(slug)
  if (!lab) return { title: '研究室' }
  return { title: lab.name, description: lab.focus }
}

export default async function LabDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Search>
}) {
  const { slug } = await params
  const lab = getLab(slug)
  if (!lab) notFound()

  const sp = await searchParams
  const current: Partial<Record<LabTagKey, string>> = {
    grade: first(sp.grade) || undefined,
    subject: first(sp.subject) || undefined,
    hours: first(sp.hours) || undefined,
    arc: first(sp.arc) || undefined,
    level: first(sp.level) || undefined,
  }

  let all: Array<LabCourseCardData & { teachingArc?: unknown; targetL?: unknown }> = []
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'courses',
      where:
        slug === 'all'
          ? { status: { equals: 'published' } }
          : { and: [{ status: { equals: 'published' } }, { lab: { equals: slug } }] },
      depth: 1,
      limit: 100,
      sort: 'title',
    })
    all = res.docs as unknown as typeof all
  } catch {
    all = slug === 'all' ? (FALLBACK_FEATURED as unknown as typeof all) : []
  }

  const subjects = Array.from(new Set(all.flatMap((course) => course.subjects || []))).sort()
  const hours = Array.from(new Set(all.map((course) => course.totalHours).filter((n): n is number => Boolean(n)))).sort(
    (a, b) => a - b,
  )
  const arcs = Array.from(
    new Map(
      all
        .map((course) => conceptLabel(course.teachingArc))
        .filter((item) => item.shortCode)
        .map((item) => [item.shortCode, `${item.shortCode} ${item.name}`.trim()]),
    ),
  )
  const levels = Array.from(
    new Map(
      all
        .map((course) => conceptLabel(course.targetL))
        .filter((item) => item.shortCode)
        .map((item) => [item.shortCode, item.shortCode]),
    ),
  )

  const groups: TagGroup[] = [
    { key: 'grade', label: '年级', options: GRADE_BANDS.map((band) => ({ value: band.id, label: band.label })) },
    { key: 'subject', label: '学科', options: subjects.map((value) => ({ value, label: value })) },
    { key: 'hours', label: '课时', options: hours.map((value) => ({ value: String(value), label: `${value} 课时` })) },
    { key: 'arc', label: '教学弧', options: arcs.map(([value, label]) => ({ value, label })) },
    { key: 'level', label: '认知阶梯', options: levels.map(([value, label]) => ({ value, label })) },
  ]

  const shown = all.filter((course) => {
    if (current.grade) {
      const band = GRADE_BANDS.find((item) => item.id === current.grade)
      if (band) {
        const hits = matchingGradeBands(course.gradeMin, course.gradeMax).some((item) => item.id === band.id)
        if (!hits) return false
      }
    }
    if (current.subject && !(course.subjects || []).includes(current.subject)) return false
    if (current.hours && String(course.totalHours) !== current.hours) return false
    if (current.arc && conceptLabel(course.teachingArc).shortCode !== current.arc) return false
    if (current.level && conceptLabel(course.targetL).shortCode !== current.level) return false
    return true
  })

  return (
    <>
      <section className="container-wide pb-6 pt-12">
        <article className="panel px-6 py-10 md:px-10">
          <p className="kicker">
            <Link href="/labs" className="no-underline">
              星球研究室
            </Link>
            {' / '}
            {lab.nameEn}
          </p>
          <h1 className="headline mt-4 text-5xl md:text-7xl">{lab.name}</h1>
          <p className="dek mt-5 max-w-2xl text-lg">{lab.focus}</p>
        </article>
      </section>

      <section className="container-wide pb-16">
        <LabTagBar slug={slug} groups={groups} current={current} />
        <p className="mt-6 text-sm text-muted">
          {shown.length ? `${shown.length} 门课程` : '此筛选下暂无课程。标签仍可切换。'}
        </p>
        <div className="mt-6 grid gap-4">
          {shown.map((course) => (
            <LabCourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </>
  )
}
