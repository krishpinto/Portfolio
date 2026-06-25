# Krish Pinto — Portfolio

[![Live](https://img.shields.io/badge/live-krishpinto.co.in-09090b)](https://krishpinto.co.in)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

> A minimal, pixel-perfect portfolio for a Full-Stack & AI Engineer — fast, accessible, and built to feel like a product, not a page.

This is my personal corner of the internet at **[krishpinto.co.in](https://krishpinto.co.in)**. It collects what I've built, shipped, and won — projects, research papers, experience, awards, and certifications — in one clean, themeable, SEO-tuned site.

Every section is data-driven: the whole portfolio renders from typed config files, so adding a project or paper is a one-object edit, not a markup rewrite.

<p align="center">
  <img src="public/krish.png" alt="Krish Pinto" width="160" />
</p>

## Highlights

- **Pixel-perfect, minimal design** — light/dark themes with `next-themes`, Geist type, and Tailwind v4.
- **Data-driven sections** — projects, research papers, experience, awards, certifications, tech stack, testimonials, and bookmarks all live as typed data.
- **vCard integration** — download my contact card straight from the site.
- **SEO & social ready** — dynamic OG images, sitemap, robots, structured data (`schema-dts`), and a web manifest.
- **Accessible & fast** — keyboard-friendly, `sharp`-optimized images, and a `/llms` route for AI crawlers.
- **Privacy-first analytics** — consent-managed, with a public [privacy policy](./PRIVACY_POLICY.md).

## What's inside

| Section        | Source |
| -------------- | ------ |
| Profile / bio  | `src/features/portfolio/data/user.ts` |
| Projects       | `src/features/portfolio/data/projects.ts` |
| Research papers| `src/features/portfolio/data/papers.ts` |
| Experience     | `src/features/portfolio/data/experiences.tsx` |
| Awards         | `src/features/portfolio/data/awards.ts` |
| Certifications | `src/features/portfolio/data/certifications.ts` |
| Tech stack     | `src/features/portfolio/data/tech-stack.ts` |
| Testimonials   | `src/features/portfolio/data/testimonials.ts` |
| Bookmarks      | `src/features/portfolio/data/bookmarks.ts` |

## Tech stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, React 19)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Animation** — [Motion](https://motion.dev)
- **Content** — MDX via `next-mdx-remote` + the `fumadocs` toolchain
- **Tooling** — TypeScript, ESLint, Prettier, pnpm

## Development

Requires Node `22.x` and pnpm `>=9`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see it.

```bash
pnpm build        # production build
pnpm lint         # lint
pnpm check-types  # type-check
pnpm format:write # format
```

## Acknowledgements

Built on the excellent open-source portfolio foundation by [Nguyen Chanh Dai (chanhdai.com)](https://github.com/ncdai/chanhdai.com), then reshaped and extended into my own.

## License

[MIT](./LICENSE) — feel free to learn from it. If you fork it, please make it your own.
