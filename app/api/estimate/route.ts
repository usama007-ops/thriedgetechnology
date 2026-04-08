import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      projectTypes = [], workStyle = [],
      budget, timeline,
      name, email, phone, company, region, notes,
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const row = (label: string, value: string) => value ? `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
          <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">${label}</p>
          <p style="margin:0;font-size:15px;color:#111212;">${value}</p>
        </td>
      </tr>` : ''

    const tagList = (items: string[]) => items.length
      ? items.map(i => `<span style="display:inline-block;background:#f0f0f0;color:#111212;font-size:12px;padding:4px 10px;border-radius:20px;margin:2px 3px 2px 0;">${i}</span>`).join('')
      : '—'

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
        <!-- Header -->
        <tr>
          <td style="background:#111212;padding:32px 40px;">
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;">Thrill Edge Technologies</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">New Project Estimate Request</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              <!-- Project types -->
              <tr>
                <td style="padding-bottom:20px;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 8px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Building</p>
                  <div>${tagList(projectTypes)}</div>
                </td>
              </tr>

              <!-- Work style -->
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 8px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Work Style</p>
                  <div>${tagList(workStyle)}</div>
                </td>
              </tr>

              ${row('Budget', budget)}
              ${row('Timeline', timeline)}
              ${row('Full Name', name)}
              ${row('Email', email)}
              ${row('Phone', phone)}
              ${row('Company / Startup', company)}
              ${row('Region', region)}

              ${notes ? `
              <tr>
                <td style="padding:14px 0;">
                  <p style="margin:0 0 8px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Additional Notes</p>
                  <p style="margin:0;font-size:15px;color:#111212;line-height:1.6;white-space:pre-wrap;">${notes}</p>
                </td>
              </tr>` : ''}

            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#929296;">Sent from thrilledge.com project cost estimator</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

    const transporter = makeTransport()
    await transporter.verify()
    await transporter.sendMail({
      from:    `"Thrill Edge Estimator" <${process.env.SMTP_FROM}>`,
      to:      process.env.SMTP_TO,
      replyTo: email,
      subject: `[Estimate] ${name}${company ? `, ${company}` : ''}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Estimate API]', e)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
