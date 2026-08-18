import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: '五种教学弧' }

export default function ArcsPage() {
  const arcs = CONCEPTS.filter((c) => c.family === 'ARC')
  const levels = CONCEPTS.filter((c) => c.family === 'L')
  return (
    <>
      <PageHero
        eyebrow="HOW"
        title="五种教学弧"
        lede="教学弧是 PBL 的实施路径，回答“怎么教”。Y 轴决定“用什么视角思考”，教学弧决定“按什么步骤学习”。二者不得混淆。"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 pb-10">
        {arcs.map((c) => (
          <article key={c.code} className="rounded-2xl border border-line bg-card p-5">
            <p className="text-xs text-lime">{c.code}</p>
            <h2 className="mt-2 text-xl font-semibold">{c.shortCode} {c.name}</h2>
            <p className="mt-2 text-sm tracking-wide text-lime">{c.stages}</p>
            <p className="mt-3 leading-7">{c.shortDefinition}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{c.officialDefinition}</p>
          </article>
        ))}
      </section>
      <section className="container-wide pb-16">
        <h2 className="text-2xl font-semibold">L1-L6 认知阶梯</h2>
        <p className="mt-3 max-w-3xl text-muted">等级依据认知复杂度与自主程度，不由年级自动决定。同一学生在不同技能构件上可以处于不同等级。</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {levels.map((c) => (
            <article key={c.code} className="rounded-2xl border border-line bg-card p-4">
              <h3 className="font-semibold">{c.shortCode} {c.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{c.shortDefinition}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
