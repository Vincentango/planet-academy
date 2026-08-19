const FILTER_KEYS = ['q', 'grade', 'x', 'y', 'c', 'arc', 'subject', 'hours'] as const

export type CourseFilterParams = Partial<Record<(typeof FILTER_KEYS)[number], string>>

export function parsePage(raw: string) {
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n >= 1 ? n : 1
}

export function listingHref(filters: CourseFilterParams, page = 1) {
  const next = new URLSearchParams()
  for (const key of FILTER_KEYS) {
    const value = filters[key]
    if (value) next.set(key, value)
  }
  if (page > 1) next.set('page', String(page))
  const qs = next.toString()
  return qs ? `/courses?${qs}` : '/courses'
}

export function pageWindow(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 1) return []
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>([1, total])
  for (let i = current - 2; i <= current + 2; i += 1) {
    if (i >= 1 && i <= total) pages.add(i)
  }

  const sorted = [...pages].sort((a, b) => a - b)
  const out: Array<number | 'ellipsis'> = []
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('ellipsis')
    out.push(sorted[i])
  }
  return out
}
