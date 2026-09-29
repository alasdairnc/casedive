import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";
import { SENTRY_BASE_OPTIONS } from "./lib/sentryOptions.js";
import "./index.css";

// Sentry 11 doesn't support Safari 14, which the build still targets.
// Error reporting must never stop the app from rendering.
try {
  Sentry.init({
    ...SENTRY_BASE_OPTIONS,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration()],
    enabled: import.meta.env.PROD,
  });
} catch (err) {
  console.error("Sentry failed to start:", err);
}

// React 19 no longer rethrows render errors; it hands them to these hooks.
// Send them to Sentry with the component stack, and keep them in the
// console (Sentry is off outside production).
createRoot(document.getElementById("root"), {
  onUncaughtError: Sentry.reactErrorHandler((error) => console.error(error)),
  onCaughtError: Sentry.reactErrorHandler((error) => console.error(error)),
  onRecoverableError: Sentry.reactErrorHandler((error) =>
    console.error(error),
  ),
}).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
