'use client'

import { useId, useMemo, useState } from 'react'
import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { SYSTEMS, coursesForSystem, type CatalogCourse, type CourseSystem } from '@/lib/framework'

export function CurriculumSystems({
  courses,
  flipMode = 'hover',
}: {
  courses: CatalogCourse[]
  flipMode?: 'hover' | 'click' | 'off'
}) {
  const baseId = useId()
  const [tab, setTab] = useState<CourseSystem>('interest')
  const shown = useMemo(() => coursesForSystem(courses, tab), [courses, tab])

  return (
    <section className="container-wide pb-16">
      <div className="system-tabs" role="tablist" aria-label="课程体系">
        {SYSTEMS.map((item) => {
          const selected = tab === item.id
          return (
            <button
              key={item.id}
              id={`${baseId}-${item.id}`}
              type="button"
              role="tab"
              className="system-tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              data-system={item.id}
              data-active={selected ? 'true' : 'false'}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
                event.preventDefault()
                const ids = SYSTEMS.map((system) => system.id)
                const at = ids.indexOf(item.id)
                const next = event.key === 'ArrowRight' ? ids[(at + 1) % ids.length] : ids[(at - 1 + ids.length) % ids.length]
                setTab(next)
                document.getElementById(`${baseId}-${next}`)?.focus()
              }}
            >
              <span className="system-tab__page">{item.name}</span>
            </button>
          )
        })}
      </div>
      {SYSTEMS.map((item) => {
        const selected = tab === item.id
        const list = selected ? shown : []
        return (
          <div
            key={item.id}
            id={`${baseId}-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-${item.id}`}
            hidden={!selected}
          >
            {selected ? (
              <div className="course-grid curriculum-grid system-page">
                {list.map((course, i) => (
                  <CourseFlipCard key={course.slug} course={course} tone={i} mode={flipMode} face="photo" />
                ))}
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
