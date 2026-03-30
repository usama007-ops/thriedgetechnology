/**
 * Cache Management API Route
 * Handles Redis cache operations
 */

import { NextRequest, NextResponse } from 'next/server'
import { getFromCache, setInCache, deleteFromCache, cacheKeys, CACHE_TTL } from '@/lib/redis'

const CACHE_SECRET = process.env.CACHE_SECRET || 'your-cache-secret'

async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('Authorization')
  return authHeader === `Bearer ${CACHE_SECRET}`
}

export async function GET(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const key = searchParams.get('key')

  try {
    switch (action) {
      case 'get':
        if (!key) {
          return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 })
        }
        const cached = await getFromCache(key)
        return NextResponse.json({ key, value: cached })

      case 'info':
        return NextResponse.json({
          message: 'Cache API ready',
          cacheKeys: Object.entries(cacheKeys)
            .reduce((acc, [key, fn]) => {
              acc[key] = typeof fn
              return acc
            }, {} as Record<string, string>),
          ttl: CACHE_TTL,
        })

      default:
        return NextResponse.json({
          error: 'Invalid action',
          availableActions: ['get', 'delete', 'clear', 'info'],
        }, { status: 400 })
    }
  } catch (error) {
    console.error('[Cache API Error]', error)
    return NextResponse.json(
      {
        error: 'Cache operation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { action, key, value, ttl } = body

    switch (action) {
      case 'set':
        if (!key || value === undefined) {
          return NextResponse.json(
            { error: 'Missing key or value' },
            { status: 400 }
          )
        }
        await setInCache(key, value, ttl || CACHE_TTL.POSTS)
        return NextResponse.json({
          success: true,
          key,
          message: 'Cache value set',
        })

      case 'delete':
        if (!key) {
          return NextResponse.json(
            { error: 'Missing key' },
            { status: 400 }
          )
        }
        await deleteFromCache(key)
        return NextResponse.json({
          success: true,
          key,
          message: 'Cache value deleted',
        })

      case 'clear-posts':
        await deleteFromCache(cacheKeys.posts(1))
        return NextResponse.json({
          success: true,
          message: 'Posts cache cleared',
        })

      case 'clear-services':
        await deleteFromCache(cacheKeys.services())
        return NextResponse.json({
          success: true,
          message: 'Services cache cleared',
        })

      case 'clear-testimonials':
        await deleteFromCache(cacheKeys.testimonials())
        return NextResponse.json({
          success: true,
          message: 'Testimonials cache cleared',
        })

      case 'clear-all':
        // Clear all known cache keys
        const keysToDelete = [
          cacheKeys.posts(1),
          cacheKeys.categories(),
          cacheKeys.services(),
          cacheKeys.testimonials(),
          cacheKeys.workItems(1),
          cacheKeys.featured(),
        ]
        
        for (const k of keysToDelete) {
          await deleteFromCache(k)
        }
        
        return NextResponse.json({
          success: true,
          message: 'All caches cleared',
          keysCleared: keysToDelete.length,
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('[Cache API Error]', error)
    return NextResponse.json(
      {
        error: 'Cache operation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
