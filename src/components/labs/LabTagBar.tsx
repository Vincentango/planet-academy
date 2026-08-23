import Link from 'next/link'
import { browseFilterHref, type BrowseTagKey } from '@/lib/framework'

export type TagGroup = {
  key: BrowseTagKey
  label: string
  options: { value: string; label: string }[]
}

export function LabTagBar({
  slug,
  groups,
  current,
}: {
  slug: string
  groups: TagGroup[]
  current: Partial<Record<BrowseTagKey, string>>
}) {
  return (
    <div className="lab-tags">
      {groups.map((group) => (
        <div key={group.key} className="lab-tags__row">
          <p className="lab-tags__label">{group.label}</p>
          <div className="lab-tags__chips">
            {group.options.map((option) => {
              const active = current[group.key] === option.value
              return (
                <Link
                  key={option.value}
                  href={browseFilterHref(slug, current, group.key, option.value)}
                  className="tag-chip"
                  data-active={active ? 'true' : 'false'}
                  prefetch={false}
                >
                  {option.label}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
