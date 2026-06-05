"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleSummary, Category } from "@/lib/content";

export function SearchAndFilter({ articles, categories }: { articles: ArticleSummary[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesQuery =
        !normalizedQuery ||
        `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "all" || article.categorySlug === category;
      return matchesQuery && matchesCategory;
    });
  }, [articles, category, query]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-finance-100 bg-white p-4 shadow-sm sm:p-5 dark:border-[#26312c] dark:bg-[#111813]">
        <div className="grid gap-3 md:grid-cols-[1fr_16rem]">
          <label className="sr-only" htmlFor="article-search">Search articles</label>
          <input
            className="w-full rounded-2xl border border-finance-100 bg-paper px-4 py-3 text-[var(--ink)] outline-none ring-finance-500 transition placeholder:text-[var(--muted)] focus:ring-2 dark:border-[#26312c] dark:bg-[#17201b] dark:placeholder:text-[#8aa294]"
            id="article-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search budgeting, saving, investing..."
            type="search"
            value={query}
          />
          <label className="sr-only" htmlFor="category-filter">Filter by category</label>
          <select
            className="w-full rounded-2xl border border-finance-100 bg-paper px-4 py-3 font-semibold text-[var(--ink)] outline-none ring-finance-500 transition focus:ring-2 dark:border-[#26312c] dark:bg-[#17201b]"
            id="category-filter"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-white p-8 text-center text-[var(--muted)] dark:bg-[#111813]">No articles matched your search yet.</p>
      ) : null}
    </section>
  );
}
