import Link from "next/link";
import { AdBlock } from "@/components/AdBlock";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { getArticleSummaries, getCategories } from "@/lib/content";
import { websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  const articles = getArticleSummaries();
  const categories = getCategories();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
        <div>
          <p className="inline-flex rounded-full border border-finance-100 bg-white px-4 py-2 text-sm font-bold text-finance-700 shadow-sm dark:border-[#26312c] dark:bg-[#111813] dark:text-[#a7f0c0]">
            Practical money guides for everyday decisions
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-[var(--ink)] sm:text-6xl">
            Simple finance advice that is clear, calm, and useful.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Learn how to budget better, save with purpose, manage debt, and start investing with plain-English guides designed for fast reading and confident action.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="rounded-full bg-finance-600 px-6 py-3 text-center font-bold text-white shadow-soft transition hover:bg-finance-700 dark:bg-finance-500 dark:hover:bg-finance-600" href="#articles">
              Explore guides
            </Link>
            <Link className="rounded-full border border-finance-100 bg-white px-6 py-3 text-center font-bold text-finance-700 transition hover:bg-finance-50 dark:border-[#26312c] dark:bg-[#111813] dark:text-[#a7f0c0] dark:hover:bg-[#17201b]" href="/about">
              Why trust us?
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-finance-100 bg-white p-6 shadow-soft dark:border-[#26312c] dark:bg-[#111813]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">Reader roadmap</p>
          <div className="mt-5 grid gap-4">
            {["Build a starter budget", "Save your first emergency fund", "Reduce high-interest debt", "Learn investing basics"].map((item, index) => (
              <div className="flex gap-4 rounded-3xl bg-paper p-4 dark:bg-[#17201b]" key={item}>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-finance-600 text-sm font-black text-white">{index + 1}</span>
                <p className="font-bold text-[var(--ink)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdBlock label="Sponsored" />
      </div>
      <div id="articles">
        <SearchAndFilter articles={articles} categories={categories} />
      </div>
    </>
  );
}
