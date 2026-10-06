import { NextRequest, NextResponse } from "next/server";

import { verifyAuthToken } from "./actions/user_actions";
import { AUTH_TOKEN_COOKIE, authCookieOptions } from "./lib/auth-cookie";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  if (
    path.startsWith("/subscription-plans/apply-coupon") &&
    searchParams.has("token")
  ) {
    const token = decodeURIComponent(searchParams.get("token") || "");

    try {
      const response = await verifyAuthToken(token || "");

      if (token && response.isValidToken) {
        const response = NextResponse.next();

        response.cookies.set(AUTH_TOKEN_COOKIE, token, authCookieOptions);

        return response;
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

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
  const token = cookies.get(AUTH_TOKEN_COOKIE)?.value;
  return token;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify",
    "/resetpassword/:path*",
    "/forgot-password",
    "/",
    "/chat",
    "/error-book",
    "/planner",
    "/quizzes",
    "/tracker",
    "/manage-account",
    "/subscription-plans",
    "/subscription-plans/apply-coupon",
    "/paymentfailed",
    "/paymentsuccess",
    "/initial-info",
    "/initial-study-data",
    "/institute",
    "/profile",
    "/profile/:path*",
    "/quiz/:path*",
  ],
};
