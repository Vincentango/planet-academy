import type { Field } from 'payload'

export const layoutFields: Field[] = [
  {
    type: 'collapsible',
    label: '布局与主题',
    admin: { initCollapsed: true },
    fields: [
      { name: 'blockName', type: 'text', label: '后台名称' },
      { name: 'anchor', type: 'text', label: '锚点' },
      {
        type: 'row',
        fields: [
          {
            name: 'theme',
            type: 'select',
            label: '主题',
            defaultValue: 'brand',
            options: [
              { label: '品牌深色', value: 'brand' },
              { label: '深色', value: 'dark' },
              { label: '浅色', value: 'light' },
              { label: '中性', value: 'neutral' },
            ],
          },
          {
            name: 'container',
            type: 'select',
            label: '容器',
            defaultValue: 'content',
            options: [
              { label: '窄栏', value: 'narrow' },
              { label: '内容栏', value: 'content' },
              { label: '宽栏', value: 'wide' },
              { label: '通栏', value: 'full' },
            ],
          },
          {
            name: 'height',
            type: 'select',
            label: '高度预设',
            defaultValue: 'auto',
            options: [
              { label: '自动', value: 'auto' },
              { label: '小', value: 'small' },
              { label: '中', value: 'medium' },
              { label: '大', value: 'large' },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'spanDesktop', type: 'number', label: '桌面跨度', min: 1, max: 12, defaultValue: 12 },
          { name: 'spanTablet', type: 'number', label: '平板跨度', min: 1, max: 12, defaultValue: 12 },
          { name: 'spanMobile', type: 'number', label: '手机跨度', min: 1, max: 12, defaultValue: 12 },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'spacing',
            type: 'select',
            label: '间距',
            defaultValue: 'lg',
            options: [
              { label: '无', value: 'none' },
              { label: 'XS', value: 'xs' },
              { label: 'SM', value: 'sm' },
              { label: 'MD', value: 'md' },
              { label: 'LG', value: 'lg' },
              { label: 'XL', value: 'xl' },
            ],
          },
          {
            name: 'alignment',
            type: 'select',
            label: '对齐',
            defaultValue: 'left',
            options: [
              { label: '左', value: 'left' },
              { label: '中', value: 'center' },
              { label: '右', value: 'right' },
            ],
          },
        ],
      },
    ],
  },
]
