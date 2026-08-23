import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_COURSES, SCENES } from '@/lib/framework'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '星球研究室',
  description: '九个真实世界场景，是资源库的浏览脊骨，不是必修课表。',
}

export default function LabsPage() {
  return (
    <>
      <section className="container-wide pb-8 pt-12">
        <p className="kicker">PLANET STUDIOS</p>
        <h1 className="headline mt-4 max-w-4xl text-5xl md:text-7xl">星球研究室</h1>
        <p className="dek mt-6 max-w-2xl text-lg">
          课程是资源库：三个议题穿过九个场景、四个学段。先点场景，再按标签查看已开放与筹备中的课。
        </p>
        <nav className="lab-index-nav" aria-label="场景速览">
          <Link href={`/labs/${ALL_COURSES.slug}`} data-contrast="true">
            {ALL_COURSES.name}
          </Link>
          {SCENES.map((scene) => (
            <Link key={scene.slug} href={`/labs/${scene.slug}`}>
              {scene.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="container-wide pb-16">
        <p className="kicker">九个场景 · 一张资源库</p>
        <div className="lab-grid mt-6">
          <Link href={`/labs/${ALL_COURSES.slug}`} className="lab-card lab-card--contrast">
            <p className="chip-yellow">Library</p>
            <p className="kicker mt-4 text-white/50">{ALL_COURSES.nameEn}</p>
            <h2 className="headline mt-2 text-3xl text-white">{ALL_COURSES.name}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{ALL_COURSES.focus}</p>
          </Link>
          {SCENES.map((scene) => (
            <Link key={scene.slug} href={`/labs/${scene.slug}`} className="lab-card">
              <p className="kicker">
                {scene.code} · {scene.nameEn}
              </p>
              <h2 className="headline mt-3 text-3xl">{scene.name}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{scene.focus}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
