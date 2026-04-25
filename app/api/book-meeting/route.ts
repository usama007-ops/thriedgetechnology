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
    const { name, email, date, time } = body

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Format date nicely
    const dateObj = new Date(`${date}T${time}`)
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const formattedTime = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    // ── Email to team ───────────────────────────────────────────────────────
    const teamHtml = `
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
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">New Meeting Booked</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Meeting Type</p>
                  <p style="margin:0;font-size:18px;font-weight:700;color:#111212;">Zeerak Jamshaid | 30 Minute Meeting</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#929296;">Web conferencing details provided upon confirmation.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Date &amp; Time</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111212;">${formattedDate} at ${formattedTime}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Guest Name</p>
                  <p style="margin:0;font-size:15px;color:#111212;">${name}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Guest Email</p>
                  <p style="margin:0;font-size:15px;color:#111212;">${email}</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#929296;">Sent from thrilledge.com contact page</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ── Confirmation email to guest ─────────────────────────────────────────
    const guestHtml = `
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
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">Meeting Confirmed ✓</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
              Hi ${name}, your meeting has been booked. Here are the details:
            </p>

            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#f9f9f9;border-radius:10px;padding:24px;border:1px solid #f0f0f0;">
              <tr>
                <td style="padding-bottom:16px;border-bottom:1px solid #e5e5e5;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Meeting</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#111212;">Zeerak Jamshaid | 30 Minute Meeting</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0 0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">Date &amp; Time</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111212;">${formattedDate} at ${formattedTime}</p>
                  <p style="margin:6px 0 0;font-size:13px;color:#929296;">Web conferencing details will be provided upon confirmation.</p>
                </td>
              </tr>
            </table>

            <p style="margin:24px 0 0;font-size:14px;color:#929296;line-height:1.6;">
              If you need to reschedule or have any questions, reply to this email or reach us on WhatsApp.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#929296;">Thrill Edge Technologies · thrilledge.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    const transporter = makeTransport()
    await transporter.verify()

    // Send to team
    await transporter.sendMail({
      from: `"Thrill Edge Technologies" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `[Meeting] ${name} — ${formattedDate} at ${formattedTime}`,
      html: teamHtml,
    })

    // Send confirmation to guest
    await transporter.sendMail({
      from: `"Thrill Edge Technologies" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: `Meeting Confirmed: ${formattedDate} at ${formattedTime}`,
      html: guestHtml,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Book Meeting API] Error:', e)
    return NextResponse.json({ error: 'Failed to book meeting' }, { status: 500 })
  }
}
