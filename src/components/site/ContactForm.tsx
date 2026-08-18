'use client'

import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(formData: FormData) {
    setStatus('idle')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        organization: formData.get('organization'),
        audience: formData.get('audience'),
        message: formData.get('message'),
      }),
    })
    if (res.ok) {
      setStatus('ok')
      setMessage('已收到。我们会按身份类型处理，不把咨询当作招生承诺。')
    } else {
      setStatus('err')
      setMessage('提交失败，请稍后重试或改用邮件。')
    }
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-card p-5">
      <label className="grid gap-1 text-sm">
        姓名
        <input required name="name" className="rounded-xl border border-line bg-elevated px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        邮箱
        <input required type="email" name="email" className="rounded-xl border border-line bg-elevated px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        机构 / 学校（可选）
        <input name="organization" className="rounded-xl border border-line bg-elevated px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        身份
        <select required name="audience" className="rounded-xl border border-line bg-elevated px-3 py-2">
          <option value="parent">家长</option>
          <option value="school">学校</option>
          <option value="teacher">教师</option>
          <option value="partner">合作伙伴</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        留言
        <textarea required name="message" rows={5} className="rounded-xl border border-line bg-elevated px-3 py-2" />
      </label>
      <button className="justify-self-start rounded-full bg-lime px-5 py-2 text-sm font-semibold text-[#102016]" type="submit">
        发送
      </button>
      {status !== 'idle' ? (
        <p role="status" className={status === 'ok' ? 'text-sm text-lime' : 'text-sm text-danger'}>
          {message}
        </p>
      ) : (
        <p className="text-xs text-muted">仅收集回复所需的最少信息。未成年人请由监护人提交。</p>
      )}
    </form>
  )
}
