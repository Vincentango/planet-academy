import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: '用户', plural: '用户' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: '系统',
  },
  auth: true,
  fields: [
    { name: 'name', type: 'text', label: '姓名' },
    {
      name: 'role',
      type: 'select',
      label: '角色',
      defaultValue: 'editor',
      required: true,
      options: [
        { label: '超级管理员', value: 'admin' },
        { label: '范式管理员', value: 'paradigm' },
        { label: '课程负责人', value: 'course_lead' },
        { label: '内容编辑', value: 'editor' },
        { label: '审核发布人', value: 'publisher' },
      ],
    },
  ],
}
