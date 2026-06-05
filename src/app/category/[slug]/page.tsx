import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory, getCategories } from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} Guides`,
    description: `Read practical ${category.name.toLowerCase()} guides from Simple Finance Guide.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategories().find((item) => item.slug === slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">Category</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">{category.name} Guides</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
        Practical, readable articles to help you make better decisions about {category.name.toLowerCase()}.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
