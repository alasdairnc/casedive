// @vitest-environment happy-dom
import { StrictMode } from "react";
import { act, render as rtlRender } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCloudSync } from "../../src/hooks/useCloudSync.js";

const USER = { id: "user-1" };
const TOKEN = "token-1";
const STORAGE_KEY = "casedive-bookmarks";
const NOW = Date.now();

let hook;
function Harness({ user, token }) {
  hook = useCloudSync(user, token);
  return null;
}

function bookmark(citation, ageMs) {
  return {
    id: citation,
    citation,
    summary: `${citation} summary`,
    type: "case_law",
    bookmarkedAt: NOW - ageMs,
    verification: null,
  };
}

// The row shape api/user-data.js returns and accepts for bookmarks.
function bookmarkRow(citation, ageMs) {
  const { id, ...row } = bookmark(citation, ageMs);
  return row;
}

function historyRow(query, ageMs) {
  return {
    query,
    filters: { jurisdiction: "all" },
    resultCounts: { criminal_code: 1, case_law: 0, civil_law: 0, charter: 0 },
    timestamp: NOW - ageMs,
  };
}

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

// Fakes /api/user-data. GETs wait until the test releases (or fails) them,
// so a test can act while the account copy is still loading.
function mockUserData({ bookmarks = [], history = [], postStatus = 200 } = {}) {
  let release;
  let fail;
  const gate = new Promise((resolve, reject) => {
    release = resolve;
    fail = reject;
  });
  gate.catch(() => {});
  const calls = [];
  globalThis.fetch = vi.fn((url, init = {}) => {
    const method = init.method || "GET";
    calls.push({
      url,
      method,
      auth: init.headers?.Authorization,
      body: init.body ? JSON.parse(init.body) : null,
    });
    if (method === "GET") {
      const type = new URL(url, "http://localhost").searchParams.get("type");
      return gate.then(() =>
        jsonResponse(type === "bookmarks" ? { bookmarks } : { history }),
      );
    }
    return Promise.resolve(
      jsonResponse(postStatus === 200 ? { ok: true } : { error: "x" }, postStatus),
    );
  });
  return {
    gets: () => calls.filter((c) => c.method === "GET"),
    posts: (type) =>
      calls.filter(
        (c) => c.method === "POST" && (!type || c.body.type === type),
      ),
    release: () => act(async () => release()),
    fail: () => act(async () => fail(new Error("offline"))),
  };
}

// Lets queued promises and the effects they trigger run.
async function settle() {
  for (let i = 0; i < 5; i += 1) {
    await act(async () => {
      await Promise.resolve();
    });
  }
}

