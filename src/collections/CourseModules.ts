import type { CollectionConfig } from 'payload'

export const CourseModules: CollectionConfig = {
  slug: 'course-modules',
  labels: { singular: '课程模块', plural: '课程模块' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'order', 'hours'],
    group: '课程',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: '模块名称' },
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true, label: '所属课程' },
    { name: 'order', type: 'number', required: true, defaultValue: 1, label: '顺序' },
    { name: 'hours', type: 'number', label: '课时' },
    { name: 'goal', type: 'textarea', label: '模块目标' },
    { name: 'task', type: 'textarea', required: true, label: '学生任务' },
    { name: 'teacherMove', type: 'textarea', label: '教师动作' },
    { name: 'output', type: 'textarea', required: true, label: '输出物' },
    { name: 'evidence', type: 'textarea', required: true, label: '证据' },
    { name: 'tools', type: 'textarea', label: '工具' },
    { name: 'risk', type: 'textarea', label: '风险与分层' },
  ],
}
