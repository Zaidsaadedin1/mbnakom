import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const defaultLocale = "en";
  if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${req.nextUrl.pathname}`, req.url)
    );
  }
}