function seedLocalBookmarks(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const ids = (list) => list.map((b) => b.id);

// The app renders under StrictMode, which runs effects and state updaters
// twice in development; every case runs both ways.
describe.each([
  ["", false],
  [" (StrictMode)", true],
])("useCloudSync%s", (_label, strict) => {
  const wrap = (element) =>
    strict ? <StrictMode>{element}</StrictMode> : element;
  const render = (element) => {
    const result = rtlRender(wrap(element));
    return { ...result, rerender: (next) => result.rerender(wrap(next)) };
  };

  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("merges this device's bookmarks with the account's and saves once", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData({
      bookmarks: [
        bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000),
        bookmarkRow("R v Cloud B, 2018 SCC 3", 3_000),
      ],
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).toEqual([
      "R v Local, 2020 SCC 1",
      "R v Cloud A, 2019 SCC 2",
      "R v Cloud B, 2018 SCC 3",
    ]);
    expect(api.posts("bookmarks")).toHaveLength(1);
    expect(api.posts("bookmarks")[0].body.data.map((r) => r.citation)).toEqual(
      ids(hook.bookmarks),
    );
    expect(api.posts("bookmarks")[0].auth).toBe(`Bearer ${TOKEN}`);
    // Nothing new on either side for history, so nothing to save.
    expect(api.posts("history")).toHaveLength(0);
  });

  it("keeps the account's original bookmark times", async () => {
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 5 * 86_400_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();

    expect(hook.bookmarks[0].bookmarkedAt).toBe(NOW - 5 * 86_400_000);
  });

  it("merges search history from both sides", async () => {
    const api = mockUserData({
      history: [historyRow("cloud search", 5_000), historyRow("older", 9_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    act(() => hook.addToHistory("device search", {}, { criminal_code: [] }));
    await api.release();
    await settle();

    expect(hook.history.map((h) => h.query)).toEqual([
      "device search",
      "cloud search",
      "older",
    ]);
    expect(api.posts("history")).toHaveLength(1);
    expect(api.posts("history")[0].body.data).toHaveLength(3);
  });

  it("sends nothing before the account copy loads and keeps a bookmark added meanwhile", async () => {
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    act(() =>
      hook.addBookmark(
        { citation: "R v New, 2021 SCC 9", summary: "new" },
        "case_law",
      ),
    );
    await settle();
    expect(api.posts()).toHaveLength(0);

    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).toEqual([
      "R v New, 2021 SCC 9",
      "R v Cloud A, 2019 SCC 2",
    ]);
    expect(api.posts("bookmarks")).toHaveLength(1);
    expect(api.posts("bookmarks")[0].body.data.map((r) => r.citation)).toEqual([
      "R v New, 2021 SCC 9",
      "R v Cloud A, 2019 SCC 2",
    ]);
  });

  it("does not bring back a bookmark removed while the account copy loads", async () => {
    seedLocalBookmarks([bookmark("R v Both, 2017 SCC 4", 4_000)]);
    const api = mockUserData({
      bookmarks: [
        bookmarkRow("R v Both, 2017 SCC 4", 4_000),
        bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000),
      ],
    });

    render(<Harness user={USER} token={TOKEN} />);
    act(() => hook.removeBookmark("R v Both, 2017 SCC 4"));
    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).toEqual(["R v Cloud A, 2019 SCC 2"]);
    expect(api.posts("bookmarks")[0].body.data.map((r) => r.citation)).toEqual([
      "R v Cloud A, 2019 SCC 2",
    ]);
  });

  it("keeps a bookmark removed and then added again while loading", async () => {
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    act(() => hook.removeBookmark("R v Cloud A, 2019 SCC 2"));
    act(() =>
      hook.addBookmark(
        { citation: "R v Cloud A, 2019 SCC 2", summary: "again" },
        "case_law",
      ),
    );
    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).toEqual(["R v Cloud A, 2019 SCC 2"]);
  });

  it("never writes to the account after the first fetch fails", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.fail();
    await settle();

    // A new change retries the fetch instead of overwriting the account.
    act(() =>
      hook.addBookmark(
        { citation: "R v New, 2021 SCC 9", summary: "new" },
        "case_law",
      ),
    );
    await settle();

    expect(api.gets().length).toBeGreaterThan(2);
    expect(api.posts()).toHaveLength(0);
    expect(ids(hook.bookmarks)).toContain("R v Local, 2020 SCC 1");
  });

  it("does not save when this device has nothing the account lacks", async () => {
    seedLocalBookmarks([bookmark("R v Cloud A, 2019 SCC 2", 2_000)]);
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
      history: [historyRow("cloud search", 5_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).toEqual(["R v Cloud A, 2019 SCC 2"]);
    expect(hook.history).toHaveLength(1);
    expect(api.posts()).toHaveLength(0);
  });

  it("keeps everything up to the account limit instead of the guest limit", async () => {
    seedLocalBookmarks(
      Array.from({ length: 5 }, (_, i) =>
        bookmark(`R v Local ${i}, 2020 SCC ${i}`, 1_000 + i),
      ),
    );
    const api = mockUserData({
      bookmarks: Array.from({ length: 60 }, (_, i) =>
        bookmarkRow(`R v Cloud ${i}, 2019 SCC ${i}`, 10_000 + i),
      ),
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();

    expect(hook.bookmarks).toHaveLength(65);
    expect(api.posts("bookmarks")[0].body.data).toHaveLength(65);
  });

  it("saves later changes after the merge", async () => {
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
    });

    render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();
    expect(api.posts()).toHaveLength(0);

    act(() => hook.removeBookmark("R v Cloud A, 2019 SCC 2"));
    await settle();

    expect(api.posts("bookmarks")).toHaveLength(1);
    expect(api.posts("bookmarks")[0].body.data).toEqual([]);
  });

  it("clears this device on sign-out and sends nothing", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
      history: [historyRow("cloud search", 5_000)],
    });

    const { rerender } = render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();
    const postsBefore = api.posts().length;

    rerender(<Harness user={null} token={null} />);
    await settle();

    expect(hook.bookmarks).toEqual([]);
    expect(hook.history).toEqual([]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")).toEqual([]);
    expect(api.posts()).toHaveLength(postsBefore);
  });

  it("keeps this device's copy at sign-out when the last save failed", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
      postStatus: 500,
    });

    const { rerender } = render(<Harness user={USER} token={TOKEN} />);
    await api.release();
    await settle();
    expect(api.posts("bookmarks")).toHaveLength(1);

    rerender(<Harness user={null} token={null} />);
    await settle();

    expect(ids(hook.bookmarks)).toContain("R v Local, 2020 SCC 1");
    expect(api.posts("bookmarks")).toHaveLength(1);
  });

  it("ignores an account copy that arrives after sign-out", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData({
      bookmarks: [bookmarkRow("R v Cloud A, 2019 SCC 2", 2_000)],
    });

    const { rerender } = render(<Harness user={USER} token={TOKEN} />);
    rerender(<Harness user={null} token={null} />);
    await api.release();
    await settle();

    expect(ids(hook.bookmarks)).not.toContain("R v Cloud A, 2019 SCC 2");
    expect(api.posts()).toHaveLength(0);
  });

  it("leaves guests alone", async () => {
    seedLocalBookmarks([bookmark("R v Local, 2020 SCC 1", 1_000)]);
    const api = mockUserData();

    render(<Harness user={null} token={null} />);
    act(() =>
      hook.addBookmark(
        { citation: "R v New, 2021 SCC 9", summary: "new" },
        "case_law",
      ),
    );
    await settle();

    expect(ids(hook.bookmarks)).toEqual([
      "R v New, 2021 SCC 9",
      "R v Local, 2020 SCC 1",
    ]);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(api.gets()).toHaveLength(0);
  });
});
