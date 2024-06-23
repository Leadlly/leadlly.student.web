import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/user_actions";

export async function middleware(request: NextRequest, response: NextResponse) {
  const path = request.nextUrl.pathname;

  const user = await getUser();

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verify" ||
    path === "/forgot-password";

  if (isPublicPath && user?.success) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !user?.success) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
