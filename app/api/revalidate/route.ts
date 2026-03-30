/**
 * ISR Revalidation API Route
 * Handles on-demand revalidation of cached pages
 * Called by WordPress webhook on content update
 */

import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-token'

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const authHeader = request.headers.get('Authorization')
    if (authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, slug, action } = body

    // Log revalidation
    console.log(`[Revalidate] Type: ${type}, Slug: ${slug}, Action: ${action}`)

    // Revalidate based on type
    switch (type) {
      case 'post':
        if (action === 'published' || action === 'updated') {
          revalidatePath(`/blog/${slug}`)
          revalidatePath('/blog')
          revalidateTag('posts')
        } else if (action === 'deleted') {
          revalidatePath('/blog')
          revalidateTag('posts')
        }
        break

      case 'category':
        revalidatePath(`/categories/${slug}`)
        revalidatePath('/categories')
        revalidateTag('categories')
        break

      case 'work':
        if (action === 'published' || action === 'updated') {
          revalidatePath(`/work/${slug}`)
          revalidatePath('/')
          revalidateTag('work-items')
        }
        break

      case 'service':
        revalidatePath('/')
        revalidateTag('services')
        break

      case 'testimonial':
        revalidatePath('/')
        revalidateTag('testimonials')
        break

      case 'all':
        revalidatePath('/', 'layout')
        break

      default:
        return NextResponse.json(
          { error: `Unknown type: ${type}` },
          { status: 400 }
        )
    }

    return NextResponse.json(
      {
        revalidated: true,
        message: `Successfully revalidated ${type}/${slug}`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Revalidate Error]', error)
    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  
  if (authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is ready',
    instructions: {
      method: 'POST',
      endpoint: '/api/revalidate',
      headers: {
        'Authorization': `Bearer ${REVALIDATE_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: {
        type: 'post|category|work|service|testimonial|all',
        slug: 'post-slug',
        action: 'published|updated|deleted',
      },
    },
  })
}
