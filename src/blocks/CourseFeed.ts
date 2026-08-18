import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const CourseFeed: Block = {
  slug: 'courseFeed',
  labels: { singular: '课程流', plural: '课程流' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题' },
    { name: 'intro', type: 'textarea', label: '导语' },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: '精选', value: 'featured' },
        { label: '最新发布', value: 'latest' },
        { label: '手工选择', value: 'manual' },
      ],
    },
    {
      name: 'courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      admin: { condition: (_, s) => s?.mode === 'manual' },
    },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 12 },
  ],
}
