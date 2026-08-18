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
    <nav className="container-wide flex flex-wrap gap-2 pb-4" aria-label="范式章节">
      {ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className="rounded-full border border-line px-3 py-1 text-xs no-underline hover:border-lime/50">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
