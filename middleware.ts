import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {


  if ( request.nextUrl.pathname.startsWith('/:path*')) {
    return NextResponse.rewrite(new URL('/Login', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/admin/:path*')) {
    return NextResponse.rewrite(new URL('/admin/login', request.url))
  }

  return NextResponse.next()

}

export const config = {
  matcher: ['/:path*','/admin/:path*']
}
