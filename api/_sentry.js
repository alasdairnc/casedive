import * as Sentry from "@sentry/node";
import { SENTRY_BASE_OPTIONS } from "../src/lib/sentryOptions.js";

let initialized = false;

export function initSentry() {
  if (initialized || !process.env.SENTRY_DSN) return;
  Sentry.init({
    ...SENTRY_BASE_OPTIONS,
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV || "development",
  });
  initialized = true;
}

export { Sentry };
