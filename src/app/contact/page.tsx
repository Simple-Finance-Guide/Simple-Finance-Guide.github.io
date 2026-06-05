import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Simple Finance Guide for article suggestions, corrections, and partnership inquiries."
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">Contact</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">Send us a note.</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
        Have a topic request, correction, or business inquiry? Use the email below. A hosted form can be added when your preferred form provider is ready.
      </p>
      <div className="mt-8 rounded-[2rem] border border-finance-100 bg-white p-6 shadow-sm dark:border-[#26312c] dark:bg-[#111813]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Email</p>
        <a className="mt-2 block text-xl font-black text-finance-700 dark:text-[#a7f0c0]" href="mailto:hello@simplefinanceguide.com">
          hello@simplefinanceguide.com
        </a>
      </div>
    </section>
  );
}
