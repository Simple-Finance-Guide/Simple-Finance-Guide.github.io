const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const publicDir = path.join(root, "public");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://simplefinanceguide.com";

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(articlesDir, file), "utf8")));
}

function sitemapUrl(pathname, lastmod = new Date().toISOString()) {
  return `  <url>
    <loc>${siteUrl}${pathname}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pathname === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
}

function main() {
  const articles = getArticles();
  const categorySlugs = Array.from(new Set(articles.map((article) => slugify(article.category))));
  const staticPages = ["/", "/about", "/contact", "/privacy-policy"];
  const urls = [
    ...staticPages.map((page) => sitemapUrl(page)),
    ...categorySlugs.map((slug) => sitemapUrl(`/category/${slug}`)),
    ...articles.map((article) => sitemapUrl(`/article/${article.slug}`, article.updatedAt))
  ];

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(
    path.join(publicDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`
  );
  fs.writeFileSync(
    path.join(publicDir, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
  );
  console.log("Sitemap and robots.txt generated.");
}

main();
