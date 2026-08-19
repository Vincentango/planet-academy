import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="band-black">
      <div className="container-wide grid gap-10 border-b border-white/15 py-16 md:grid-cols-2">
        <div>
          <p className="max-w-md text-sm leading-7 text-white/85">
            以《面向 AI 时代的 K-12 未来创新教育范式 B1.0》为唯一母本。公开门户展示理念、课程知识库与匿名成果。
          </p>
          <Link href="/paradigm" className="btn-white mt-6 no-underline">阅读教育范式</Link>
        </div>
        <div>
          <p className="max-w-md text-sm leading-7 text-white/85">
            第一阶段不提供 LMS、支付或学生账号。学校、教师与合作伙伴可通过结构化课程字段理解星球学院。
          </p>
          <Link href="/contact" className="btn-white mt-6 no-underline">联系合作</Link>
        </div>
      </div>
      <div className="container-wide grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="wordmark text-3xl text-white">星球学院</p>
          <p className="wordmark mt-1 text-sm text-white">PLANET ACADEMY</p>
          <p className="mt-4 text-xs text-white/55">范式版本 B1.0 · 公开成果默认匿名</p>
        </div>
        <div className="md:col-span-3">
          <p className="kicker text-white/50">范式</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link href="/paradigm" className="no-underline hover:opacity-70">教育范式总览</Link></li>
            <li><Link href="/paradigm/why" className="no-underline hover:opacity-70">WHY 范式基础</Link></li>
            <li><Link href="/paradigm/capabilities" className="no-underline hover:opacity-70">C1-C6</Link></li>
            <li><Link href="/paradigm/xyz" className="no-underline hover:opacity-70">XYZ 框架</Link></li>
            <li><Link href="/paradigm/teaching-arcs" className="no-underline hover:opacity-70">教学弧</Link></li>
            <li><Link href="/paradigm/assessment" className="no-underline hover:opacity-70">评价体系</Link></li>
            <li><Link href="/paradigm/ecosystem" className="no-underline hover:opacity-70">五重闭环</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="kicker text-white/50">课程</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link href="/courses" className="no-underline hover:opacity-70">课程中心</Link></li>
            <li><Link href="/projects" className="no-underline hover:opacity-70">项目成果</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="kicker text-white/50">关于</p>
          <ul className="mt-3 space-y-2 text-sm text-white">
            <li><Link href="/about" className="no-underline hover:opacity-70">关于我们</Link></li>
            <li><Link href="/contact" className="no-underline hover:opacity-70">联系与合作</Link></li>
            <li><Link href="/privacy" className="no-underline hover:opacity-70">隐私政策</Link></li>
            <li><Link href="/admin" className="no-underline hover:opacity-70">内容后台</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
