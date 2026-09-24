# alephbet.ai — Lexend type sample

A minimal, single-page [Astro](https://astro.build) site that demonstrates good
typographic defaults for the **Lexend** typeface, styled with **Tailwind CSS v4**
and the **`@tailwindcss/typography`** plugin. The color scheme is intentionally
**monochrome** (a single grayscale ramp) so the focus stays on type.

The page content itself explains the typography practices it demonstrates — the
practices were adapted from [lexend.com](https://www.lexend.com).

Content is managed with **Sanity**, whose Studio is embedded directly in this app
at [`/studio`](http://localhost:4321/studio) — see
[Content & Sanity Studio](#content--sanity-studio).

## Tech stack

| Tool | Purpose |
| --- | --- |
| [Astro](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling (via the `@tailwindcss/vite` plugin) |
| [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) | Sensible defaults for long-form prose (`prose` classes) |
| [Lexend](https://fonts.google.com/specimen/Lexend) | Variable font, loaded from Google Fonts (weight axis 300–700) |
| [Sanity](https://www.sanity.io) | Headless CMS + Studio (latest, React 19) |
| [`@sanity/astro`](https://github.com/sanity-io/sanity-astro) | Embeds the Studio and exposes the `sanity:client` module |
| [`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/) | Renders the React-based Studio inside Astro |

## Getting started

```bash
cp .env.example .env  # Sanity project id + dataset (already filled in)
npm install           # install dependencies
npm run dev           # site at http://localhost:4321, Studio at /studio
npm run build         # build the static site + Studio into ./dist
npm run preview       # preview the production build locally
```

> **Node version:** installs cleanly on Node 22.16, but a transitive dependency
> (`undici`) prefers **Node ≥ 22.19**. Everything builds fine on 22.16; upgrade
> Node if you want to silence the `EBADENGINE` warning.

## Project structure

```
.
├── astro.config.mjs        # Tailwind v4 Vite plugin + Sanity & React integrations
├── sanity.config.ts        # Studio config (schema + plugins)
├── sanity.cli.ts           # Sanity CLI config (deploy, typegen)
├── .env.example            # PUBLIC_SANITY_* connection values
├── public/
│   └── favicon.svg         # monochrome mark
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # <head>, Lexend Google Fonts link, mono <body>
│   ├── pages/
│   │   └── index.astro      # the single page (title + body)
│   ├── styles/
│   │   └── global.css       # Tailwind import, typography plugin, Lexend theme
│   ├── lib/
│   │   └── sanity.ts        # typed query helpers (getInsights, getServices, …)
│   └── sanity/
│       ├── env.ts           # projectId / dataset / apiVersion
│       └── schemaTypes/     # author, insight, serviceGroup, service, caseStudy
└── README.md
```

## Content & Sanity Studio

Content is managed with [Sanity](https://www.sanity.io). The Studio is **embedded
in this app** via [`@sanity/astro`](https://github.com/sanity-io/sanity-astro) and
served at `/studio` — there is no separate Studio app to run or deploy.

| | |
| --- | --- |
| Project ID | `z3owbx4h` |
| Dataset | `production` |
| Organization ID | `ocui6a6gg` |
| Studio route (embedded) | `/studio` |
| Published Studio | https://alephbet-ai.sanity.studio |

### Configuration

Connection details live in `.env` (copy from `.env.example`). `projectId` and
`dataset` are **not secrets** — they identify the public content API and ship in
the browser bundle regardless.

```bash
PUBLIC_SANITY_PROJECT_ID=z3owbx4h
PUBLIC_SANITY_DATASET=production
```

- `astro.config.mjs` reads these with Vite's `loadEnv` and configures the
  `@sanity/astro` integration, which exposes the `sanity:client` module.
- `sanity.config.ts` / `sanity.cli.ts` define the Studio and CLI config.
- `src/sanity/schemaTypes/` holds the content model; `src/lib/sanity.ts` has
  typed GROQ query helpers.

> **Note:** `@sanity/icons` v5 doesn't re-export named icons from its barrel for
> strict ESM bundlers, so schema files import icons from subpaths
> (`@sanity/icons/DocumentText`) instead of `@sanity/icons`.

### Content model

Every document has a slug (for website routing) and, where noted, a dedicated
**SEO** tab (meta title/description, social image, keywords, canonical URL,
noindex) via reusable [field groups](src/sanity/schemaTypes/shared/seoFields.ts).

- **Author** — name, position, image, slug, bio.
- **Insight** — title, slug, author (reference), cover image, teaser, TL;DR
  (rich text), body (rich text with image blocks), tags, and an SEO tab.
- **Service Group** — title, slug, cover image, description (rich text), and an
  SEO tab.
- **Service** — service group (reference), title, slug, cover image, description
  (rich text), optional related insights (references), an SEO tab, and a
  **`weight`** field for manual ordering (lower sorts first). In the Studio,
  services are **grouped by service group** — the "Services" item opens each
  group's services ordered by weight (see
  [`src/sanity/structure.ts`](src/sanity/structure.ts)).
- **Case Study** — title, slug, author (reference), cover image, teaser, body
  (rich text), optional related insights (references), and an SEO tab.
- **blockContent** — reusable Portable Text (headings, quote, lists, links,
  inline images) used by every rich-text field above.

Query helpers for each type live in [`src/lib/sanity.ts`](src/lib/sanity.ts)
(`getInsights`, `getInsight`, `getServiceGroups`, `getServices`,
`getCaseStudies`, `getCaseStudy`, `getAuthors`, plus `urlFor`).

### Working with the Studio

```bash
npm run dev                  # Studio at http://localhost:4321/studio
npx sanity login             # authenticate the CLI (first time)
npx sanity deploy            # optional: host at <name>.sanity.studio
npx sanity typegen generate  # generate types from schema + GROQ queries
```

If content doesn't load in the browser Studio, add your dev origin to the
project's CORS allow-list (once):

```bash
npx sanity cors add http://localhost:4321 --credentials
```

### Fetching content in a page

```astro
---
import { getInsights } from "../lib/sanity";
const insights = await getInsights();
---
<ul>
  {insights.map((insight) => <li>{insight.title}</li>)}
</ul>
```

## How Lexend is loaded

Lexend is pulled from Google Fonts as a variable font in `src/layouts/Layout.astro`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

It becomes the default sans-serif in `src/styles/global.css` via Tailwind v4's
CSS-first theming, so every element inherits it:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Lexend", ui-sans-serif, system-ui, sans-serif;
}
```

## Typography practices (from lexend.com)

Lexend is designed around **reading proficiency**, not decoration. Its design
rests on three ideas — reflected in how this page sets type:

1. **A sans-serif face** to reduce cognitive noise.
2. **Expanded scaling** to improve character recognition.
3. **Hyper-expanded character spacing** to create lag time and reduce crowding.

### Titles

- Heavier, open grade — **`font-semibold` (600)** for the page title and section
  headings.
- **Very tight line-height** (`leading-none`) so a multi-line title reads as one
  confident block.
- **Natural tracking** (`tracking-normal`) — Lexend's letterforms are already
  open, so no condensing is needed.
- **Large display size** — up to `text-6xl` on wide screens.
- **Short measure** — titles are held to `max-w-2xl`/`max-w-3xl`, not full width.
- `text-balance` evens out ragged line breaks on the headline.

### Body text

- **Comfortable size** — `prose-lg` renders body copy at ~18px. In Lexend's
  original readability study all text was set at 16pt; treat that as the floor.
- **Generous line-height** — ~1.7 (`prose-p:leading-[1.7]`) so lines never feel
  stacked without becoming airy.
- **Comfortable measure** — the default `prose` width (~65ch) keeps lines to
  roughly 60–75 characters.
- **Normal weight (400)** for body so the expanded spacing has room to breathe —
  resist tightening, since crowding is exactly what Lexend is built to avoid.

These are applied on the article element in `src/pages/index.astro`:

```html
<article class="prose prose-lg prose-zinc max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-p:leading-[1.7] prose-p:text-zinc-700 ...">
```

## Color scheme

Monochrome by design, using Tailwind's `zinc` grayscale ramp:

- Background: `zinc-50` (near-white)
- Primary text: `zinc-900` (near-black)
- Secondary text / lede: `zinc-500` / `zinc-600`
- Rules & borders: `zinc-200` / `zinc-300`

The `prose-zinc` modifier keeps the article body on the same grayscale ramp.
To introduce a brand color later, add an accent to links and headings — the type
scale and rhythm stay untouched.

## Extending

- **Add pages:** drop more `.astro` files into `src/pages/`.
- **Try Lexend's expansion axis:** Google Fonts also ships the width-graded
  families (`Lexend Deca`, `Exa`, `Giga`, `Mega`, `Peta`, `Tera`, `Zetta`).
  Swap the font link and `--font-sans` to experiment with wider tracking.
- **Add color:** introduce an accent via Tailwind `@theme` variables and apply
  it to links, headings, or a hero.
