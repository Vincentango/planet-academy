import Link from 'next/link'
import { gradeBandLabel } from '@/lib/labs'

export type LabCourseCardData = {
  title: string
  slug: string
  subtitle?: string | null
  gradeMin?: number | null
  gradeMax?: number | null
  totalHours?: number | null
  subjects?: string[] | null
  sampleFlag?: boolean | null
}

export function LabCourseCard({ course }: { course: LabCourseCardData }) {
  const grade = gradeBandLabel(course.gradeMin, course.gradeMax)
  const subjects = (course.subjects || []).slice(0, 3)

  return (
    <Link href={`/courses/${course.slug}`} className="lab-course-card">
      <aside className="lab-course-card__rail" aria-label="年级">
        <span>{grade}</span>
      </aside>
      <div className="lab-course-card__body">
        <div className="flex flex-wrap items-center gap-2">
          {course.totalHours ? <p className="kicker">{course.totalHours} 课时</p> : null}
          {course.sampleFlag ? <p className="kicker">示例</p> : null}
        </div>
        <h3 className="headline mt-2 text-2xl">{course.title}</h3>
        {course.subtitle ? <p className="dek mt-2 text-sm">{course.subtitle}</p> : null}
        <ul className="lab-course-card__tags">
          {subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
