import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;

  const { pathname } = req.nextUrl;

  if (sessionToken && pathname === "/info") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!sessionToken && pathname === "/") {
    return NextResponse.redirect(new URL("/info", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/info"],
};
