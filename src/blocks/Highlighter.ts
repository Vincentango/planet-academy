import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Highlighter: Block = {
  slug: 'highlighter',
  labels: { singular: '高亮句', plural: '高亮句' },
  fields: [
    ...layoutFields,
    { name: 'text', type: 'textarea', required: true, label: '句子' },
    {
      name: 'tone',
      type: 'select',
      label: '色调',
      defaultValue: 'yellow',
      options: [
        { label: '黄', value: 'yellow' },
        { label: '桃', value: 'peach' },
        { label: '墨', value: 'charcoal' },
      ],
    },
  ],
}
