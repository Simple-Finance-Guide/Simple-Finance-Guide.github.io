export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function estimateReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

export function inferCategory(topic: string) {
  const normalized = topic.toLowerCase();
  if (/(invest|stock|etf|retire|portfolio|compound)/.test(normalized)) return "Investing";
  if (/(debt|loan|credit|mortgage|repay)/.test(normalized)) return "Debt";
  if (/(budget|spend|expense)/.test(normalized)) return "Budgeting";
  if (/(save|emergency|frugal)/.test(normalized)) return "Saving";
  if (/(tax|income|salary|side hustle|business)/.test(normalized)) return "Income";
  return "Personal Finance";
}

export function titleCase(input: string) {
  return input
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word.length > 3 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ")
    .replace(/\b(Ira|Etf|Apr|Fico)\b/g, (match) => match.toUpperCase());
}
