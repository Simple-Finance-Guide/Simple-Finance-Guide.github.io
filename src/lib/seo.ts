import type { Article } from "@/lib/content";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simple Finance Guide",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simplefinanceguide.com",
  description:
    "Simple Finance Guide helps readers make clearer decisions about saving, budgeting, investing, debt, and everyday money habits."
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    mainEntityOfPage: absoluteUrl(`/article/${article.slug}`),
    articleSection: article.category,
    keywords: article.keywords.join(", ")
  };
}

export function faqJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
