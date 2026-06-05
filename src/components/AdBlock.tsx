"use client";

import { useEffect } from "react";

type AdBlockProps = {
  slot?: string;
  label?: string;
};

export function AdBlock({ slot = "0000000000", label = "Advertisement" }: AdBlockProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!client) return;
    try {
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle?.push({});
    } catch {
      // AdSense can be blocked locally; the placeholder keeps layout stable.
    }
  }, [client]);

  if (!client) {
    return (
      <aside className="my-8 rounded-3xl border border-dashed border-finance-100 bg-white p-6 text-center text-sm text-[var(--muted)] dark:border-[#26312c] dark:bg-[#111813]">
        {label} slot
      </aside>
    );
  }

  return (
    <aside className="my-8 rounded-3xl border border-finance-100 bg-white p-3 dark:border-[#26312c] dark:bg-[#111813]">
      <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
      <ins
        className="adsbygoogle block"
        data-ad-client={client}
        data-ad-format="auto"
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
