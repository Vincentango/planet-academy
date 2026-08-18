import Link from 'next/link'
import { conceptLabel, gradeBand } from '@/lib/payload'

type Course = {
  title: string
  slug: string
  gradeMin?: number | null
  gradeMax?: number | null
  totalHours?: number | null
  primaryX?: unknown
  primaryY?: unknown
  subjects?: string[] | null
  sampleFlag?: boolean | null
}

export function CourseCard({ course }: { course: Course }) {
  const x = conceptLabel(course.primaryX)
  const y = conceptLabel(course.primaryY)
  const subjects = (course.subjects || []).slice(0, 2)

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-card p-5 no-underline transition hover:border-lime/50"
    >
      <div className="flex items-center justify-between gap-3 text-xs text-muted">
        <span>{gradeBand(course.gradeMin, course.gradeMax)}</span>
        {course.sampleFlag ? <span className="rounded-full border border-lime/40 px-2 py-0.5 text-lime">示例课程</span> : null}
      </div>
      <h3 className="mt-3 text-xl font-semibold group-hover:text-lime">{course.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted">主 X</dt>
          <dd>{x.shortCode} {x.name}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">主 Y</dt>
          <dd>{y.shortCode} {y.name}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">课时</dt>
          <dd>{course.totalHours ?? '—'} 课时</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">学科</dt>
          <dd>{subjects.join(' / ') || '—'}</dd>
        </div>
      </dl>
    </Link>
  )
}
