import { payloadClient } from '@/lib/payload'
import type { CSSProperties } from 'react'

import { DEFAULT_NAV, visibleNav, type NavItem } from '@/lib/site-public'
export { DEFAULT_NAV, visibleNav }
export type { NavItem }

export type SiteTokens = {
  paper: string
  ink: string
  panel: string
  chipYellow: string
  chipPeach: string
  accent: string
  radius: string
  maxWidth: string
}

export type SiteInteraction = {
  cardFlip: 'hover' | 'click' | 'off'
  videoAutoplay: boolean
  chipFilter: 'chips'
  motion: 'on' | 'reduce'
}

export type SiteChrome = {
  siteName: string
  siteNameEn: string
  tagline: string
  footerNote: string
  contactEmail: string
  paradigmVersion: string
  nav: NavItem[]
  tokens: SiteTokens
  interaction: SiteInteraction
}

export const DEFAULT_TOKENS: SiteTokens = {
  paper: '#FCFCF7',
  ink: '#1F1C06',
  panel: '#FFFDF8',
  chipYellow: '#F9E747',
  chipPeach: '#FFCAC5',
  accent: '#EB2A23',
  radius: '0.95rem',
  maxWidth: '80rem',
}

export const DEFAULT_INTERACTION: SiteInteraction = {
  cardFlip: 'hover',
  videoAutoplay: false,
  chipFilter: 'chips',
  motion: 'on',
}

export const DEFAULT_SITE: SiteChrome = {
  siteName: '星球学院',
  siteNameEn: 'CRADLE-X',
  tagline: '未来无边界学校',
  footerNote: '第一阶段不提供 LMS、支付或学生账号。',
  contactEmail: '',
  paradigmVersion: 'B3.0',
  nav: DEFAULT_NAV,
  tokens: DEFAULT_TOKENS,
  interaction: DEFAULT_INTERACTION,
}

const SUPERHI_PAPER = new Set([
  '#EDEDE8', '#F4F1EA', '#f4f1ea', '#ede8e0', '#F7F6F3', '#f7f6f3',
  '#FFFFFF', '#ffffff', '#FFF', '#fff',
])
const SUPERHI_YELLOW = new Set(['#f5d84c', '#F5D84C', '#1C1C1C', '#1c1c1c'])
const SUPERHI_PEACH = new Set(['#f5ad6e', '#F5AD6E', '#d8d4cc', '#D8D4CC', '#E8E8E8', '#e8e8e8'])
const SUPERHI_RADIUS = new Set(['1.75rem', '0.75rem', '0.125rem', '0.55rem'])
const STUDIO_INK = new Set(['#1C1C1C', '#1c1c1c'])

function pickTokens(raw: Record<string, unknown> | null | undefined): SiteTokens {
  const t = (raw || {}) as Record<string, unknown>
  const paper = String(t.paper || DEFAULT_TOKENS.paper)
  const radius = String(t.radius || DEFAULT_TOKENS.radius)
  const chipYellow = String(t.chipYellow || DEFAULT_TOKENS.chipYellow)
  const chipPeach = String(t.chipPeach || DEFAULT_TOKENS.chipPeach)
  const accent = String(t.accent || DEFAULT_TOKENS.accent)
  return {
    paper: SUPERHI_PAPER.has(paper) ? DEFAULT_TOKENS.paper : paper,
    ink: STUDIO_INK.has(String(t.ink || '')) ? DEFAULT_TOKENS.ink : String(t.ink || DEFAULT_TOKENS.ink),
    panel: SUPERHI_PAPER.has(String(t.panel || '')) ? DEFAULT_TOKENS.panel : String(t.panel || DEFAULT_TOKENS.panel),
    chipYellow: SUPERHI_YELLOW.has(chipYellow) ? DEFAULT_TOKENS.chipYellow : chipYellow,
    chipPeach: SUPERHI_PEACH.has(chipPeach) ? DEFAULT_TOKENS.chipPeach : chipPeach,
    accent: SUPERHI_YELLOW.has(accent) ? DEFAULT_TOKENS.accent : accent,
    radius: SUPERHI_RADIUS.has(radius) ? DEFAULT_TOKENS.radius : radius,
    maxWidth: String(t.maxWidth || DEFAULT_TOKENS.maxWidth),
  }
}

function pickInteraction(raw: Record<string, unknown> | null | undefined): SiteInteraction {
  const t = (raw || {}) as Record<string, unknown>
  const flip = String(t.cardFlip || 'hover')
  const motion = String(t.motion || 'on')
  return {
    cardFlip: flip === 'click' || flip === 'off' ? flip : 'hover',
    videoAutoplay: Boolean(t.videoAutoplay),
    chipFilter: 'chips',
    motion: motion === 'reduce' ? 'reduce' : 'on',
  }
}

export function tokenStyle(tokens: SiteTokens): CSSProperties {
  return {
    '--paper': tokens.paper,
    '--paper-warm': tokens.paper,
    '--ink': tokens.ink,
    '--panel': tokens.panel,
    '--yellow': tokens.chipYellow,
    '--peach': tokens.chipPeach,
    '--accent': tokens.accent,
    '--radius': tokens.radius,
    '--max-width': tokens.maxWidth,
  } as CSSProperties
}

export async function getSiteSettings(): Promise<SiteChrome> {
  try {
    const payload = await payloadClient()
    const doc = (await payload.findGlobal({ slug: 'site-settings', depth: 0 })) as Record<string, unknown>
    const nav = Array.isArray(doc.nav) && doc.nav.length ? (doc.nav as NavItem[]) : DEFAULT_NAV
    return {
      siteName: String(doc.siteName || DEFAULT_SITE.siteName),
      siteNameEn: String(doc.siteNameEn || DEFAULT_SITE.siteNameEn),
      tagline: String(doc.tagline || DEFAULT_SITE.tagline),
      footerNote: String(doc.footerNote || DEFAULT_SITE.footerNote),
      contactEmail: String(doc.contactEmail || ''),
      paradigmVersion: String(doc.paradigmVersion || 'B3.0'),
      nav,
      tokens: pickTokens(doc.tokens as Record<string, unknown>),
      interaction: pickInteraction(doc.interaction as Record<string, unknown>),
    }
  } catch {
    return DEFAULT_SITE
  }
}

export async function getPublishedPage(slug: string) {
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
      depth: 2,
      limit: 1,
      draft: false,
    })
    return (res.docs[0] as Record<string, unknown>) || null
  } catch {
    return null
  }
}

export function mediaUrl(media: unknown, fallback = ''): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    const m = media as { url?: string; filename?: string }
    if (m.url) return m.url
    if (m.filename) return `/api/media/file/${m.filename}`
  }
  return fallback
}

