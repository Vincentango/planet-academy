import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/PageHero'
import { payloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: '项目成果' }

export default async function ProjectsPage() {
  let projects: { title: string; slug: string; summary: string; processNote?: string | null }[] = []
  try {
    const payload = await payloadClient()
    const res = await payload.find({ collection: 'projects', where: { status: { equals: 'published' } }, limit: 24 })
    projects = res.docs as unknown as typeof projects
  } catch {
    projects = []
  }

  return (
    <>
      <PageHero
        eyebrow="成果"
        title="项目成果库"
        lede="第一阶段只展示匿名过程证据与项目故事。成果必须说明过程、角色、版本和反馈，不能只放最终成品。"
      />
      <section className="container-wide grid gap-4 pb-16 md:grid-cols-2">
        {projects.length ? projects.map((p) => (
          <article key={p.slug} className="explain-item border border-rule">
            <h2 className="headline text-xl">{p.title}</h2>
            <p className="mt-3 leading-7 text-muted">{p.summary}</p>
            {p.processNote ? <p className="mt-3 text-sm text-muted">{p.processNote}</p> : null}
          </article>
        )) : (
          <p className="text-muted">数据库尚未连接或还没有发布成果。可先查看 <Link href="/curriculum" className="link-accent">课程体系</Link>。</p>
        )}
      </section>
    </>
  )
}
