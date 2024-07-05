import { NextRequest, NextResponse } from "next/server";

import { getUser } from "./actions/user_actions";
import { getPlanner } from "./actions/planner_actions";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = getTokenFromStorage(request);
  const userData = await getUser();

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

  // initial personal info middleware
  if (token && !isPublicPath) {
    const hasSubmittedInitialInfo = !!userData.user?.academic.standard;

    if (!hasSubmittedInitialInfo && path !== "/initial-info") {
      return NextResponse.redirect(new URL("/initial-info", request.nextUrl));
    }

    if (hasSubmittedInitialInfo && path === "/initial-info") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // free trial activation middleware
  if (token && !isPublicPath && path !== "/initial-info") {
    const isSubscribed = !!userData.user?.freeTrial.active === true;

    if (!isSubscribed && path !== "/trial-subscription") {
      return NextResponse.redirect(
        new URL("/trial-subscription", request.nextUrl)
      );
    }

    if (isSubscribed && path === "/trial-subscription") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // initial study data middleware
  if (
    token &&
    !isPublicPath &&
    path !== "/trial-subscription" &&
    path !== "/initial-info"
  ) {

    const isPlanner = userData.user?.planner === true

    if (!isPlanner && path !== "/initial-study-data") {
      return NextResponse.redirect(
        new URL("/initial-study-data", request.nextUrl)
      );
    }

    if (isPlanner && path === "/initial-study-data") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

function getTokenFromStorage(request: NextRequest) {
  const cookies = request.cookies;
  // console.log("====cookies are coming here =======>",cookies, "===========>")
  const token = cookies.get("token");
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
    "/paymentfailed",
    "/paymentsuccess",
    "/initial-info",
    "/trial-subscription",
    "/initial-study-data",
  ],
};
