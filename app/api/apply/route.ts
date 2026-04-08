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

/**
 * Upload a file to WordPress media library.
 * Requires a WP user with at least Author role.
 * Uses WP Application Password, generate one at:
 * WP Admin → Users → Your Profile → Application Passwords
 */
async function uploadToWordPress(
  arrayBuffer: ArrayBuffer,
  filename: string,
  mimeType: string
): Promise<string> {
  const WP_URL  = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.thrilledge.com'
  const WP_USER = process.env.WP_MEDIA_USER || process.env.WP_API_USER
  const WP_PASS = process.env.WP_MEDIA_APP_PASSWORD || process.env.WP_API_PASSWORD

  if (!WP_USER || !WP_PASS) throw new Error('WordPress media credentials not configured')

  const credentials = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': mimeType,
    },
    body: new Uint8Array(arrayBuffer),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WP media upload failed (${res.status}): ${err}`)
  }

  const data = await res.json()
  return (data.source_url || data.link) as string
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData()
    const get = (k: string) => fd.get(k)?.toString() ?? ''

    const name      = get('name')
    const email     = get('email')
    const phone     = get('phone')
    const position  = get('position')
    const linkedin  = get('linkedin')
    const portfolio = get('portfolio')
    const message   = get('message')
    const cvFile    = fd.get('cv') as File | null

    // ── Upload CV to WordPress ──────────────────────────────────────────────
    let cvUrl = ''
    if (cvFile && cvFile.size > 0) {
      try {
        const arrayBuffer = await cvFile.arrayBuffer()
        const mimeType    = cvFile.type || 'application/octet-stream'
        const safeName    = `cv-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-${cvFile.name}`
        cvUrl = await uploadToWordPress(arrayBuffer, safeName, mimeType)
        console.log('[Apply API] CV uploaded:', cvUrl)
      } catch (uploadErr) {
        console.error('[Apply API] CV upload failed:', uploadErr)
        // Non-fatal, email still sends, just without CV link
      }
    }

    // ── Build HTML email ────────────────────────────────────────────────────
    const fields: [string, string][] = [
      ['Full Name',          name],
      ['Email',              email],
      ['Phone',              phone     || '—'],
      ['LinkedIn',           linkedin  || '—'],
      ['Portfolio / GitHub', portfolio || '—'],
    ]

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">

        <tr>
          <td style="background:#111212;padding:32px 40px;">
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;">Thrill Edge Technologies</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">New Job Application</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding-bottom:24px;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 4px;font-size:12px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Position</p>
                  <p style="margin:0;font-size:20px;font-weight:700;color:#111212;">${position || '—'}</p>
                </td>
              </tr>

              ${fields.map(([label, val]) => `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">${label}</p>
                  <p style="margin:0;font-size:15px;color:#111212;">${val}</p>
                </td>
              </tr>`).join('')}

              ${cvUrl ? `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 10px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">CV / Resume</p>
                  <a href="${cvUrl}"
                    style="display:inline-block;background:#111212;color:#ffffff;font-size:13px;font-weight:600;padding:10px 22px;border-radius:20px;text-decoration:none;">
                    ↓ Download CV
                  </a>
                  <p style="margin:8px 0 0;font-size:11px;color:#929296;word-break:break-all;">${cvUrl}</p>
                </td>
              </tr>` : `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">CV / Resume</p>
                  <p style="margin:0;font-size:14px;color:#929296;">No CV uploaded</p>
                </td>
              </tr>`}

              ${message ? `
              <tr>
                <td style="padding:14px 0;">
                  <p style="margin:0 0 8px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Cover Note</p>
                  <p style="margin:0;font-size:15px;color:#111212;line-height:1.6;white-space:pre-wrap;">${message}</p>
                </td>
              </tr>` : ''}

            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#929296;">Sent from thrilledge.com careers page</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ── Send email ──────────────────────────────────────────────────────────
    const transporter = makeTransport()

    // Verify SMTP connection before sending
    await transporter.verify()

    await transporter.sendMail({
      from:    `"Thrill Edge Careers" <${process.env.SMTP_FROM}>`,
      to:      process.env.SMTP_TO,
      replyTo: email,
      subject: `[Careers] ${position || 'Application'}, ${name}`,
      html,
    })

    console.log('[Apply API] Email sent to', process.env.SMTP_TO)
    return NextResponse.json({ success: true })

  } catch (e) {
    console.error('[Apply API] Fatal error:', e)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
