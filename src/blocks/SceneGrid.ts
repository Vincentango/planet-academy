import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const SceneGrid: Block = {
  slug: 'sceneGrid',
  labels: { singular: '场景网格', plural: '场景网格' },
  fields: [
    ...layoutFields,
    { name: 'kicker', type: 'text', label: '眉题', defaultValue: '3 × 3' },
    { name: 'heading', type: 'text', label: '标题' },
    { name: 'intro', type: 'textarea', label: '导语' },
    {
      name: 'items',
      type: 'array',
      label: '场景覆盖（可选）',
      admin: { description: '留空则用代码里的九个场景名称。可改简介与显隐。' },
      fields: [
        { name: 'slug', type: 'text', required: true, label: '场景标识' },
        { name: 'blurb', type: 'textarea', label: '简介覆盖' },
        { name: 'visible', type: 'checkbox', defaultValue: true, label: '显示' },
      ],
    },
  ],
}
