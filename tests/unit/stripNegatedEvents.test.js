import { describe, expect, it } from "vitest";

import { stripNegatedEvents } from "../../api/_textUtils.js";

describe("stripNegatedEvents", () => {
  it.each([
    [
      "Routine speeding stop. I got a ticket but there was no search or arrest.",
      /search|arrest/,
    ],
    [
      "I got a simple speeding ticket and there was no detention, search, or arrest.",
      /detention|search|arrest/,
    ],
    [
      "A speed camera mailed me a ticket. No officer stopped me and there was no search.",
      /officer|stopped|search/,
    ],
    [
      "I got a speeding ticket for 5 km over and there was no detention, search, or breath demand.",
      /detention|search|breath/,
    ],
    ["I was never arrested.", /arrest/],
  ])("drops the denied events in %j", (input, gone) => {
    expect(stripNegatedEvents(input)).not.toMatch(gone);
  });

  it("keeps 'no warrant', which is the complaint in a s. 8 scenario", () => {
    expect(stripNegatedEvents("Police searched my car with no warrant.")).toBe(
      "Police searched my car with no warrant.",
    );
    expect(
      stripNegatedEvents("Police searched my house without a warrant."),
    ).toBe("Police searched my house without a warrant.");
  });

  it("keeps events that did happen alongside ones that didn't", () => {
    const out = stripNegatedEvents(
      "I was not arrested but police searched my car.",
    );
    expect(out).toMatch(/searched my car/);
    expect(out).not.toMatch(/arrested/);
  });
});
