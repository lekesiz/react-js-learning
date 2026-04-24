# React & Modern JS — by example

A hands-on, example-driven course covering modern JavaScript (ES6+) and React fundamentals. Every lesson is a single, self-contained HTML page you can open, read, tweak, and re-run — no build step, no bundler.

Built from the original [echristof67/react_js](https://github.com/echristof67/react_js) study repo, reorganised into a modern static learning site.

## Course structure

| Chapter | Topic | Examples |
| :-- | :-- | :-- |
| 1 | Modern JavaScript (ES6+) | let/var/const, arrows, classes, destructuring, modules… |
| 2 | React Basics — `React.createElement` | render, props, functional & class components |
| 3 | JSX | components, props, lists, composition |
| 4 | State | `useState`, class state, controlled inputs |
| 5 | Hooks & Data | `useEffect`, `useContext`, custom hooks, `fetch` |
| 6 | Router & Forms | React Router, controlled forms, validation, multi-step wizard |

## How it works

- Every example under `examples/**` is a **standalone HTML file** that runs in the browser via a React CDN + `babel-standalone` (no bundling required).
- `index.html` is a small SPA with hash-based routing — it reads `assets/js/data.js` to build the navigation and renders each example in an iframe next to its syntax-highlighted source.
- Styling is Tailwind CDN + Prism.js. Both load from public CDNs, so there is no install or build step.

## Running locally

Because the app uses `fetch()` to load example source code for display, you need a local static server — opening `index.html` directly via `file://` won't work. Any of these will do:

```bash
# Python 3
python3 -m http.server 8080

# Node (requires npx)
npx serve .

# VS Code
# install the "Live Server" extension and click "Go Live"
```

Then open http://localhost:8080.

## Deploying on GitHub Pages

1. Create a new repo on GitHub (e.g. `react-js-learning`).
2. From the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — React & Modern JS learning site"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, choose **Source: GitHub Actions**.
   - The included workflow (`.github/workflows/pages.yml`) will deploy the site on every push to `main`.
4. Your site will be available at `https://<your-username>.github.io/<your-repo>/`.

If you prefer the simpler branch-based Pages setup, select **Source: Deploy from a branch → main / (root)** — the site works fine as plain static files.

## Project layout

```
react-js-learning/
├── index.html                 # SPA shell (landing + routing)
├── assets/
│   ├── css/styles.css         # Custom styles on top of Tailwind CDN
│   └── js/
│       ├── data.js            # Chapter & example manifest
│       └── app.js             # Hash router, renderers
├── examples/
│   ├── js-es6/                # Chapter 1 — 13 examples
│   ├── react-basics/          # Chapter 2 — 19 examples
│   ├── react-jsx/             # Chapter 3 — 23 examples
│   ├── react-state/           # Chapter 4 — 15 examples
│   ├── hooks-data/            # Chapter 5 — 11 examples
│   └── router-forms/          # Chapter 6 — 10 examples
├── .github/workflows/pages.yml
├── .gitignore
├── LICENSE
└── README.md
```

## Adding a new example

1. Drop the standalone HTML file into the appropriate `examples/<chapter>/` folder.
2. Add an entry to the matching chapter array in `assets/js/data.js`:
   ```js
   {
     slug: "my-new-example",
     file: "myNewExample.html",
     title: "Short title",
     description: "One-sentence description of what the example demonstrates.",
     concepts: ["prop", "reuse"],
   }
   ```
3. Reload. That's it — the landing page, chapter page, and navigation all update from the manifest.

## Credits

- Course material adapted from [echristof67/react_js](https://github.com/echristof67/react_js).
- Interactive UI built with [Tailwind CSS Play CDN](https://tailwindcss.com/docs/installation/play-cdn) and [Prism.js](https://prismjs.com/).

## License

[MIT](./LICENSE)
