/**
 * An array of routes that are accessible to the public.
 * These do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];

/**
 * An array of routes that are used for authentication.
 * These do not require authentication.
 * These routes will redirect to the default redirect path after logging in.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];

/**
 * The prefix for API authentication.
 * Routes that start with this prefix are used for API authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";

export const API_BASE_URL = "http://localhost:8000";
export const API_TASK_URL = "tasks";
export const API_REWARD_URL = "rewards";
export const API_MICRO_COMPETENCY_URL = "micro-competencies";
export const API_NOTIFICATION_URL = "notifications";