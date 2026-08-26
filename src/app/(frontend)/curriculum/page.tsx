import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_COURSES, SCENES } from '@/lib/framework'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '课程体系',
  description: '星球学院课程体系：教育内容、教学空间、技术装备、评价体系与运营模式。',
}

export default function CurriculumPage() {
  return (
    <>
      <section className="container-wide pb-10 pt-8">
        <h1 className="sr-only">课程体系</h1>
        <article className="curriculum-map">
          <img src="/samples/curriculum-system.png" alt="课程体系：以人工智能为中心的跨学科图谱" />
        </article>
      </section>
      <section className="container-wide pb-16">
        <p className="kicker">九个场景</p>
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
