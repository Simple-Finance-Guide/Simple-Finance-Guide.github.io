import fs from "node:fs";
import path from "node:path";

export type FAQ = {
  question: string;
  answer: string;
};

export type RelatedArticle = {
  title: string;
  slug: string;
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  category: string;
  categorySlug: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  html: string;
  faqs: FAQ[];
  related: RelatedArticle[];
};

export type ArticleSummary = Pick<
  Article,
  "slug" | "title" | "description" | "category" | "categorySlug" | "publishedAt" | "readingTime"
>;

export type Category = {
  name: string;
  slug: string;
  count: number;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function ensureArticlesDirectory() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
  }
}

export function getArticles(): Article[] {
  ensureArticlesDirectory();
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const fullPath = path.join(articlesDirectory, file);
      return JSON.parse(fs.readFileSync(fullPath, "utf8")) as Article;
    })
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getArticleBySlug(slug: string): Article | null {
  const articlePath = path.join(articlesDirectory, `${slug}.json`);
  if (!fs.existsSync(articlePath)) return null;
  return JSON.parse(fs.readFileSync(articlePath, "utf8")) as Article;
}

export function getArticleSummaries(): ArticleSummary[] {
  return getArticles().map(({ slug, title, description, category, categorySlug, publishedAt, readingTime }) => ({
    slug,
    title,
    description,
    category,
    categorySlug,
    publishedAt,
    readingTime
  }));
}

export function getCategories(): Category[] {
  const categoryMap = new Map<string, Category>();
  for (const article of getArticles()) {
    const existing = categoryMap.get(article.categorySlug);
    categoryMap.set(article.categorySlug, {
      name: article.category,
      slug: article.categorySlug,
      count: existing ? existing.count + 1 : 1
    });
  }
  return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getArticlesByCategory(categorySlug: string): ArticleSummary[] {
  return getArticleSummaries().filter((article) => article.categorySlug === categorySlug);
}
