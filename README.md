# $CDM — the ball that never stops rolling

### ▶ **[Open the live site → https://damilola-coder001.github.io/cmd-ball/](https://damilola-coder001.github.io/cmd-ball/)**

Source of that page: [`download/index.html`](download/index.html) — deployed automatically on every push to `main`.

A single-scroll landing page for **$CDM**, *the ball that never stops rolling*. Solana · fair launch · nine bounces.

No build step, no package manager, no dependencies — `download/index.html` **is** the site. Open it and it runs.

---

## The nine bounces

| # | Chapter | Anchor | Imagery |
|---|---------|--------|---------|
| I | Awakening | `#chapter-1` | `img/c1-awakening.jpg` |
| II | Omen | `#chapter-2` | `img/c2-omen.jpg` |
| III | Coin | `#chapter-3` | `img/c3-coin.jpg` |
| IV | Path | `#chapter-4` | `img/c4-path.jpg` |
| V | Circle | `#chapter-5` | `img/c5-circle.jpg` |
| VI | The Law | `#chapter-6` | `img/c6-law.jpg` |
| VII | The Number | `#chapter-7` | `img/c7-number.jpg` |
| VIII | The Ritual | `#chapter-8` | `img/c8-ritual.jpg` |
| IX | Yours | `#chapter-9` | `img/c9-yours.jpg` |

## Repository layout

```
download/                 the site — this folder is what you deploy
  index.html              entry point (hero + nine chapters + footer)
  cdm.css                 all styles, incl. the inline SVG noise texture
  cdm.js                  scroll rail, contract copy, parallax, fade-in
  img/                    chapter + hero imagery (jpg)
  README.md               generated-files note
scripts/                  z-ai image-generation helpers (bash) + design screenshots
upload/                   pasted reference images
```

## Run it locally

The site uses relative asset paths, so serve the `download/` folder rather than opening the
file directly. Any static server works:

```bash
# Python (no install required)
python -m http.server 3000 --directory download
# -> http://127.0.0.1:3000/

# or Node
npx serve download
```

## Deploy

Static bundle, so publish the **contents** of `download/` anywhere (Vercel, Netlify, Cloudflare
Pages, GitHub Pages, any bucket). `index.html` must sit next to `cdm.css`, `cdm.js` and `img/`.

### Live deployment (GitHub Pages)

`main` is wired to GitHub Pages through [`.github/workflows/pages.yml`](.github/workflows/pages.yml).
The workflow uploads the `download/` folder as the Pages artifact, so `scripts/` and `upload/` are
**not** published — only the site itself. Every push to `main` redeploys automatically.

- **Live URL:** <https://damilola-coder001.github.io/cmd-ball/>
- Pages source: **GitHub Actions** (`build_type: workflow`), HTTPS enforced
- The workflow uses `upload-pages-artifact` with `path: download`, so `index.html` lands at the
  published root

Webfonts are pulled from `fonts.googleapis.com` at runtime, so the visitor needs network access
for the intended typography (Cormorant Garamond / Inter / JetBrains Mono).

## Before going live

Some content is deliberately placeholder:

- The contract address in `#contract-address` is the wrapped-SOL mint
  (`So1111…1112`), **not** a real $CDM mint.
- `SOLSCAN`, `DEXSCREENER`, `BUY ON JUPITER`, `BUY ON RAYDIUM` and the social links are all
  `href="#"` stubs.
- Footer reads `© 2024 … BUILD 1.0`.
- `scripts/*.sh` call a `z-ai image` CLI that is not part of this repo.
- `.env` holds a local SQLite path only and is intentionally git-ignored.

## Disclaimer

$CDM is a meme coin with no intrinsic value, no roadmap, no team and no expectation of profit.
Nothing here is financial advice.
