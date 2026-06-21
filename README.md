# TRBK Docs

Internal knowledge base / SOP for a real‑estate flipping company. Single‑page app,
**vanilla JS, no build step, no dependencies**. Content is data‑driven: navigation,
search and routing are generated from one content file, so adding an article or a
whole role requires no changes to the app code.

First role: **Koordynator Remontów** (Renovation Coordinator). Architecture supports
additional roles (a **Pośrednik nieruchomości** role is stubbed as "coming soon").
UI is Polish; the app/codebase is language‑agnostic.

## Features

- Hash‑based router — every article has its own URL (`#/<role>/<article>`)
- Instant full‑text search (`⌘K` / `Ctrl K`), diacritics‑insensitive
- Sidebar nav with collapsible role/groups; mobile drawer
- Light/dark theme (graphite), persisted
- Rich content blocks: callouts, steps, tabs, accordions, checklists (persisted),
  tables, cards, media, files, links
- Auto table‑of‑contents with scroll‑spy, prev/next, print‑to‑PDF
- A11y: landmarks, ARIA, keyboard nav, visible focus, reduced‑motion
- Works offline from `file://` — no server required

## Stack

Plain HTML/CSS/JS. No framework, no bundler, no network calls. System font stack.
Browser `localStorage` is used for theme and checklist state (optional, guarded).

## Project structure

```
index.html              # mount point + <noscript>; loads the two scripts
assets/
  css/styles.css        # design system + components (light/dark)
  js/content.js         # CONTENT — the only file you edit day to day
  js/app.js             # engine: router, block renderer, search, theme
TRBK-Baza-Wiedzy.html   # optional single‑file build (everything inlined)
.nojekyll               # disable Jekyll on GitHub Pages
```

## Run locally

Open `index.html` in a browser (double‑click). No build, no server.
Optional static server: `python3 -m http.server` then visit `http://localhost:8000`.

## Content model

`assets/js/content.js` exports `window.KB_CONTENT`:

```
roles[] → groups[] → items[] (articles) → blocks[]
```

Add an article — define it and add it to a group's `items`:

```js
A.myArticle = {
  id: "my-article",                 // URL slug (kebab-case)
  title: "Title",
  summary: "Shown under the title and in search.",
  tags: ["tag"],
  blocks: [
    { t: "lead", html: "Intro paragraph." },
    { t: "h", text: "Section" },                  // becomes a ToC entry
    { t: "p", html: "Text with <a class='inline' href='#/koordynator-remontow/faq'>link</a>." }
  ]
};
// then:
{ label: "Zasoby i referencje", items: [A.dostawcy, A.narzedzia, A.faq, A.checklisty, A.myArticle] }
```

Add a role — push a role object onto `roles`. A role with `soon: true` renders as
"coming soon"; otherwise give it `groups`. Cross‑link articles with
`href="#/<role>/<article>"`.

### Block types (`t`)

`lead`, `p`, `h` (`lvl:2|3`), `ul`, `ol`, `kv` (`{k,v}`), `check` (`title,id,items`),
`steps` (`{title,html}`), `note` (`variant: info|tip|warn|danger|success`),
`table` (`head,rows`), `accordion` (`{q,html}` or `blocks`), `tabs` (`{label,blocks}`),
`cards` (`{icon,title,tag,html}`), `img` (`src,alt,caption`), `video` (`embed`),
`files` (`{name,type,href,note}`), `links` (`{label,href,note,external}`),
`quote` (`html,cite`), `divider`.

Media without `src`/`embed`/`href` renders a labeled placeholder. Drop real assets
in e.g. `media/` next to `index.html` and reference them with relative paths.

## Deploy to GitHub Pages

Hash routing + relative paths work unchanged under a project subpath
(`https://<user>.github.io/<repo>/`).

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/trbk-docs.git
git push -u origin main
```

Then: **Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save**.
With `gh` CLI: `gh repo create trbk-docs --public --source=. --push`.

> The repo ships **without git history** so the first commit is yours.

## Notes

- `index.html` sets `<meta name="robots" content="noindex,nofollow">`. Public repos
  and Pages are still world‑readable by URL — use a private repo + paid Pages or an
  access‑gated host if the content must stay private.
- To regenerate the single‑file build after editing sources, inline `styles.css`,
  `content.js` and `app.js` into `index.html`.
```
