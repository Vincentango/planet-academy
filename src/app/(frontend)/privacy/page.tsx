import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'

export const metadata: Metadata = { title: '隐私政策' }

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="隐私与未成年人保护"
        title="我们如何处理公开内容与咨询信息"
        lede="第一阶段不建立学生实名成长系统。公开成果默认不展示未成年人真实姓名、联系方式、学校班级等可识别信息。"
      />
      <section className="container-content space-y-5 pb-16 leading-8 text-muted">
        <p>咨询表单仅收集回复所需的最少信息：姓名、邮箱、可选机构、身份类型与留言。未成年人请由监护人提交。</p>
        <p>媒体资源须记录替代文本、版权/授权与匿名状态。涉及学校内部数据、精确地理位置或个人健康信息的证据不得直接公开。</p>
        <p>后台账号使用 Payload Auth。管理员密码须在部署后立即更换，且不得把真实密钥提交到版本库。</p>
      </section>
    </>
  )
}
