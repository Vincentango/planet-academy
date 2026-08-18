import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-elevated">
      <div className="container-wide grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm tracking-[0.22em] text-lime">PLANET ACADEMY</p>
          <p className="mt-2 text-lg font-semibold">星球学院</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            以《面向 AI 时代的 K-12 未来创新教育范式 B1.0》为唯一母本。公开门户展示理念、课程知识库与匿名成果，不提供 LMS、支付或学生账号。
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">探索</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/paradigm">教育范式总览</Link></li>
            <li><Link href="/courses">课程中心</Link></li>
            <li><Link href="/projects">项目成果</Link></li>
            <li><Link href="/about">关于我们</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">政策</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/privacy">隐私政策</Link></li>
            <li><Link href="/contact">联系与合作</Link></li>
            <li><Link href="/admin">内容后台</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-wide py-4 text-xs text-muted">
          范式版本 B1.0 · 公开成果默认匿名 · 术语代码不可自由改名
        </p>
      </div>
    </footer>
  )
}
