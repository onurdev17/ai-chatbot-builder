// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Maintenance sayfasının kendisine erişime izin ver
  if (request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next();
  }

  // API ve static dosyaları kontrol etme
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Environment variable kontrolü
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

  // Bakım modu aktifse, her şeyi maintenance sayfasına yönlendir
  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
