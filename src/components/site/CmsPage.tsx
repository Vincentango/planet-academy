import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { featuredCourses } from '@/lib/cms-courses'
import { getPublishedPage, type SiteInteraction } from '@/lib/site'
import type { CatalogCourse } from '@/lib/framework'
import type { ReactNode } from 'react'

export async function CmsPage({
  slug,
  fallback,
  interaction,
  courses,
}: {
  slug: string
  fallback: ReactNode
  interaction: SiteInteraction
  courses?: CatalogCourse[]
}) {
  const page = await getPublishedPage(slug)
  const layout = (page?.layout as Record<string, unknown>[]) || []
  if (!layout.length) return <>{fallback}</>
  const feed = courses || (await featuredCourses(8))
  return <RenderBlocks blocks={layout} courses={feed} interaction={interaction} />
}
