import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isLoginPage = req.nextUrl.pathname === "/login";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // 🔒 sem token → bloqueia dashboard
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔁 com token → impede voltar pro login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};