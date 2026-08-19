import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/PageHero'

export const metadata: Metadata = { title: '关于我们' }

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="关于星球学院"
        title="把教育范式做成可检索、可治理的数字基础设施"
        lede="星球学院门户不是现有官网的翻新，也不是若干课程详情页的集合，而是以 B1.0 为内容中枢的数字化课程门户：品牌门户、课程知识库、内容生产系统与持续迭代基础设施。"
      />
      <section className="container-content space-y-6 pb-16 leading-8 text-muted">
        <p>本站第一阶段提供理念展示、课程档案、Payload CMS、数据库与媒体上传（图片与视频）。不提供完整 LMS、支付、SIS、社交或学生账号。</p>
        <p>B1.0 为唯一范式母本。C1.3 仅以 <code className="text-ink">c13_*</code> 字段补充工程化信息，不得覆盖 B1.0，也不得把 C1.3 真实世界强度称为 T 技能。</p>
        <p>
          如需合作或课程共创，请前往 <Link href="/contact" className="link-accent">联系与合作</Link>。
        </p>
      </section>
    </>
  )
}
