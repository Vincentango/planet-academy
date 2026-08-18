import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: '咨询', plural: '咨询提交' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['createdAt', 'audience', 'name', 'email'],
    group: '系统',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: '姓名' },
    { name: 'email', type: 'email', required: true, label: '邮箱' },
    { name: 'organization', type: 'text', label: '机构 / 学校' },
    {
      name: 'audience',
      type: 'select',
      required: true,
      label: '身份',
      options: [
        { label: '家长', value: 'parent' },
        { label: '学校', value: 'school' },
        { label: '教师', value: 'teacher' },
        { label: '合作伙伴', value: 'partner' },
      ],
    },
    { name: 'message', type: 'textarea', required: true, label: '留言' },
  ],
}
