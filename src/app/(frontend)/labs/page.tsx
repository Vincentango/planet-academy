import type { Metadata } from 'next'
import Link from 'next/link'
import { LABS } from '@/lib/labs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '星球研究室',
  description: '九个跨学科研究室，不是语数英分科树。',
}

export default function LabsPage() {
  return (
    <>
      <section className="container-wide pb-12 pt-16">
        <p className="kicker">RESEARCH LABS</p>
        <h1 className="headline mt-4 max-w-4xl text-5xl md:text-7xl">星球研究室</h1>
        <p className="dek mt-6 max-w-2xl text-lg">
          九个跨学科研究室连成一张网络。点进一间研究室，只看属于它的课程。
        </p>
        <nav className="lab-index-nav" aria-label="研究室速览">
          {LABS.map((lab, i) => (
            <span key={lab.slug} className="lab-index-nav__item">
              {i > 0 ? <span className="lab-index-nav__rule" aria-hidden="true" /> : null}
              <Link href={`/labs/${lab.slug}`}>{lab.name}</Link>
            </span>
          ))}
        </nav>
      </section>

      <section className="band-black">
        <div className="container-wide py-16">
          <p className="kicker text-white/50">九间研究室 · 一张网络</p>
          <div className="mt-8 grid gap-px bg-white/15 md:grid-cols-3">
            {LABS.map((lab) => (
              <Link key={lab.slug} href={`/labs/${lab.slug}`} className="lab-card">
                <p className="kicker text-white/45">{lab.nameEn}</p>
                <h2 className="headline mt-3 text-3xl text-white">{lab.name}</h2>
                <p className="mt-4 text-sm leading-7 text-white/70">{lab.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
