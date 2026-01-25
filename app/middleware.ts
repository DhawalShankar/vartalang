// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

/* ------------------------------------------------------------------
   Simple in-memory rate limit (dev only)
-------------------------------------------------------------------*/
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;

  record.count++;
  return true;
}

/* ------------------------------------------------------------------
   Middleware
-------------------------------------------------------------------*/
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* --------------------------------------------------------------
     PUBLIC AUTH APIs (NO AUTH CHECK, JSON SAFE)
  --------------------------------------------------------------*/
  if (pathname.startsWith('/api/auth')) {
    // Rate limit signup
    if (pathname === '/api/auth/signup') {
      const ip =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

      if (!checkRateLimit(`signup:${ip}`, 10, 60 * 60 * 1000)) {
        return NextResponse.json(
          { error: 'Too many signup attempts. Try again later.' },
          { status: 429 }
        );
      }
    }

    // Rate limit signin
    if (pathname === '/api/auth/signin') {
      const ip =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

      if (!checkRateLimit(`signin:${ip}`, 20, 60 * 60 * 1000)) {
        return NextResponse.json(
          { error: 'Too many login attempts. Try again later.' },
          { status: 429 }
        );
      }
    }

    // IMPORTANT: allow auth APIs to continue
    return NextResponse.next();
  }

  /* --------------------------------------------------------------
     PROTECTED APIs
  --------------------------------------------------------------*/
  if (pathname.startsWith('/api/')) {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  /* --------------------------------------------------------------
     AUTH PAGES (LOGIN / SIGNUP)
  --------------------------------------------------------------*/
  if (pathname.startsWith('/auth')) {
    const session = await auth();

    if (session?.user) {
      return NextResponse.redirect(
        new URL('/dashboard', request.url)
      );
    }

    return NextResponse.next();
  }

  /* --------------------------------------------------------------
     PROTECTED PAGES
  --------------------------------------------------------------*/
  const protectedPages = [
    '/dashboard',
    '/matches',
    '/connections',
    '/chat',
    '/profile',
    '/resources',
  ];

  if (protectedPages.some(p => pathname.startsWith(p))) {
    const session = await auth();

    if (!session?.user) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

/* ------------------------------------------------------------------
   Matcher (CRITICAL)
-------------------------------------------------------------------*/
export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/dashboard/:path*',
    '/matches/:path*',
    '/connections/:path*',
    '/chat/:path*',
    '/profile/:path*',
    '/resources/:path*',
  ],
};
