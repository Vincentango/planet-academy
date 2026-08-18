import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Metrics: Block = {
  slug: 'metrics',
  labels: { singular: '指标', plural: '指标' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题' },
    {
      name: 'items',
      type: 'array',
      label: '数据项',
      fields: [
        { name: 'value', type: 'text', required: true, label: '数值' },
        { name: 'label', type: 'text', required: true, label: '标签' },
        { name: 'note', type: 'text', label: '解释（禁止纯装饰数字）' },
      ],
    },
  ],
}
