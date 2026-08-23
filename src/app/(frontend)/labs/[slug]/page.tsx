import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { LabCourseCard } from '@/components/courses/LabCourseCard'
import { LabTagBar, type TagGroup } from '@/components/labs/LabTagBar'
import {
  ARCS,
  ISSUES,
  STAGES,
  catalogForScene,
  filterCatalog,
  getScene,
  resolveSceneSlug,
  type BrowseTagKey,
} from '@/lib/framework'

type Search = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v || ''
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const resolved = resolveSceneSlug(slug)
  const scene = resolved ? getScene(resolved) : null
  if (!scene) return { title: '星球研究室' }
  return { title: scene.name, description: 'focus' in scene ? scene.focus : scene.name }
}

export default async function LabDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Search>
}) {
  const { slug } = await params
  const resolved = resolveSceneSlug(slug)
  if (!resolved) notFound()
  if (resolved !== slug) {
    const sp = await searchParams
    const qs = new URLSearchParams()
    for (const key of ['issue', 'stage', 'arc'] as const) {
      const value = first(sp[key])
      if (value) qs.set(key, value)
    }
    const tail = qs.toString()
    redirect(tail ? `/labs/${resolved}?${tail}` : `/labs/${resolved}`)
  }

  const scene = getScene(resolved)
  if (!scene) notFound()

  const sp = await searchParams
  const current: Partial<Record<BrowseTagKey, string>> = {
    issue: first(sp.issue) || undefined,
    stage: first(sp.stage) || undefined,
    arc: first(sp.arc) || undefined,
  }

  const groups: TagGroup[] = [
    { key: 'issue', label: '议题', options: ISSUES.map((item) => ({ value: item.id, label: item.name })) },
    { key: 'stage', label: '学段', options: STAGES.map((item) => ({ value: item.id, label: item.label })) },
    { key: 'arc', label: '教学弧', options: ARCS.map((item) => ({ value: item.id, label: item.name })) },
  ]

  const shown = filterCatalog(catalogForScene(resolved), current)

  return (
    <>
      <section className="container-wide pb-6 pt-12">
        <article className="panel px-6 py-10 md:px-10">
          <p className="kicker">
            <Link href="/labs" className="no-underline">
              星球研究室
            </Link>
            {' / '}
            {'nameEn' in scene ? scene.nameEn : 'Library'}
          </p>
          <h1 className="headline mt-4 text-5xl md:text-7xl">{scene.name}</h1>
          <p className="dek mt-5 max-w-2xl text-lg">{'focus' in scene ? scene.focus : ''}</p>
        </article>
      </section>

      <section className="container-wide pb-16">
        <LabTagBar slug={resolved} groups={groups} current={current} />
        <p className="mt-6 text-sm text-muted">
          {shown.length ? `${shown.length} 门课（含筹备中）` : '这类课还在设计。标签仍可切换。'}
        </p>
        <div className="mt-6 grid gap-4">
          {shown.map((course) => (
            <LabCourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </>
  )
}
