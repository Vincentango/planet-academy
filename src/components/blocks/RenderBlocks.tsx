import type { ReactNode } from 'react'
import Link from 'next/link'
import { CourseCard } from '@/components/courses/CourseCard'
import { conceptLabel } from '@/lib/payload'
import { ContactForm } from '@/components/site/ContactForm'
import { HeroCarousel } from '@/components/site/HeroCarousel'

function wrap(block: Record<string, unknown>, children: ReactNode, band = 'bg-paper') {
  const container = String(block.container || 'content')
  const spacing = String(block.spacing || 'lg')
  const align = String(block.alignment || 'left')
  const pad = { none: 'py-0', xs: 'py-4', sm: 'py-6', md: 'py-10', lg: 'py-14', xl: 'py-16' }[spacing] || 'py-14'
  const box = `container-${container}`
  return (
    <section className={`${pad} ${band}`}>
      <div className={`${box} ${align === 'center' ? 'text-center' : 'text-left'}`}>{children}</div>
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
            <section key={i} className="hero-page">
              <div className="promo-strip">
                <p className="container-wide py-2.5">B1.0 正式基线 →</p>
              </div>
              <div className="container-wide grid gap-6 py-10 md:grid-cols-[1.25fr_0.75fr] md:items-stretch">
                <article className="hero-card">
                  <p className="kicker">教育范式</p>
                  <p className="mt-3"><span className="badge-new">范式</span></p>
                  <h1 className="headline mt-4 text-4xl md:text-[3.4rem] md:leading-[1.05]">{String(block.heading || '')}</h1>
                  {block.subheading ? <p className="dek mt-5 text-base md:text-lg">{String(block.subheading)}</p> : null}
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    {((block.actions as { label: string; href: string }[]) || []).map((a) => (
                      <Link key={a.href} href={a.href} className="link-accent text-sm font-semibold">
                        {a.label}
                      </Link>
                    ))}
                  </div>
                </article>
                <HeroCarousel />
              </div>
            </section>
          )
        }
        if (type === 'logicChain') {
          // Homepage hero already carries WHY/WHAT/HOW/PROVE as the carousel.
          return null
        }
        if (type === 'conceptGrid') {
          const family = String(block.family || '')
          const items = concepts.filter((c) => String((c as { family?: string }).family) === family)
          return (
            <section key={i} className="band-grey py-16">
              <div className="container-wide collection-rule">
                <p className="badge-collection">Collection</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <h2 className="section-head mb-0 border-0 pt-0">{String(block.heading || 'C1–C6')}</h2>
                  <Link href="/paradigm/capabilities" className="hidden text-sm font-semibold no-underline md:inline">查看全部</Link>
                </div>
                {block.intro ? <p className="dek mt-3 max-w-3xl">{String(block.intro)}</p> : null}
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {items.map((raw, n) => {
                    const c = raw as { shortCode?: string; name?: string; layer?: string; shortDefinition?: string; id?: string }
                    return (
                      <article key={String(c.id || c.shortCode)} className="explain-item">
                        <p className="kicker">• {n + 1} / {items.length}</p>
                        <p className="kicker mt-2">{c.shortCode} · {c.layer}</p>
                        <h3 className="headline mt-2 text-xl">{c.name}</h3>
                        <p className="dek mt-2 text-sm">{c.shortDefinition}</p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        }
        if (type === 'courseFeed') {
          const shown = courses.slice(0, Math.min(3, Number(block.limit || 4)))
          return (
            <section key={i} className="band-grey py-16">
              <div className="container-wide collection-rule">
                <p className="badge-collection">Collection</p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <h2 className="section-head mb-0 border-0 pt-0">Most Popular / 精选课程</h2>
                  <div className="hidden gap-1 md:flex">
                    <span className="arrow-btn" aria-hidden>←</span>
                    <span className="arrow-btn">→</span>
                  </div>
                </div>
                {block.intro ? <p className="dek mt-3">{String(block.intro)}</p> : null}
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {shown.map((course) => (
                    <CourseCard key={String((course as { slug?: string }).slug)} course={course as never} />
                  ))}
                </div>
              </div>
            </section>
          )
        }
        if (type === 'cta') {
          return (
            <section key={i} className="band-black">
              <div className="container-wide grid gap-8 py-16 md:grid-cols-2 md:items-end">
                <div>
                  <p className="kicker text-white/55">Magazine</p>
                  <p className="mt-3 text-sm tracking-[0.16em] text-white/70">B1.0 范式专刊</p>
                  <h2 className="headline mt-4 text-4xl text-white">{String(block.heading || '阅读教育范式')}</h2>
                </div>
                <div>
                  {block.body ? <p className="text-sm leading-7 text-white/80">{String(block.body)}</p> : null}
                  <Link href={String(block.buttonHref || '/paradigm')} className="btn-white mt-6 no-underline">
                    {String(block.buttonLabel || '阅读教育范式')}
                  </Link>
                </div>
              </div>
            </section>
          )
        }
        if (type === 'metrics') {
          const items = (block.items as { value: string; label: string; note?: string }[]) || []
          return (
            <div key={i}>
              {wrap(block, (
                <div className="grid gap-6 border-y border-rule md:grid-cols-4">
                  {items.map((item) => (
                    <article key={item.label} className="py-6">
                      <p className="headline text-3xl">{item.value}</p>
                      <p className="mt-2 font-semibold">{item.label}</p>
                      {item.note ? <p className="dek mt-2 text-sm">{item.note}</p> : null}
                    </article>
                  ))}
                </div>
              ), 'band-grey')}
            </div>
          )
        }
        if (type === 'form') {
          return (
            <section key={i} className="band-grey py-14">
              <div className="container-wide grid gap-8 md:grid-cols-[1fr_0.9fr]">
                <div>
                  <p className="badge-collection">Newsletter</p>
                  <h2 className="headline mt-4 text-3xl">{String(block.heading || '联系')}</h2>
                  {block.intro ? <p className="dek mt-3">{String(block.intro)}</p> : null}
                </div>
                <ContactForm />
              </div>
            </section>
          )
        }
        if (type === 'mediaBlock') {
          return (
            <div key={i}>
              {wrap(block, (
                <>
                  {block.heading ? <h2 className="headline text-3xl">{String(block.heading)}</h2> : null}
                  <div className="story-media mt-4"><span>图</span></div>
                  {block.caption ? <p className="dek mt-3">{String(block.caption)}</p> : null}
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
                  {block.heading ? <h2 className="headline text-3xl">{String(block.heading)}</h2> : null}
                  <p className="dek mt-3">正文请在后台使用结构化富文本维护。</p>
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
