import type { Metadata } from 'next'
import React from 'react'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getSiteSettings, tokenStyle } from '@/lib/site'
import './styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: {
    default: '星球学院 / CRADLE-X',
    template: '%s · 星球学院',
  },
  description: '星球学院 / CRADLE-X：真实世界项目课。三个议题、九个场景、四个学段。',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings()
  const motion = site.interaction.motion
  return (
    <html
      lang="zh-CN"
      style={tokenStyle(site.tokens)}
      data-motion={motion}
      data-card-flip={site.interaction.cardFlip}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SiteHeader nav={site.nav} />
        <main>{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
