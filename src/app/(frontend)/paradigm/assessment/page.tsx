import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: '四维评价体系' }

export default function AssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="PROVE"
        title="四维标签评价体系"
        lede="传统评价看学生“知道什么”；AI 时代更重要的是“能做什么”。四维标签从四个角度回答：这个学生在 AI 时代具有什么样的不可替代性？"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 pb-10 md:grid-cols-2">
        {[
          ['维度一 · 领域路径 A1-A6', '学生正在向哪个方向发展？融合→分支→聚焦。这是评价输出端，不是 X 轴情境。'],
          ['维度二 · 学科课标', '学习是否符合国家课程要求？PBL 为学科知识提供真实应用情境，不替代学科学习。'],
          ['维度三 · 七类技能构件 T1-T7', '具备哪些可证明的元能力？四维体系核心，与 Z 轴操作性技能使用同一套语言。'],
          ['维度四 · 五大综合赛道', '技能积累形成何种综合形态？赛道是涌现，不是被选出来的标签，课程只标注倾向。'],
        ].map(([t, b]) => (
          <article key={t} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="text-lg font-semibold">{t}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{b}</p>
          </article>
        ))}
      </section>
      <section className="container-wide pb-8">
        <h2 className="text-2xl font-semibold">领域路径</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {CONCEPTS.filter((c) => c.family === 'A').map((c) => (
            <article key={c.code} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs text-lime">{c.code}</p>
              <h3 className="mt-1 font-semibold">{c.shortCode} {c.name}</h3>
              <p className="mt-2 text-sm text-muted">{c.shortDefinition}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-wide pb-16">
        <h2 className="text-2xl font-semibold">综合赛道倾向</h2>
        <p className="mt-3 max-w-3xl text-muted">不得手工作为学生最终结论。B1.0 赛道三原文出现“T1系统思维”，与前文 T1=设计创作冲突，已登记待确认，系统不擅自修订。</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {CONCEPTS.filter((c) => c.family === 'TRACK').map((c) => (
            <article key={c.code} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-xs text-lime">{c.code}</p>
              <h3 className="mt-1 font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{c.officialDefinition}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
