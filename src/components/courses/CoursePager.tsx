import Link from 'next/link'
import { listingHref, pageWindow, type CourseFilterParams } from '@/lib/course-listing'

export function CoursePager({
  page,
  totalPages,
  filters,
}: {
  page: number
  totalPages: number
  filters: CourseFilterParams
}) {
  if (totalPages <= 1) return null

  const items = pageWindow(page, totalPages)
  const prev = page > 1 ? listingHref(filters, page - 1) : null
  const next = page < totalPages ? listingHref(filters, page + 1) : null

  return (
    <nav className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="分页">
      {prev ? (
        <Link href={prev} className="link-accent">
          上一页
        </Link>
      ) : (
        <span className="text-muted" aria-disabled="true">
          上一页
        </span>
      )}
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="px-1 text-muted" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span className="inline-block min-w-8 border-b-2 border-ink px-2 py-1 text-center font-semibold" aria-current="page">
                  {item}
                </span>
              ) : (
                <Link href={listingHref(filters, item)} className="inline-block min-w-8 px-2 py-1 text-center no-underline hover:underline">
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
      </ol>
      {next ? (
        <Link href={next} className="link-accent">
          下一页
        </Link>
      ) : (
        <span className="text-muted" aria-disabled="true">
          下一页
        </span>
      )}
    </nav>
  )
}
