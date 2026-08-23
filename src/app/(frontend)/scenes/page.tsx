import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_COURSES, SCENES } from '@/lib/framework'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '九个场景',
  description: '九个真实世界场景，是资源库的浏览脊骨，不是必修课表。',
}

export default function ScenesPage() {
  return (
    <>
      <section className="container-wide pb-8 pt-12">
        <p className="kicker">NINE SCENES</p>
        <h1 className="headline mt-4 max-w-4xl text-5xl md:text-7xl">九个场景</h1>
        <p className="dek mt-6 max-w-2xl text-lg">
          课程是资源库：三个议题穿过九个场景、四个学段。先点场景，再按标签查看已开放与筹备中的课。
        </p>
      </section>

      <section className="container-wide pb-16">
        <p className="kicker">3 × 3</p>
        <div className="lab-grid mt-6">
          {SCENES.map((scene) => (
            <Link key={scene.slug} href={`/scenes/${scene.slug}`} className="lab-card">
              <p className="kicker">
                {scene.code} · {scene.nameEn}
              </p>
              <h2 className="headline mt-3 text-3xl">{scene.name}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{scene.focus}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href={`/scenes/${ALL_COURSES.slug}`} className="no-underline font-semibold">
            查看全部种子课
          </Link>
        </p>
      </section>
    </>
  )
}
