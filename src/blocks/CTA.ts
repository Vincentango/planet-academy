import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: '行动号召', plural: '行动号召' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', required: true, label: '标题' },
    { name: 'kicker', type: 'text', label: '眉题' },
    { name: 'body', type: 'textarea', label: '说明' },
    { name: 'buttonLabel', type: 'text', label: '主按钮文字' },
    { name: 'buttonHref', type: 'text', label: '主按钮链接' },
    {
      name: 'buttons',
      type: 'array',
      label: '按钮行',
      fields: [
        { name: 'label', type: 'text', required: true, label: '文字' },
        { name: 'href', type: 'text', required: true, label: '链接' },
        { name: 'visible', type: 'checkbox', defaultValue: true, label: '显示' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '幽灵', value: 'ghost' },
          ],
        },
      ],
    },
  ],
}
