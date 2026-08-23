import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const CourseFeed: Block = {
  slug: 'courseFeed',
  labels: { singular: '课程流', plural: '课程流' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题' },
    { name: 'kicker', type: 'text', label: '眉题' },
    { name: 'intro', type: 'textarea', label: '导语' },
    { name: 'moreLabel', type: 'text', label: '更多文字' },
    { name: 'moreHref', type: 'text', label: '更多链接' },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'featured',
      label: '来源',
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
      label: '课程',
      admin: { condition: (_, s) => s?.mode === 'manual' },
    },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 12, label: '数量' },
    {
      name: 'display',
      type: 'select',
      label: '卡片形态',
      defaultValue: 'flip',
      options: [
        { label: '翻转（遵循站点交互）', value: 'flip' },
        { label: '强制静态', value: 'static' },
      ],
    },
  ],
}
