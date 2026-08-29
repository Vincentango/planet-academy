import Link from 'next/link'
import { Wordmark } from './Wordmark'
import type { SiteChrome } from '@/lib/site'
import { DEFAULT_SITE, visibleNav } from '@/lib/site'

export function SiteFooter({ site }: { site?: SiteChrome }) {
  const s = site || DEFAULT_SITE
  const items = visibleNav(s.nav)

  return (
    <footer className="site-footer">
      <div className="container-wide grid gap-14 pb-24 pt-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Wordmark className="text-xl text-ink" />
          {s.footerNote ? <p className="dek mt-6 max-w-sm text-sm">{s.footerNote}</p> : null}
        </div>
        <div className="md:col-span-3">
          <p className="kicker">主路径</p>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link href={item.href} className="no-underline hover:opacity-55">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="no-underline hover:opacity-55">
                联系
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="kicker">关于</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/privacy" className="no-underline hover:opacity-55">
                隐私政策
              </Link>
            </li>
            <li>
              <Link href="/admin" className="no-underline hover:opacity-55">
                内容后台
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
