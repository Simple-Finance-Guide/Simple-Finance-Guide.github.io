import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-finance-100 bg-white dark:border-[#26312c] dark:bg-[#0d1310]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="text-lg font-black text-[var(--ink)]">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
            Clear, practical personal finance education for readers who want to budget smarter, save faster, and invest with more confidence.
          </p>
        </div>
        <div>
          <p className="font-bold text-[var(--ink)]">Pages</p>
          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-[var(--ink)]">Disclaimer</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Educational content only. We do not provide personalized financial, legal, or tax advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
