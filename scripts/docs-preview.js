#!/usr/bin/env node
// Live-reload preview for docs/reports/artifacts. Renders .md through the SAME
// function docs-build.js uses, so preview === build output.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import browserSync from "browser-sync";
import { renderMarkdownDocument } from "./docs-build.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(__dirname, "..");
const WATCH = ["docs/**/*.md", "reports/**/*.md", "artifacts/**/*.md", "*.md"];

function deriveTitle(markdown, fallback) {
  const m = String(markdown).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

const bs = browserSync.create();
bs.init({
  server: {
    baseDir: BASE_DIR,
    middleware: [
      (req, res, next) => {
        const urlPath = decodeURIComponent((req.url || "").split("?")[0]);
        if (!urlPath.toLowerCase().endsWith(".md")) return next();
        const filePath = path.join(BASE_DIR, urlPath);
        if (!filePath.startsWith(BASE_DIR) || !fs.existsSync(filePath))
          return next();
        const md = fs.readFileSync(filePath, "utf-8");
        const html = renderMarkdownDocument(md, {
          title: deriveTitle(md, path.basename(filePath)),
        });
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
      },
    ],
  },
  files: WATCH,
  notify: false,
  open: true,
  ui: false,
});
