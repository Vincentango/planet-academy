import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-narrow py-24 text-center">
      <p className="kicker">404</p>
      <h1 className="headline mt-3 text-3xl">没有找到这个页面</h1>
      <p className="dek mt-3">它可能还在草稿里，或地址已经变更。</p>
      <Link href="/" className="btn-mint mt-6 inline-block no-underline">返回首页</Link>
    </section>
  )
}
