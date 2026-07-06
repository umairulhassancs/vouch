import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected route prefixes
const ownerProtectedPrefixes = [
  '/dashboard',
  '/items',
  '/notifications',
  '/tracking',
  '/messages',
  '/profile',
  '/subscription',
];

const authPages = ['/login', '/signup', '/forgot-password', '/verify-email'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — always accessible, no auth check
  const publicPrefixes = [
    '/',
    '/products',
    '/pricing',
    '/about',
    '/contact',
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/scan',
    '/activate',
    '/api',
  ];

  // Check if it's a static file or public route
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  const sessionCookie = request.cookies.get('session')?.value;

  // 1. Owner protected routes
  const isOwnerRoute = ownerProtectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (isOwnerRoute) {
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // 3. Auth pages
  const isAuthPage = authPages.includes(pathname);
  if (isAuthPage) {
    if (sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
