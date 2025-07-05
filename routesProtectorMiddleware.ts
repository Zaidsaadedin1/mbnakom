// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./app/utils/authDecode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const decoded = token ? decodeToken(token) : null;
  const isAuthenticated = !!decoded && decoded.exp * 1000 > Date.now();

  // Redirect unauthenticated users trying to access protected routes
  if (path.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (["/login", "/signUp"].includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin route protection
  if (path.startsWith("/admin") && decoded?.Roles?.includes("Admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
