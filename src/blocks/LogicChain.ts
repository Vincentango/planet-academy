import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const LogicChain: Block = {
  slug: 'logicChain',
  labels: { singular: '逻辑链', plural: '逻辑链' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题', defaultValue: 'WHY → WHAT → HOW → PROVE' },
    { name: 'intro', type: 'textarea', label: '导语' },
    {
      name: 'layers',
      type: 'array',
      label: '四层推导',
      minRows: 4,
      maxRows: 5,
      fields: [
        { name: 'code', type: 'text', required: true, label: '层代码' },
        { name: 'title', type: 'text', required: true, label: '层名称' },
        { name: 'summary', type: 'textarea', required: true, label: '摘要' },
        { name: 'href', type: 'text', label: '链接' },
      ],
    },
  ],
}
