import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Form: Block = {
  slug: 'form',
  labels: { singular: '表单', plural: '表单' },
  fields: [
    ...layoutFields,
    { name: 'heading', type: 'text', label: '标题', defaultValue: '联系与合作' },
    { name: 'intro', type: 'textarea', label: '说明' },
    {
      name: 'audience',
      type: 'select',
      hasMany: true,
      label: '咨询身份选项',
      defaultValue: ['parent', 'school', 'teacher', 'partner'],
      options: [
        { label: '家长', value: 'parent' },
        { label: '学校', value: 'school' },
        { label: '教师', value: 'teacher' },
        { label: '合作伙伴', value: 'partner' },
      ],
    },
  ],
}
