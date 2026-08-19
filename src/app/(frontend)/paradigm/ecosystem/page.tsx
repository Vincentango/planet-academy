import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: '五重闭环' }

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="SUSTAIN"
        title="五重闭环：方案的自我更新能力"
        lede="教育环境的复杂性决定了任何方案都不可能在设计阶段预见所有问题。闭环把实施中的反馈系统转化为优化动力。"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 py-12">
        {CONCEPTS.filter((c) => c.family === 'LOOP').map((c) => (
          <article key={c.code} className="explain-item border border-rule">
            <p className="kicker">{c.code}</p>
            <h2 className="headline mt-2 text-xl">{c.shortCode} {c.name}</h2>
            <p className="mt-3 leading-7">{c.shortDefinition}</p>
            <p className="dek mt-2 text-sm">{c.officialDefinition}</p>
          </article>
        ))}
        <p className="text-sm text-muted">
          第一阶段门户只展示闭环机制与课程证据，不建设学生实名成长系统、LMS 或支付。
        </p>
      </section>
    </>
  )
}
