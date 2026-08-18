import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: { singular: '媒体', plural: '媒体' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题' },
    { name: 'caption', type: 'textarea', label: '说明' },
    {
      name: 'items',
      type: 'array',
      label: '媒体项',
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
