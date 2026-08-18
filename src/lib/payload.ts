import { getPayload } from 'payload'
import config from '@payload-config'

export async function payloadClient() {
  return getPayload({ config })
}

export function conceptLabel(doc: unknown): { code: string; name: string; shortCode: string } {
  if (!doc || typeof doc !== 'object') return { code: '', name: '', shortCode: '' }
  const c = doc as { code?: string; name?: string; shortCode?: string }
  return { code: c.code || '', name: c.name || '', shortCode: c.shortCode || '' }
}

export function gradeBand(min?: number | null, max?: number | null) {
  if (!min && !max) return '学段未标'
  const a = min || max || 1
  const b = max || min || a
  const band = a <= 6 && b <= 6 ? '小学' : a >= 7 && a <= 9 && b <= 9 ? '初中' : a >= 10 ? '高中' : '跨学段'
  return `${band} · ${a}-${b} 年级`
}
