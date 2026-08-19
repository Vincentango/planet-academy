import Link from 'next/link'

const ITEMS = [
  { href: '/paradigm', label: '总览' },
  { href: '/paradigm/why', label: 'WHY' },
  { href: '/paradigm/capabilities', label: 'C1-C6' },
  { href: '/paradigm/xyz', label: 'XYZ' },
  { href: '/paradigm/teaching-arcs', label: '教学弧' },
  { href: '/paradigm/assessment', label: '评价' },
  { href: '/paradigm/ecosystem', label: '闭环' },
]

export function ParadigmNav() {
  return (
    <nav className="container-wide" aria-label="范式章节">
      <div className="nav-pill flex-wrap">
        {ITEMS.map((item, i) => (
          <span key={item.href} className="flex items-center">
            {i > 0 ? <span className="nav-pill__rule hidden md:block" aria-hidden="true" /> : null}
            <Link href={item.href}>{item.label}</Link>
          </span>
        ))}
      </div>
    </nav>
  )
}
