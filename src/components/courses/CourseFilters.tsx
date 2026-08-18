'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Opt = { value: string; label: string }

export function CourseFilters({
  xOptions,
  yOptions,
  cOptions,
  arcOptions,
  subjectOptions,
}: {
  xOptions: Opt[]
  yOptions: Opt[]
  cOptions: Opt[]
  arcOptions: Opt[]
  subjectOptions: Opt[]
}) {
  const router = useRouter()
  const params = useSearchParams()

  const current = useMemo(
    () => ({
      q: params.get('q') || '',
      grade: params.get('grade') || '',
      x: params.get('x') || '',
      y: params.get('y') || '',
      c: params.get('c') || '',
      arc: params.get('arc') || '',
      subject: params.get('subject') || '',
      hours: params.get('hours') || '',
    }),
    [params],
  )

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push(`/courses?${next.toString()}`)
  }

  const selectClass = 'w-full rounded-xl border border-line bg-elevated px-3 py-2 text-sm text-ink'
  const grades = [
    { value: '', label: '全部年级' },
    { value: '1-6', label: '小学 1-6' },
    { value: '7-9', label: '初中 7-9' },
    { value: '10-12', label: '高中 10-12' },
  ]
  const hours = [
    { value: '', label: '全部课时' },
    { value: '0-16', label: '16 课时及以下' },
    { value: '17-32', label: '17-32 课时' },
    { value: '33-99', label: '33 课时以上' },
  ]

  return (
    <form className="grid gap-3 rounded-2xl border border-line bg-card p-4 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs text-muted">搜索</span>
        <input
          className={selectClass}
          defaultValue={current.q}
          placeholder="课程名称、驱动性问题、学科"
          onBlur={(e) => set('q', e.target.value.trim())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') set('q', (e.target as HTMLInputElement).value.trim())
          }}
        />
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">年级</span>
        <select className={selectClass} value={current.grade} onChange={(e) => set('grade', e.target.value)}>
          {grades.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">课时</span>
        <select className={selectClass} value={current.hours} onChange={(e) => set('hours', e.target.value)}>
          {hours.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">X 议题</span>
        <select className={selectClass} value={current.x} onChange={(e) => set('x', e.target.value)}>
          <option value="">全部 X</option>
          {xOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">Y 透镜</span>
        <select className={selectClass} value={current.y} onChange={(e) => set('y', e.target.value)}>
          <option value="">全部 Y</option>
          {yOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">C 能力</span>
        <select className={selectClass} value={current.c} onChange={(e) => set('c', e.target.value)}>
          <option value="">全部 C</option>
          {cOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">教学弧</span>
        <select className={selectClass} value={current.arc} onChange={(e) => set('arc', e.target.value)}>
          <option value="">全部教学弧</option>
          {arcOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs text-muted">学科</span>
        <select className={selectClass} value={current.subject} onChange={(e) => set('subject', e.target.value)}>
          <option value="">全部学科</option>
          {subjectOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
      <div className="flex items-end">
        <button type="button" className="text-sm text-lime" onClick={() => router.push('/courses')}>
          清空筛选
        </button>
      </div>
    </form>
  )
}
