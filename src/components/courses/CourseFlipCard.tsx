'use client'

import Link from 'next/link'
import { useState } from 'react'
import { courseTags, getScene, type CatalogCourse } from '@/lib/framework'

export function CourseFlipCard({
  course,
  tone = 0,
  mode = 'hover',
  face = 'studio',
}: {
  course: CatalogCourse
  tone?: number
  mode?: 'hover' | 'click' | 'off'
  face?: 'studio' | 'photo'
}) {
  const tags = course.subjects?.length ? course.subjects : courseTags(course)
  const [flipped, setFlipped] = useState(false)
  const href = `/courses/${course.slug}`
  const labName = course.lab || getScene(course.scene)?.name
  const research = course.research || course.subtitle || ''

  const inner =
    face === 'photo' ? (
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__front flip-card__front--photo">
          <div className="flip-card__photo">
            {course.cover ? (
              <img src={course.cover} alt="" />
            ) : (
              <span className="flip-card__photo-fallback">{course.title.slice(0, 1)}</span>
            )}
          </div>
          <h3 className="headline flip-card__name">{course.title}</h3>
        </div>
        <div className="flip-card__face flip-card__back">
          <p className="kicker text-white/55">研究室</p>
          <p className="headline mt-2 text-2xl text-white">{labName || '课程'}</p>
          {tags.length ? (
            <ul className="flip-tags mt-4">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          {research ? (
            <>
              <p className="kicker mt-5 text-white/55">研究</p>
              <p className="mt-2 text-sm leading-7 text-white/90">{research}</p>
            </>
          ) : null}
        </div>
      </div>
    ) : (
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
      <Link href={href} className="flip-card" data-tone={tone % 4} data-mode="off" data-face={face}>
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
        data-face={face}
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
    <Link href={href} className="flip-card" data-tone={tone % 4} data-mode="hover" data-face={face}>
      {inner}
    </Link>
  )
}
