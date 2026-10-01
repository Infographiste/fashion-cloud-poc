# Fashion Cloud — Wholesale Portal  (POC)

A static, click-through prototype of a future Fashion Cloud platform, built for the
Hugo Boss pitch. Everything is mock data; the focus is on a consistent experience
built from a small, reusable design system.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Build a static bundle:

```bash
npm run build    # outputs to /dist
npm run preview  # serves the built bundle
```

## Deploy to GitHub Pages (2 steps)

1. Push this folder to a GitHub repo (default branch `main`).
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions.**

The included workflow (`.github/workflows/deploy.yml`) builds on every push to
`main` and publishes to `https://<you>.github.io/<repo>/`. Routing uses a hash
(`/#/reorder`) so deep links and refreshes work on Pages with no extra config.

## Swapping in Hugo Boss imagery

All images route through one file: **`src/data/images.js`**.

1. Drop image files into **`public/img/`**.
2. Point the slots at them, e.g. `products: [`${B}img/hb-blazer.jpg`, ...]`.

Anything left `null` renders a neutral monogram placeholder, so the layout always
holds together. The home hero already uses the supplied banner
(`public/img/banner-home.png`).

## How it's structured

The whole prototype is composed from one shell and one card.

```
AppShell
 ├─ Sidebar            nav that reflects the prototype's pages
 └─ Content
     ├─ Top            Banner (+ back/title) · Tabs · Filters (incl. Display toggle)
     └─ Layout         page-specific grid / list / table of Cards
```

**The Card is the single content primitive.** Every task, article, store and
presentation is the same DOM — Checkbox? · Media · Content(Header · Info · Actions)
— just re-oriented (row, column, table row). See `src/components/ds/Card.jsx`.

```
src/
  styles/tokens.css        design tokens (colors) — single source of truth
  tailwind.config.js       maps tokens -> utilities (type scale, radii, shadows)
  components/
    primitives/            Button, Tag, Checkbox, Toggle, Img, Field controls
    ds/                    Card, Panel, Tabs, DisplayToggle, KpiCard
    layout/                AppShell, Sidebar, Top, FilterBar
  pages/                   Portal, Reorder, Showroom, Placeholder
  data/                    static mock data (nav, portal, reorder, showroom, images)
```

## Pages

| Route       | Screen                                                          |
| ----------- | -------------------------------------------------------------- |
| `/`         | **Portal** — hero, Tasks list, KPI rail                        |
| `/reorder`  | **Reorder** — Display toggle flips column cards <-> nested table|
| `/showroom` | **Showroom** — Display toggle flips presentation grid <-> list |
| others      | Graceful "coming next" placeholder using the same shell        |

The **Display** control in the filter bar switches each tool page between its grid
and list layouts. The **Tabs** switch the content type.

## Notes

- Type face is **Satoshi** (loaded from Fontshare), matching the design system.
- Colors, radii and the type scale derive from `tokens.css` / `tailwind.config.js`,
  so re-theming is a one-file change.
- Accessibility floor: keyboard focus rings, reduced-motion honored, semantic controls.
