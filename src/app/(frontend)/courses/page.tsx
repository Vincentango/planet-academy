import type { Where } from 'payload'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { CoursePager } from '@/components/courses/CoursePager'
import { PageHero } from '@/components/site/PageHero'
import { parsePage, type CourseFilterParams } from '@/lib/course-listing'
import { payloadClient } from '@/lib/payload'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: '课程中心' }

type Search = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v || ''
}

export default async function CoursesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams
  const q = first(sp.q)
  const grade = first(sp.grade)
  const x = first(sp.x)
  const y = first(sp.y)
  const c = first(sp.c)
  const arc = first(sp.arc)
  const subject = first(sp.subject)
  const hours = first(sp.hours)
  const page = parsePage(first(sp.page))
  const filters: CourseFilterParams = { q, grade, x, y, c, arc, subject, hours }

  let courses: Record<string, unknown>[] = []
  let totalDocs = 0
  let totalPages = 0
  let currentPage = page
  try {
    const payload = await payloadClient()
    const where: Record<string, unknown> = { status: { equals: 'published' } }
    const and: Where[] = [where as Where]
    if (q) {
      and.push({
        or: [
          { title: { contains: q } },
          { summary: { contains: q } },
          { drivingQuestion: { contains: q } },
        ],
      })
    }
    if (subject) and.push({ subjects: { contains: subject } })
    if (x) and.push({ 'primaryX.shortCode': { equals: x } })
    if (y) and.push({ 'primaryY.shortCode': { equals: y } })
    if (c) and.push({ 'targetC.shortCode': { in: [c] } })
    if (arc) and.push({ 'teachingArc.shortCode': { equals: arc } })
    if (grade) {
      const [gmin, gmax] = grade.split('-').map(Number)
      and.push({ gradeMin: { less_than_equal: gmax } })
      and.push({ gradeMax: { greater_than_equal: gmin } })
    }
    if (hours) {
      const [hmin, hmax] = hours.split('-').map(Number)
      and.push({ totalHours: { greater_than_equal: hmin } })
      and.push({ totalHours: { less_than_equal: hmax } })
    }

    const res = await payload.find({
      collection: 'courses',
      where: { and },
      depth: 1,
      limit: 12,
      page,
      sort: 'title',
    })
    courses = res.docs as unknown as Record<string, unknown>[]
    totalDocs = res.totalDocs
    totalPages = res.totalPages || (totalDocs ? Math.ceil(totalDocs / 12) : 0)
    currentPage = res.page || page
  } catch {
    courses = []
    totalDocs = 0
    totalPages = 0
    currentPage = page
  }

  const opt = (family: 'X' | 'Y' | 'C' | 'ARC') =>
    CONCEPTS.filter((i) => i.family === family).map((i) => ({ value: i.shortCode, label: `${i.shortCode} ${i.name}` }))

  return (
    <>
      <PageHero
        eyebrow="课程知识库"
        title="课程中心"
        lede="从结构化课程对象中检索，而不是浏览若干互不相干的详情页。筛选状态写入 URL，便于分享与返回。"
      />
      <section className="container-wide pb-16">
        <Suspense>
          <CourseFilters
            xOptions={opt('X')}
            yOptions={opt('Y')}
            cOptions={opt('C')}
            arcOptions={opt('ARC')}
            subjectOptions={['语文', '数学', '科学', '信息技术', '人文社科', '艺术', '外语', '综合实践'].map((s) => ({ value: s, label: s }))}
          />
        </Suspense>
        <p className="mt-5 text-sm text-muted">
          {totalDocs ? `第 ${currentPage} / ${totalPages} 页，共 ${totalDocs} 门` : '没有符合条件的课程，请放宽筛选。'}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={String((course as { slug?: string }).slug)} course={course as never} />
          ))}
        </div>
        <CoursePager page={currentPage} totalPages={totalPages} filters={filters} />
      </section>
    </>
  )
}
