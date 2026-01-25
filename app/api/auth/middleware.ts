// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* ------------------------------------------------------------------
   Rate limit (dev only)
-------------------------------------------------------------------*/
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(key: string, limit: number, windowMs: number) {
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* --------------------------------------------------------------
     AUTH APIs (PUBLIC, JSON ONLY)
  --------------------------------------------------------------*/
  if (pathname.startsWith('/api/auth')) {
    if (pathname === '/api/auth/signup') {
      const ip =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

      if (!checkRateLimit(`signup:${ip}`, 10, 60 * 60 * 1000)) {
        return NextResponse.json(
          { error: 'Too many signup attempts' },
          { status: 429 }
        );
      }
    }

    if (pathname === '/api/auth/signin') {
      const ip =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

      if (!checkRateLimit(`signin:${ip}`, 20, 60 * 60 * 1000)) {
        return NextResponse.json(
          { error: 'Too many login attempts' },
          { status: 429 }
        );
      }
    }

    return NextResponse.next();
  }

  // ❗ DO NOT TOUCH OTHER ROUTES HERE
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
