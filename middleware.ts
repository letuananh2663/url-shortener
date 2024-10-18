import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const password = url.searchParams.get("password");

  if (password) {
    return verifyPasswordMiddleware(request);
  } else {
    return NextResponse.next();
  }
}

function verifyPasswordMiddleware(request: NextRequest) {
  const expectedPassword = "123";
  const providedPassword = request.nextUrl.searchParams.get("password");

  if (providedPassword === expectedPassword) {
    return NextResponse.next();
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: ["/urls"],
};
