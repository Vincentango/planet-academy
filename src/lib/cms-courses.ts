import {
  CATALOG,
  CURRICULUM_FALLBACK,
  DESIGNED_BY_SLUG,
  FALLBACK_FEATURED,
  inferSystem,
  type CatalogCourse,
  type CourseSystem,
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

function asSystem(v: unknown): CourseSystem | undefined {
  return v === 'interest' || v === 'fusion' || v === 'pioneer' ? v : undefined
}

function coverFrom(media: unknown, fallback?: string) {
  if (typeof media === 'string' && media) return media
  if (media && typeof media === 'object') {
    const m = media as { url?: string; filename?: string }
    if (m.url) return m.url
    if (m.filename) return `/api/media/file/${m.filename}`
  }
  return fallback
}

export function payloadToCatalog(doc: Record<string, unknown>): CatalogCourse | null {
  const slug = String(doc.slug || '')
  if (!slug) return null
  const seed = DESIGNED_BY_SLUG[slug]
  const scene = asScene(doc.scene) || asScene(doc.lab) || seed?.scene
  const issue = asIssue(doc.issue) || seed?.issue || 'nature'
  const stage = asStage(doc.stage) || seed?.stage || 'g7-9'
  if (!scene) return null
  const draft: CatalogCourse = {
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
    system: asSystem(doc.system) || seed?.system,
    cover: coverFrom(doc.cover, seed?.cover),
    research: String(doc.drivingQuestion || seed?.research || doc.subtitle || seed?.subtitle || ''),
  }
  return { ...draft, system: inferSystem(draft) }
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
      depth: 1,
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

export async function curriculumCourses(): Promise<CatalogCourse[]> {
  const cms = await publishedCmsCourses(80)
  const bySlug = new Map(CURRICULUM_FALLBACK.map((course) => [course.slug, { ...course, system: inferSystem(course) }]))
  for (const course of cms.filter((item) => item.designed)) {
    const seed = bySlug.get(course.slug)
    const next = {
      ...seed,
      ...course,
      cover: course.cover || seed?.cover,
      research: course.research || seed?.research || course.subtitle,
    }
    bySlug.set(course.slug, { ...next, system: inferSystem(next) })
  }
  return [...bySlug.values()]
}
