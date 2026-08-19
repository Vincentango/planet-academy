import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '站点设置',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: '星球学院', label: '站点名称' },
    { name: 'siteNameEn', type: 'text', defaultValue: 'CRADLE-X', label: '英文名' },
    { name: 'tagline', type: 'textarea', label: '口号' },
    { name: 'footerNote', type: 'textarea', label: '页脚说明' },
    { name: 'contactEmail', type: 'email', label: '联系邮箱' },
    { name: 'paradigmVersion', type: 'text', defaultValue: 'B1.0', label: '当前范式版本' },
    { name: 'paradigmDate', type: 'text', defaultValue: '2026', label: '范式发布信息' },
  ],
}
