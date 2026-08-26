import type { Block } from 'payload'
import { layoutFields } from '@/fields/layout'

export const VideoQuote: Block = {
  slug: 'videoQuote',
  labels: { singular: '视频压字', plural: '视频压字' },
  fields: [
    ...layoutFields,
    { name: 'url', type: 'text', label: '视频路径' },
    { name: 'media', type: 'upload', relationTo: 'media', label: '上传视频' },
    { name: 'english', type: 'textarea', label: '英文压字' },
    { name: 'chinese', type: 'textarea', label: '中文压字' },
  ],
}
