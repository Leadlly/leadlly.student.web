import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

export function middleware(request: NextRequest, response: NextResponse) {
  const path = request.nextUrl.pathname;
  console.log(process.env.NODE_ENV, "hello")

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verify" ||
    path === "/forgot-password";

  const token = request.cookies.get("token")?.value || "";
  console.log("token is here", token)
  console.log("request =============> is here", request)

  if (isPublicPath && token) {
    console.log("here...")
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify",
    "/forgot-password",
    "/",
    "/chat",
    "/error-book",
    "/growth-meter",
    "/liberty",
    "/planner",
    "/quizzes",
    "/study-room",
    "/tracker",
    "/workshops",
    "/manage-account",
  ],
};
