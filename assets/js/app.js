/* ---------------------------------------------------------------
 * React & Modern JS — SPA with hash routing
 * Routes:
 *   #/                        — home
 *   #/chapter/:id             — chapter overview
 *   #/example/:chapter/:slug  — example viewer (code + preview)
 * --------------------------------------------------------------- */

(function () {
  const CHAPTERS = window.CHAPTERS;
  const ALL_EXAMPLES = window.ALL_EXAMPLES;

  const app = document.getElementById("app");
  const navLinks = document.getElementById("nav-links");

  // ----- helpers ------------------------------------------------
  const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const child of children.flat()) {
      if (child == null || child === false) continue;
      el.append(child.nodeType ? child : document.createTextNode(String(child)));
    }
    return el;
  };

  const escapeHtml = (s = "") =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const ICONS = {
    js: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><path d="M4 4h16v16H4z"/><path d="M10 10v5a2 2 0 1 1-4 0"/><path d="M14 16a2 2 0 0 0 2 2h1a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h1a2 2 0 0 1 2 2"/></svg>`,
    atom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><circle cx="12" cy="12" r="1"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="13" y1="4" x2="11" y2="20"/></svg>`,
    sparkles: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 15.8 10.2 11.2 6 9.4l4.2-1.8L12 3z"/><path d="M5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9L5 17z"/><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    route: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/></svg>`,
    gauge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
    flask: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M9 3h6v6l5 9a2 2 0 0 1-1.79 2.95H5.79A2 2 0 0 1 4 18l5-9V3z"/><path d="M8 13h8"/></svg>`,
    typescript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M2 12c0-4.71 0-7.07 1.46-8.54C4.93 2 7.29 2 12 2s7.07 0 8.54 1.46C22 4.93 22 7.29 22 12s0 7.07-1.46 8.54C19.07 22 16.71 22 12 22s-7.07 0-8.54-1.46C2 19.07 2 16.71 2 12zm7.8-.5H7.3v1.4h1.5V18h1.5v-5.1h1.5v-1.4zm3.96 5.74c.47.21 1.02.31 1.66.31 1.49 0 2.58-.83 2.58-2.16 0-1.08-.66-1.6-1.79-2.03l-.34-.13c-.56-.2-.82-.39-.82-.78 0-.33.25-.58.62-.58.35 0 .6.14.82.58l1.15-.74c-.38-.78-1.1-1.09-1.97-1.09-1.25 0-2.06.8-2.06 1.86 0 1.05.6 1.55 1.65 1.96l.37.14c.6.24.96.39.96.81 0 .39-.36.67-.92.67-.66 0-1.04-.34-1.32-.82l-1.17.68c.34.73 1.03 1.33 1.86 1.33z"/></svg>`,
  };

  // ----- difficulty / time badge helper ------------------------
  const DIFF_COLOR = {
    beginner:     { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", darkBg: "dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-900" },
    intermediate: { bg: "bg-amber-100 text-amber-700 border-amber-200",       dot: "bg-amber-500",   darkBg: "dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900" },
    advanced:     { bg: "bg-rose-100 text-rose-700 border-rose-200",          dot: "bg-rose-500",    darkBg: "dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-900" },
  };
  function diffBadge(level) {
    const c = DIFF_COLOR[level] || DIFF_COLOR.intermediate;
    return h("span", { class: `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${c.bg} ${c.darkBg}` },
      h("span", { class: `inline-block h-1.5 w-1.5 rounded-full ${c.dot}` }),
      level);
  }
  function timeBadge(minutes) {
    return h("span", { class: "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300" },
      h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` }),
      `${minutes} min`);
  }
  function renderBadges(ex) {
    return h("div", { class: "flex flex-wrap items-center gap-1.5" },
      diffBadge(ex.difficulty),
      timeBadge(ex.minutes),
    );
  }

  // ----- theme toggle ------------------------------------------
  const THEME_KEY = "rjs-theme";
  const setTheme = (t) => {
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  };
  (() => {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch {}
    if (saved) setTheme(saved);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    document.getElementById("theme-toggle").addEventListener("click", () => {
      setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
    });
  })();

  // ----- top nav -----------------------------------------------
  // Short labels so the nav fits at 7+ chapters without wrapping.
  // Split on em-dash OR opening paren, then trim.
  function shortNavLabel(title) {
    return title.split(/[—(]/)[0].trim();
  }

  function renderNav() {
    navLinks.innerHTML = "";
    for (const c of CHAPTERS) {
      const a = h("a", {
        href: `#/chapter/${c.id}`,
        class: `nav-link ${location.hash.startsWith(`#/chapter/${c.id}`) || location.hash.includes(`#/example/${c.id}/`) ? "active" : ""}`,
        title: c.title,
      }, `${c.number}. ${shortNavLabel(c.title)}`);
      navLinks.append(a);
    }
  }

  // ----- router ------------------------------------------------
  // Only `#/...` hashes are SPA routes. Any other hash (e.g. `#chapters`) is
  // treated as an in-page anchor — we render home and scroll to the element.
  function parseRoute() {
    const hash = location.hash || "";
    if (!hash.startsWith("#/")) return { name: "home", anchor: hash ? hash.slice(1) : null };
    const clean = hash.replace(/^#\//, "");
    const parts = clean.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "chapter" && parts[1]) return { name: "chapter", chapterId: parts[1] };
    if (parts[0] === "example" && parts[1] && parts[2]) return { name: "example", chapterId: parts[1], slug: parts[2] };
    return { name: "not-found" };
  }

  function render() {
    const route = parseRoute();
    app.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "instant" });
    renderNav();
    if (route.name === "home") {
      renderHome();
      // Scroll to an in-page anchor if one was given (e.g. #chapters)
      if (route.anchor) {
        const el = document.getElementById(route.anchor);
        if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
      return;
    }
    if (route.name === "chapter") return renderChapter(route.chapterId);
    if (route.name === "example") return renderExample(route.chapterId, route.slug);
    return renderNotFound();
  }

  window.addEventListener("hashchange", render);

  // ----- HOME ---------------------------------------------------
  function renderHome() {
    // Hero
    const hero = h("section", { class: "hero-gradient -mx-4 px-4 pb-16 pt-12 sm:pt-20" },
      h("div", { class: "mx-auto max-w-4xl text-center" },
        h("span", { class: "inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-brand-300" },
          h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.39 4.85L20 8l-4 3.9.95 5.54L12 15l-5 2.43L8 11.9 4 8l5.6-1.15L12 2z"/></svg>` }),
          "Hands-on, no build step required",
        ),
        h("h1", { class: "mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white" },
          "React & Modern JavaScript",
          h("br"),
          h("span", { class: "bg-gradient-to-r from-brand-500 via-sky-500 to-violet-500 bg-clip-text text-transparent" }, "by example."),
        ),
        h("p", { class: "mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300" },
          `A progressive, example-driven course. Every lesson is a single runnable page — open the source, tweak it, re-run it. From ES6 fundamentals to hooks and data fetching, in ${CHAPTERS.length} short chapters.`
        ),
        h("div", { class: "mt-8 flex flex-wrap items-center justify-center gap-3" },
          h("a", { href: "#/chapter/js-es6", class: "inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700" },
            "Start with Chapter 1",
            h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>` }),
          ),
          h("a", { href: "#chapters", class: "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" },
            "Browse chapters"
          ),
        ),
        // Stats
        h("div", { class: "mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4 text-left sm:gap-6" },
          ...[
            [`${CHAPTERS.length}`, "Chapters"],
            [`${ALL_EXAMPLES.length}`, "Hands-on examples"],
            ["0", "Build steps"],
          ].map(([n, l]) =>
            h("div", { class: "rounded-xl border border-slate-200 bg-white/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900/50" },
              h("div", { class: "text-2xl font-bold text-slate-900 dark:text-white" }, n),
              h("div", { class: "text-xs text-slate-500 dark:text-slate-400" }, l),
            )
          )
        )
      )
    );
    app.append(hero);

    // Chapters
    const chapters = h("section", { id: "chapters", class: "mt-10" },
      h("h2", { class: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white" }, "Course outline"),
      h("p", { class: "mt-2 max-w-2xl text-slate-600 dark:text-slate-300" },
        "Follow the chapters in order if you're new to React. Each chapter builds on the previous one, and every example is completely self-contained."),
      h("div", { class: "mt-8 grid gap-5 sm:grid-cols-2" },
        ...CHAPTERS.map((c) =>
          h("a", { href: `#/chapter/${c.id}`, class: "card group p-6" },
            h("div", { class: "flex items-start gap-4" },
              h("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400", html: ICONS[c.icon] || ICONS.code }),
              h("div", { class: "min-w-0" },
                h("div", { class: "flex items-center gap-2" },
                  h("span", { class: "chapter-badge" }, `Chapter ${c.number}`),
                  h("span", { class: "text-xs text-slate-500 dark:text-slate-400" }, `${c.examples.length} examples`),
                ),
                h("h3", { class: "mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400" }, c.title),
                h("p", { class: "mt-1 text-sm italic text-slate-500 dark:text-slate-400" }, c.tagline),
                h("p", { class: "mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300" }, c.description),
                h("div", { class: "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2 dark:text-brand-400" },
                  "Open chapter",
                  h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>` }),
                ),
              )
            )
          )
        )
      )
    );
    app.append(chapters);

    // How it works
    const how = h("section", { class: "mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50" },
      h("h2", { class: "text-xl font-bold text-slate-900 dark:text-white" }, "How this course works"),
      h("div", { class: "mt-4 grid gap-6 sm:grid-cols-3" },
        ...[
          ["Read", "Each example comes with a one-paragraph intro and the concepts it covers."],
          ["Run", "The live preview runs the exact HTML file — no build, no bundler, no surprises."],
          ["Tweak", "Open the file on GitHub, change it, and refresh. That's the whole loop."],
        ].map(([t, d], i) =>
          h("div", { class: "flex gap-3" },
            h("div", { class: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white" }, String(i + 1)),
            h("div", {},
              h("h3", { class: "font-semibold text-slate-900 dark:text-white" }, t),
              h("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-300" }, d),
            )
          )
        )
      )
    );
    app.append(how);
  }

  // ----- CHAPTER -----------------------------------------------
  function renderChapter(id) {
    const chapter = CHAPTERS.find((c) => c.id === id);
    if (!chapter) return renderNotFound();

    // Breadcrumb
    app.append(h("nav", { class: "flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" },
      h("a", { href: "#/", class: "hover:text-brand-600 dark:hover:text-brand-400" }, "Home"),
      h("span", {}, "/"),
      h("span", { class: "text-slate-700 dark:text-slate-200" }, `Chapter ${chapter.number}`),
    ));

    // Header
    app.append(
      h("header", { class: "mt-4" },
        h("div", { class: "flex items-start gap-4" },
          h("div", { class: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400", html: ICONS[chapter.icon] || ICONS.code }),
          h("div", {},
            h("span", { class: "chapter-badge" }, `Chapter ${chapter.number}`),
            h("h1", { class: "mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white" }, chapter.title),
            h("p", { class: "mt-2 text-lg italic text-slate-500 dark:text-slate-400" }, chapter.tagline),
          )
        ),
        h("p", { class: "mt-6 max-w-3xl text-slate-600 dark:text-slate-300" }, chapter.description),
      )
    );

    // Examples (with chapter-local difficulty filter) ----------------------
    const examplesFromManifest = ALL_EXAMPLES.filter((e) => e.chapterId === chapter.id);

    const counts = examplesFromManifest.reduce((a, e) => (a[e.difficulty] = (a[e.difficulty] || 0) + 1, a), {});
    let activeFilter = "all";

    const listWrap = h("ol", { class: "space-y-3" });
    const countsLabel = h("h2", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, `${examplesFromManifest.length} examples`);

    function renderExampleList() {
      listWrap.innerHTML = "";
      const filtered = activeFilter === "all"
        ? examplesFromManifest
        : examplesFromManifest.filter((e) => e.difficulty === activeFilter);

      countsLabel.textContent = `${filtered.length} of ${examplesFromManifest.length} example${examplesFromManifest.length === 1 ? "" : "s"}`;

      if (filtered.length === 0) {
        listWrap.append(h("li", { class: "rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400" },
          `No "${activeFilter}" examples in this chapter.`));
        return;
      }

      filtered.forEach((ex, idx) => {
        listWrap.append(h("li", {},
          h("a", {
            href: `#/example/${chapter.id}/${ex.slug}`,
            class: "card flex items-start gap-4 p-4 sm:p-5",
          },
            h("div", { class: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
              String(idx + 1).padStart(2, "0"),
            ),
            h("div", { class: "min-w-0 flex-1" },
              h("div", { class: "flex flex-wrap items-start justify-between gap-2" },
                h("h3", { class: "font-semibold text-slate-900 dark:text-white" }, ex.title),
                renderBadges(ex),
              ),
              h("p", { class: "mt-1 text-sm text-slate-600 dark:text-slate-300" }, ex.description),
              ex.concepts && ex.concepts.length
                ? h("div", { class: "mt-2 flex flex-wrap gap-1.5" }, ...ex.concepts.map((c) => h("span", { class: "concept-tag" }, c)))
                : null,
            ),
            h("div", { class: "shrink-0 self-center text-slate-400", html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>` }),
          )
        ));
      });
    }

    // Filter bar
    const filterChip = (level, label) => {
      const active = activeFilter === level;
      return h("button", {
        class: `filter-chip ${active ? "active" : ""}`,
        onclick: () => {
          activeFilter = level;
          [...filterBar.querySelectorAll("button")].forEach((b) => b.classList.remove("active"));
          filterChipEls[level].classList.add("active");
          renderExampleList();
        },
      }, label);
    };

    const filterChipEls = {
      all:          h("button", { class: "filter-chip active", onclick: null }, `All · ${examplesFromManifest.length}`),
      beginner:     h("button", { class: "filter-chip", onclick: null }, `Beginner · ${counts.beginner || 0}`),
      intermediate: h("button", { class: "filter-chip", onclick: null }, `Intermediate · ${counts.intermediate || 0}`),
      advanced:     h("button", { class: "filter-chip", onclick: null }, `Advanced · ${counts.advanced || 0}`),
    };
    for (const [level, el] of Object.entries(filterChipEls)) {
      el.addEventListener("click", () => {
        activeFilter = level;
        Object.values(filterChipEls).forEach((b) => b.classList.remove("active"));
        el.classList.add("active");
        renderExampleList();
      });
    }

    const filterBar = h("div", { class: "flex flex-wrap items-center gap-1.5" },
      ...Object.values(filterChipEls));

    app.append(
      h("div", { class: "mt-10" },
        h("div", { class: "mb-4 flex flex-wrap items-baseline justify-between gap-3" },
          countsLabel,
          filterBar,
        ),
        listWrap,
      )
    );
    renderExampleList();

    // Chapter nav
    const idx = CHAPTERS.indexOf(chapter);
    const prev = CHAPTERS[idx - 1];
    const next = CHAPTERS[idx + 1];
    app.append(
      h("div", { class: "mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800" },
        prev
          ? h("a", { href: `#/chapter/${prev.id}`, class: "group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400" },
              h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>` }),
              `Chapter ${prev.number} · ${prev.title.split("—")[0].trim()}`)
          : h("span", {}),
        next
          ? h("a", { href: `#/chapter/${next.id}`, class: "group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400" },
              `Chapter ${next.number} · ${next.title.split("—")[0].trim()}`,
              h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>` }))
          : h("span", {}),
      )
    );
  }

  // ----- EXAMPLE VIEWER ----------------------------------------
  async function renderExample(chapterId, slug) {
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    const flatIdx = ALL_EXAMPLES.findIndex((e) => e.chapterId === chapterId && e.slug === slug);
    const ex = flatIdx >= 0 ? ALL_EXAMPLES[flatIdx] : null;
    if (!chapter || !ex) return renderNotFound();

    const path = `examples/${chapter.id}/${ex.file}`;
    const prev = flatIdx > 0 ? ALL_EXAMPLES[flatIdx - 1] : null;
    const next = flatIdx < ALL_EXAMPLES.length - 1 ? ALL_EXAMPLES[flatIdx + 1] : null;

    // Breadcrumb
    app.append(
      h("nav", { class: "flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400" },
        h("a", { href: "#/", class: "hover:text-brand-600 dark:hover:text-brand-400" }, "Home"),
        h("span", {}, "/"),
        h("a", { href: `#/chapter/${chapter.id}`, class: "hover:text-brand-600 dark:hover:text-brand-400" }, `Chapter ${chapter.number}: ${chapter.title.split("—")[0].trim()}`),
        h("span", {}, "/"),
        h("span", { class: "text-slate-700 dark:text-slate-200" }, ex.title),
      )
    );

    // Header
    app.append(
      h("header", { class: "mt-4" },
        h("h1", { class: "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white" }, ex.title),
        h("div", { class: "mt-3" }, renderBadges(ex)),
        h("p", { class: "mt-3 max-w-3xl text-slate-600 dark:text-slate-300" }, ex.description),
        ex.concepts && ex.concepts.length
          ? h("div", { class: "mt-3 flex flex-wrap gap-1.5" }, ...ex.concepts.map((c) => h("span", { class: "concept-tag" }, c)))
          : null,
      )
    );

    // Viewer grid: code / preview
    const codePre = h("pre", { class: "language-markup !rounded-none !m-0 h-full overflow-auto" },
      h("code", { class: "language-markup" }, "Loading source…")
    );

    const codePanel = h("section", { class: "overflow-hidden rounded-xl border border-slate-200 bg-slate-900 dark:border-slate-800" },
      h("div", { class: "flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-400" },
        h("div", { class: "flex items-center gap-2" },
          h("span", { class: "inline-block h-2.5 w-2.5 rounded-full bg-red-500/60" }),
          h("span", { class: "inline-block h-2.5 w-2.5 rounded-full bg-yellow-500/60" }),
          h("span", { class: "inline-block h-2.5 w-2.5 rounded-full bg-green-500/60" }),
          h("span", { class: "ml-3 font-mono text-slate-400" }, ex.file),
        ),
        h("button", {
          class: "rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800",
          onclick: async (e) => {
            try {
              const res = await fetch(path);
              const txt = await res.text();
              await navigator.clipboard.writeText(txt);
              e.currentTarget.textContent = "Copied!";
              setTimeout(() => (e.currentTarget.textContent = "Copy"), 1200);
            } catch {
              e.currentTarget.textContent = "Copy failed";
              setTimeout(() => (e.currentTarget.textContent = "Copy"), 1200);
            }
          },
        }, "Copy"),
      ),
      h("div", { class: "max-h-[620px] overflow-auto" }, codePre),
    );

    const iframe = h("iframe", {
      class: "preview-frame",
      src: path,
      title: `Preview of ${ex.title}`,
      sandbox: "allow-scripts allow-same-origin",
    });

    const previewPanel = h("section", { class: "flex flex-col rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" },
      h("div", { class: "flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400" },
        h("span", {}, "Live preview"),
        h("div", { class: "flex items-center gap-2" },
          h("button", {
            class: "rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
            onclick: () => { iframe.src = iframe.src; },
          }, "Reload"),
          h("a", {
            href: path,
            target: "_blank",
            rel: "noopener",
            class: "inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
          },
            "Open in new tab",
            h("span", { html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>` }),
          ),
        ),
      ),
      iframe,
    );

    app.append(h("div", { class: "viewer-grid mt-6" }, codePanel, previewPanel));

    // Fetch source code and highlight
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const txt = await res.text();
      codePre.querySelector("code").textContent = txt;
      if (window.Prism) Prism.highlightElement(codePre.querySelector("code"));
    } catch (err) {
      codePre.querySelector("code").textContent = `// Could not load source (${err.message}).\n// Try opening the preview in a new tab.`;
    }

    // Prev / next
    app.append(
      h("div", { class: "mt-10 grid gap-4 sm:grid-cols-2" },
        prev
          ? h("a", { href: `#/example/${prev.chapterId}/${prev.slug}`, class: "group card p-4" },
              h("div", { class: "text-xs text-slate-500 dark:text-slate-400" }, "← Previous"),
              h("div", { class: "mt-1 font-medium text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400" }, prev.title),
              h("div", { class: "mt-1 text-xs text-slate-500 dark:text-slate-400" }, `Chapter ${prev.chapterNumber}`))
          : h("div", {}),
        next
          ? h("a", { href: `#/example/${next.chapterId}/${next.slug}`, class: "group card p-4 text-right" },
              h("div", { class: "text-xs text-slate-500 dark:text-slate-400" }, "Next →"),
              h("div", { class: "mt-1 font-medium text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400" }, next.title),
              h("div", { class: "mt-1 text-xs text-slate-500 dark:text-slate-400" }, `Chapter ${next.chapterNumber}`))
          : h("div", {}),
      )
    );
  }

  // ----- NOT FOUND ----------------------------------------------
  function renderNotFound() {
    app.append(
      h("div", { class: "flex flex-col items-center py-20 text-center" },
        h("div", { class: "text-6xl font-bold text-slate-200 dark:text-slate-800" }, "404"),
        h("p", { class: "mt-4 text-slate-600 dark:text-slate-300" }, "This page doesn't exist."),
        h("a", { href: "#/", class: "mt-6 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700" }, "Back home"),
      )
    );
  }

  // ----- COMMAND PALETTE (Cmd+K / Ctrl+K) ----------------------
  function setupPalette() {
    const overlay = h("div", { class: "palette-overlay", role: "dialog", "aria-label": "Search examples" });
    const input   = h("input", {
      type: "search",
      class: "palette-input",
      placeholder: `Search ${ALL_EXAMPLES.length} examples…  (Esc to close)`,
      autocomplete: "off",
      spellcheck: "false",
    });
    const results = h("ul", { class: "palette-results", role: "listbox" });
    const footer  = h("div", { class: "palette-footer" },
      h("span", {}, h("kbd", {}, "↑"), h("kbd", {}, "↓"), " navigate · ", h("kbd", {}, "↵"), " open · ", h("kbd", {}, "Esc"), " close"),
      h("span", {}, `${ALL_EXAMPLES.length} examples`),
    );
    const panel   = h("div", { class: "palette-panel" },
      h("div", { class: "palette-input-wrap" },
        h("span", { class: "palette-search-icon", html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>` }),
        input,
      ),
      results,
      footer,
    );
    overlay.append(panel);
    document.body.append(overlay);

    let selectedIndex = 0;
    let currentMatches = [];

    function score(ex, terms) {
      let s = 0;
      const hay = (ex.title + " " + ex.description + " " + (ex.concepts || []).join(" ") + " " + ex.chapterTitle).toLowerCase();
      for (const t of terms) {
        if (!t) continue;
        if (hay.includes(t)) s += 1;
        if (ex.title.toLowerCase().includes(t)) s += 3;
        if ((ex.concepts || []).some((c) => c.toLowerCase().includes(t))) s += 2;
      }
      return s;
    }

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      const list = terms.length === 0
        ? ALL_EXAMPLES.slice(0, 14)
        : ALL_EXAMPLES.map((ex) => ({ ex, s: score(ex, terms) }))
            .filter((x) => x.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 20)
            .map((x) => x.ex);

      currentMatches = list;
      if (selectedIndex >= list.length) selectedIndex = 0;

      results.innerHTML = "";
      if (list.length === 0) {
        results.append(h("li", { class: "palette-empty" },
          `No matches for "${query}". Try a concept like "useReducer" or "fetch".`));
        return;
      }
      list.forEach((ex, i) => {
        const li = h("li", {
          class: "palette-item" + (i === selectedIndex ? " active" : ""),
          role: "option",
          "data-index": String(i),
          onclick: () => goTo(ex),
          onmouseenter: () => {
            selectedIndex = i;
            [...results.querySelectorAll(".palette-item")].forEach((n, k) => n.classList.toggle("active", k === i));
          },
        },
          h("div", { class: "palette-item-main" },
            h("div", { class: "palette-item-title" }, ex.title),
            h("div", { class: "palette-item-meta" },
              h("span", { class: "palette-chapter" }, `Ch. ${ex.chapterNumber} · ${ex.chapterTitle.split("—")[0].trim()}`),
              h("span", { class: "palette-dot" }, "·"),
              diffBadge(ex.difficulty),
              timeBadge(ex.minutes),
            ),
          ),
          h("span", { class: "palette-item-hint" }, "↵"),
        );
        results.append(li);
      });
    }

    function goTo(ex) {
      close();
      location.hash = `#/example/${ex.chapterId}/${ex.slug}`;
    }

    function open() {
      overlay.classList.add("open");
      input.value = "";
      selectedIndex = 0;
      renderResults("");
      setTimeout(() => input.focus(), 10);
    }
    function close() {
      overlay.classList.remove("open");
    }

    // Events
    input.addEventListener("input", () => { selectedIndex = 0; renderResults(input.value); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = Math.min(currentMatches.length - 1, selectedIndex + 1);
        renderResults(input.value);
        const el = results.querySelector(".palette-item.active");
        if (el) el.scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = Math.max(0, selectedIndex - 1);
        renderResults(input.value);
        const el = results.querySelector(".palette-item.active");
        if (el) el.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentMatches[selectedIndex]) goTo(currentMatches[selectedIndex]);
      } else if (e.key === "Escape") {
        close();
      }
    });
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        overlay.classList.contains("open") ? close() : open();
      } else if (e.key === "/" && !overlay.classList.contains("open") && !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        open();
      }
    });

    // Expose a trigger so the nav can include a "Search ⌘K" button.
    window.__openPalette = open;
  }
  setupPalette();

  // ----- boot --------------------------------------------------
  render();
})();
