import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBlock } from "@/components/AdBlock";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { absoluteUrl, articleJsonLd, faqJsonLd } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: absoluteUrl(`/article/${article.slug}`)
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: absoluteUrl(`/article/${article.slug}`),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article)) }} />
      <Link className="text-sm font-bold text-finance-700 dark:text-[#7bd9a0]" href={`/category/${article.categorySlug}`}>
        {article.category}
      </Link>
      <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[var(--ink)] sm:text-6xl">{article.title}</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{article.description}</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[var(--muted)]">
        <span>{article.readingTime} min read</span>
        <span>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(article.updatedAt))}</span>
      </div>
      <AdBlock label="Article sponsor" />
      <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: article.html }} />
      {article.related.length ? (
        <aside className="mt-12 rounded-[2rem] border border-finance-100 bg-white p-6 shadow-sm dark:border-[#26312c] dark:bg-[#111813]">
          <h2 className="text-2xl font-black text-[var(--ink)]">Related guides</h2>
          <div className="mt-4 grid gap-3">
            {article.related.map((related) => (
              <Link className="rounded-2xl bg-paper p-4 font-bold text-finance-700 dark:bg-[#17201b] dark:text-[#a7f0c0]" href={`/article/${related.slug}`} key={related.slug}>
                {related.title}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
