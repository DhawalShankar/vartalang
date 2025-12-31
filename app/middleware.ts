import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  // ❌ No token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔐 Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // ✅ Attach userId to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/profile/:path*",
    "/api/match/:path*",
    "/api/chat/:path*"
  ]
};
