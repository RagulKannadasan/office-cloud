import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken } from '@/utils/auth'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  let user = null;

  if (token) {
    user = await verifyToken(token);
  }

  // Require login for all routes except /, /login, /api/auth
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/api') &&
    request.nextUrl.pathname !== '/'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw\\.js|sw\\.js\\.map|workbox-.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
