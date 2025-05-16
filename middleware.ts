import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedPaths = [
    '/jobs/',
    '/dashboard',
    '/profile',
    '/post-job',
    '/saved-jobs'
  ]

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Allow access to job listing page but protect individual job pages
  if (request.nextUrl.pathname.startsWith('/jobs/') && 
      request.nextUrl.pathname !== '/jobs') {
    if (!session) {
      // Store the original path to redirect back after signin
      const redirectUrl = new URL('/signin', request.url)
      redirectUrl.searchParams.set('redirect', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Handle other protected routes
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/signin', request.url)
    redirectUrl.searchParams.set('redirect', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: [
    '/jobs/:id*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/post-job/:path*',
    '/saved-jobs/:path*'
  ],
}