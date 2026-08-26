import type { ReactNode } from 'react'
import Link from 'next/link'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { ContactForm } from '@/components/site/ContactForm'
import { SampleVideo } from '@/components/site/SampleVideo'
import { conceptLabel } from '@/lib/payload'
import { SCENES, type CatalogCourse } from '@/lib/framework'
import { mediaUrl, type SiteInteraction } from '@/lib/site'

function surfaceClass(block: Record<string, unknown>) {
  const s = String(block.surface || '')
  if (s === 'white') return 'bg-white'
  if (s === 'ink') return 'band-black'
  return ''
}

function padClass(block: Record<string, unknown>) {
  const p = String(block.padding || 'normal')
  return { compact: 'py-4', normal: 'py-6', roomy: 'py-14' }[p] || 'py-6'
}

function wrap(block: Record<string, unknown>, children: ReactNode) {
  const container = String(block.container || 'wide')
  const box = `container-${container === 'full' ? 'full' : container}`
  const id = block.anchor ? String(block.anchor) : undefined
  return (
    <section id={id} className={`${padClass(block)} ${surfaceClass(block)}`}>
      <div className={box}>{children}</div>
    </section>
  )
}

function btnClass(style?: string) {
  if (style === 'ghost' || style === 'secondary') return 'btn-ghost no-underline'
  return 'btn-ink no-underline'
}

function lexicalPlain(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node !== 'object') return ''
  const n = node as { type?: string; text?: string; children?: unknown[]; root?: unknown }
  if (n.text) return n.text
  if (n.root) return lexicalPlain(n.root)
  const children = n.children || []
  const sep = n.type === 'root' ? '\n\n' : ''
  return children.map(lexicalPlain).join(sep)
}

function ActionRow({
  actions,
}: {
  actions?: { label?: string; href?: string; visible?: boolean; style?: string }[]
}) {
  const shown = (actions || []).filter((a) => a.visible !== false && a.label && a.href)
  if (!shown.length) return null
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {shown.map((a) => (
        <Link key={`${a.href}-${a.label}`} href={a.href!} className={btnClass(a.style)}>
          {a.label}
        </Link>
      ))}
    </div>
  )
}

