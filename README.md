# alephbet.ai — Lexend type sample

A minimal, single-page [Astro](https://astro.build) site that demonstrates good
typographic defaults for the **Lexend** typeface, styled with **Tailwind CSS v4**
and the **`@tailwindcss/typography`** plugin. The color scheme is intentionally
**monochrome** (a single grayscale ramp) so the focus stays on type.

The page content itself explains the typography practices it demonstrates — the
practices were adapted from [lexend.com](https://www.lexend.com).

## Tech stack

| Tool | Purpose |
| --- | --- |
| [Astro](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling (via the `@tailwindcss/vite` plugin) |
| [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) | Sensible defaults for long-form prose (`prose` classes) |
| [Lexend](https://fonts.google.com/specimen/Lexend) | Variable font, loaded from Google Fonts (weight axis 300–700) |

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:4321
npm run build   # build the static site into ./dist
npm run preview # preview the production build locally
```

> **Node version:** installs cleanly on Node 22.16, but a transitive dependency
> (`undici`) prefers **Node ≥ 22.19**. Everything builds fine on 22.16; upgrade
> Node if you want to silence the `EBADENGINE` warning.

## Project structure

```
.
├── astro.config.mjs        # registers the Tailwind v4 Vite plugin
├── public/
│   └── favicon.svg         # monochrome mark
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # <head>, Lexend Google Fonts link, mono <body>
│   ├── pages/
│   │   └── index.astro      # the single page (title + body)
│   └── styles/
│       └── global.css       # Tailwind import, typography plugin, Lexend theme
└── README.md
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
                prose-p:leading-[1.8] prose-p:text-zinc-700 ...">
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
