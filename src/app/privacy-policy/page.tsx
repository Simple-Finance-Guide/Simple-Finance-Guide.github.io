import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Simple Finance Guide privacy policy, including advertising and analytics information."
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-600 dark:text-[#7bd9a0]">Privacy Policy</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-[var(--muted)]">
        <p>
          Simple Finance Guide respects reader privacy. This policy explains the types of information that may be collected when visitors use this website.
        </p>
        <h2 className="text-2xl font-black text-[var(--ink)]">Information We Collect</h2>
        <p>
          We may collect basic analytics data such as pages visited, device type, browser type, and referral source. If you contact us by email, we receive the information you choose to send.
        </p>
        <h2 className="text-2xl font-black text-[var(--ink)]">Advertising</h2>
        <p>
          This website may display Google AdSense ads. Third-party vendors, including Google, may use cookies to serve ads based on prior visits to this and other websites.
        </p>
        <h2 className="text-2xl font-black text-[var(--ink)]">Cookies</h2>
        <p>
          Cookies may be used for analytics, advertising, and site functionality. Visitors can manage cookies through their browser settings.
        </p>
        <h2 className="text-2xl font-black text-[var(--ink)]">Contact</h2>
        <p>
          For privacy questions, email hello@simplefinanceguide.com.
        </p>
      </div>
    </section>
  );
}
