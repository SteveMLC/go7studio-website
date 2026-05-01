import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic-auth gate for /admin/*. Set ADMIN_PASSWORD in the Vercel env.
 * The username is fixed as "admin" so there's just one secret to remember.
 *
 * If ADMIN_PASSWORD isn't set, /admin returns 503 — better to fail closed
 * than expose the panel by accident.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    return new NextResponse(
      "Admin disabled — ADMIN_PASSWORD env var is not set in this deployment.",
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const [user, pwd] = decoded.split(":");
    if (user === "admin" && pwd === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Go7Studio Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
