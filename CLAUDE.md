# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The GitHub Pages site for `justkeepgoing-dev` (repo: `justkeepgoing-dev.github.io`), publishing privacy policies and download pages for the developer's Flutter apps. Despite the parent directory name (`flutter-dev/`), **there is no Flutter code here** — it is hand-written static HTML/CSS.

There is no build system, no package manager, no dependencies, and no tests. `.nojekyll` disables Jekyll processing, so files are served exactly as committed. **Deploy = push to `main`**; the live site updates directly from the repository root.

## Local preview

Serve from the repo root rather than opening files directly — the root [index.html](index.html) links to `/privacy` and `/downloads` with absolute paths, which break under `file://`:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Architecture

Three independent areas, each a self-contained mini-site:

**Root** — [index.html](index.html) is a standalone landing page with all CSS inlined in a `<style>` block. It shares no stylesheet with anything else.

**`/privacy`** — [privacy/index.html](privacy/index.html) is a hub of `.card` articles, one per app, each linking to that app's Korean and English policies. Each policy lives at `privacy/<app>/<ko|en>/index.html` and links `../../styles.css`. Policies are built from stacked `<section class="card">` blocks (numbered headings) and cross-link to their translation via a `.lang-btn` in `.hero-header` (`../en/` ↔ `../ko/`).

**`/downloads`** — [downloads/index.html](downloads/index.html) is a hub of `.app-list-item` links, one per app. Each app page at `downloads/<app>/index.html` links `../styles.css?v=2` and contains an `icon.png`, a `.download-actions` block of store-badge links, and a `.screenshots-container` of numbered screenshots (`1.png`, `2.png`, …). Badge images (`app-store-badge.svg`, `google-play-badge.png`) are shared from `downloads/`.

[privacy/styles.css](privacy/styles.css) and [downloads/styles.css](downloads/styles.css) are **separate files that duplicate the same design tokens** (`--bg`, `--card`, `--accent1: #00eaff`, `--accent2`, plus a `prefers-color-scheme: light` override). A token change must be applied to both; neither imports the other.

## Conventions

- **Content is Korean-first.** Pages are `<html lang="ko">` except the English privacy policies. Only privacy policies are bilingual; download pages are Korean only.
- **`?v=` cache-busting:** download pages request `../styles.css?v=2`. Bump the number in *every* referencing page when editing [downloads/styles.css](downloads/styles.css), or returning visitors keep the stale sheet.
- **Image `onerror` fallbacks:** icons and screenshots carry an inline `onerror` handler that swaps in a data-URI SVG placeholder. Preserve it when copying markup — it is what keeps a missing asset from rendering as a broken image.
- **Store links** point at App Store / Play Store with percent-encoded Korean app names; contact throughout is `justkeepgoing.dev@gmail.com`.
- Adding an app means copying an existing sibling directory and editing it — there is no template engine or shared partial. Register the new page in the relevant hub (`privacy/index.html` and/or `downloads/index.html`) by hand; nothing is auto-discovered.

## Two things that will surprise you

**`downloads/gotoday/` is not an app download page.** It is a product planning document (`오늘 어디갈까?` 기획서) with its own [styles.css](downloads/gotoday/styles.css) and [script.js](downloads/gotoday/script.js) (a localStorage-backed checklist, key `gotoday-plan-checklist`). It shares none of the downloads styling or structure, has no `icon.png` — so the hub's onerror placeholder shows in its list row — yet it is still listed in the downloads hub as if it were a shipped app.

**`privacy/kidsforest/` is gitignored** (see [.gitignore](.gitignore)) — the files exist on disk but are untracked, and the app's card is commented out in [privacy/index.html](privacy/index.html). This app was deliberately pulled from the site. Do not commit that directory or uncomment the card unless explicitly asked.

## AdMob

[app-ads.txt](app-ads.txt) at the root authorizes AdMob publisher `pub-5631367140456713`. It must remain served from the domain root to stay valid.
