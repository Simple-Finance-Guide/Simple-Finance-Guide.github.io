import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Simple Finance Guide and our practical approach to personal finance education."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">About us</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">Finance guidance should feel understandable.</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-[var(--muted)]">
        <p>
          Simple Finance Guide publishes clear, practical articles about budgeting, saving, debt, investing, and everyday money decisions.
        </p>
        <p>
          Our goal is to make personal finance less intimidating. We focus on plain language, useful steps, and transparent disclaimers so readers can learn confidently.
        </p>
        <p>
          Content is educational and not personalized financial advice. For major financial decisions, readers should consider speaking with a qualified professional.
        </p>
      </div>
    </section>
  );
}
