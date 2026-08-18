import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-narrow py-24 text-center">
      <p className="text-xs tracking-[0.2em] text-lime">404</p>
      <h1 className="mt-3 text-3xl font-semibold">没有找到这个页面</h1>
      <p className="mt-3 text-muted">它可能还在草稿里，或地址已经变更。</p>
      <Link href="/" className="mt-6 inline-block text-lime">返回首页</Link>
    </section>
  )
}
