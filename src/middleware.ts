import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'khujand_admin_session'

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|templates|modules|components|plugins).*)'],
}
