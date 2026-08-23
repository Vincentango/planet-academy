import {
  CATALOG,
  DESIGNED_BY_SLUG,
  FALLBACK_FEATURED,
  type CatalogCourse,
  type IssueId,
  type SceneSlug,
  type StageId,
  type ArcId,
} from '@/lib/framework'
import { payloadClient } from '@/lib/payload'

function asIssue(v: unknown): IssueId | undefined {
  return v === 'nature' || v === 'tech' || v === 'people' ? v : undefined
}

function asScene(v: unknown): SceneSlug | undefined {
  const s = String(v || '')
  const ok = CATALOG.some((c) => c.scene === s)
  return ok ? (s as SceneSlug) : undefined
}

function asStage(v: unknown): StageId | undefined {
  const s = String(v || '')
  return s === 'g1-3' || s === 'g4-6' || s === 'g7-9' || s === 'g10-12' ? s : undefined
}

function asArc(v: unknown): ArcId | undefined {
  const s = String(v || '')
  return s === 'inquiry' || s === 'design' || s === 'agile' || s === 'game' || s === 'action' ? s : undefined
}

export function payloadToCatalog(doc: Record<string, unknown>): CatalogCourse | null {
  const slug = String(doc.slug || '')
  if (!slug) return null
  const seed = DESIGNED_BY_SLUG[slug]
  const scene = asScene(doc.scene) || asScene(doc.lab) || seed?.scene
  const issue = asIssue(doc.issue) || seed?.issue || 'nature'
  const stage = asStage(doc.stage) || seed?.stage || 'g7-9'
  if (!scene) return null
  return {
    slug,
    title: String(doc.title || seed?.title || slug),
    subtitle: String(doc.subtitle || seed?.subtitle || ''),
    designed: true,
    issue,
    scene,
    stage,
    arc: asArc(doc.arc) || seed?.arc,
    gradeMin: Number(doc.gradeMin || seed?.gradeMin || 0) || undefined,
    gradeMax: Number(doc.gradeMax || seed?.gradeMax || 0) || undefined,
    totalHours: Number(doc.totalHours || seed?.totalHours || 0) || undefined,
    subjects: Array.isArray(doc.subjects) ? (doc.subjects as string[]) : seed?.subjects,
  }
}

export function mergeCatalog(cms: CatalogCourse[], base = CATALOG): CatalogCourse[] {
  const bySlug = new Map(base.map((c) => [c.slug, c]))
  for (const course of cms) {
    bySlug.set(course.slug, course)
  }
  return [...bySlug.values()]
}

export async function publishedCmsCourses(limit = 200): Promise<CatalogCourse[]> {
  try {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'courses',
      where: { status: { equals: 'published' } },
      limit,
      depth: 0,
      sort: '-featured',
    })
    return res.docs
      .map((doc) => payloadToCatalog(doc as unknown as Record<string, unknown>))
      .filter((item): item is CatalogCourse => Boolean(item))
  } catch {
    return []
  }
}

export async function featuredCourses(limit = 4): Promise<CatalogCourse[]> {
  const cms = await publishedCmsCourses(40)
  const featured = cms.filter((c) => c.designed).slice(0, limit)
  if (featured.length) return featured
  return FALLBACK_FEATURED.slice(0, limit)
}

export async function catalogWithCms(sceneSlug?: string) {
  const cms = await publishedCmsCourses()
  const merged = mergeCatalog(cms)
  if (!sceneSlug || sceneSlug === 'all') return merged
  return merged.filter((c) => c.scene === sceneSlug)
}
