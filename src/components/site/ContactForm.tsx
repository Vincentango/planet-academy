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
    <form action={onSubmit} className="grid gap-4 border border-rule bg-paper p-6">
      <label className="grid gap-1 text-sm">
        姓名
        <input required name="name" className="form-control" />
      </label>
      <label className="grid gap-1 text-sm">
        邮箱
        <input required type="email" name="email" className="form-control" />
      </label>
      <label className="grid gap-1 text-sm">
        机构 / 学校（可选）
        <input name="organization" className="form-control" />
      </label>
      <label className="grid gap-1 text-sm">
        身份
        <select required name="audience" className="form-control">
          <option value="parent">家长</option>
          <option value="school">学校</option>
          <option value="teacher">教师</option>
          <option value="partner">合作伙伴</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        留言
        <textarea required name="message" rows={5} className="form-control" />
      </label>
      <button className="btn-mint justify-self-start" type="submit">
        发送
      </button>
      {status !== 'idle' ? (
        <p role="status" className="text-sm text-muted">{message}</p>
      ) : (
        <p className="text-xs text-muted">仅收集回复所需的最少信息。未成年人请由监护人提交。</p>
      )}
    </form>
  )
}
