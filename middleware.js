/**
 * Protect /admin: require Supabase session; redirect unauthorized users to /login.
 * Next.js 16 (Turbopack) – runs on every request matching config.matcher.
 */
import { NextResponse } from 'next/server';
import { createServerClientForMiddleware } from './src/utils/supabase/middleware';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request });

  const supabase = createServerClientForMiddleware(request, response);
  const { data: { user } } = await supabase.auth.getUser();

  if (pathname.startsWith('/admin') && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
