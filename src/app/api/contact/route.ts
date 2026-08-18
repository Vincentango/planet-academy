import { NextResponse } from 'next/server'
import { payloadClient } from '@/lib/payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()
    const audience = String(body.audience || 'parent')
    const organization = String(body.organization || '').trim()
    if (!name || !email || !message) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 })
    }
    const payload = await payloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, message, audience, organization },
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: '无法保存' }, { status: 500 })
  }
}
