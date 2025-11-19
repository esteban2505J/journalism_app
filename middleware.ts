import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Las rutas protegidas se verifican desde sessionStorage en los componentes
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
