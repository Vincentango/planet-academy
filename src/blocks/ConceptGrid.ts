import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const ConceptGrid: Block = {
  slug: 'conceptGrid',
  labels: { singular: '概念网格', plural: '概念网格' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题' },
    { name: 'intro', type: 'textarea', label: '导语' },
    {
      name: 'family',
      type: 'select',
      label: '术语族',
      options: [
        { label: 'C 核心能力', value: 'C' },
        { label: 'X 议题', value: 'X' },
        { label: 'Y 透镜', value: 'Y' },
        { label: 'T 技能构件', value: 'T' },
        { label: 'L 认知阶梯', value: 'L' },
        { label: 'ARC 教学弧', value: 'ARC' },
        { label: 'AI 能力', value: 'AI' },
        { label: 'A 领域路径', value: 'A' },
        { label: 'TRACK 综合赛道', value: 'TRACK' },
        { label: 'LOOP 闭环', value: 'LOOP' },
      ],
    },
    {
      name: 'concepts',
      type: 'relationship',
      relationTo: 'concepts',
      hasMany: true,
      label: '指定术语',
    },
  ],
}
