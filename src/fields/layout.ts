import type { Field } from 'payload'

export const layoutFields: Field[] = [
  {
    type: 'collapsible',
    label: '视觉与交互',
    admin: { initCollapsed: true },
    fields: [
      { name: 'blockName', type: 'text', label: '后台名称' },
      { name: 'anchor', type: 'text', label: '锚点' },
      {
        type: 'row',
        fields: [
          {
            name: 'surface',
            type: 'select',
            label: '背景',
            defaultValue: 'paper',
            options: [
              { label: '纸色', value: 'paper' },
              { label: '白面板', value: 'white' },
              { label: '墨色', value: 'ink' },
            ],
          },
          {
            name: 'padding',
            type: 'select',
            label: '留白',
            defaultValue: 'normal',
            options: [
              { label: '紧凑', value: 'compact' },
              { label: '常规', value: 'normal' },
              { label: '宽松', value: 'roomy' },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'theme',
            type: 'select',
            label: '主题（兼容）',
            defaultValue: 'light',
            options: [
              { label: '浅色', value: 'light' },
              { label: '品牌深色', value: 'brand' },
              { label: '深色', value: 'dark' },
              { label: '中性', value: 'neutral' },
            ],
          },
          {
            name: 'container',
            type: 'select',
            label: '容器',
            defaultValue: 'wide',
            options: [
              { label: '窄栏', value: 'narrow' },
              { label: '内容栏', value: 'content' },
              { label: '宽栏', value: 'wide' },
              { label: '通栏', value: 'full' },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'cardFlip',
            type: 'select',
            label: '卡片翻转（覆盖站点默认）',
            options: [
              { label: '跟随站点', value: '' },
              { label: '悬停', value: 'hover' },
              { label: '点击', value: 'click' },
              { label: '静态', value: 'off' },
            ],
          },
          {
            name: 'autoplay',
            type: 'checkbox',
            label: '本段影像自动播放',
            defaultValue: false,
          },
        ],
      },
    ],
  },
]
