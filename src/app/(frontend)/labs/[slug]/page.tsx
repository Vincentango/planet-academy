import { redirect } from 'next/navigation'

type Search = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v || ''
}

export default async function LabsSlugRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Search>
}) {
  const { slug } = await params
  const sp = await searchParams
  const qs = new URLSearchParams()
  for (const key of ['issue', 'stage', 'arc'] as const) {
    const value = first(sp[key])
    if (value) qs.set(key, value)
  }
  const tail = qs.toString()
  redirect(tail ? `/scenes/${slug}?${tail}` : `/scenes/${slug}`)
}
