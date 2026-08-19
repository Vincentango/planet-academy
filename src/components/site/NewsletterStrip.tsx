import Link from 'next/link'

export function NewsletterStrip() {
  return (
    <section className="container-wide py-6">
      <div className="panel grid items-end gap-6 px-6 py-10 md:grid-cols-[1.4fr_0.8fr] md:px-10">
        <div>
          <p className="chip-yellow">Newsletter</p>
          <h2 className="headline mt-4 text-3xl md:text-4xl">与星球学院保持联系</h2>
          <p className="dek mt-3 max-w-2xl text-base">
            家长、学校、教师与合作伙伴走同一入口。第一阶段只接受咨询，不接受支付或报名。
          </p>
        </div>
        <div className="md:text-right">
          <Link href="/contact" className="btn-ink no-underline">联系合作</Link>
        </div>
      </div>
    </section>
  )
}
