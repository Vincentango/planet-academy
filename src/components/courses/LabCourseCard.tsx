import Link from 'next/link'
import { courseTags, getStage, type CatalogCourse } from '@/lib/framework'

export type LabCourseCardData = CatalogCourse

export function LabCourseCard({ course }: { course: CatalogCourse }) {
  const tags = courseTags(course)
  const rail = course.designed ? getStage(course.stage)?.label || '' : '筹备中'
  const inner = (
    <>
      <aside className="lab-course-card__rail" aria-label={course.designed ? '学段' : '筹备中'}>
        <span>{rail}</span>
      </aside>
      <div className="lab-course-card__body">
        <div className="flex flex-wrap items-center gap-2">
          {course.designed && course.totalHours ? <p className="kicker">{course.totalHours} 课时</p> : null}
          {course.designed ? <p className="kicker">已开放</p> : <p className="kicker">筹备中</p>}
        </div>
        <h3 className="headline mt-2 text-2xl">{course.title}</h3>
        {course.subtitle ? <p className="dek mt-2 text-sm">{course.subtitle}</p> : null}
        {tags.length ? (
          <ul className="lab-course-card__tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )

  if (course.designed) {
    return (
      <Link href={`/courses/${course.slug}`} className="lab-course-card">
        {inner}
      </Link>
    )
  }

  return (
    <div className="lab-course-card lab-course-card--muted" aria-disabled="true">
      {inner}
    </div>
  )
}
