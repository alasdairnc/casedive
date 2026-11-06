#!/usr/bin/env node
// Print one failed-scenario record from the live retrieval-health dashboard.
//
//   node --env-file=.env scripts/fetch-retrieval-failure.js <id>
//   npm run retrieval:failure -- <id>
//
// Used by the /fix-retrieval-failure skill. The output is for your terminal and
// the working session only. The record may carry a redacted snippet of what a
// real user typed, and this repo is public: never paste the output into a commit,
// PR, issue, log or fixture.

const ID_PATTERN = /^f[a-f0-9]{15}$/;
const PAGE_SIZE = 100;
const MAX_PAGES = 10;

function parseArgs(argv) {
  const out = {
    id: "",
    baseUrl: process.env.RETRIEVAL_HEALTH_BASE_URL || "https://www.casedive.ca",
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--base-url" && argv[i + 1]) {
      out.baseUrl = argv[i + 1];
      i += 1;
    } else if (!argv[i].startsWith("--")) {
      out.id = argv[i];
    }
  }
  return out;
}

async function findFailure(baseUrl, token, id) {
  const base = baseUrl.replace(/\/$/, "");
  let offset = 0;
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      status: "all",
      failureLimit: String(PAGE_SIZE),
      failuresOffset: String(offset),
    });
    const res = await fetch(`${base}/api/retrieval-health?${params}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      throw new Error(`retrieval-health ${res.status}: ${await res.text()}`);
    }
    const queue = (await res.json())?.failures || {};
    const found = (queue.items || []).find((item) => item.id === id);
    if (found) return found;
    if (!queue.hasMore || typeof queue.nextOffset !== "number") return null;
    offset = queue.nextOffset;
  }
  return null;
}

async function main() {
  const { id, baseUrl } = parseArgs(process.argv.slice(2));
  if (!ID_PATTERN.test(id)) {
    console.error("Usage: fetch-retrieval-failure.js <failure id, e.g. f0123456789abcd>");
    process.exit(2);
  }
  const token = process.env.RETRIEVAL_HEALTH_TOKEN || "";
  if (!token) {
    console.error("RETRIEVAL_HEALTH_TOKEN is required (use --env-file=.env).");
    process.exit(2);
  }

  const failure = await findFailure(baseUrl, token, id);
  if (!failure) {
    console.error(
      `No failure ${id} in the queue. Its record expires 30 days after it was last seen.`,
    );
    process.exit(3);
  }
  console.log(JSON.stringify(failure, null, 2));
  if (!failure.snippet) {
    console.error(
      `\nNote: the scenario text is gone (${failure.textState}). Work from the concepts and retrieval figures.`,
    );
  }
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
