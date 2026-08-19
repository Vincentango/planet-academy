import Link from 'next/link'
import { labFilterHref, type LabTagKey } from '@/lib/labs'

export type TagGroup = {
  key: LabTagKey
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
  current: Partial<Record<LabTagKey, string>>
}) {
  const visible = groups.filter((group) => group.options.length > 0)

  return (
    <div className="lab-tags">
      {visible.map((group) => (
        <div key={group.key} className="lab-tags__row">
          <p className="lab-tags__label">{group.label}</p>
          <div className="lab-tags__chips">
            {group.options.map((option) => {
              const active = current[group.key] === option.value
              return (
                <Link
                  key={option.value}
                  href={labFilterHref(slug, current, group.key, option.value)}
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
