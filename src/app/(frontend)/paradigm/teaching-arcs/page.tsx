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
      <section className="container-wide grid gap-4 py-10">
        {arcs.map((c) => (
          <article key={c.code} className="explain-item border border-rule">
            <p className="kicker">{c.code}</p>
            <h2 className="headline mt-2 text-xl">{c.shortCode} {c.name}</h2>
            <p className="mt-2 text-sm font-semibold">{c.stages}</p>
            <p className="mt-3 leading-7">{c.shortDefinition}</p>
            <p className="dek mt-2 text-sm">{c.officialDefinition}</p>
          </article>
        ))}
      </section>
      <section className="band-grey py-14">
        <div className="container-wide">
          <p className="badge-collection">Collection</p>
          <h2 className="headline mt-4 text-3xl">L1-L6 认知阶梯</h2>
          <p className="dek mt-3 max-w-3xl">等级依据认知复杂度与自主程度，不由年级自动决定。同一学生在不同技能构件上可以处于不同等级。</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {levels.map((c) => (
              <article key={c.code} className="explain-item">
                <h3 className="headline text-lg">{c.shortCode} {c.name}</h3>
                <p className="dek mt-2 text-sm">{c.shortDefinition}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
