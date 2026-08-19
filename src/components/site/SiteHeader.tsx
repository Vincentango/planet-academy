'use client'

import Link from 'next/link'

const NAV = [
  { href: '/', label: '首页' },
  { href: '/labs', label: '星球研究室' },
  { href: '/about', label: '关于' },
]

export function SiteHeader() {
  return (
    <header className="site-header site-header--white">
      <div className="container-wide flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="no-underline">
          <span className="wordmark text-[1.3rem] md:text-[1.5rem]">星球学院</span>
          <span className="wordmark mt-0.5 block text-[0.68rem] md:text-[0.76rem] tracking-[0.08em]">
            CRADLE-X
          </span>
        </Link>
        <nav className="nav-pill hidden md:flex" aria-label="主导航">
          {NAV.map((item, i) => (
            <span key={item.href} className="flex items-center">
              {i > 0 ? <span className="nav-pill__rule" aria-hidden="true" /> : null}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </nav>
        <Link href="/contact" className="btn-ghost no-underline">
          联系
        </Link>
      </div>
      <nav className="container-wide flex gap-2 overflow-x-auto pb-3 md:hidden" aria-label="移动导航">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="nav-cat whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm">
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-cat whitespace-nowrap rounded-full bg-yellow px-3 py-1.5 text-sm">
          联系
        </Link>
      </nav>
    </header>
  )
}
