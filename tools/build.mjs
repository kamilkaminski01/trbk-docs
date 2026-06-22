// Inlines styles.css + content.js + app.js into a single self-contained HTML.
// Usage: node tools/build.mjs [outfile]   (default: ../secure-src.html)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] || resolve(root, "secure-src.html");

let html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/css/styles.css"), "utf8");
const content = readFileSync(resolve(root, "assets/js/content.js"), "utf8");
const app = readFileSync(resolve(root, "assets/js/app.js"), "utf8");

html = html.replace('  <link rel="preload" href="assets/css/styles.css" as="style" />\n', "");
html = html.replace('  <link rel="stylesheet" href="assets/css/styles.css" />', "  <style>\n" + css + "\n  </style>");
html = html.replace('  <script src="assets/js/content.js"></script>', "  <script>\n" + content + "\n  </script>");
html = html.replace('  <script src="assets/js/app.js" defer></script>', "  <script>\n" + app + "\n  </script>");

writeFileSync(out, html);
console.log("Built single-file:", out, "(" + (html.length / 1024).toFixed(0) + " KB)");
