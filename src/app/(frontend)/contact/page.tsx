import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { PageHero } from '@/components/site/PageHero'

export const metadata: Metadata = { title: '联系与合作' }

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="联系"
        title="按身份分流的合作入口"
        lede="家长、学校、教师与合作伙伴走同一表单，但必须选择身份，便于后续最小权限处理。不在此阶段接受支付或报名。"
      />
      <section className="container-narrow pb-16">
        <ContactForm />
      </section>
    </>
  )
}
