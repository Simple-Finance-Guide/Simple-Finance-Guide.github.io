const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const generatedDir = path.join(root, "generated-html");

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(input) {
  return input
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const normalized = word.replace(/\b(ira|etf|apr|fico)\b/g, (match) => match.toUpperCase());
      return normalized[0].toUpperCase() + normalized.slice(1);
    })
    .join(" ")
    .replace(/\b(Ira|Etf|Apr|Fico)\b/g, (match) => match.toUpperCase());
}

function inferCategory(topic) {
  const normalized = topic.toLowerCase();
  if (/(invest|stock|etf|retire|portfolio|compound)/.test(normalized)) return "Investing";
  if (/(debt|loan|credit|mortgage|repay)/.test(normalized)) return "Debt";
  if (/(budget|spend|expense)/.test(normalized)) return "Budgeting";
  if (/(save|emergency|frugal)/.test(normalized)) return "Saving";
  if (/(tax|income|salary|side hustle|business)/.test(normalized)) return "Income";
  return "Personal Finance";
}

function estimateReadingTime(html) {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.ceil(words / 220));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readExistingArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(articlesDir, file), "utf8")));
}

function createArticleHtml(topic, title, category, related) {
  const safeTopic = escapeHtml(topic);
  const safeTitle = escapeHtml(title);
  const relatedLinks = related
    .map((item) => `<li><a href="/article/${item.slug}">${escapeHtml(item.title)}</a></li>`)
    .join("");

  return [
    `<p>${safeTitle} is a practical personal finance topic because it affects the way money moves through daily life. A good plan does not need to be complicated. It needs to be clear enough to use when real bills, choices, and tradeoffs show up.</p>`,
    `<h2>Why ${safeTopic} Matters</h2>`,
    `<p>Money decisions become easier when you can see the goal, the next step, and the cost of waiting. Whether the focus is saving, budgeting, debt, income, or investing, the same foundation applies: protect essentials, reduce waste, and make progress visible.</p>`,
    `<h2>Step 1: Define the Outcome</h2>`,
    `<p>Start by writing one specific result you want from ${safeTopic}. A vague goal is hard to measure. A clear goal, such as reducing monthly spending by a fixed amount or building a starter emergency fund, gives your plan a finish line.</p>`,
    `<h2>Step 2: Review Your Current Numbers</h2>`,
    `<p>Look at income, fixed bills, flexible spending, debt payments, and savings. This quick review helps you spot the gap between your current habits and the result you want. Avoid judging the numbers. Treat them as information.</p>`,
    `<h2>Step 3: Choose Small Actions You Can Repeat</h2>`,
    `<ul><li>Automate one positive money move, such as a savings transfer or extra debt payment.</li><li>Cancel, pause, or renegotiate one recurring cost.</li><li>Plan flexible spending before the week begins.</li><li>Track one simple metric, such as savings added or debt reduced.</li></ul>`,
    `<h2>Step 4: Build a Simple Weekly Routine</h2>`,
    `<p>A ten-minute weekly check-in can prevent financial drift. Review your balances, upcoming bills, progress toward the goal, and one adjustment for the next seven days. The routine matters more than perfection.</p>`,
    `<h2>Common Mistakes to Avoid</h2>`,
    `<p>Do not try to change every habit at once. Do not depend on motivation alone. Do not ignore irregular expenses such as annual renewals, repairs, holidays, or insurance payments. A strong plan makes room for real life.</p>`,
    `<h2>Quick Checklist</h2>`,
    `<ol><li>Pick one clear money goal.</li><li>Write down your current numbers.</li><li>Choose three repeatable actions.</li><li>Schedule a weekly review.</li><li>Adjust the plan when life changes.</li></ol>`,
    `<h2>Related Finance Guides</h2>`,
    `<ul>${relatedLinks}</ul>`,
    `<h2>FAQ</h2>`,
    `<h3>What is the first step for ${safeTopic}?</h3>`,
    `<p>The first step is to define a specific outcome and review your current numbers. This gives you a realistic starting point.</p>`,
    `<h3>How long does it take to see progress?</h3>`,
    `<p>Most readers can see early progress within one to four weeks if they choose small actions they can repeat consistently.</p>`,
    `<h3>Do I need a financial advisor?</h3>`,
    `<p>For general education, a simple self-guided plan can help. For complex tax, legal, investment, or debt situations, consider speaking with a qualified professional.</p>`
  ].join("");
}

function createArticle(topic) {
  const cleanTopic = topic.trim();
  const title = titleCase(cleanTopic);
  const slug = slugify(cleanTopic);
  const category = inferCategory(cleanTopic);
  const categorySlug = slugify(category);
  const existing = readExistingArticles().filter((article) => article.slug !== slug);
  const related = existing.slice(0, 3).map((article) => ({ title: article.title, slug: article.slug }));
  const html = createArticleHtml(cleanTopic, title, category, related);
  const now = new Date().toISOString();

  return {
    slug,
    title,
    seoTitle: `${title}: Simple Finance Guide`,
    seoDescription: `Learn ${cleanTopic.toLowerCase()} with practical steps, common mistakes, FAQs, and related finance guides.`,
    description: `A practical guide to ${cleanTopic.toLowerCase()} with simple steps, examples, and a repeatable money routine.`,
    category,
    categorySlug,
    keywords: Array.from(new Set([cleanTopic.toLowerCase(), category.toLowerCase(), "personal finance", "money guide"])),
    publishedAt: now,
    updatedAt: now,
    readingTime: estimateReadingTime(html),
    html,
    faqs: [
      {
        question: `What is the first step for ${cleanTopic}?`,
        answer: "Define a specific outcome and review your current numbers so your plan starts from reality."
      },
      {
        question: "How long does it take to see progress?",
        answer: "Many readers can see early progress within one to four weeks by repeating a few small actions consistently."
      },
      {
        question: "Do I need a financial advisor?",
        answer: "For complex tax, legal, investment, or debt situations, consider speaking with a qualified professional."
      }
    ],
    related
  };
}

function main() {
  const topic = process.argv.slice(2).join(" ");
  if (!topic.trim()) {
    console.error('Usage: npm run generate -- "How to Save Money Fast"');
    process.exit(1);
  }

  fs.mkdirSync(articlesDir, { recursive: true });
  fs.mkdirSync(generatedDir, { recursive: true });

  const article = createArticle(topic);
  fs.writeFileSync(path.join(articlesDir, `${article.slug}.json`), JSON.stringify(article, null, 2));

  execFileSync("node", [path.join(root, "scripts", "build-html.js")], { stdio: "inherit" });
  execFileSync("node", [path.join(root, "scripts", "sitemap.js")], { stdio: "inherit" });

  console.log(`Generated article: ${article.title}`);
  console.log(`JSON: content/articles/${article.slug}.json`);
  console.log(`HTML: generated-html/${article.slug}.html`);
}

main();
