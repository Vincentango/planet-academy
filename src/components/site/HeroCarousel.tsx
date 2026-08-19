'use client'

import Link from 'next/link'
import { useState } from 'react'

const ITEMS = [
  { code: 'WHY', title: '范式基础', href: '/paradigm/why', dek: 'AI 边界、七大独特能力、C1-C6、人机边界' },
  { code: 'WHAT', title: '课程框架', href: '/paradigm/xyz', dek: 'X 议题、Y 透镜、Z 双层能力' },
  { code: 'HOW', title: '教学实施', href: '/paradigm/teaching-arcs', dek: '五种教学弧与 L1-L6' },
  { code: 'PROVE', title: '评价体系', href: '/paradigm/assessment', dek: '四维标签与赛道倾向' },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const item = ITEMS[index]

  return (
    <div>
      <Link href={item.href} className="carousel-card">
        <div className="story-media">
          <span>{item.code}</span>
        </div>
        <div className="px-4 py-4">
          <p className="kicker">{item.code}</p>
          <h3 className="headline mt-2 text-2xl">{item.title}</h3>
          <p className="dek mt-2 text-sm">{item.dek}</p>
        </div>
      </Link>
      <div className="carousel-dots" role="tablist" aria-label="四层推导">
        {ITEMS.map((entry, i) => (
          <button
            key={entry.code}
            type="button"
            data-active={i === index}
            aria-label={entry.code}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
