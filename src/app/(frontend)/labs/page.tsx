import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_COURSES, LABS } from '@/lib/labs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '星球研究室',
  description: '九个跨学科研究室，不是语数英分科树。',
}

export default function LabsPage() {
  return (
    <>
      <section className="container-wide pb-8 pt-12">
        <p className="kicker">RESEARCH LABS</p>
        <h1 className="headline mt-4 max-w-4xl text-5xl md:text-7xl">星球研究室</h1>
        <p className="dek mt-6 max-w-2xl text-lg">
          九个跨学科研究室连成一张网络。点进一间研究室，只看属于它的课程。
        </p>
        <nav className="lab-index-nav" aria-label="研究室速览">
          <Link href={`/labs/${ALL_COURSES.slug}`} data-contrast="true">
            {ALL_COURSES.name}
          </Link>
          {LABS.map((lab) => (
            <Link key={lab.slug} href={`/labs/${lab.slug}`}>
              {lab.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="container-wide pb-16">
        <p className="kicker">十张入口 · 一张网络</p>
        <div className="lab-grid mt-6">
          <Link href={`/labs/${ALL_COURSES.slug}`} className="lab-card lab-card--contrast">
            <p className="chip-yellow">All courses</p>
            <p className="kicker mt-4 text-white/50">{ALL_COURSES.nameEn}</p>
            <h2 className="headline mt-2 text-3xl text-white">{ALL_COURSES.name}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{ALL_COURSES.focus}</p>
          </Link>
          {LABS.map((lab) => (
            <Link key={lab.slug} href={`/labs/${lab.slug}`} className="lab-card">
              <p className="kicker">{lab.nameEn}</p>
              <h2 className="headline mt-3 text-3xl">{lab.name}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{lab.focus}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
