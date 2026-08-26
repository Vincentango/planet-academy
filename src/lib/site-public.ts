export type NavItem = { label: string; href: string; visible?: boolean | null }

export function visibleNav(nav: NavItem[]) {
  return nav.filter((item) => item.visible !== false && item.label && item.href)
}

export const DEFAULT_NAV: NavItem[] = [
  { label: '首页', href: '/', visible: true },
  { label: '课程体系', href: '/curriculum', visible: true },
  { label: '关于', href: '/about', visible: true },
]
