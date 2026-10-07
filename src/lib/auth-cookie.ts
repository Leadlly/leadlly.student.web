export const AUTH_TOKEN_COOKIE = "token";

// Mobile Safari/Chrome (WebKit) and Chrome's 400-day cap reject cookies that
// expire in year 9999, so the session never persists on phone.
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

export const authCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: THIRTY_DAYS_IN_SECONDS,
};

export const clearAuthCookieOptions = {
  ...authCookieOptions,
  maxAge: 0,
};
