import type { Metadata } from 'next'
import React from 'react'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import './styles.css'

export const metadata: Metadata = {
  title: {
    default: '星球学院 PLANET ACADEMY',
    template: '%s · 星球学院',
  },
  description: '面向 AI 时代的 K-12 未来创新教育范式 B1.0：理念门户、课程知识库与 Payload CMS。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
