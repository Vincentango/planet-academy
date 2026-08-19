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
    <section className="container-wide pb-6 pt-10">
      <div className="panel px-6 py-10 md:px-10">
        {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
        <h1 className="headline mt-3 max-w-4xl text-4xl md:text-5xl">{title}</h1>
        {lede ? <p className="dek mt-5 max-w-3xl text-base md:text-lg">{lede}</p> : null}
      </div>
    </section>
  )
}
