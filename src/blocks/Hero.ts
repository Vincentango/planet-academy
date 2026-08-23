import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: '首屏', plural: '首屏' },
  fields: [
    ...layoutFields,
    {
      name: 'variant',
      type: 'select',
      label: '版式',
      defaultValue: 'split',
      options: [
        { label: '左右分栏', value: 'split' },
        { label: '上下堆叠', value: 'stacked' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: '眉题' },
    { name: 'heading', type: 'text', label: '标题', required: true },
    { name: 'dek', type: 'textarea', label: '导语' },
    { name: 'subheading', type: 'textarea', label: '说明' },
    { name: 'mediaCaption', type: 'text', label: '媒体角标' },
    { name: 'mediaTitle', type: 'text', label: '媒体大字' },
    { name: 'media', type: 'upload', relationTo: 'media', label: '媒体' },
    {
      name: 'actions',
      type: 'array',
      label: '按钮',
      labels: { singular: '按钮', plural: '按钮' },
      fields: [
        { name: 'label', type: 'text', required: true, label: '文字' },
        { name: 'href', type: 'text', required: true, label: '链接' },
        { name: 'visible', type: 'checkbox', defaultValue: true, label: '显示' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          label: '样式',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '幽灵', value: 'ghost' },
            { label: '次按钮', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
