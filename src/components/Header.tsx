import Link from "next/link";
import { getCategories } from "@/lib/content";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const categories = getCategories().slice(0, 4);

  return (
    <header className="sticky top-0 z-50 border-b border-finance-100/80 bg-white/90 backdrop-blur-xl dark:border-[#26312c] dark:bg-[#0d1310]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link className="group flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-2xl bg-finance-600 font-black text-white shadow-soft">
            S
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight text-[var(--ink)] dark:text-[#edf4ef]">Simple Finance</span>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">Guide</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--muted)] md:flex">
          <Link className="transition hover:text-finance-700 dark:hover:text-[#a7f0c0]" href="/about">About</Link>
          {categories.map((category) => (
            <Link
              className="transition hover:text-finance-700 dark:hover:text-[#a7f0c0]"
              href={`/category/${category.slug}`}
              key={category.slug}
            >
              {category.name}
            </Link>
          ))}
          <Link className="rounded-full bg-finance-600 px-4 py-2 text-white transition hover:bg-finance-700 dark:bg-finance-500 dark:hover:bg-finance-600" href="/contact">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
