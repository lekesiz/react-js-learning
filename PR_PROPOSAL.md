# PR proposal — "React 2026 edition" for `echristof67/react_js`

> This document is a draft of the pull request description and coordination notes
> for proposing this work to the original teaching repo.

## TL;DR

I'd like to propose upstreaming the rework at [`lekesiz/react-js-learning`](https://github.com/lekesiz/react-js-learning)
back to `echristof67/react_js` — either as a PR to a new branch (e.g. `site/2026-edition`)
or linked from the README as "community-maintained 2026 edition". Nothing
in the original `JS_ES6/`, `ReactBasicsChapter2/`, `ReactJSXchapter3/`, and
`ReactStateChapter4/` folders is deleted or renamed — the site layers on top.

## What's new at a glance

| | original repo | 2026 edition |
| :-- | :-- | :-- |
| **Chapters** | 4 (ES6+, React basics, JSX, State) | **12** (adds Hooks & Data, Router & Forms, Data Patterns, Performance, Testing, TypeScript, Production, Animation & UX) |
| **Examples** | ~70 | **136** (70 preserved + 66 new) |
| **Build step** | none | none — still pure CDN + `babel-standalone`, works as static files |
| **Nav / discovery** | file listing on GitHub | landing page + per-chapter pages + per-example page with live preview |
| **Theme** | — | Light / dark, `prefers-color-scheme` + manual toggle |
| **Search** | — | Global command palette with fuzzy search (`⌘K` / `Ctrl+K` / `/`) |
| **Metadata** | — | Every example tagged with difficulty (beginner / intermediate / advanced) and rough time-to-read |
| **Progress tracking** | — | Optional "mark complete" with localStorage; per-chapter and overall % |
| **Deploy** | clone & open HTML | GitHub Pages via a minimal `Deploy to Pages` workflow |

The **original 70 examples are imported verbatim**, kept in their matching chapter folders (`js-es6/`, `react-basics/`, `react-jsx/`, `react-state/`). Filenames are preserved so deep-links stay stable.

## New chapters (66 examples)

Each chapter is a self-contained set of single-file HTML pages that work in isolation, exactly like the original four:

1. **Hooks & Data** (11) — `useEffect` (mount, deps, cleanup, events), `useContext` (theme, user), custom hooks (`useToggle`, `useWindowSize`, `useLocalStorage`), `fetch` with loading/error/data states, debounced search with `AbortController`.
2. **Router & Forms** (10) — DIY hash router → React Router v5 (routes, params, nested), controlled forms, submit / required / email regex / multi-step wizard.
3. **Data Patterns** (9) — `useReducer` (counter, todos, forms, async state machine), Context + Reducer store, split contexts, normalization (`byId` / `allIds`), selectors, a mini CRUD app.
4. **Performance** (8) — `React.memo`, `useMemo`, `useCallback`, `lazy` + `Suspense`, virtualization, `useDeferredValue`, `useTransition`, `React.Profiler`.
5. **Testing** (7) — in-browser Vitest/Jest-style harness per example (`render`, `fireEvent`, `waitFor`, mocked `fetch`, `renderHook`, best-practices cheat sheet).
6. **TypeScript** (7) — typed props, typed `useState` / `useReducer`, event handler types, discriminated unions, generic components, typed Context with safe custom hook. Uses `babel-standalone` TS preset so still no build step.
7. **Production** (7) — error boundaries, scoped boundaries with retry, exponential backoff + jitter, optimistic updates, Suspense for data, stale-while-revalidate, prefetch on hover.
8. **Animation & UX** (7) — CSS transitions, enter/exit animation, FLIP reorder, native drag & drop, accessible modal with focus trap, skeleton loaders, IntersectionObserver scroll reveals.

## Site infrastructure (~600 lines total)

- `index.html` — SPA shell, ~60 lines, single page with hash routing.
- `assets/js/data.js` — the manifest. One entry per example: `slug`, `file`, `title`, `description`, `concepts`, optional `difficulty`/`minutes` override. Chapters have `defaults`.
- `assets/js/app.js` — ~500 lines: router, home / chapter / viewer rendering, command palette, progress tracking (localStorage), theme toggle.
- `assets/css/styles.css` — custom styles on top of Tailwind CDN and Prism.js.
- `.github/workflows/pages.yml` — minimal Pages deploy on push to `main`.

Everything is vanilla JavaScript + the DOM; no React inside the shell itself, so the static site has zero hydration cost.

## Proposed paths forward

**Option A — New branch on the original repo.** Open a PR adding the site at the root of a new `site/` folder (or a `gh-pages` branch). Original repo owner can enable Pages when comfortable.

**Option B — Fork acknowledgement.** Leave the repo untouched; add a line to the README pointing to `lekesiz/react-js-learning` as a community 2026 edition. Zero maintenance burden on the original.

**Option C — Co-maintained.** Transfer `react-js-learning` to `echristof67/` as a sibling repo; keep separate so the teaching repo remains a clean starting point and the site is the "batteries-included" view.

Happy to adapt to whichever of these works best. Nothing downstream depends on a particular choice.

## Attribution & licensing

- Original 70 examples are attributed to **Eric Christoffel (`echristof67`)** in the README, with a link back to the source repo.
- The new code is MIT-licensed.
- No third-party assets are vendored — everything loads from public CDNs (unpkg, cdnjs, Google Fonts).

## Demo

- Live site: https://lekesiz.github.io/react-js-learning/
- Source: https://github.com/lekesiz/react-js-learning

## Coordination checklist

- [ ] Reach out to `@echristof67` via a low-key GitHub Issue titled something like "Proposal: community 2026 edition". Link this document.
- [ ] Offer a 15-minute call if easier than async.
- [ ] If Option A is chosen: open the PR against a new branch, not `main`, so it can be reviewed without pressure.
- [ ] If Option B or C: update this repo's README to match whichever wording is agreed.

---

*Drafted in April 2026 as part of an educational rewrite exercise.*
