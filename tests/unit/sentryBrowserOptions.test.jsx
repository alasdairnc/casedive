// @vitest-environment happy-dom
import { afterAll, describe, expect, it } from "vitest";
import * as Sentry from "@sentry/react";
import {
  SENTRY_BASE_OPTIONS,
  scrubSentryEvent,
} from "../../src/lib/sentryOptions.js";

describe("browser Sentry client", () => {
  afterAll(() => Sentry.close());

  it("collects nothing extra when started the way main.jsx starts it", () => {
    Sentry.init({
      ...SENTRY_BASE_OPTIONS,
      dsn: "https://public@o0.ingest.sentry.io/0",
      integrations: [Sentry.browserTracingIntegration()],
      enabled: true,
    });
    const client = Sentry.getClient();

    expect(client.getDataCollectionOptions()).toEqual({
      userInfo: false,
      cookies: false,
      httpHeaders: { request: false, response: false },
      httpBodies: [],
      urlQueryParams: false,
      graphQL: { document: false, variables: false },
      genAI: { inputs: false, outputs: false },
      databaseQueryData: false,
      queues: false,
      stackFrameVariables: false,
      frameContextLines: 5,
    });
    expect(client.getOptions().beforeSend).toBe(scrubSentryEvent);
  });
});
