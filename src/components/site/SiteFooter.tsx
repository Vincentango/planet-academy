import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-wide grid gap-4 py-10 md:grid-cols-2">
        <div className="footer-cta">
          <p className="max-w-md text-sm leading-7">
            星球学院是一所未来无边界学校。公开门户先定位学校，再进入九个场景里的课程。
          </p>
          <Link href="/scenes" className="btn-ink mt-6 no-underline">
            进入九个场景
          </Link>
        </div>
        <div className="footer-cta">
          <p className="max-w-md text-sm leading-7">
            第一阶段不提供 LMS、支付或学生账号。旧的范式页仍可访问，但不再作为主路径。
          </p>
          <Link href="/contact" className="btn-ink mt-6 no-underline">
            联系合作
          </Link>
        </div>
      </div>
      <div className="container-wide grid gap-10 pb-16 pt-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="wordmark text-3xl text-white">星球学院</p>
          <p className="wordmark mt-1 text-sm text-white">CRADLE-X</p>
          <p className="mt-4 text-xs text-white/55">公开成果默认匿名</p>
        </div>
        <div className="md:col-span-3">
          <p className="kicker text-white/50">主路径</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li>
              <Link href="/" className="no-underline hover:opacity-70">
                首页
              </Link>
            </li>
            <li>
              <Link href="/philosophy" className="no-underline hover:opacity-70">
                理念
              </Link>
            </li>
            <li>
              <Link href="/scenes" className="no-underline hover:opacity-70">
                场景
              </Link>
            </li>
            <li>
              <Link href="/about" className="no-underline hover:opacity-70">
                关于
              </Link>
            </li>
            <li>
              <Link href="/contact" className="no-underline hover:opacity-70">
                联系
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="kicker text-white/50">档案</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li>
              <Link href="/paradigm" className="no-underline hover:opacity-70">
                教育范式
              </Link>
            </li>
            <li>
              <Link href="/projects" className="no-underline hover:opacity-70">
                项目成果
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
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
