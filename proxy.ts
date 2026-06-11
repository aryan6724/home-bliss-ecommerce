import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");

  const isAdminMessagesPage =
    pathname === "/admin-messages" ||
    pathname.startsWith("/admin-messages/");

  const isProtectedRoute = isAdminPage || isAdminMessagesPage;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const adminSession = request.cookies.get("homebliss-admin-session")?.value;

  if (adminSession !== process.env.ADMIN_SESSION_SECRET) {
    const loginUrl = new URL("/admin-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-messages/:path*"],
};