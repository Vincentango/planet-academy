import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: '项目成果', plural: '项目成果' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'course'],
    group: '内容',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: '标题' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL 标识' },
    { name: 'summary', type: 'textarea', required: true, label: '摘要' },
    { name: 'course', type: 'relationship', relationTo: 'courses', label: '关联课程' },
    { name: 'processNote', type: 'textarea', label: '过程证据说明' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, label: '画廊' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: '草稿', value: 'draft' },
        { label: '已发布', value: 'published' },
      ],
    },
  ],
}
