import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // only cookies, headers, redirects
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/chats/:path*'],
};
