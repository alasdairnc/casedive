#!/usr/bin/env node
// One-off cleanup for the retrieval-health keys the rebuild replaced.
//
//   node --env-file=.env scripts/purge-legacy-retrieval-keys.js            # list only
//   node --env-file=.env scripts/purge-legacy-retrieval-keys.js --delete   # remove them
//
// Dry-run by default. The old v1 event store kept a `scenarioSnippet` per event
// with no expiry and no redaction, so these keys can still hold raw scenario
// text. They are no longer read or written; the new store uses `*:v3` keys.

import { Redis } from "@upstash/redis";

const LEGACY_KEYS = [
  "metrics:retrieval:events:v1",
  "metrics:retrieval:events:v2",
  "metrics:retrieval:last-event:v1",
  "metrics:retrieval:event-count:v1",
  "metrics:retrieval:alltime:v1",
];
const LEGACY_PATTERNS = ["cache:retrieval-health:*"];

const url =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
if (!url || !token) {
  console.error("Upstash credentials not found in the environment.");
  process.exit(2);
}

const redis = new Redis({ url, token });
const doDelete = process.argv.includes("--delete");

async function describe(key) {
  const type = await redis.type(key);
  if (type === "none") return null;
  let size = "";
  if (type === "list") size = `${await redis.llen(key)} items`;
  else if (type === "hash") size = `${await redis.hlen(key)} fields`;
  else if (type === "string") size = `${await redis.strlen(key)} bytes`;
  const ttl = await redis.ttl(key);
  return `${type}, ${size}, ttl ${ttl < 0 ? "none" : `${ttl}s`}`;
}

const found = [];
for (const key of LEGACY_KEYS) {
  const info = await describe(key);
  if (info) found.push([key, info]);
}
for (const pattern of LEGACY_PATTERNS) {
  let cursor = "0";
  do {
    const [next, keys] = await redis.scan(cursor, { match: pattern, count: 100 });
    cursor = String(next);
    for (const key of keys) found.push([key, await describe(key)]);
  } while (cursor !== "0");
}

if (found.length === 0) {
  console.log("No legacy retrieval-health keys found.");
} else {
  for (const [key, info] of found) console.log(`${key}  (${info})`);
  if (doDelete) {
    await redis.del(...found.map(([key]) => key));
    console.log(`Deleted ${found.length} key(s).`);
  } else {
    console.log(`\n${found.length} key(s) found. Re-run with --delete to remove.`);
  }
}
