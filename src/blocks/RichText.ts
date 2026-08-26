import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const RichText: Block = {
  slug: 'richText',
  labels: { singular: '富文本', plural: '富文本' },
  fields: [
    ...layoutFields,
    { name: 'kicker', type: 'text', label: '眉题' },
    { name: 'heading', type: 'textarea', label: '标题' },
    { name: 'body', type: 'richText', label: '正文', required: true },
  ],
}
