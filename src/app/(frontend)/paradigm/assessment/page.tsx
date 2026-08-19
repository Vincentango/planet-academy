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
      <section className="container-wide grid gap-4 py-10 md:grid-cols-2">
        {[
          ['维度一 · 领域路径 A1-A6', '学生正在向哪个方向发展？融合→分支→聚焦。这是评价输出端，不是 X 轴情境。'],
          ['维度二 · 学科课标', '学习是否符合国家课程要求？PBL 为学科知识提供真实应用情境，不替代学科学习。'],
          ['维度三 · 七类技能构件 T1-T7', '具备哪些可证明的元能力？四维体系核心，与 Z 轴操作性技能使用同一套语言。'],
          ['维度四 · 五大综合赛道', '技能积累形成何种综合形态？赛道是涌现，不是被选出来的标签，课程只标注倾向。'],
        ].map(([t, b]) => (
          <article key={t} className="explain-item border border-rule">
            <h2 className="headline text-lg">{t}</h2>
            <p className="dek mt-2 text-sm">{b}</p>
          </article>
        ))}
      </section>
      <section className="container-wide pb-10">
        <h2 className="headline text-3xl">领域路径</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {CONCEPTS.filter((c) => c.family === 'A').map((c) => (
            <article key={c.code} className="explain-item border border-rule">
              <p className="kicker">{c.code}</p>
              <h3 className="headline mt-1 text-lg">{c.shortCode} {c.name}</h3>
              <p className="dek mt-2 text-sm">{c.shortDefinition}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="band-grey py-14">
        <div className="container-wide">
          <h2 className="headline text-3xl">综合赛道倾向</h2>
          <p className="dek mt-3 max-w-3xl">不得手工作为学生最终结论。B1.0 赛道三原文出现“T1系统思维”，与前文 T1=设计创作冲突，已登记待确认，系统不擅自修订。</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {CONCEPTS.filter((c) => c.family === 'TRACK').map((c) => (
              <article key={c.code} className="explain-item">
                <p className="kicker">{c.code}</p>
                <h3 className="headline mt-1 text-lg">{c.name}</h3>
                <p className="dek mt-2 text-sm">{c.officialDefinition}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
