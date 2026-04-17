import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";
import "./index.css";

const REDACTED = "[redacted]";
const SENSITIVE_KEY_PARTS = [
  "scenario",
  "scenariosnippet",
  "summary",
  "matchedcontent",
  "suggestions",
  "note",
  "authorization",
  "cookie",
  "token",
  "apikey",
  "xapikey",
  "querystring",
];

function normalizeKey(key) {
  return String(key || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function isSensitiveKey(key) {
  const normalized = normalizeKey(key);
  return SENSITIVE_KEY_PARTS.some((part) => normalized.includes(part));
}

function scrubValue(value, seen = new WeakSet()) {
  if (value == null) return value;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return value;
  if (seen.has(value)) return value;
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item) => scrubValue(item, seen));
    return value;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if (isSensitiveKey(key)) {
      value[key] = REDACTED;
      continue;
    }

    if (
      key === "headers" &&
      nestedValue &&
      typeof nestedValue === "object" &&
      !Array.isArray(nestedValue)
    ) {
      for (const headerKey of Object.keys(nestedValue)) {
        if (isSensitiveKey(headerKey)) {
          nestedValue[headerKey] = REDACTED;
        }
      }
    }

    scrubValue(nestedValue, seen);
  }

  return value;
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.2,
  enabled: import.meta.env.PROD,
  beforeSend(event) {
    const scrubbedEvent = scrubValue(event);
    if (scrubbedEvent?.request) {
      scrubbedEvent.request.query_string = REDACTED;
    }
    return scrubbedEvent;
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
