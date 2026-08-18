import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: '媒体', plural: '媒体' },
  admin: { group: '内容', defaultColumns: ['filename', 'alt', 'kind'] },
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true, label: '替代文本' },
    { name: 'caption', type: 'textarea', label: '说明' },
    { name: 'copyright', type: 'text', label: '版权 / 授权来源' },
    {
      name: 'anonymized',
      type: 'checkbox',
      label: '已匿名（未成年人可识别信息已处理）',
      defaultValue: true,
    },
    {
      name: 'kind',
      type: 'select',
      label: '类型',
      defaultValue: 'image',
      options: [
        { label: '图片', value: 'image' },
        { label: '视频', value: 'video' },
        { label: 'PDF', value: 'pdf' },
      ],
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    focalPoint: true,
  },
}
