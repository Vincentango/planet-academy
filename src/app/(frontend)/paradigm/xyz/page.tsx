import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { CONCEPTS } from '@/lib/taxonomies'

export const metadata: Metadata = { title: 'XYZ 课程框架' }

export default function XYZPage() {
  return (
    <>
      <PageHero
        eyebrow="WHAT · XYZ"
        title="三维坐标课程框架"
        lede="每一个 PBL 项目，都是在特定的 X 轴议题情境中，运用特定的 Y 轴认知透镜，培养特定的 Z 轴能力。三个维度交叉点就是项目设计坐标。Y 轴是透镜，不是教法。"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 pb-8 md:grid-cols-3">
        {[
          ['X 轴', '真实情境锚点（输入端）', '在什么情境中学习？十个议题独立且全覆盖。'],
          ['Y 轴', '纯粹认知视角（透镜）', '用什么视角思考？不是学习方式，学习方式由教学弧决定。'],
          ['Z 轴', '能力培养目标（输出端）', '方向性目标 C1-C6 + 操作性技能 T1-T7。'],
        ].map(([t, s, b]) => (
          <article key={t} className="rounded-2xl border border-lime/25 bg-forest p-5">
            <p className="text-xs text-lime">{t}</p>
            <h2 className="mt-2 text-lg font-semibold">{s}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{b}</p>
          </article>
        ))}
      </section>
      {[
        ['X1-X10 十大议题', 'X'],
        ['Y1-Y6 认知透镜', 'Y'],
        ['T1-T7 技能构件', 'T'],
      ].map(([title, family]) => (
        <section key={family} className="container-wide pb-12">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {CONCEPTS.filter((c) => c.family === family).map((c) => (
              <article key={c.code} className="rounded-2xl border border-line bg-card p-4">
                <p className="text-xs text-lime">{c.code}</p>
                <h3 className="mt-1 font-semibold">{c.shortCode} {c.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{c.shortDefinition}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
