# Simple Finance Guide

This project is a static-first finance content website built with Next.js, TypeScript, and Tailwind CSS.

## Common Commands

- `npm.cmd run dev` starts the local development server on Windows.
- `npm.cmd run generate -- "How to Save Money Fast"` creates an article JSON file, clean HTML file, sitemap, and robots file.
- `npm.cmd run generate:site` rebuilds static article HTML, `public/sitemap.xml`, and `public/robots.txt`.
- `npm.cmd run build` prepares site assets and runs a production build.

## Content

Generated article data lives in `content/articles`.
Static exported article HTML lives in `generated-html`.

## How the Owner Gives a Topic

The site owner can give a topic in simple text, for example:

- `Topic: How to Save Money Fast`
- `Topic: Best Budgeting Tips for Beginners`
- `Topic: Beginner Investing Guide`
- `Topic: Emergency Fund for Low Income Families`

When a topic is provided, create a complete article for that exact topic and save it into the website.

Use this command only when the owner wants the quick local generator:

```powershell
npm.cmd run generate -- "How to Save Money Fast"
```

For best quality, the agent should write the article content directly instead of using a generic hardcoded article template. The old placeholder article template was removed on purpose.

## Article Agent Rules

When the owner gives a topic, the agent must produce a complete, publish-ready article package:

- Create a clean slug automatically.
- Pick the best category automatically.
- Write a strong human-friendly title.
- Write an SEO title.
- Write an SEO description.
- Write a short article description.
- Write the full article in clean semantic HTML.
- Add a useful FAQ section.
- Add related article suggestions using existing site articles.
- Save the article JSON in `content/articles/<slug>.json`.
- Save the static HTML file in `generated-html/<slug>.html`.
- Update `public/sitemap.xml`.
- Update `public/robots.txt` if needed.
- Run `npm.cmd run generate:site`.
- Run `npm.cmd run build` before final handoff when practical.

## Article Writing Style

Always write finance articles like a helpful human expert, not like a machine or a generic template.

- Use simple words that beginners can understand.
- Make the article feel warm, practical, and memorable.
- Explain ideas like talking to a real person who may feel confused or stressed about money.
- Use short paragraphs for easy mobile reading.
- Use clear examples from everyday life.
- Use lists, checklists, tables, bold text, and italic text where they make the article easier to remember.
- Use headings that answer real reader questions.
- Give practical steps, not vague advice.
- Avoid filler, hype, and robotic repetition.
- Avoid promising guaranteed financial results.
- Include a clear educational disclaimer when advice could sound personal.
- Keep the tone trustworthy, calm, and encouraging.

## Recommended Article Structure

Use this as a flexible quality checklist, not a hardcoded template:

- Introduction that explains the topic in simple words.
- Why the topic matters.
- Quick summary or key takeaways.
- Step-by-step guidance.
- A table when comparison, budgeting, timeline, or priority is useful.
- Common mistakes to avoid.
- Action checklist.
- FAQ section with 3 to 5 questions.
- Related guides/internal links.
- Short reminder that the content is educational, not personal financial advice.

## SEO and AdSense Rules

- Use one clear `h1` on the page through the article title.
- Use semantic article HTML with `h2`, `h3`, `p`, `ul`, `ol`, `table`, `strong`, and `em`.
- Do not keyword-stuff.
- Make content original and genuinely helpful.
- Keep paragraphs readable so ads do not interrupt dense walls of text.
- Make internal links natural.
- Ensure article metadata matches the content.
- Ensure JSON-LD structured data stays valid.

## Advanced Content Quality Rules

The goal is not to generate articles.

The goal is to generate the best article on the topic.

Every article must be capable of competing with top-ranking Google results.

### Content Depth

- Minimum target length: 1500–3000 words.
- Cover the topic completely.
- Answer beginner questions before they are asked.
- Include practical examples.
- Include real-world scenarios.
- Include pros and cons when applicable.
- Include step-by-step instructions when applicable.
- Include comparison tables when useful.
- Include actionable takeaways.

### Human Writing Requirements

Content must never sound AI-generated.

Avoid:

- Generic introductions.
- Repetitive phrases.
- Empty filler paragraphs.
- Obvious AI wording.
- Generic conclusions.

Prefer:

- Real-life examples.
- Natural transitions.
- Helpful explanations.
- Clear reasoning.
- Practical advice.

Write as an experienced financial educator helping a friend.

### Topical Authority

When generating content:

- Explain related concepts.
- Mention important terms naturally.
- Link to existing relevant articles.
- Suggest future articles that strengthen topic coverage.

Example:

If article topic is "Emergency Fund":

Also explain:

- Budgeting
- Savings Accounts
- Unexpected Expenses
- Financial Security
- Monthly Budget Planning

### Internal Linking Strategy

Each article should contain:

- 3 to 8 relevant internal links.
- Contextual links inside paragraphs.
- Related guides section near the end.

Never force links unnaturally.

### AdSense Placement Rules

Insert ad placeholders naturally.

Short Article:

- After introduction.
- Before conclusion.

Medium Article:

- After introduction.
- Mid article.
- Before FAQ.
- Before conclusion.

Long Article:

- After introduction.
- Every 2-3 major sections.
- Before FAQ.
- Before conclusion.

Ad placeholders should use:

```html
<div class="ad-slot ad-responsive"></div>
```

Never place two ads consecutively.

Never place ads before H1.

Never place ads inside tables.

Never place ads inside FAQ answers.

### SEO Excellence

Generate:

- SEO title
- SEO description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

Optimize for:

- Featured snippets
- People Also Ask sections
- Long-tail keywords
- Search intent satisfaction

### Reader Experience

Maximum paragraph length:

- 3 to 4 sentences

Prefer:

- Lists
- Tables
- Checklists
- Callout boxes
- Key takeaways

The article should be highly readable on mobile devices.

### Trust & E-E-A-T

Content must demonstrate:

- Experience
- Expertise
- Authoritativeness
- Trustworthiness

Include:

- Educational disclaimer
- Factually accurate information
- Balanced viewpoints
- Risks and limitations when discussing money topics

Never guarantee income, investment returns, or financial outcomes.
