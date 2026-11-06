import { describe, expect, it } from "vitest";
import { safeErrorLabel } from "../../api/_retrievalEvents.js";

describe("safeErrorLabel", () => {
  it.each([
    ["Retrieval timeout", "timeout"],
    ["The operation was aborted due to timeout", "timeout"],
    ["fetch failed", "network_error"],
    ["getaddrinfo ENOTFOUND a2aj.ca", "network_error"],
    ["HTTP 429 Too Many Requests", "rate_limited"],
    ["CanLII responded 503", "http_5xx"],
    ["request failed with status 404", "http_4xx"],
    ["ANTHROPIC_API_KEY is missing", "missing_api_key"],
    ["something unexpected happened", "upstream_error"],
  ])("maps %j to %s", (message, label) => {
    expect(safeErrorLabel(message)).toBe(label);
  });

  it("never lets scenario wording through", () => {
    for (const message of [
      "No results for 'Jane Doe stole my bike on King Street'",
      "fetch failed for https://example.ca/search?q=my+neighbour+Jane+Doe",
      'Unexpected token in "my chair was stolen"',
    ]) {
      expect(safeErrorLabel(message)).toMatch(
        /^(timeout|network_error|rate_limited|http_4xx|http_5xx|missing_api_key|upstream_error)$/,
      );
    }
  });

  it("is idempotent and tolerates empty or non-string input", () => {
    expect(safeErrorLabel("network_error")).toBe("network_error");
    expect(safeErrorLabel("")).toBeNull();
    expect(safeErrorLabel("   ")).toBeNull();
    expect(safeErrorLabel(undefined)).toBeNull();
    expect(safeErrorLabel(42)).toBeNull();
  });
});
