import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const Mosaic: Block = {
  slug: 'mosaic',
  labels: { singular: '拼贴', plural: '拼贴' },
  fields: [
    ...layoutFields,
    {
      name: 'items',
      type: 'array',
      label: '拼贴项',
      labels: { singular: '项', plural: '项' },
      fields: [
        {
          name: 'kind',
          type: 'select',
          label: '类型',
          defaultValue: 'media',
          options: [
            { label: '影像/图', value: 'media' },
            { label: '高亮句', value: 'line' },
          ],
        },
        { name: 'label', type: 'text', label: '角标' },
        { name: 'title', type: 'text', label: '标题' },
        { name: 'body', type: 'textarea', label: '说明' },
        { name: 'url', type: 'text', label: '外链或本地路径' },
        { name: 'media', type: 'upload', relationTo: 'media', label: '上传媒体' },
        {
          name: 'tone',
          type: 'select',
          label: '高亮色',
          defaultValue: 'yellow',
          options: [
            { label: '黄', value: 'yellow' },
            { label: '桃', value: 'peach' },
            { label: '墨', value: 'charcoal' },
          ],
        },
        { name: 'playInPlace', type: 'checkbox', defaultValue: true, label: '原地播放' },
      ],
    },
  ],
}
