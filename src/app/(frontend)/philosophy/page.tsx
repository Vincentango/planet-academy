import type { Metadata } from 'next'
import { CmsPage } from '@/components/site/CmsPage'
import { getSiteSettings } from '@/lib/site'
import Link from 'next/link'
import { ARCS, FRAMEWORK_LINE, GROWTH_LAYERS, ISSUES, SCENES, STAGES } from '@/lib/framework'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '关于理念',
  description: '星球学院以真实世界项目课组织学习：三个议题、九个场景、四个学段、五种教学弧、三层成长。',
}

export default async function PhilosophyPage() {
  const site = await getSiteSettings()
  const fallback = (
    <>
      <section className="container-wide pb-6 pt-6 md:pt-8">
        <article className="gsd-split">
          <div className="gsd-split__media gsd-split__media--hero">
            <span className="gsd-split__caption chip-yellow">B3.0</span>
            <p className="headline text-5xl text-white md:text-6xl">关于理念</p>
          </div>
          <div className="gsd-split__copy">
            <p className="kicker">星球学院 · CRADLE-X</p>
            <h1 className="headline mt-5 text-4xl md:text-6xl">真实世界项目课</h1>
            <p className="mt-6 max-w-xl text-xl font-medium leading-8">
              学习发生在世界里。课程是可以走进的资源库，不是一张必修课表。
            </p>
            <p className="dek mt-3 max-w-xl text-base">
              学生在真实议题中提出问题、做出东西、用证据说话。
            </p>
            <p className="mt-8 text-sm font-semibold leading-7">{FRAMEWORK_LINE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/scenes" className="btn-ink no-underline">
                查看九个场景
              </Link>
              <Link href="/contact" className="btn-ghost no-underline">
                联系合作
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="container-wide py-6">
        <article className="panel px-6 py-10 md:px-10 md:py-14">
          <p className="kicker">使命</p>
          <h2 className="headline mt-4 text-3xl md:text-4xl">用真实世界项目课组织一所无边界学校</h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-muted md:text-lg">
            <p>
              星球学院面向未来的学习者、家庭与合作学校。当机器能完成大量传统认知任务，教育要守住判断、创造、连接与行动这些不可外包的能力。
            </p>
            <p>
              学什么，由三个议题穿过九个场景、四个学段。怎么学，走五种教学弧。学会什么，看三层成长。
            </p>
          </div>
        </article>
      </section>

      <section className="container-wide grid gap-4 pb-6 md:grid-cols-3">
        {ISSUES.map((issue) => (
          <article key={issue.id} className="panel px-6 py-8">
            <p className="kicker">议题</p>
            <h2 className="headline mt-3 text-2xl">{issue.name}</h2>
          </article>
        ))}
      </section>

      <section className="container-wide py-6">
        <p className="kicker">九个场景</p>
        <h2 className="headline mt-3 text-3xl">学习发生的现场</h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {SCENES.map((scene) => (
            <li key={scene.slug} className="panel px-5 py-6">
              <p className="kicker">
                {scene.code} · {scene.nameEn}
              </p>
              <p className="headline mt-2 text-xl">{scene.name}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{scene.focus}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-wide grid gap-4 py-6 md:grid-cols-2">
        <article className="panel px-6 py-8">
          <p className="kicker">四个学段</p>
          <ul className="mt-5 space-y-3 text-base leading-7">
            {STAGES.map((stage) => (
              <li key={stage.id}>
                <strong>{stage.label}</strong> · {stage.name}
              </li>
            ))}
          </ul>
        </article>
        <article className="panel px-6 py-8">
          <p className="kicker">五种教学弧</p>
          <ul className="mt-5 space-y-3 text-base leading-7">
            {ARCS.map((arc) => (
              <li key={arc.id}>{arc.name}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container-wide pb-16 pt-6">
        <article className="band-black p-8 md:p-12">
          <p className="kicker text-white/55">三层成长</p>
          <h2 className="headline mt-3 text-3xl text-white">学会什么</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {GROWTH_LAYERS.map((layer, i) => (
              <li key={layer.id}>
                <p className="text-xs tracking-[0.16em] text-white/45">0{i + 1}</p>
                <p className="mt-2 text-xl text-white">{layer.name}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm font-semibold leading-7 text-white">{FRAMEWORK_LINE}</p>
        </article>
      </section>
    </>
  )

  return <CmsPage slug="philosophy" fallback={fallback} interaction={site.interaction} />
}
