# Portfolio Website

Personal portfolio of Hamadullah — Software Developer building production-grade .NET, React and AI systems.

[![Live Site](https://img.shields.io/badge/Live%20Site-hamadullah.me-111111?style=for-the-badge)](https://hamadullah.me)

## Features

- Monochrome, editorial design: outlined/solid display name, "/TITLE" headings over giant watermark words
- Stacked scroll panels — each section slides over the previous one like a card
- GSAP motion: intro preloader, letter-by-letter titles, scroll-scrubbed text, count-ups, magnetic buttons
- Cursor effects: colour spotlight over the grayscale portrait, custom cursor, hover previews that trail the cursor
- Project covers are coded UI mockups (`src/components/Mockup.tsx`, content in `src/data/mockups.ts`)
- Sections: Hero, About, Selected Work (22 projects, filterable), Research (FYP), Service, Experience & Education, Toolkit, Contact
- Project detail sheets at `#work/<slug>` — shareable links that work on any static host
- Fully responsive from 320px phones to wide desktops; respects `prefers-reduced-motion`

## Editing content

All copy lives in typed data files — no component changes needed:

- `src/data/profile.ts` — profile, stats, experience, education, skills, services, FYP research
- `src/data/projects.ts` — every project card and detail page
- `src/data/mockups.ts` — the screen shown on each project cover
- `public/Hamadullah_Resume.pdf` — the downloadable resume

## Tech Stack

- Vite, React 18, TypeScript
- Tailwind CSS (Manrope via Google Fonts), lucide-react icons
- GSAP 3.13 (ScrollTrigger, SplitText) and Lenis smooth scrolling

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # outputs dist/
npm run preview
```

## Deployment (CI/CD)

The site is a static-assets Cloudflare Worker (`twilight-union-2ee6`) on the `hamadullah.me` custom domain,
configured in `wrangler.jsonc`.

`.github/workflows/deploy.yml` runs on every push to `main`: install → lint → typecheck → test → build →
`wrangler deploy` → smoke test against https://hamadullah.me. Pull requests run the checks only.

It needs two repository secrets (Settings → Secrets and variables → Actions):

| Secret | Where to find it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → Workers & Pages → Account ID (right-hand sidebar) |

Manual deploy from a machine logged in with `wrangler login`:

```bash
npm run build
npx wrangler deploy
```

Unknown paths fall back to the app, which renders its own 404 page; project pages use `#work/<slug>` links.
