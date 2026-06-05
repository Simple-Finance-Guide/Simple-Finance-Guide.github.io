import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group rounded-[2rem] border border-finance-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-[#26312c] dark:bg-[#111813]">
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-finance-600 dark:text-[#7bd9a0]">
        <Link href={`/category/${article.categorySlug}`}>{article.category}</Link>
        <span>{article.readingTime} min read</span>
      </div>
      <Link href={`/article/${article.slug}`}>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-[var(--ink)] group-hover:text-finance-700 dark:group-hover:text-[#a7f0c0]">
          {article.title}
        </h2>
      </Link>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{article.description}</p>
      <Link
        className="mt-5 inline-flex items-center rounded-full bg-finance-50 px-4 py-2 text-sm font-bold text-finance-700 transition hover:bg-finance-100 dark:bg-[#17201b] dark:text-[#a7f0c0] dark:hover:bg-[#202a24]"
        href={`/article/${article.slug}`}
      >
        Read guide
      </Link>
    </article>
  );
}
