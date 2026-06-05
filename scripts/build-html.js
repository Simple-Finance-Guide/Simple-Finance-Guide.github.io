const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const outputDir = path.join(root, "generated-html");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://simplefinanceguide.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Simple Finance Guide";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(articlesDir, file), "utf8")));
}

function renderArticle(article) {
  const canonical = `${siteUrl}/article/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName },
    mainEntityOfPage: canonical,
    articleSection: article.category
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(article.seoTitle)}</title>
  <meta name="description" content="${escapeHtml(article.seoDescription)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    body{margin:0;font-family:Arial,sans-serif;color:#17201b;background:#fff;line-height:1.7}
    main{max-width:760px;margin:0 auto;padding:40px 20px}
    a{color:#147044}
    h1{font-size:clamp(2.2rem,6vw,4rem);line-height:1.05;letter-spacing:-.04em}
    h2{margin-top:2rem;font-size:1.8rem}
    h3{margin-top:1.5rem}
    .meta{color:#5c6b62;font-weight:700}
    .category{color:#147044;text-transform:uppercase;letter-spacing:.16em;font-size:.8rem;font-weight:800}
  </style>
</head>
<body>
  <main>
    <p class="category">${escapeHtml(article.category)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    <p class="meta">${article.readingTime} min read</p>
    ${article.html}
  </main>
</body>
</html>`;
}

function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  for (const article of getArticles()) {
    fs.writeFileSync(path.join(outputDir, `${article.slug}.html`), renderArticle(article));
  }
  console.log("Static article HTML generated.");
}

main();
