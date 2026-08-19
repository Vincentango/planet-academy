import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'
import { AI_BOUNDARIES, HUMAN_UNIQUES } from '@/lib/taxonomies'

export const metadata: Metadata = { title: 'WHY 范式基础' }

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="WHY"
        title="AI 时代的教育现实"
        lede="必须首先对 AI 的真实能力边界建立清醒认知，既不夸大、也不低估。大量曾被视为学校教育核心目标的任务——记忆知识、完成标准化习题、撰写格式化文章——已经可以被 AI 高效完成。"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-8 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['信息处理类', '大规模检索与摘要、跨语言翻译、数据模式识别、标准化知识问答。AI 可在秒级完成。'],
            ['内容生成类', '基于模板的写作、代码生成、图像与视频生成、音乐与设计辅助。曾被视为创造性工作。'],
            ['推理分析类', '逻辑推理与数学证明、基于规则的决策、历史数据趋势预测。在有明确规则的领域已很强。'],
          ].map(([t, b]) => (
            <article key={t} className="explain-item border border-rule">
              <h2 className="headline text-xl">{t}</h2>
              <p className="dek mt-2 text-sm">{b}</p>
            </article>
          ))}
        </div>
        <div>
          <p className="badge-collection">Collection</p>
          <h2 className="headline mt-4 text-3xl">七大人类独特能力</h2>
          <p className="dek mt-3 max-w-3xl">这些能力是 AI 在可预见的未来无法真正复制的，构成人类不可替代性的核心。它们指向身体性、责任性、关系性和创造性。</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {HUMAN_UNIQUES.map((item) => (
              <article key={item.name} className="explain-item border border-rule">
                <p className="kicker">{item.n} {item.en}</p>
                <h3 className="headline mt-1 text-xl">{item.name}</h3>
                <p className="mt-2 text-sm leading-7">{item.meaning}</p>
                <p className="dek mt-2 text-sm">{item.limit}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h2 className="headline text-3xl">AI 重塑教育的三条路径</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['替代 Substitution', 'AI 替代了大量依赖记忆、检索和规则推理的学习任务。课程时间可以历史性地重新分配给更高阶能力。'],
              ['增强 Augmentation', 'AI 成为研究、创作和分析的放大器。学生能在更短时间完成更复杂的项目。AI 不是学习的替代者。'],
              ['转化 Transformation', '学习从“掌握知识”转为“驾驭知识”：在正确时机调用正确工具（包括 AI），解决真实世界的复杂问题。'],
            ].map(([t, b]) => (
              <article key={t} className="explain-item border border-rule">
                <h3 className="headline text-xl">{t}</h3>
                <p className="dek mt-2 text-sm">{b}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h2 className="headline text-3xl">四大人机协作边界</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {AI_BOUNDARIES.map((item) => (
              <article key={item.title} className="band-black p-5">
                <h3 className="headline text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
