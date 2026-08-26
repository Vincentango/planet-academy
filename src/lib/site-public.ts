export type NavItem = { label: string; href: string; visible?: boolean | null }

const DROP = new Set([
  '/philosophy',
  '/scenes',
  '理念',
  '场景',
  '/paradigm',
  '/projects',
  '档案',
  '教育范式',
  '项目成果',
])

function dropped(item: NavItem) {
  if (DROP.has(item.href) || DROP.has(item.label)) return true
  const href = item.href.split('?')[0]
  if (href === '/paradigm' || href.startsWith('/paradigm/')) return true
  if (href === '/projects' || href.startsWith('/projects/')) return true
  return false
}

export function visibleNav(nav: NavItem[]) {
  const cleaned = nav.filter((item) => {
    if (item.visible === false || !item.label || !item.href) return false
    if (dropped(item)) return false
    return true
  })
  if (!cleaned.some((item) => item.href === '/curriculum' || item.label === '课程体系')) {
    const about = cleaned.findIndex((item) => item.href === '/about' || item.label === '关于')
    const insert = { label: '课程体系', href: '/curriculum', visible: true }
    if (about >= 0) cleaned.splice(about, 0, insert)
    else cleaned.push(insert)
  }
  return cleaned
}

export const DEFAULT_NAV: NavItem[] = [
  { label: '首页', href: '/', visible: true },
  { label: '课程体系', href: '/curriculum', visible: true },
  { label: '关于', href: '/about', visible: true },
]
