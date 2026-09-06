#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the routes that actually exist.
 *
 * The route list is derived from the filesystem rather than duplicated in a
 * config, so a new page in src/routes is in the sitemap the next time the
 * site is built. Dynamic adventure pages are expanded from the slugs declared
 * in src/lib/site/adventures.ts.
 *
 * Runs automatically via the `prebuild` npm script.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://srsidekick.org";
const LANGUAGES = ["en", "fr", "es", "hi"];

/** Routes whose URLs shouldn't be advertised to search engines. */
const EXCLUDED = new Set(["/terms"]);

function staticRoutes() {
  return readdirSync(join(root, "src/routes"))
    .filter((file) => file.endsWith(".tsx") && !file.startsWith("__"))
    .filter((file) => !file.includes("$"))
    .map((file) => {
      const name = file.replace(/\.tsx$/, "");
      if (name === "index") return "/";
      // "adventures.index" -> "/adventures"
      return (
        "/" +
        name
          .replace(/\.index$/, "")
          .split(".")
          .join("/")
      );
    });
}

function adventureRoutes() {
  const source = readFileSync(join(root, "src/lib/site/adventures.ts"), "utf8");
  const slugs = [...source.matchAll(/^\s{4}slug: "([a-z-]+)",$/gm)].map((m) => m[1]);
  return slugs.map((slug) => `/adventures/${slug}`);
}

function priorityFor(path) {
  if (path === "/") return "1.0";
  if (["/seniors", "/families", "/how-it-works", "/pricing", "/adventures"].includes(path))
    return "0.9";
  if (path.startsWith("/adventures/")) return "0.7";
  return "0.6";
}

const paths = [...new Set([...staticRoutes(), ...adventureRoutes()])]
  .filter((path) => !EXCLUDED.has(path))
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const today = new Date().toISOString().slice(0, 10);

const body = paths
  .map((path) => {
    const url = `${SITE_URL}${path === "/" ? "" : path}`;
    const alternates = LANGUAGES.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${lang === "en" ? url : `${url}?lang=${lang}`}"/>`,
    ).join("\n");
    return [
      "  <url>",
      `    <loc>${url}</loc>`,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>monthly</changefreq>`,
      `    <priority>${priorityFor(path)}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap: ${paths.length} URLs written to public/sitemap.xml`);
