import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/:path*')) {
    return NextResponse.rewrite(new URL('/Login', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/admin/:path*')) {
    return NextResponse.rewrite(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/:path*','/admin/:path*']
}
