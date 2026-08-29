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
    <section className="container-wide pb-8 pt-14 md:pt-16">
      <div className="px-0 py-4">
        {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
        <h1 className="headline mt-5 max-w-5xl text-5xl md:text-7xl">{title}</h1>
        {lede ? <p className="dek mt-6 max-w-2xl text-base md:text-lg">{lede}</p> : null}
      </div>
    </section>
  )
}
