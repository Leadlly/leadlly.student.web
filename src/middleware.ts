import { NextRequest, NextResponse } from "next/server";

import { verifyAuthToken } from "./actions/user_actions";

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

        response.cookies.set("token", token, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          expires: new Date("9999-12-31T23:59:59Z"),
        });

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
  const token = cookies.get("token")?.value;
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
    "/growth-meter",
    "/liberty",
    "/planner",
    "/quizzes",
    "/study-room",
    "/tracker",
    "/workshops",
    "/manage-account",
    "/subscription-plans",
    "/subscription-plans/apply-coupon",
    "/paymentfailed",
    "/paymentsuccess",
    "/initial-info",
    "/trial-subscription",
    "/initial-study-data",
  ],
};
