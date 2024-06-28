import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = getTokenFromStorage(request); 

  const isPublicPath =
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/verify") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/resetpassword");

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

function getTokenFromStorage(request: NextRequest) {
  const cookies = request.cookies;
  const token = cookies.get("token");
  return token;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
