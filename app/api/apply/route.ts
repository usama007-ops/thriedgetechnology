import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData()
    const get = (k: string) => fd.get(k)?.toString() ?? ''

    const name = get('name')
    const email = get('email')
    const phone = get('phone')
    const position = get('position')
    const linkedin = get('linkedin')
    const portfolio = get('portfolio')
    const message = get('message')
    const cvFile = fd.get('cv') as File | null

    // Build email body
    const body = `
New job application received via thrilledge.com

Position: ${position}
Name: ${name}
Email: ${email}
Phone: ${phone || '—'}
LinkedIn: ${linkedin || '—'}
Portfolio: ${portfolio || '—'}

Cover Note:
${message || '(none)'}
    `.trim()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const attachments: nodemailer.Attachment[] = []
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer())
      attachments.push({ filename: cvFile.name, content: buffer })
    }

    await transporter.sendMail({
      from: `"Thrill Edge Careers" <${process.env.SMTP_USER}>`,
      to: 'info@thrilledge.com',
      replyTo: email,
      subject: `New Application: ${position} — ${name}`,
      text: body,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Apply API]', e)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
