import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/PageHero'
import { ParadigmNav } from '@/components/site/ParadigmNav'

export const metadata: Metadata = { title: '教育范式总览' }

export default function ParadigmPage() {
  return (
    <>
      <PageHero
        eyebrow="B1.0 · 唯一范式母本"
        title="教育范式总览：WHY → WHAT → HOW → PROVE"
        lede="人工智能技术的系统性渗透正在重构知识生产方式、职业结构与认知边界。教育面临的核心挑战不是“如何把 AI 工具引入课堂”，而是：当 AI 能够高效完成大量传统学校教育所培养的认知任务时，教育的核心价值究竟是什么？"
      />
      <ParadigmNav />
      <section className="container-wide grid gap-4 py-12 md:grid-cols-2">
        {[
          ['WHY 范式基础', '/paradigm/why', '先认清 AI 能做什么、不能做什么，识别七大人类独特能力，再合并为 C1-C6，并守住人机协作的四条边界。'],
          ['WHAT 课程框架', '/paradigm/xyz', 'X 轴提供真实情境，Y 轴提供纯粹认知透镜（不是教法），Z 轴用 C1-C6 与 T1-T7 的双层结构回答培养什么。'],
          ['HOW 教学实施', '/paradigm/teaching-arcs', '五种教学弧回答“按什么步骤学习”。同一透镜可以走不同弧，同一弧也可以搭配不同透镜。'],
          ['PROVE 评价体系', '/paradigm/assessment', '四维标签把 C1-C6 转成可观察、可记录、可积累的语言。赛道只标倾向，不做学生最终结论。'],
        ].map(([title, href, body]) => (
          <Link key={href} href={href} className="explain-item border border-rule no-underline">
            <h2 className="headline text-2xl">{title}</h2>
            <p className="dek mt-3">{body}</p>
          </Link>
        ))}
        <article className="band-black p-8 md:col-span-2">
          <p className="kicker text-white/55">SUSTAIN</p>
          <h2 className="headline mt-2 text-2xl text-white">五重闭环</h2>
          <p className="mt-3 leading-7 text-white/80">
            没有闭环的方案会在实施中僵化。B1.0 以范式自治、课程迭代、教师成长、生态扩展、个体成长五个相互嵌套的闭环，把反馈变成优化动力。
            详见 <Link href="/paradigm/ecosystem" className="text-white underline">闭环机制</Link>。
          </p>
        </article>
        <p className="text-sm text-muted md:col-span-2">
          涌现式评价逻辑：<strong className="text-ink">[T 技能（L 阶梯）] × [课时数量] × [Y 轴认知透镜] = [C 目标的涌现]</strong>。
          单门课程分数不得直接等同于学生长期 C 能力。
        </p>
      </section>
    </>
  )
}
