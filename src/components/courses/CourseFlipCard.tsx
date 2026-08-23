'use client'

import Link from 'next/link'
import { useState } from 'react'
import { courseTags, type CatalogCourse } from '@/lib/framework'

export function CourseFlipCard({
  course,
  tone = 0,
  mode = 'hover',
}: {
  course: CatalogCourse
  tone?: number
  mode?: 'hover' | 'click' | 'off'
}) {
  const tags = courseTags(course)
  const [flipped, setFlipped] = useState(false)
  const href = `/courses/${course.slug}`

  const inner = (
    <div className="flip-card__inner">
      <div className="flip-card__face flip-card__front">
        <p className="chip-yellow">Studio</p>
        <h3 className="headline mt-auto text-3xl md:text-4xl">{course.title}</h3>
        {course.subtitle ? <p className="mt-3 max-w-sm text-sm leading-6">{course.subtitle}</p> : null}
      </div>
      <div className="flip-card__face flip-card__back">
        <p className="kicker text-white/55">课程标签</p>
        <h3 className="headline mt-3 text-2xl text-white">{course.title}</h3>
        <ul className="flip-tags mt-auto">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
          {course.totalHours ? <li>{course.totalHours} 课时</li> : null}
        </ul>
      </div>
    </div>
  )

  if (mode === 'off' || !course.designed) {
    return (
      <Link href={href} className="flip-card" data-tone={tone % 4} data-mode="off">
        {inner}
      </Link>
    )
  }

  if (mode === 'click') {
    return (
      <div
        className="flip-card"
        data-tone={tone % 4}
        data-mode="click"
        data-flipped={flipped ? 'true' : 'false'}
      >
        <button type="button" className="flip-card__toggle" onClick={() => setFlipped((v) => !v)} aria-label="翻转卡片">
          {inner}
        </button>
        <Link href={href} className="flip-card__open">
          打开课程
        </Link>
      </div>
    )
  }

  return (
    <Link href={href} className="flip-card" data-tone={tone % 4} data-mode="hover">
      {inner}
    </Link>
  )
}
