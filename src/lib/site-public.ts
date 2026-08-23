export type NavItem = { label: string; href: string; visible?: boolean | null }

export function visibleNav(nav: NavItem[]) {
  return nav.filter((item) => item.visible !== false && item.label && item.href)
}

export const DEFAULT_NAV: NavItem[] = [
  { label: '首页', href: '/', visible: true },
  { label: '理念', href: '/philosophy', visible: true },
  { label: '场景', href: '/scenes', visible: true },
  { label: '关于', href: '/about', visible: true },
]
