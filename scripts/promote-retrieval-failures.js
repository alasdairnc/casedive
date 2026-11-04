#!/usr/bin/env node
// Pull failures marked "promoted" in the retrieval-health dashboard and append
// them to tests/fixtures/promoted-failures.json as knownFailure stubs.
//
//   node --env-file=.env scripts/promote-retrieval-failures.js [--dry-run]
//
// Propose-only: it writes a data file, never source, never labels. The repo is
// PUBLIC, so the file gets a placeholder scenario, not user text. The real
// (redacted) text is printed to your terminal only. Re-running is safe: stubs are
// keyed by the failure's id (`sourceFailureId`) and existing ones are skipped.
//
// To finish a stub: rewrite `scenario` as a synthetic one (same legal facts,
// invented details), set expectedPrimary, add shouldInclude/shouldExclude
// citations and landmarkMatches, then delete `knownFailure`.

import fs from "node:fs";
import path from "node:path";
import { buildFixtureStub } from "../src/components/retrievalHealthUtils.js";

const FIXTURE = path.resolve("tests/fixtures/promoted-failures.json");
const PAGE_SIZE = 100;
const MAX_PAGES = 10;

function parseArgs(argv) {
  const out = {
    baseUrl: process.env.RETRIEVAL_HEALTH_BASE_URL || "https://www.casedive.ca",
    dryRun: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") out.dryRun = true;
    else if (argv[i] === "--base-url" && argv[i + 1]) {
      out.baseUrl = argv[i + 1];
      i += 1;
    }
  }
  return out;
}

async function fetchPromoted(baseUrl, token) {
  const base = baseUrl.replace(/\/$/, "");
  const items = [];
  let offset = 0;
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      status: "promoted",
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
    items.push(...(Array.isArray(queue.items) ? queue.items : []));
    if (!queue.hasMore || typeof queue.nextOffset !== "number") break;
    offset = queue.nextOffset;
  }
  return items;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const token = process.env.RETRIEVAL_HEALTH_TOKEN || "";
  if (!token) {
    console.error("RETRIEVAL_HEALTH_TOKEN is required (use --env-file=.env).");
    process.exit(2);
  }

  const existing = JSON.parse(fs.readFileSync(FIXTURE, "utf8"));
  const known = new Set(existing.map((stub) => stub.sourceFailureId));
  const promoted = await fetchPromoted(args.baseUrl, token);
  const fresh = promoted.filter(
    (item) => item.snippet && !known.has(item.id),
  );

  console.log(
    `${promoted.length} promoted, ${fresh.length} new, ${promoted.length - fresh.length} already in the fixture.`,
  );
  for (const item of fresh) {
    // Terminal only: this text must not be committed (the repo is public).
    console.log(`+ prod_${item.id}  x${item.count}  ${item.snippet}`);
  }
  if (args.dryRun || fresh.length === 0) return;

  // JSON.stringify is the only thing that ever serialises user-supplied text.
  fs.writeFileSync(
    FIXTURE,
    `${JSON.stringify([...existing, ...fresh.map((item) => buildFixtureStub(item, { includeText: false }))], null, 2)}\n`,
  );
  console.log(`Wrote ${FIXTURE}. Fill in the labels, then remove knownFailure.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error?.stack || String(error));
    process.exit(1);
  });
}
