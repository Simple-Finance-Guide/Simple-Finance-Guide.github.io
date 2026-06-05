"use client";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      aria-label="Toggle color mode"
      className="grid size-10 place-items-center rounded-full border border-finance-100 bg-white text-finance-700 transition hover:bg-finance-50 dark:border-[#2a362f] dark:bg-[#111813] dark:text-[#dfe8e2] dark:hover:bg-[#17201b]"
      onClick={toggleTheme}
      title="Toggle color mode"
      type="button"
    >
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-5 dark:hidden" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="hidden size-5 dark:block" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v2.2" strokeLinecap="round" />
        <path d="M12 18.8V21" strokeLinecap="round" />
        <path d="M4.6 4.6 6.1 6.1" strokeLinecap="round" />
        <path d="M17.9 17.9 19.4 19.4" strokeLinecap="round" />
        <path d="M3 12h2.2" strokeLinecap="round" />
        <path d="M18.8 12H21" strokeLinecap="round" />
        <path d="M4.6 19.4 6.1 17.9" strokeLinecap="round" />
        <path d="M17.9 6.1 19.4 4.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.8" />
      </svg>
    </button>
  );
}
