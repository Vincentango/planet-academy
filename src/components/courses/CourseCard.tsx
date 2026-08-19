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
  const band = gradeBand(course.gradeMin, course.gradeMax)

  return (
    <Link href={`/courses/${course.slug}`} className="story-card">
      <div className="story-media">
        <span>{x.shortCode || '课'}</span>
      </div>
      <div className="px-4 py-4">
        <p className="kicker">{x.shortCode ? `${x.shortCode} ${x.name}` : band}</p>
        <h3 className="headline mt-2 text-xl">{course.title}</h3>
        <p className="dek mt-2 text-sm">{band}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
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
      </div>
    </Link>
  )
}
