export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <section className="container-wide pb-8 pt-12">
      {eyebrow ? <p className="text-xs tracking-[0.24em] text-lime">{eyebrow}</p> : null}
      <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
      {lede ? <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">{lede}</p> : null}
    </section>
  )
}
