import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const RichText: Block = {
  slug: 'richText',
  labels: { singular: '富文本', plural: '富文本' },
  fields: [
    ...layoutFields,
    { name: 'kicker', type: 'text', label: '眉题' },
    {
      name: 'display',
      type: 'select',
      label: '排版',
      defaultValue: 'plain',
      options: [
        { label: '常规', value: 'plain' },
        { label: '杂志栏', value: 'editorial' },
      ],
    },
    { name: 'heading', type: 'textarea', label: '标题' },
    { name: 'body', type: 'richText', label: '正文', required: true },
  ],
}
