// React & Modern JS — example manifest
// Each example: { slug, title, file, description, concepts }

window.CHAPTERS = [
  {
    id: "js-es6",
    number: 1,
    title: "Modern JavaScript (ES6+)",
    tagline: "The language features React is built on.",
    description:
      "Before touching React, master the modern JavaScript it relies on: block scoping, arrow functions, classes, template literals, destructuring, and modules. Each example is a tiny, runnable page that isolates one idea.",
    icon: "js",
    examples: [
      {
        slug: "let-vs-var-scope",
        file: "letVarScope.html",
        title: "let vs var — block scope vs function scope",
        description:
          "Loop over four buttons with both keywords and watch how `let` captures a fresh binding per iteration while `var` leaks into the surrounding scope.",
        concepts: ["let", "var", "block scope", "closures"],
      },
      {
        slug: "const-scope",
        file: "constantScope.html",
        title: "const — immutable bindings",
        description:
          "Why `const` prevents reassignment but not object mutation, and when to reach for it by default.",
        concepts: ["const", "immutability", "bindings"],
      },
      {
        slug: "template-literals",
        file: "templateLiterals.html",
        title: "Template literals",
        description:
          "Backtick strings with interpolation and multi-line support — the foundation for JSX-like ergonomics.",
        concepts: ["template literals", "string interpolation"],
      },
      {
        slug: "function-declaration-default-args",
        file: "functionDeclarationDefaultArguments.html",
        title: "Function declarations & default arguments",
        description:
          "Hoisting behaviour of declarations plus ES6 default parameter values.",
        concepts: ["function declaration", "default args", "hoisting"],
      },
      {
        slug: "function-expression",
        file: "functionExpression.html",
        title: "Function expressions",
        description:
          "Functions as values: naming, anonymity, and assignment to variables.",
        concepts: ["function expression", "first-class functions"],
      },
      {
        slug: "arrow-functions",
        file: "arrowFunction.html",
        title: "Arrow functions",
        description:
          "Concise syntax, implicit returns, and the single-parameter shorthand used all over React.",
        concepts: ["arrow functions", "implicit return"],
      },
      {
        slug: "this-in-func-vs-arrow",
        file: "thisBehaviorFuncExpressionArrow.html",
        title: "`this` — function expression vs arrow",
        description:
          "See how arrow functions inherit `this` lexically while traditional expressions bind it at call site.",
        concepts: ["this", "lexical scope", "binding"],
      },
      {
        slug: "destructuring-array",
        file: "structuringDestructuringArray.html",
        title: "Array destructuring",
        description:
          "Unpack array elements into variables, with skipping and defaults.",
        concepts: ["destructuring", "arrays", "defaults"],
      },
      {
        slug: "destructuring-object",
        file: "structuringDestructuringObject.html",
        title: "Object destructuring",
        description:
          "Pull fields out of objects by name — used every time you destructure props.",
        concepts: ["destructuring", "objects", "rename"],
      },
      {
        slug: "json-vs-object",
        file: "JSONvsObject.html",
        title: "JSON vs JavaScript objects",
        description:
          "The difference between a JS object literal and a JSON string, plus `JSON.parse` / `JSON.stringify`.",
        concepts: ["JSON", "objects", "serialisation"],
      },
      {
        slug: "class-basics",
        file: "class.html",
        title: "Classes — constructor & methods",
        description:
          "ES6 class syntax: fields, constructor, methods — the base for class components.",
        concepts: ["class", "constructor", "methods"],
      },
      {
        slug: "class-extends",
        file: "classExtends.html",
        title: "Class inheritance (`extends`, `super`)",
        description:
          "Subclassing with `extends`, calling the parent constructor with `super(...)` — the pattern React class components follow.",
        concepts: ["extends", "super", "inheritance"],
      },
      {
        slug: "es-modules",
        file: "module/index.html",
        title: "ES modules — `import` / `export`",
        description:
          "A three-file module demo showing named and default exports, and how a host page loads them via `<script type=\"module\">`.",
        concepts: ["modules", "import", "export"],
      },
    ],
  },

  {
    id: "react-basics",
    number: 2,
    title: "React Basics — `React.createElement`",
    tagline: "React without JSX. See what JSX actually compiles to.",
    description:
      "Start with the most explicit form of React. Every component here is written with `React.createElement(...)` — the call JSX ultimately produces. You'll see functional components, class components, props, and children laid bare.",
    icon: "atom",
    examples: [
      {
        slug: "react-17-cdn",
        file: "react17CDN.html",
        title: "React 17 via CDN",
        description:
          "The minimum page needed to render React 17 from a CDN — no build step, just a script tag.",
        concepts: ["CDN", "React 17", "setup"],
      },
      {
        slug: "react-18",
        file: "react18.html",
        title: "React 18 via CDN",
        description:
          "Same idea, upgraded: React 18's `createRoot` API instead of `ReactDOM.render`.",
        concepts: ["React 18", "createRoot", "setup"],
      },
      {
        slug: "root-element",
        file: "rootElement.html",
        title: "The root element",
        description:
          "The `<div id=\"root\">` React attaches to, and why every page needs one mount point.",
        concepts: ["root", "mount point"],
      },
      {
        slug: "create-element-render",
        file: "createElementRender.html",
        title: "Your first `React.createElement`",
        description:
          "Render a single element with `React.createElement(type, props, children)` — the primitive JSX compiles to.",
        concepts: ["createElement", "render"],
      },
      {
        slug: "create-element-className",
        file: "createElementRenderClassName.html",
        title: "Adding a `className`",
        description:
          "Pass a className prop (not `class`) through createElement.",
        concepts: ["className", "props"],
      },
      {
        slug: "create-element-className-react18",
        file: "createElementRenderClassNameReact18.html",
        title: "`className` with React 18",
        description:
          "Same pattern, rendered through `createRoot`.",
        concepts: ["className", "React 18"],
      },
      {
        slug: "create-element-inline-style",
        file: "createElementRenderInlineStyle.html",
        title: "Inline style prop",
        description:
          "Styles as a JS object — camelCased keys, string or numeric values.",
        concepts: ["style", "inline style"],
      },
      {
        slug: "create-element-id-style-className",
        file: "createElementRender_id_style_className.html",
        title: "Combining `id`, `style`, `className`",
        description:
          "Three common DOM props used together on a single element.",
        concepts: ["props", "styling"],
      },
      {
        slug: "create-element-global-attributes",
        file: "createElementRender_id_style_className_globalAttribute.html",
        title: "Global HTML attributes",
        description:
          "Extend the above with `title`, `lang`, and other HTML global attributes.",
        concepts: ["global attributes", "props"],
      },
      {
        slug: "create-element-with-props",
        file: "createElementRenderWithProps.html",
        title: "Passing and reading props",
        description:
          "Pass arbitrary props through createElement and read them inside a component.",
        concepts: ["props", "data flow"],
      },
      {
        slug: "functional-component",
        file: "createElementFunctionalComponant.html",
        title: "A functional component",
        description:
          "Wrap createElement calls into a reusable function that returns an element.",
        concepts: ["functional component", "reuse"],
      },
      {
        slug: "functional-component-props",
        file: "createElementFunctionalComponantProps.html",
        title: "Functional component with props",
        description:
          "Accept `props` as an argument and use it in the returned tree.",
        concepts: ["functional component", "props"],
      },
      {
        slug: "functional-component-destructuring",
        file: "createElementFunctionalComponantDestructuringProps.html",
        title: "Destructuring props",
        description:
          "Destructure `{ name, age }` directly in the parameter list — the ergonomic form.",
        concepts: ["destructuring", "props"],
      },
      {
        slug: "arrow-component-destructuring",
        file: "createElementArrowFctComponantDestructuringProps.html",
        title: "Arrow-function component with destructuring",
        description:
          "Same component written as an arrow function for a concise one-liner.",
        concepts: ["arrow function", "destructuring"],
      },
      {
        slug: "class-component",
        file: "createElementClassComponent.html",
        title: "A class component",
        description:
          "Define a component with `class X extends React.Component` and a `render()` method.",
        concepts: ["class component", "render()"],
      },
      {
        slug: "class-component-arrow-callback",
        file: "createElementClassComponentArrowFctCallback.html",
        title: "Class component with arrow-function callback",
        description:
          "Use an arrow-function class field to avoid manually binding `this` on event handlers.",
        concepts: ["class", "this", "binding"],
      },
      {
        slug: "child-elements-array",
        file: "childElementsArray.html",
        title: "Children as an array",
        description:
          "Pass multiple children to a createElement call as an array.",
        concepts: ["children", "arrays"],
      },
      {
        slug: "child-elements-array-map",
        file: "childElementsArrayMap.html",
        title: "Building children with `.map()`",
        description:
          "Turn a data array into an array of elements — and start thinking about keys.",
        concepts: ["map", "children", "keys"],
      },
      {
        slug: "child-elements-nested",
        file: "childElementsNested.html",
        title: "Nested children",
        description:
          "Build a deeper tree by nesting createElement calls.",
        concepts: ["nesting", "tree"],
      },
    ],
  },

  {
    id: "react-jsx",
    number: 3,
    title: "JSX — the Familiar Syntax",
    tagline: "The expressive form you'll actually write in.",
    description:
      "Now that you understand createElement, switch to JSX. These examples use Babel Standalone to transform JSX in the browser, so you can keep iterating without a build step while learning.",
    icon: "code",
    examples: [
      {
        slug: "jsx-vs-createelement",
        file: "babelJSXvsCreateElement.html",
        title: "JSX vs createElement — side by side",
        description:
          "The same tree written both ways, to make the transformation obvious.",
        concepts: ["JSX", "createElement", "compilation"],
      },
      {
        slug: "babel-jsx",
        file: "babelJSX.html",
        title: "Your first JSX element",
        description:
          "Return JSX from a component and render it through ReactDOM.",
        concepts: ["JSX", "babel-standalone"],
      },
      {
        slug: "component-func-declaration-1",
        file: "component_funcDeclaration1.html",
        title: "Function-declaration component (v1)",
        description:
          "Define a component with `function Hello(){ return <h1>...</h1> }`.",
        concepts: ["function declaration", "component"],
      },
      {
        slug: "component-func-declaration-2",
        file: "component_funcDeclaration2.html",
        title: "Function-declaration component (v2)",
        description:
          "Variation on the previous example with a different tree.",
        concepts: ["function declaration", "component"],
      },
      {
        slug: "component-func-expression-1",
        file: "component_funcExpression1.html",
        title: "Function-expression component (v1)",
        description:
          "Assign an anonymous function to a `const` and use it as a component.",
        concepts: ["function expression", "component"],
      },
      {
        slug: "component-func-expression-2",
        file: "component_funcExpression2.html",
        title: "Function-expression component (v2)",
        description:
          "Another function-expression component with more structure.",
        concepts: ["function expression", "component"],
      },
      {
        slug: "component-func-expression-destructuring",
        file: "component_funcExpression_destructuringProps.html",
        title: "Function expression + destructuring props",
        description:
          "Destructure props in the parameter list of a function-expression component.",
        concepts: ["destructuring", "props"],
      },
      {
        slug: "component-arrow-func",
        file: "component_arrowFunc.html",
        title: "Arrow-function component",
        description:
          "The most common modern form: `const Hello = () => <h1>...</h1>`.",
        concepts: ["arrow function", "component"],
      },
      {
        slug: "class-component-jsx",
        file: "classComponent.html",
        title: "Class component in JSX",
        description:
          "A class component returning JSX from its `render()` method.",
        concepts: ["class component", "render()"],
      },
      {
        slug: "nested-components",
        file: "nestedComponents.html",
        title: "Nested components",
        description:
          "Compose components by placing one inside another's JSX.",
        concepts: ["composition", "nesting"],
      },
      {
        slug: "ul-li-jsx-tree",
        file: "ul_li_JSXtree.html",
        title: "A `<ul>` / `<li>` JSX tree",
        description:
          "Write a list tree directly in JSX — the shape most UIs boil down to.",
        concepts: ["JSX", "lists"],
      },
      {
        slug: "props-passing",
        file: "props_passingSubjects.html",
        title: "Passing props",
        description:
          "Pass simple string props from parent to child.",
        concepts: ["props"],
      },
      {
        slug: "props-passing-css-property",
        file: "props_passingSubjectsCSSproperty.html",
        title: "Passing a CSS property as a prop",
        description:
          "Forward a style value through props.",
        concepts: ["props", "styling"],
      },
      {
        slug: "props-passing-inline-style",
        file: "props_passingSubjectsInlineStyle.html",
        title: "Passing a full inline `style` object",
        description:
          "Forward an object literal as the `style` prop through components.",
        concepts: ["props", "inline style"],
      },
      {
        slug: "props-arrow-inline-style",
        file: "propsArrowFct_passingSubjectsInlineStyle.html",
        title: "Arrow component with style props",
        description:
          "The same pattern inside an arrow-function component.",
        concepts: ["arrow function", "style"],
      },
      {
        slug: "user-profile-card",
        file: "userProfileCard.html",
        title: "UserProfileCard — a composed component",
        description:
          "A richer example: a reusable profile card built out of smaller JSX pieces.",
        concepts: ["composition", "components"],
      },
      {
        slug: "user-profile-card-ids",
        file: "userProfileCard_id_className_inlineStyle.html",
        title: "UserProfileCard with ids & styles",
        description:
          "Profile card extended with id, className, and inline style props.",
        concepts: ["styling", "props"],
      },
      {
        slug: "user-profile-card-ids-bis",
        file: "userProfileCard_id_className_inlineStyle_bis.html",
        title: "UserProfileCard styled — variant",
        description:
          "A second take on the styled profile card with a slightly different structure.",
        concepts: ["styling", "variations"],
      },
      {
        slug: "user-profile-card-map",
        file: "userProfileCard_map.html",
        title: "Rendering a list of profile cards with `.map()`",
        description:
          "Turn an array of user objects into an array of `<UserProfileCard>` elements.",
        concepts: ["map", "lists", "keys"],
      },
      {
        slug: "user-profile-card-map-standard",
        file: "userProfileCard_mapStandardArrayFct.html",
        title: "`.map()` — standard-function form",
        description:
          "The same list rendered using a classic `function(u){...}` callback.",
        concepts: ["map", "function form"],
      },
      {
        slug: "user-profile-card-map-reduced-a",
        file: "userProfileCard_mapReducedArrayFct_caseA.html",
        title: "`.map()` — reduced arrow form (case A)",
        description:
          "Same result, tighter arrow-function callback.",
        concepts: ["map", "arrow function"],
      },
      {
        slug: "user-profile-card-map-reduced-b",
        file: "userProfileCard_mapReducedArrayFct_caseB.html",
        title: "`.map()` — reduced arrow form (case B)",
        description:
          "Another concise variation — useful to compare style tradeoffs.",
        concepts: ["map", "arrow function"],
      },
      {
        slug: "user-profile-card-foreach",
        file: "userProfileCard_forEach.html",
        title: "`.forEach()` — why React prefers `.map()`",
        description:
          "Contrast with `.forEach()` to see why returning an array is the right move in JSX.",
        concepts: ["forEach", "map", "returning arrays"],
      },
    ],
  },

  {
    id: "react-state",
    number: 4,
    title: "State — useState & Class State",
    tagline: "Components that remember and react to change.",
    description:
      "State is what makes a UI interactive. This chapter walks through the same small exercise twice — once with class components and `this.state`, once with functional components and `useState` — so the mapping between the two worlds is obvious.",
    icon: "sparkles",
    examples: [
      {
        slug: "step1-class",
        file: "step1_classComponent.html",
        title: "Step 1 — class component",
        description:
          "A minimal class component that displays a value — the baseline before introducing state.",
        concepts: ["class component", "baseline"],
      },
      {
        slug: "step1-functional",
        file: "step1_functionalComponent.html",
        title: "Step 1 — functional component",
        description:
          "The same baseline as a functional component.",
        concepts: ["functional component", "baseline"],
      },
      {
        slug: "step1a-class",
        file: "step1a_classComponent.html",
        title: "Step 1a — class component",
        description:
          "Add a small refinement to the class version.",
        concepts: ["class component", "refinement"],
      },
      {
        slug: "step1a-functional",
        file: "step1a_functionalComponent.html",
        title: "Step 1a — functional component",
        description:
          "Matching refinement on the functional side.",
        concepts: ["functional component", "refinement"],
      },
      {
        slug: "step1b-class",
        file: "step1b_classComponent.html",
        title: "Step 1b — class component",
        description:
          "Introduce `this.state` and a render that reads it.",
        concepts: ["this.state", "class state"],
      },
      {
        slug: "step1b-functional",
        file: "step1b_functionalComponent.html",
        title: "Step 1b — functional component",
        description:
          "Introduce `useState` for the same behaviour.",
        concepts: ["useState", "hooks"],
      },
      {
        slug: "step1c-class",
        file: "step1c_classComponent.html",
        title: "Step 1c — class component",
        description:
          "Add an event handler that calls `setState`.",
        concepts: ["setState", "events"],
      },
      {
        slug: "step1d-class",
        file: "step1d_classComponent.html",
        title: "Step 1d — class component",
        description:
          "Handle state updates that depend on the previous value.",
        concepts: ["functional setState", "updater form"],
      },
      {
        slug: "step1d-functional",
        file: "step1d_functionalComponent.html",
        title: "Step 1d — functional component",
        description:
          "Same idea with `setX(prev => ...)`.",
        concepts: ["useState", "updater"],
      },
      {
        slug: "step1e-class",
        file: "step1e_classComponent.html",
        title: "Step 1e — class component",
        description:
          "Refine the class version further.",
        concepts: ["class state"],
      },
      {
        slug: "step1e-functional",
        file: "step1e_functionalComponent.html",
        title: "Step 1e — functional component",
        description:
          "Matching refinement on the functional side.",
        concepts: ["useState"],
      },
      {
        slug: "step1f-class",
        file: "step1f_classComponent.html",
        title: "Step 1f — class component",
        description:
          "Final polish on the class variant.",
        concepts: ["class state"],
      },
      {
        slug: "step1f-functional",
        file: "step1f_functionalComponent.html",
        title: "Step 1f — functional component",
        description:
          "Final polish on the functional variant.",
        concepts: ["useState"],
      },
      {
        slug: "class-input-onchange",
        file: "classeComp_inputNeedOnChange.html",
        title: "Controlled input — class component",
        description:
          "Bind an `<input>` to state via `onChange` in a class component.",
        concepts: ["controlled input", "onChange"],
      },
      {
        slug: "func-input-onchange",
        file: "functComp_inputNeedOnChange.html",
        title: "Controlled input — functional component",
        description:
          "The same controlled input, powered by `useState`.",
        concepts: ["controlled input", "useState"],
      },
    ],
  },

  {
    id: "hooks-data",
    number: 5,
    title: "Hooks & Data — useEffect, Context, Custom Hooks, fetch",
    tagline: "Side effects, shared state, and talking to an API.",
    description:
      "Past state, real apps need to react to the outside world: timers, subscriptions, APIs, and shared values like the current user or theme. This chapter covers the four pillars most React apps rely on — useEffect for side effects, useContext for tree-wide state, custom hooks to package reusable logic, and fetch patterns with loading / error / debounce.",
    icon: "zap",
    examples: [
      {
        slug: "useeffect-on-mount",
        file: "useEffect_onMount.html",
        title: "useEffect — run once on mount",
        description:
          "Use `useEffect(fn, [])` to run setup code exactly once, right after the first render.",
        concepts: ["useEffect", "mount", "empty deps"],
      },
      {
        slug: "useeffect-dependencies",
        file: "useEffect_dependencies.html",
        title: "useEffect — dependencies & `document.title`",
        description:
          "Pass `[count]` to re-run the effect every time the count changes. Live-syncs the tab title.",
        concepts: ["useEffect", "dependencies", "document.title"],
      },
      {
        slug: "useeffect-cleanup-interval",
        file: "useEffect_cleanup_interval.html",
        title: "useEffect — cleanup with `setInterval`",
        description:
          "Return a cleanup function from the effect so React can tear timers / subscriptions down on unmount.",
        concepts: ["useEffect", "cleanup", "setInterval"],
      },
      {
        slug: "useeffect-event-listener",
        file: "useEffect_eventListener.html",
        title: "useEffect — event listener cleanup",
        description:
          "Attach a global `mousemove` listener on mount and remove it on unmount — live mouse tracker.",
        concepts: ["useEffect", "event listener", "cleanup"],
      },
      {
        slug: "usecontext-theme-toggle",
        file: "useContext_themeToggle.html",
        title: "useContext — theme provider & toggle",
        description:
          "Thread a `theme` value through the tree without prop-drilling. One provider, many consumers.",
        concepts: ["useContext", "createContext", "provider"],
      },
      {
        slug: "usecontext-nested-user",
        file: "useContext_nestedUser.html",
        title: "useContext — deeply nested user info",
        description:
          "Switch the logged-in user at the top; a deeply nested Avatar component updates instantly.",
        concepts: ["useContext", "nesting", "shared state"],
      },
      {
        slug: "custom-hook-use-toggle",
        file: "customHook_useToggle.html",
        title: "Custom hook — `useToggle`",
        description:
          "Package a boolean + toggle helper into a reusable `useToggle()` hook — your first custom hook.",
        concepts: ["custom hook", "useToggle", "useCallback"],
      },
      {
        slug: "custom-hook-use-window-size",
        file: "customHook_useWindowSize.html",
        title: "Custom hook — `useWindowSize`",
        description:
          "A hook that bundles a `resize` listener with state: components get live window dimensions without wiring.",
        concepts: ["custom hook", "useEffect", "resize"],
      },
      {
        slug: "custom-hook-use-local-storage",
        file: "customHook_useLocalStorage.html",
        title: "Custom hook — `useLocalStorage`",
        description:
          "`useState` that persists across reloads by syncing through `localStorage` with lazy initial read.",
        concepts: ["custom hook", "localStorage", "persistence"],
      },
      {
        slug: "fetch-posts-list",
        file: "fetch_postsList.html",
        title: "fetch — loading / error / data states",
        description:
          "The canonical three-state data fetch: show a spinner, an error, or the data. With a cancellation flag for unmounts.",
        concepts: ["fetch", "useEffect", "async state"],
      },
      {
        slug: "fetch-debounced-search",
        file: "fetch_debouncedSearch.html",
        title: "fetch — debounced search with `AbortController`",
        description:
          "A typing-as-you-go search box that debounces 300 ms and cancels stale in-flight requests.",
        concepts: ["fetch", "debounce", "AbortController"],
      },
    ],
  },

  {
    id: "router-forms",
    number: 6,
    title: "Router & Forms — multi-page apps that collect input",
    tagline: "URL-driven UI and the forms users actually fill in.",
    description:
      "Most real apps do two things: they have more than one page, and they ask the user for input. This chapter covers both — from a 15-line hand-rolled hash router through React Router's Link/Route/useParams/nested layouts, then on to controlled forms: shared handlers, submit + preventDefault, required / regex / real-time validation, and a full multi-step wizard.",
    icon: "route",
    examples: [
      {
        slug: "diy-hash-router",
        file: "diy_hashRouter.html",
        title: "DIY hash router in ~15 lines",
        description:
          "Build the simplest possible router from `useState` + `hashchange` so you see exactly what React Router abstracts.",
        concepts: ["hashchange", "useState", "custom hook"],
      },
      {
        slug: "react-router-basic",
        file: "reactRouter_basic.html",
        title: "React Router — HashRouter, Route, Switch, NavLink",
        description:
          "Swap the hand-rolled router for React Router v5. Same model: URL drives UI — but with Link, NavLink, Switch, and a 404 catch-all.",
        concepts: ["React Router", "HashRouter", "Switch", "NavLink"],
      },
      {
        slug: "react-router-params",
        file: "reactRouter_params.html",
        title: "React Router — URL params (`useParams`)",
        description:
          "Dynamic segments like `/users/:id` and how `useParams()` + `useHistory()` turn the URL into the source of truth.",
        concepts: ["useParams", "useHistory", "dynamic routes"],
      },
      {
        slug: "react-router-nested",
        file: "reactRouter_nested.html",
        title: "React Router — nested routes & layouts",
        description:
          "A Settings section that owns its own layout and child routes (Profile / Account / Billing) — the archetype of real apps.",
        concepts: ["nested routes", "layout", "useRouteMatch"],
      },
      {
        slug: "form-controlled-single",
        file: "form_controlled_single.html",
        title: "Controlled input — recap",
        description:
          "Quick refresher: `value={state}` + `onChange={setter}` — the pattern every bigger form builds on.",
        concepts: ["controlled input", "useState"],
      },
      {
        slug: "form-multi-field",
        file: "form_multiField_sharedHandler.html",
        title: "Many fields, one handler — `[name]` dispatch",
        description:
          "Keep the whole form in one state object and write a single `onChange` that dispatches on the input's `name`.",
        concepts: ["shared handler", "computed keys", "checkbox"],
      },
      {
        slug: "form-submit-prevent-default",
        file: "form_submit_preventDefault.html",
        title: "Form submission — `preventDefault` + gather data",
        description:
          "Handle `onSubmit`, stop the default POST-and-reload, and push the collected entry into a list.",
        concepts: ["onSubmit", "preventDefault", "state update"],
      },
      {
        slug: "form-validation-required",
        file: "form_validation_required.html",
        title: "Validation — required fields with touched state",
        description:
          "Show errors only after a field is touched or the user tries to submit. Disable the submit button until everything's valid.",
        concepts: ["validation", "touched", "disabled submit"],
      },
      {
        slug: "form-validation-email-regex",
        file: "form_validation_emailRegex.html",
        title: "Validation — email regex + password strength meter",
        description:
          "Real-time feedback: a regex-driven email check plus a 5-level password strength meter derived purely from state.",
        concepts: ["regex", "derived state", "strength meter"],
      },
      {
        slug: "form-multi-step-wizard",
        file: "form_multiStep_wizard.html",
        title: "Multi-step sign-up wizard",
        description:
          "Three steps (Account → Profile → Review) sharing one state object; each step validates its own slice before Next unlocks.",
        concepts: ["wizard", "step state", "per-step validation"],
      },
    ],
  },
];

// Flat list for search / next-prev navigation
window.ALL_EXAMPLES = window.CHAPTERS.flatMap((c) =>
  c.examples.map((e) => ({
    ...e,
    chapterId: c.id,
    chapterTitle: c.title,
    chapterNumber: c.number,
    path: `examples/${c.id}/${e.file}`,
  }))
);
