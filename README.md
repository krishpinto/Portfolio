# krishpinto.co.in

My portfolio. Live at [krishpinto.co.in](https://krishpinto.co.in).

## Running it

Needs Node 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

Other scripts you'll want:

```bash
pnpm build
pnpm lint
pnpm check-types
pnpm format:write
```

## Where things live

Content is all in `src/features/portfolio/data/`, one file per section.
`user.ts` has the bio and contact details, then `projects.ts`, `papers.ts`,
`experiences.tsx`, `awards.ts` and `tech-stack.ts` do what they sound like.
Edit those and the pages follow.

Components sit in `src/components` and `src/features/portfolio/components`.
Styling is Tailwind v4 and the theme tokens are all in
`src/styles/globals.css`.

There are two generator scripts in `src/scripts/`. One builds the technology
icon set from a few sources, the other makes the printable QR code. Neither
runs as part of the build, so run them by hand when you need to.

A couple of things worth knowing if you poke around. The email and phone in
`user.ts` are base64 so scrapers can't lift them out of the HTML, and they get
decoded in the browser. The resume preview is an image Google Drive renders
from the PDF, which means updating the resume doesn't need a deploy.

## License

MIT, see [LICENSE](./LICENSE). Take whatever's useful. If you fork it, put your
own name on it.
