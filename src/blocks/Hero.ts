import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: '首屏', plural: '首屏' },
  fields: [
    ...layoutFields,
    { name: 'eyebrow', type: 'text', label: '眉题' },
    { name: 'heading', type: 'text', label: '标题', required: true },
    { name: 'subheading', type: 'textarea', label: '说明' },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: '媒体',
    },
    {
      name: 'actions',
      type: 'array',
      label: '按钮',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
