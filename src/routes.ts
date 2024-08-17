/**
 * Routes that are public
 * This routes are accessible without authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/email-verification"];

/**
 * Auth routes
 * This routes redirect logged in users to the settings page
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
];

/**
 * The prefix for the auth api routes
 * Routes that are starting with this prefix are used for auth api routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
