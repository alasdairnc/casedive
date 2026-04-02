#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FILE_EXTENSIONS = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".json",
  ".md",
  ".yml",
  ".yaml",
]);
const DEBUG_PATTERNS = [
  { pattern: /\bdebugger;?/g, label: "debugger statement" },
  { pattern: /console\.(log|debug|trace)\s*\(/g, label: "console debug call" },
];
const CHECKED_PATH_PREFIXES = [
  "api/",
  "src/",
  "tests/",
  ".github/",
  "hooks/",
  "public/",
];
const SECRET_FILE_PATTERNS = [
  /^\.env(\.|$)/,
  /\.retrieval-health-token$/i,
  /\.token$/i,
  /\.secret$/i,
];

function runGit(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
}

function getStagedFiles() {
  const output = runGit([
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=ACMR",
  ]);
  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function isTextualFile(filePath) {
  return FILE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function readStagedContent(filePath) {
  try {
    return runGit(["show", `:${filePath}`]);
  } catch {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return "";
  }
}

const stagedFiles = getStagedFiles();
const violations = [];

for (const filePath of stagedFiles) {
  const normalized = filePath.replace(/\\/g, "/");

  if (SECRET_FILE_PATTERNS.some((pattern) => pattern.test(normalized))) {
    violations.push(`${filePath}: secret or env file should not be committed`);
    continue;
  }

  if (!CHECKED_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    continue;
  }

  if (!isTextualFile(filePath)) continue;

  const content = readStagedContent(filePath);
  if (!content) continue;

  for (const { pattern, label } of DEBUG_PATTERNS) {
    if (pattern.test(content)) {
      violations.push(`${filePath}: ${label}`);
    }
  }
}

if (violations.length > 0) {
  console.error("Pre-commit check failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  console.error("Remove debug statements or secret files before committing.");
  process.exit(1);
}

console.log("Pre-commit check passed.");
