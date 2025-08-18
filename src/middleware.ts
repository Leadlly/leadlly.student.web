import { NextRequest, NextResponse } from "next/server";

import { getUser, verifyAuthToken } from "./actions/user_actions";

const userCache: Record<
  string,
  {
    userData: any;
    expires: number;
    timestamp: number;
  }
> = {};

const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes cache
const MAX_CACHE_SIZE = 1000; // Prevent memory leaks

function cleanupCache() {
  const now = Date.now();
  const keys = Object.keys(userCache);

  keys.forEach((key) => {
    if (userCache[key].expires < now) {
      delete userCache[key];
    }
  });
}

async function getCachedUserData(token: string) {
  // Check cache first
  const cached = userCache[token];
  if (cached && cached.expires > Date.now()) {
    return cached.userData;
  }

  try {
    // Only call getUser() if not in cache or expired
    const userData = await getUser();

    // Cache the result
    userCache[token] = {
      userData,
      expires: Date.now() + CACHE_DURATION,
      timestamp: Date.now(),
    };

    // Cleanup if cache gets too large
    const cacheSize = Object.keys(userCache).length;
    if (cacheSize > MAX_CACHE_SIZE) {
      cleanupCache();
    }

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Remove invalid token from cache
    delete userCache[token];
    return null;
  }
}

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

  // initial personal info middleware
  if (token && !isPublicPath) {
    const userData = await getCachedUserData(token);

    if (!userData || !userData.user) {
      const response = NextResponse.redirect(
        new URL("/login", request.nextUrl)
      );
      response.cookies.delete("token");
      return response;
    }

    const hasSubmittedInitialInfo = !!userData.user?.academic.standard;

    if (!hasSubmittedInitialInfo && path !== "/initial-info") {
      return NextResponse.redirect(new URL("/initial-info", request.nextUrl));
    }

    if (hasSubmittedInitialInfo && path === "/initial-info") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // free trial activation middleware
    if (path !== "/initial-info") {
      const isSubscribed =
        userData.user?.freeTrial.active === true ||
        userData?.user?.subscription?.status === "active";

      if (!isSubscribed && path !== "/trial-subscription") {
        return NextResponse.redirect(
          new URL("/trial-subscription", request.nextUrl)
        );
      }

      if (isSubscribed && path === "/trial-subscription") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    }

    // Add user context to headers for server components
    const response = NextResponse.next();
    response.headers.set("x-user-id", userData.user?.id || "");
    const isSubscribed =
      userData.user?.freeTrial?.active === true ||
      userData?.user?.subscription?.status === "active";
    response.headers.set("x-user-subscribed", isSubscribed ? "true" : "false");

    return response;
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
