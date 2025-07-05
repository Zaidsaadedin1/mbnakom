import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname, search, locale } = req.nextUrl;

  // Skip public files, _next, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Only redirect if locale is 'default'
  if (locale === "default") {
    const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";

    return NextResponse.redirect(
      new URL(`/${cookieLocale}${pathname}${search}`, req.url)
    );
  }

  // Allow request to continue as-is
  return NextResponse.next();
}
