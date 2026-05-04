import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic-auth gate for /admin/* and /api/admin/*. Set ADMIN_PASSWORD in the Vercel env.
 * The username is fixed as "admin" so there's just one secret to remember.
 *
 * If ADMIN_PASSWORD isn't set, /admin returns 503 — better to fail closed
 * than expose the panel by accident.
 */
function isProtectedAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

function readBasicAuth(auth: string | null): { user: string; password: string } | null {
  if (!auth?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(auth.slice(6));
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (!isProtectedAdminPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    return new NextResponse(
      "Admin disabled — ADMIN_PASSWORD env var is not set in this deployment.",
      { status: 503 },
    );
  }

  const credentials = readBasicAuth(request.headers.get("authorization"));
  if (credentials?.user === "admin" && credentials.password === expectedPassword) {
    return NextResponse.next();
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