export function RenderBlocks({
  blocks,
  courses = [],
  concepts = [],
  interaction,
}: {
  blocks: Record<string, unknown>[]
  courses?: CatalogCourse[]
  concepts?: Record<string, unknown>[]
  interaction: SiteInteraction
}) {
  return (
    <>
      {blocks.map((block, i) => {
        const type = String(block.blockType || '')
        const key = String(block.id || i)

        if (type === 'hero') {
          const variant = String(block.variant || 'split')
          const actions = (block.actions as { label?: string; href?: string; visible?: boolean; style?: string }[]) || []
          const media = mediaUrl(block.media)
          if (variant === 'stacked') {
            return (
              <section key={key} className="container-wide pb-8 pt-12">
                {block.eyebrow ? <p className="kicker">{String(block.eyebrow)}</p> : null}
                <h1 className="headline mt-4 max-w-4xl text-5xl md:text-7xl">{String(block.heading || '')}</h1>
                {block.dek ? <p className="mt-6 max-w-xl text-xl font-medium leading-8">{String(block.dek)}</p> : null}
                {block.subheading ? <p className="dek mt-3 max-w-2xl text-lg">{String(block.subheading)}</p> : null}
                <ActionRow actions={actions} />
              </section>
            )
          }
          return (
            <section key={key} className="container-wide pb-6 pt-6 md:pt-8">
              <article className="gsd-split">
                <div className={`gsd-split__media ${media ? '' : 'gsd-split__media--hero'}`}>
                  {media ? (
                    media.match(/\.(mp4|webm|mov)(\?|$)/i) ? (
                      <video src={media} muted playsInline loop={Boolean(block.autoplay)} autoPlay={Boolean(block.autoplay)} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={media} alt="" />
                    )
                  ) : (
                    <>
                      <span className="gsd-split__caption chip-yellow">{String(block.mediaCaption || 'CRADLE-X')}</span>
                      <p className="headline text-5xl text-white md:text-6xl">{String(block.mediaTitle || '星球学院')}</p>
                    </>
                  )}
                </div>
                <div className="gsd-split__copy">
                  {block.eyebrow ? <p className="kicker">{String(block.eyebrow)}</p> : null}
                  <h1 className="headline mt-5 text-4xl md:text-6xl">{String(block.heading || '')}</h1>
                  {block.dek ? (
                    <p className={/^[A-Z][A-Z\s]+$/.test(String(block.dek).trim()) ? 'hero-en' : 'mt-6 max-w-xl text-xl font-medium leading-8'}>
                      {String(block.dek)}
                    </p>
                  ) : null}
                  {block.subheading ? <p className="dek mt-3 max-w-xl text-base">{String(block.subheading)}</p> : null}
                  <ActionRow actions={actions} />
                </div>
              </article>
            </section>
          )
        }

        if (type === 'mosaic') {
          const items = (block.items as Record<string, unknown>[]) || []
          const autoplay = Boolean(block.autoplay) || interaction.videoAutoplay
          return (
            <section key={key} className="container-wide">
              <div className="mosaic">
                {items.map((item, n) => {
                  const kind = String(item.kind || 'media')
                  if (kind === 'line') {
                    return (
                      <aside key={n} className={`mosaic__tile highlighter highlighter--${String(item.tone || 'yellow')}`}>
                        <p className="whitespace-pre-line">{String(item.body || item.title || '')}</p>
                      </aside>
                    )
                  }
                  const src = mediaUrl(item.media, String(item.url || ''))
                  const isImage = /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(src)
                  if (src && isImage) {
                    return (
                      <article key={n} className="mosaic__tile">
                        <div className="mosaic__media mosaic__media--diagram">
                          <img src={src} alt={String(item.label || item.title || '')} />
                        </div>
                      </article>
                    )
                  }
                  return (
                    <article key={n} className="mosaic__tile">
                      {src ? (
                        <SampleVideo
                          src={src}
                          label={String(item.label || '影像')}
                          title={item.title ? String(item.title) : undefined}
                          caption={item.body ? String(item.body) : undefined}
                          autoplay={autoplay || Boolean(item.playInPlace)}
                        />
                      ) : (
                        <div className="mosaic__media">
                          <span className="mosaic__chip chip-yellow">{String(item.label || '')}</span>
                          <div className="mosaic__overlay">
                            <p className="mosaic__title">{String(item.title || '')}</p>
                            <p className="mosaic__caption">{String(item.body || '')}</p>
                          </div>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </section>
          )
        }

        if (type === 'highlighter') {
          return (
            <section key={key} className="container-wide py-4">
              <aside className={`highlighter highlighter--${String(block.tone || 'yellow')} p-8`}>
                <p className="whitespace-pre-line">{String(block.text || '')}</p>
              </aside>
            </section>
          )
        }

        if (type === 'sceneGrid') {
          const overrides = (block.items as { slug?: string; blurb?: string; visible?: boolean }[]) || []
          const bySlug = new Map(overrides.map((o) => [o.slug, o]))
          const list = SCENES.filter((scene) => bySlug.get(scene.slug)?.visible !== false)
          return (
            <section key={key} className="container-wide pb-16">
              {block.kicker ? <p className="kicker">{String(block.kicker)}</p> : null}
              {block.heading ? <h2 className="headline mt-3 text-3xl">{String(block.heading)}</h2> : null}
              {block.intro ? <p className="dek mt-4 max-w-2xl">{String(block.intro)}</p> : null}
              <div className="lab-grid mt-6">
                {list.map((scene) => (
                  <Link key={scene.slug} href={`/scenes/${scene.slug}`} className="lab-card">
                    <p className="kicker">
                      {scene.code} · {scene.nameEn}
                    </p>
                    <h2 className="headline mt-3 text-3xl">{scene.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted">{bySlug.get(scene.slug)?.blurb || scene.focus}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        }

        if (type === 'courseFeed') {
          const limit = Number(block.limit || 4)
          const shown = courses.slice(0, limit)
          const display = String(block.display || 'flip')
          const flip = display === 'static' ? 'off' : interaction.cardFlip
          return (
            <section key={key} id={String(block.anchor || 'featured')} className="container-wide py-10 pb-16">
              <div className="flex flex-wrap items-end justify-between gap-4">
                {block.kicker ? <p className="kicker">{String(block.kicker)}</p> : null}
                {block.heading ? <h2 className="headline text-3xl md:text-4xl">{String(block.heading)}</h2> : null}
                {block.moreHref ? (
                  <Link href={String(block.moreHref)} className="text-sm font-semibold no-underline">
                    {String(block.moreLabel || '进入资源库')}
                  </Link>
                ) : null}
              </div>
              {block.intro ? <p className="dek mt-3">{String(block.intro)}</p> : null}
              <div className="course-grid mt-8">
                {shown.map((course, n) => (
                  <CourseFlipCard key={course.slug} course={course} tone={n} mode={flip} />
                ))}
              </div>
            </section>
          )
        }

        if (type === 'cta') {
          const extra = (block.buttons as { label?: string; href?: string; visible?: boolean; style?: string }[]) || []
          const buttons = [
            ...(block.buttonLabel && block.buttonHref
              ? [{ label: String(block.buttonLabel), href: String(block.buttonHref), visible: true, style: 'primary' }]
              : []),
            ...extra,
          ]
          return (
            <section key={key} className="container-wide pb-16 pt-6">
              <article className="band-black p-8 md:p-12">
                {block.kicker ? <p className="kicker text-white/55">{String(block.kicker)}</p> : null}
                <h2 className="headline mt-3 text-3xl text-white">{String(block.heading || '')}</h2>
                {block.body ? <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">{String(block.body)}</p> : null}
                <ActionRow actions={buttons} />
              </article>
            </section>
          )
        }

        if (type === 'metrics') {
          const items = (block.items as { value: string; label: string; note?: string }[]) || []
          return (
            <div key={key}>
              {wrap(
                block,
                <div className="grid gap-4 md:grid-cols-3">
                  {items.map((item) => (
                    <article key={item.label} className="panel px-6 py-8">
                      <p className="kicker">{item.value}</p>
                      <h3 className="headline mt-3 text-2xl">{item.label}</h3>
                      {item.note ? <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p> : null}
                    </article>
                  ))}
                </div>,
              )}
            </div>
          )
        }

        if (type === 'form') {
          return (
            <section key={key} className="container-wide py-14">
              <div className="panel px-6 py-10 md:px-10">
                <h2 className="headline text-3xl">{String(block.heading || '联系')}</h2>
                {block.intro ? <p className="dek mt-3">{String(block.intro)}</p> : null}
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </section>
          )
        }

        if (type === 'mediaBlock') {
          const items = (block.items as { media?: unknown; caption?: string }[]) || []
          return (
            <div key={key}>
              {wrap(
                block,
                <>
                  {block.heading ? <h2 className="headline text-3xl">{String(block.heading)}</h2> : null}
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {items.map((item, n) => {
                      const src = mediaUrl(item.media)
                      return (
                        <figure key={n}>
                          {src ? (
                            src.match(/\.(mp4|webm|mov)/i) ? (
                              <video src={src} controls playsInline className="w-full rounded-[var(--radius)]" />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={src} alt={item.caption || ''} className="w-full rounded-[var(--radius)]" />
                            )
                          ) : null}
                          {item.caption ? <figcaption className="dek mt-2">{item.caption}</figcaption> : null}
                        </figure>
                      )
                    })}
                  </div>
                  {block.caption ? <p className="dek mt-3">{String(block.caption)}</p> : null}
                </>,
              )}
            </div>
          )
        }

        if (type === 'richText') {
          const body = lexicalPlain(block.body)
          const editorial = String(block.display || '') === 'editorial'
          const headingLines = String(block.heading || '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
          if (editorial) {
            return (
              <section key={key} className="container-wide py-6">
                <article className="panel intro-ed">
                  <div className="intro-ed__grid">
                    <h2 className="intro-ed__en">
                      {headingLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h2>
                    {body ? (
                      <div className="intro-ed__zh">
                        {body.split('\n\n').map((p, n) => (
                          <p key={n}>{p}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </section>
            )
          }
          return (
            <section key={key} className="container-wide py-6">
              <article className="panel px-6 py-10 md:px-10 md:py-14">
                {block.kicker ? <p className="kicker">{String(block.kicker)}</p> : null}
                {block.heading ? (
                  <h2 className={`headline whitespace-pre-line text-3xl md:text-4xl${block.kicker ? ' mt-4' : ''}`}>
                    {String(block.heading)}
                  </h2>
                ) : null}
                {body ? (
                  <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-muted md:text-lg">
                    {body.split('\n\n').map((p, n) => (
                      <p key={n} className="whitespace-pre-line">{p}</p>
                    ))}
                  </div>
                ) : null}
              </article>
            </section>
          )
        }

        if (type === 'conceptGrid') {
          const family = String(block.family || '')
          const items = concepts.filter((c) => String((c as { family?: string }).family) === family)
          return (
            <section key={key} className="container-wide py-10">
              <h2 className="headline text-3xl">{String(block.heading || '')}</h2>
              {block.intro ? <p className="dek mt-3 max-w-3xl">{String(block.intro)}</p> : null}
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {items.map((raw) => {
                  const c = raw as { shortCode?: string; name?: string; layer?: string; shortDefinition?: string; id?: string }
                  return (
                    <article key={String(c.id || c.shortCode)} className="panel px-5 py-6">
                      <p className="kicker">{c.shortCode} · {c.layer}</p>
                      <h3 className="headline mt-2 text-xl">{c.name}</h3>
                      <p className="dek mt-2 text-sm">{c.shortDefinition}</p>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        }

        if (type === 'logicChain') return null

        return null
      })}
    </>
  )
}

export function unusedConceptLabel(doc: unknown) {
  return conceptLabel(doc)
}

export { CourseCard }
