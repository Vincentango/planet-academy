'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/paradigm', label: '教育范式' },
  { href: '/courses', label: '课程中心' },
  { href: '/projects', label: '项目成果' },
  { href: '/about', label: '关于' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const inverted = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={inverted ? 'site-header site-header--teal' : 'site-header site-header--white'}>
      <div className="container-wide flex items-center justify-between gap-6 py-3">
        <Link href="/" className="no-underline">
          <span className="wordmark text-[1.35rem] md:text-[1.55rem]">星球学院</span>
          <span className="wordmark mt-0.5 block text-[0.7rem] md:text-[0.78rem]">PLANET ACADEMY</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="主导航">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-cat">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-ghost no-underline">联系</Link>
          <Link href="/contact" className="btn-mint no-underline">合作</Link>
        </div>
      </div>
      <nav className="container-wide flex gap-5 overflow-x-auto border-t border-white/20 py-2.5 text-sm md:hidden" aria-label="移动导航">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="nav-cat whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
