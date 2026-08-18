import type { ReactNode } from 'react'
import Link from 'next/link'
import { CourseCard } from '@/components/courses/CourseCard'
import { conceptLabel } from '@/lib/payload'
import { ContactForm } from '@/components/site/ContactForm'

function wrap(block: Record<string, unknown>, children: ReactNode) {
  const theme = String(block.theme || 'brand')
  const container = String(block.container || 'content')
  const spacing = String(block.spacing || 'lg')
  const align = String(block.alignment || 'left')
  const pad = { none: 'py-0', xs: 'py-4', sm: 'py-6', md: 'py-10', lg: 'py-14', xl: 'py-20' }[spacing] || 'py-14'
  const bg = theme === 'light' ? 'bg-[#eef6e8] text-[#102016]' : theme === 'neutral' ? 'bg-elevated' : 'bg-transparent'
  const box = `container-${container}`
  return (
    <section className={`${pad} ${bg}`}>
      <div className={`${box} text-${align === 'center' ? 'center' : 'left'}`}>{children}</div>
    </section>
  )
}

export function RenderBlocks({
  blocks,
  courses = [],
  concepts = [],
}: {
  blocks: Record<string, unknown>[]
  courses?: Record<string, unknown>[]
  concepts?: Record<string, unknown>[]
}) {
  return (
    <>
      {blocks.map((block, i) => {
        const type = String(block.blockType || '')
        if (type === 'hero') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  {block.eyebrow ? <p className="text-xs tracking-[0.24em] text-lime">{String(block.eyebrow)}</p> : null}
                  <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">{String(block.heading || '')}</h1>
                  {block.subheading ? <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">{String(block.subheading)}</p> : null}
                  <div className="mt-8 flex flex-wrap justify-inherit gap-3">
                    {((block.actions as { label: string; href: string; style?: string }[]) || []).map((a) => (
                      <Link
                        key={a.href}
                        href={a.href}
                        className={a.style === 'secondary'
                          ? 'rounded-full border border-line px-5 py-2 text-sm no-underline'
                          : 'rounded-full bg-lime px-5 py-2 text-sm font-semibold text-[#102016] no-underline'}
                      >
                        {a.label}
                      </Link>
                    ))}
                  </div>
                </>
              ))}
            </div>
          )
        }
        if (type === 'logicChain') {
          const layers = (block.layers as { code: string; title: string; summary: string; href?: string }[]) || []
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  <h2 className="text-2xl font-semibold">{String(block.heading || '逻辑主轴')}</h2>
                  {block.intro ? <p className="mt-3 max-w-3xl text-muted">{String(block.intro)}</p> : null}
                  <div className="mt-8 grid gap-4 md:grid-cols-5">
                    {layers.map((layer) => (
                      <Link key={layer.code} href={layer.href || '/paradigm'} className="rounded-2xl border border-line bg-card p-4 no-underline">
                        <p className="text-xs tracking-[0.2em] text-lime">{layer.code}</p>
                        <p className="mt-2 font-semibold">{layer.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted">{layer.summary}</p>
                      </Link>
                    ))}
                  </div>
                </>
              ))}
            </div>
          )
        }
        if (type === 'conceptGrid') {
          const family = String(block.family || '')
          const items = concepts.filter((c) => String((c as { family?: string }).family) === family)
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  <h2 className="text-2xl font-semibold">{String(block.heading || '')}</h2>
                  {block.intro ? <p className="mt-3 text-muted">{String(block.intro)}</p> : null}
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {items.map((raw) => {
                      const c = raw as { shortCode?: string; name?: string; layer?: string; shortDefinition?: string; id?: string }
                      return (
                        <article key={String(c.id || c.shortCode)} className="rounded-2xl border border-line bg-card p-4">
                          <p className="text-xs text-lime">{c.shortCode} · {c.layer}</p>
                          <h3 className="mt-2 text-lg font-semibold">{c.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{c.shortDefinition}</p>
                        </article>
                      )
                    })}
                  </div>
                </>
              ))}
            </div>
          )
        }
        if (type === 'courseFeed') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{String(block.heading || '课程')}</h2>
                      {block.intro ? <p className="mt-2 text-muted">{String(block.intro)}</p> : null}
                    </div>
                    <Link href="/courses" className="text-sm text-lime">全部课程</Link>
                  </div>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {courses.slice(0, Number(block.limit || 4)).map((course) => (
                      <CourseCard key={String((course as { slug?: string }).slug)} course={course as never} />
                    ))}
                  </div>
                </>
              ))}
            </div>
          )
        }
        if (type === 'cta') {
          return (
            <div key={i}>
              {wrap(block, (
                <div className="rounded-3xl border border-lime/30 bg-forest px-6 py-10">
                  <h2 className="text-2xl font-semibold">{String(block.heading || '')}</h2>
                  {block.body ? <p className="mt-3 text-muted">{String(block.body)}</p> : null}
                  {block.buttonHref ? (
                    <Link href={String(block.buttonHref)} className="mt-6 inline-block rounded-full bg-lime px-5 py-2 text-sm font-semibold text-[#102016] no-underline">
                      {String(block.buttonLabel || '了解更多')}
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          )
        }
        if (type === 'metrics') {
          const items = (block.items as { value: string; label: string; note?: string }[]) || []
          return (
            <div key={i}>
              {wrap(block, (
                <div className="grid gap-4 md:grid-cols-4">
                  {items.map((item) => (
                    <article key={item.label} className="rounded-2xl border border-line bg-card p-4">
                      <p className="text-2xl font-semibold text-lime">{item.value}</p>
                      <p className="mt-1 font-medium">{item.label}</p>
                      {item.note ? <p className="mt-2 text-sm text-muted">{item.note}</p> : null}
                    </article>
                  ))}
                </div>
              ))}
            </div>
          )
        }
        if (type === 'form') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  <h2 className="text-2xl font-semibold">{String(block.heading || '联系')}</h2>
                  {block.intro ? <p className="mt-3 text-muted">{String(block.intro)}</p> : null}
                  <div className="mt-6"><ContactForm /></div>
                </>
              ))}
            </div>
          )
        }
        if (type === 'mediaBlock') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  {block.heading ? <h2 className="text-2xl font-semibold">{String(block.heading)}</h2> : null}
                  {block.caption ? <p className="mt-3 text-muted">{String(block.caption)}</p> : null}
                </>
              ))}
            </div>
          )
        }
        if (type === 'richText') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  {block.heading ? <h2 className="text-2xl font-semibold">{String(block.heading)}</h2> : null}
                  <p className="mt-3 leading-8 text-muted">正文请在后台使用结构化富文本维护。</p>
                </>
              ))}
            </div>
          )
        }
        return null
      })}
    </>
  )
}

export function unusedConceptLabel(doc: unknown) {
  return conceptLabel(doc)
}
