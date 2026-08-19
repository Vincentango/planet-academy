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
    <nav className="container-wide flex flex-wrap gap-x-6 gap-y-2 border-y border-rule py-3.5" aria-label="范式章节">
      {ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className="nav-cat text-sm">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
