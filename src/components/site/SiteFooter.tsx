import Link from 'next/link'
import { Wordmark } from './Wordmark'
import type { SiteChrome } from '@/lib/site'
import { DEFAULT_SITE, visibleNav } from '@/lib/site'

export function SiteFooter({ site }: { site?: SiteChrome }) {
  const s = site || DEFAULT_SITE
  const items = visibleNav(s.nav)

  return (
    <footer className="site-footer">
      <div className="container-wide grid gap-10 pb-16 pt-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark className="text-3xl text-white" />
        </div>
        <div className="md:col-span-4">
          <p className="kicker text-white/50">主路径</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            {items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link href={item.href} className="no-underline hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="no-underline hover:opacity-70">
                联系
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="kicker text-white/50">关于</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li>
              <Link href="/privacy" className="no-underline hover:opacity-70">
                隐私政策
              </Link>
            </li>
            <li>
              <Link href="/admin" className="no-underline hover:opacity-70">
                内容后台
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
