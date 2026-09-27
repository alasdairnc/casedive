import { afterAll, describe, expect, it } from "vitest";
import * as Sentry from "@sentry/node";
import {
  SENTRY_BASE_OPTIONS,
  SENTRY_DATA_COLLECTION,
  scrubSentryEvent,
} from "../../src/lib/sentryOptions.js";

// What the SDK should end up using. If a Sentry release adds a category that
// defaults to collecting, it appears here as an unexpected key and fails.
const RESOLVED_NOTHING_COLLECTED = {
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
};

describe("SENTRY_DATA_COLLECTION", () => {
  it("turns off every category Sentry 11 collects by default", () => {
    // The categories and v11 defaults are listed under `dataCollection` in
    // Sentry's JavaScript options docs; all of them default to collecting.
    expect(SENTRY_DATA_COLLECTION).toEqual({
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
    });
  });
});

describe("scrubSentryEvent", () => {
  it("redacts scenario text, auth and cookies anywhere in the event", () => {
    const event = {
      message: "boom",
      request: {
        url: "https://casedive.ca/api/analyze",
        query_string: "q=my+scenario",
        data: { scenario: "I was stopped by police...", filters: {} },
        headers: {
          Authorization: "Bearer abc",
          Cookie: "sb=1",
          "Content-Type": "application/json",
        },
      },
      extra: { scenarioSnippet: "partial text", nested: { note: "hi" } },
      breadcrumbs: [{ data: { matched_content: "holding" } }],
    };

    const scrubbed = scrubSentryEvent(event);

    expect(scrubbed.request.query_string).toBe("[redacted]");
    expect(scrubbed.request.data.scenario).toBe("[redacted]");
    expect(scrubbed.request.data.filters).toEqual({});
    expect(scrubbed.request.headers).toEqual({
      Authorization: "[redacted]",
      Cookie: "[redacted]",
      "Content-Type": "application/json",
    });
    expect(scrubbed.extra.scenarioSnippet).toBe("[redacted]");
    expect(scrubbed.extra.nested.note).toBe("[redacted]");
    expect(scrubbed.breadcrumbs[0].data.matched_content).toBe("[redacted]");
    expect(scrubbed.message).toBe("boom");
  });

  it("copes with cycles", () => {
    const event = { extra: {} };
    event.extra.self = event;

    expect(() => scrubSentryEvent(event)).not.toThrow();
  });
});

describe("server Sentry client", () => {
  const originalDsn = process.env.SENTRY_DSN;

  afterAll(async () => {
    await Sentry.close();
    if (originalDsn === undefined) delete process.env.SENTRY_DSN;
    else process.env.SENTRY_DSN = originalDsn;
  });

  it("starts with the shared options and collects nothing extra", async () => {
    process.env.SENTRY_DSN = "https://public@o0.ingest.sentry.io/0";
    const { initSentry } = await import("../../api/_sentry.js");

    initSentry();
    const client = Sentry.getClient();

    expect(client.getDataCollectionOptions()).toEqual(
      RESOLVED_NOTHING_COLLECTED,
    );
    expect(client.getOptions()).toMatchObject({
      traceLifecycle: "static",
      beforeSend: scrubSentryEvent,
    });
  });
});

describe("SENTRY_BASE_OPTIONS", () => {
  it("carries the privacy settings both clients spread in", () => {
    expect(SENTRY_BASE_OPTIONS).toMatchObject({
      dataCollection: SENTRY_DATA_COLLECTION,
      traceLifecycle: "static",
      beforeSend: scrubSentryEvent,
    });
  });
});
