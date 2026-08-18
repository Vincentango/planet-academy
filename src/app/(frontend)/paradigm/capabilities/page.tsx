import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: 'C1-C6 核心能力' }

export default function CapabilitiesPage() {
  const items = CONCEPTS.filter((c) => c.family === 'C')
  const ai = CONCEPTS.filter((c) => c.family === 'AI')
  return (
    <>
      <PageHero
        eyebrow="C1-C6"
        title="六大核心能力目标"
        lede="七大人类独特能力是描述性分析；教育需要的是规范目标。培养路径高度重叠的能力合并为一个目标，以避免课程碎片化。C1、C5 是基础层，C2、C3、C4 是核心层，C6 是整合层。"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 pb-10 md:grid-cols-2">
        {items.map((c) => (
          <article key={c.code} className="rounded-2xl border border-line bg-card p-5">
            <p className="text-xs text-lime">{c.code} · {c.layer}</p>
            <h2 className="mt-2 text-xl font-semibold">{c.shortCode} {c.name}</h2>
            <p className="mt-3 leading-7">{c.shortDefinition}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{c.officialDefinition}</p>
          </article>
        ))}
      </section>
      <section className="container-wide pb-16">
        <h2 className="text-2xl font-semibold">AI 能力 A/B/C/D · 横向贯穿层</h2>
        <p className="mt-3 max-w-3xl text-muted">它不是独立课程模块，而是 C1-C6 在 AI 使用场景中的具体化：当学生使用 AI 工具时，应当培养什么能力？</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ai.map((c) => (
            <article key={c.code} className="rounded-2xl border border-line bg-card p-5">
              <p className="text-xs text-lime">{c.code}</p>
              <h3 className="mt-2 text-lg font-semibold">{c.shortCode} {c.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{c.officialDefinition}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
