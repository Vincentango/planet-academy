import Link from 'next/link'

const NAV = [
  { href: '/', label: '首页' },
  { href: '/paradigm', label: '教育范式' },
  { href: '/courses', label: '课程中心' },
  { href: '/projects', label: '项目成果' },
  { href: '/about', label: '关于我们' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="container-wide flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-lime/40 bg-forest text-[0.7rem] font-semibold tracking-wide text-lime">
            星
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.18em]">星球学院</span>
            <span className="block text-[10px] tracking-[0.22em] text-muted">PLANET ACADEMY</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="主导航">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/90 no-underline hover:text-lime">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-[#102016] no-underline"
        >
          联系合作
        </Link>
      </div>
      <nav className="container-wide flex gap-4 overflow-x-auto pb-3 text-xs text-muted md:hidden" aria-label="移动导航">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap no-underline">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
