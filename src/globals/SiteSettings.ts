import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '站点设置',
  admin: { group: '站点设置' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '品牌',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: '星球学院', label: '站点名称' },
            { name: 'siteNameEn', type: 'text', defaultValue: 'CRADLE-X', label: '英文名' },
            { name: 'tagline', type: 'textarea', label: '口号' },
            { name: 'footerNote', type: 'textarea', label: '页脚说明' },
            { name: 'contactEmail', type: 'email', label: '联系邮箱' },
            { name: 'paradigmVersion', type: 'text', defaultValue: 'B3.0', label: '当前范式版本' },
            { name: 'paradigmDate', type: 'text', defaultValue: '2026', label: '范式发布信息' },
            {
              name: 'wordmarkNote',
              type: 'textarea',
              label: '字标说明（只读提示）',
              defaultValue:
                '页眉字标保持叠放：星球学院 在上、CRADLE-X 在下，等视觉宽度。不要改成横排双行不等宽。',
              admin: { readOnly: true },
            },
          ],
        },
        {
          label: '导航',
          fields: [
            {
              name: 'nav',
              type: 'array',
              label: '主导航',
              labels: { singular: '导航项', plural: '导航项' },
              fields: [
                { name: 'label', type: 'text', required: true, label: '文字' },
                { name: 'href', type: 'text', required: true, label: '链接' },
                { name: 'visible', type: 'checkbox', defaultValue: true, label: '显示' },
              ],
            },
          ],
        },
        {
          label: '视觉',
          fields: [
            {
              type: 'group',
              name: 'tokens',
              label: '设计变量（写入前台 CSS）',
              fields: [
                { name: 'paper', type: 'text', defaultValue: '#EDEDE8', label: '纸色 paper' },
                { name: 'ink', type: 'text', defaultValue: '#111111', label: '墨色 ink' },
                { name: 'panel', type: 'text', defaultValue: '#ffffff', label: '面板 panel' },
                { name: 'chipYellow', type: 'text', defaultValue: '#f5d84c', label: '黄标签' },
                { name: 'chipPeach', type: 'text', defaultValue: '#f5ad6e', label: '桃标签' },
                { name: 'accent', type: 'text', defaultValue: '#f5d84c', label: '强调色' },
                { name: 'radius', type: 'text', defaultValue: '1.75rem', label: '圆角' },
                { name: 'maxWidth', type: 'text', defaultValue: '74rem', label: '内容最大宽' },
              ],
            },
          ],
        },
        {
          label: '交互',
          fields: [
            {
              type: 'group',
              name: 'interaction',
              label: '默认交互',
              fields: [
                {
                  name: 'cardFlip',
                  type: 'select',
                  label: '课程卡翻转',
                  defaultValue: 'hover',
                  options: [
                    { label: '悬停翻转', value: 'hover' },
                    { label: '点击翻转', value: 'click' },
                    { label: '不翻转（静态）', value: 'off' },
                  ],
                },
                {
                  name: 'videoAutoplay',
                  type: 'checkbox',
                  label: '影像自动播放（默认关闭）',
                  defaultValue: false,
                },
                {
                  name: 'chipFilter',
                  type: 'select',
                  label: '筛选方式',
                  defaultValue: 'chips',
                  options: [{ label: '点按标签（无下拉）', value: 'chips' }],
                },
                {
                  name: 'motion',
                  type: 'select',
                  label: '动效',
                  defaultValue: 'on',
                  options: [
                    { label: '开', value: 'on' },
                    { label: '减弱', value: 'reduce' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
