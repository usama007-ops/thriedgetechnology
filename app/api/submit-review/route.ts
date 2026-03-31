import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { first_name, last_name, email, phone, company_name, website, rating, written_review } = body

    const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.thrilledge.com'
    const WP_USER = process.env.WP_API_USER
    const WP_PASS = process.env.WP_API_PASSWORD

    if (!WP_USER || !WP_PASS) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const credentials = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')

    // Create testimonial post with status=pending (requires approval before showing)
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/testimonial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        title: `${first_name} ${last_name} — ${company_name || email}`,
        content: written_review,
        status: 'pending',   // won't show until approved in WP admin
        acf: {
          author_name: `${first_name} ${last_name}`,
          author_title: rating,
          author_company: company_name,
          rating: rating === 'Excellent' ? 5 : rating === 'Good' ? 4 : rating === 'Okay' ? 3 : rating === 'Bad' ? 2 : 1,
        },
        meta: {
          reviewer_email: email,
          reviewer_phone: phone,
          reviewer_website: website,
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Submit Review]', err)
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[Submit Review]', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
