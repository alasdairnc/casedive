// Privacy settings shared by the browser (src/main.jsx) and server
// (api/_sentry.js) Sentry clients. Scenario text is sensitive (see
// public/privacy.html), so Sentry collects nothing extra and every error
// event is scrubbed before it is sent.

// Sentry 11 collects request/response bodies, cookies, headers, URL query
// strings, user info and stack-frame local variables unless told not to.
// On the server a local variable is often the user's scenario. All off.
export const SENTRY_DATA_COLLECTION = {
  userInfo: false,
  cookies: false,
  httpHeaders: false,
  httpBodies: [],
  urlQueryParams: false,
  graphQL: { document: false, variables: false },
  genAI: { inputs: false, outputs: false },
  databaseQueryData: false,
  queues: false,
  stackFrameVariables: false,
};

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

// beforeSend for both clients: redacts sensitive keys anywhere in the event
// and always drops the request query string.
export function scrubSentryEvent(event) {
  const scrubbedEvent = scrubValue(event);
  if (scrubbedEvent?.request) {
    scrubbedEvent.request.query_string = REDACTED;
  }
  return scrubbedEvent;
}

// Options both clients start from; each adds its own dsn and environment.
export const SENTRY_BASE_OPTIONS = {
  tracesSampleRate: 0.2,
  dataCollection: SENTRY_DATA_COLLECTION,
  // Sentry 11 streams spans by default; keep v10's transactions.
  traceLifecycle: "static",
  beforeSend: scrubSentryEvent,
};
