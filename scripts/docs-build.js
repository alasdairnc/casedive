#!/usr/bin/env node
// Convert markdown files to standalone, styled HTML documents.
// Exports renderMarkdownDocument so docs-preview.js renders identically.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(BASE_DIR, "artifacts", "html");

// Prose stylesheet. Targets what documents actually contain (headings,
// paragraphs, lists, blockquotes, fenced code, prose tables). Palette matches
// artifacts/filter-quality-report.html for visual kinship — no shared code.
const PROSE_STYLE = `
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    max-width: 820px; margin: 40px auto; padding: 0 20px; line-height: 1.7;
    color: #2c2825; background: #faf7f2; }
  h1, h2, h3, h4 { line-height: 1.25; margin-top: 1.6em; }
  h1 { font-size: 28px; border-bottom: 3px solid #d4a040; padding-bottom: 8px; }
  h2 { font-size: 22px; border-bottom: 1px solid #e0d8cc; padding-bottom: 6px; }
  h3 { font-size: 18px; }
  a { color: #b07d1e; }
  code { background: #efe8dc; padding: 2px 5px; border-radius: 4px;
    font-size: 0.9em; }
  pre { background: #2c2825; color: #faf7f2; padding: 16px; border-radius: 8px;
    overflow-x: auto; }
  pre code { background: none; color: inherit; padding: 0; }
  blockquote { border-left: 4px solid #d4a040; margin: 1em 0; padding: 4px 16px;
    background: #f3ece0; color: #5a534a; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #e0d8cc; padding: 8px 12px; text-align: left; }
  th { background: #efe8dc; }
  ul, ol { padding-left: 1.4em; }
  hr { border: none; border-top: 1px solid #e0d8cc; margin: 2em 0; }
`;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderMarkdownDocument(markdown, { title = "Document" } = {}) {
  const body = marked.parse(String(markdown || ""));
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>${PROSE_STYLE}</style>
</head>
<body>
${body}
</body>
</html>
`;
}

function deriveTitle(markdown, fallback) {
  const m = String(markdown).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function buildFile(srcPath) {
  const markdown = fs.readFileSync(srcPath, "utf-8");
  const base = path.basename(srcPath).replace(/\.md$/i, "");
  const title = deriveTitle(markdown, base);
  const html = renderMarkdownDocument(markdown, { title });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${base}.html`);
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(
    `✓ ${path.relative(BASE_DIR, srcPath)} → ${path.relative(BASE_DIR, outPath)}`,
  );
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node scripts/docs-build.js <file.md> [more.md ...]");
    process.exit(1);
  }
  for (const a of args) buildFile(path.resolve(BASE_DIR, a));
}

// Run main() only when invoked directly (not when imported by docs-preview.js).
// realpathSync comparison is robust to symlinks and spaced paths, unlike a raw
// `file://${process.argv[1]}` string compare.
const invokedPath = process.argv[1] ? fs.realpathSync(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) main();
