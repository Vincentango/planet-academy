'use client'

import Link from 'next/link'
import { Wordmark } from './Wordmark'
import { visibleNav, type NavItem } from '@/lib/site-public'

export function SiteHeader({ nav = [] }: { nav?: NavItem[] }) {
  const items = visibleNav(nav.length ? nav : [
    { label: '首页', href: '/', visible: true },
    { label: '理念', href: '/philosophy', visible: true },
    { label: '场景', href: '/scenes', visible: true },
    { label: '关于', href: '/about', visible: true },
  ])

  return (
    <header className="site-header site-header--white">
      <div className="container-wide flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="no-underline text-ink" aria-label="星球学院 CRADLE-X">
          <Wordmark className="text-[1.3rem] md:text-[1.5rem] text-black" />
        </Link>
        <nav className="nav-pill hidden md:flex" aria-label="主导航">
          {items.map((item, i) => (
            <span key={`${item.href}-${item.label}`} className="flex items-center">
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
        {items.map((item) => (
          <Link key={`${item.href}-${item.label}`} href={item.href} className="nav-cat whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm">
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
