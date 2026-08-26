import type { CollectionConfig } from 'payload'
import { Hero } from '@/blocks/Hero'
import { RichText } from '@/blocks/RichText'
import { LogicChain } from '@/blocks/LogicChain'
import { ConceptGrid } from '@/blocks/ConceptGrid'
import { CourseFeed } from '@/blocks/CourseFeed'
import { MediaBlock } from '@/blocks/MediaBlock'
import { CTA } from '@/blocks/CTA'
import { Metrics } from '@/blocks/Metrics'
import { Form } from '@/blocks/Form'
import { Mosaic } from '@/blocks/Mosaic'
import { Highlighter } from '@/blocks/Highlighter'
import { SceneGrid } from '@/blocks/SceneGrid'
import { VideoQuote } from '@/blocks/VideoQuote'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: '页面', plural: '页面' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    group: '页面',
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, label: '标题' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'URL 标识' },
    { name: 'excerpt', type: 'textarea', label: '摘要' },
    {
      name: 'layout',
      type: 'blocks',
      label: '模块',
      blocks: [
        Hero,
        Mosaic,
        VideoQuote,
        Highlighter,
        SceneGrid,
        CourseFeed,
        RichText,
        LogicChain,
        ConceptGrid,
        MediaBlock,
        CTA,
        Metrics,
        Form,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'SEO 标题' },
        { name: 'description', type: 'textarea', label: 'SEO 描述' },
      ],
    },
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
