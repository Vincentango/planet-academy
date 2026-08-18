import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: '行动号召', plural: '行动号召' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', required: true, label: '标题' },
    { name: 'body', type: 'textarea', label: '说明' },
    { name: 'buttonLabel', type: 'text', label: '按钮文字' },
    { name: 'buttonHref', type: 'text', label: '按钮链接' },
  ],
}
