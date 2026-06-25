# Developer Guide — LLM Control Center

This guide documents the architecture, tech stack, and conventions of the **LLM Control Center** dashboard so developers can quickly orient themselves and extend the app. For a product-level overview, see [`README.md`](./README.md).

---

## 1. Overview

The app is a **client-side single-page application (SPA)**: a customizable dashboard where users compose their view from a library of widgets. There is no backend service in this repository today — all data is **mock data** defined in `src/data.ts`. State lives entirely in the browser (React component state); nothing is persisted.

The app runs as a plain Vite + React SPA. A lightweight `metadata.json` manifest (app name/description) ships alongside it but is not required for local development.

---

## 2. Tech stack

| Concern | Choice | Version | Notes |
|---------|--------|---------|-------|
| UI library | **React** | 19 | Function components + hooks only. Rendered in `StrictMode`. |
| Language | **TypeScript** | ~5.8 | Strict-ish config; `noEmit` (Vite/esbuild does the transpile). |
| Build tool / dev server | **Vite** | 6 | Dev server on port 3000, host `0.0.0.0`. |
| Styling | **Tailwind CSS** | 4 | Via `@tailwindcss/vite` plugin. No `tailwind.config` file — v4 zero-config. |
| Charts | **Recharts** | 3 | Area/line/bar/pie charts in chart widgets. |
| Animation | **Motion** (`motion/react`) | 12 | Layout animations + enter/exit transitions. |
| Icons | **lucide-react** | — | Icon set used throughout. |
| Class utilities | **clsx** + **tailwind-merge** | — | Combined via `cn()` in `src/lib/utils.ts`. |

TypeScript is type-checked but **not** the compiler that emits JS — Vite/esbuild transpiles. Run type checks explicitly with `npm run lint` (`tsc --noEmit`).

---

## 3. Project structure

```
abeam-poc1/
├── index.html                  # Vite entry; mounts #root
├── vite.config.ts              # React + Tailwind plugins, "@" alias, HMR control
├── tsconfig.json               # ES2022, bundler resolution, react-jsx, "@/*" paths
├── metadata.json               # App manifest (name, description)
├── .env.example                # APP_URL
└── src/
    ├── main.tsx                # createRoot + <App/> in StrictMode
    ├── App.tsx                 # Dashboard shell: header, grid, widget routing, state
    ├── data.ts                 # WIDGET_LIBRARY registry + all MOCK_* datasets
    ├── types.ts                # Shared TS types (WidgetConfig, AgentActivity, …)
    ├── index.css               # Tailwind import + custom-scrollbar utilities
    ├── lib/
    │   └── utils.ts            # cn() class-merge helper
    └── components/
        ├── WidgetLibrary.tsx   # Slide-in "Add Widget" drawer
        └── widgets/
            ├── WidgetContainer.tsx        # Shared frame (title + remove button)
            ├── MetricsWidget.tsx
            ├── TrendsWidget.tsx
            ├── StatusWidget.tsx
            ├── AgentStateWidget.tsx
            ├── DeploymentLocationWidget.tsx
            ├── IssueRateWidget.tsx
            └── ActivitiesWidget.tsx
```

---

## 4. Architecture

### 4.1 Data flow

```
data.ts (WIDGET_LIBRARY + MOCK_* data)
        │
        ├──────────────► App.tsx ──────────► activeWidgets state (useState)
        │                   │                        │
        │                   │ renders grid           │ add / remove
        │                   ▼                        ▼
        │            WidgetContainer ◄──── WidgetLibrary (drawer)
        │                   │
        │                   ▼
        └──────────► individual <XxxWidget/> components read MOCK_* directly
```

Key points:

- **`App.tsx` is the single source of truth** for which widgets are on the canvas. It holds two pieces of state:
  - `activeWidgets: WidgetConfig[]` — the widgets currently rendered (initialised to a default subset of `WIDGET_LIBRARY`).
  - `isLibraryOpen: boolean` — whether the Add-Widget drawer is open.
- **`WidgetLibrary`** receives `activeWidgetIds` and `onAddWidget`; it lists every widget in `WIDGET_LIBRARY` and disables ones already active (prevents duplicates).
- **Widgets read their own mock data** directly from `src/data.ts`. They are currently **presentational and self-contained** — no props for data. When wiring real data, this is the seam to change (see §7).

### 4.2 Widget routing

`App.tsx` maps a widget's `type` string to a component via a `switch` in `renderWidgetContent()`. Adding a new widget type means adding a `case` there **and** an entry in `WIDGET_LIBRARY`.

### 4.3 Layout system

- The canvas is a **CSS grid**: `grid-cols-12` with `auto-rows-[minmax(120px,auto)]`.
- Each widget's `size` (`small | medium | large | full`) maps to responsive column/row spans via `getColSpan()` in `App.tsx`.
- `WidgetContainer` provides the consistent card chrome (rounded border, title, remove button) and fills its grid cell (`h-full`).

### 4.4 Animation

- **Motion** (`motion/react`) drives:
  - Widget add/remove via `<AnimatePresence mode="popLayout">` + `layout` on each `motion.div` in `App.tsx`.
  - The drawer slide-in/out and backdrop fade in `WidgetLibrary.tsx`.
- Transitions use spring physics (`type: "spring"`).

---

## 5. Type model (`src/types.ts`)

- **`WidgetType`** — union of the seven supported widget kinds (`metrics`, `activities`, `trends`, `deployment`, `status`, `issue_rate`, `agent_state`).
- **`WidgetConfig`** — `{ id, type, title, description, size }`. Drives both the library listing and the rendered grid.
- **`AgentActivity`** — a row in the activities log (`agentName`, `action`, `timestamp`, `status`).
- **`DeploymentLocation`** — a region row (`region`, `count`, `health`).

When adding a widget type, extend `WidgetType` first so the `switch` in `App.tsx` and the registry stay type-safe.

---

## 6. Conventions & patterns

- **Styling is Tailwind-utility-first.** Dark theme throughout (`bg-[#020617]`, `slate-*` palette, `indigo-*` accents).
- **Combine conditional classes with `cn()`** from `src/lib/utils.ts` (clsx + tailwind-merge) rather than string concatenation, so conflicting Tailwind classes resolve correctly.
- **Use the `@` alias** for imports from the project root when convenient (`@/...` → repo root), configured in both `vite.config.ts` and `tsconfig.json`. Within `src/`, relative imports are the existing norm.
- **Function components + hooks only.** No class components.
- **Icons** come from `lucide-react`.
- **Charts** use Recharts inside a `ResponsiveContainer` with `width/height="100%"`; chart colors are hard-coded hex matching the Tailwind palette (e.g. indigo `#6366f1`, slate grid `#334155`).
- **Custom scrollbars** use the `.custom-scrollbar` utility defined in `src/index.css`.

---

## 7. How to add a new widget

1. **Add the type** to `WidgetType` in `src/types.ts`.
2. **Create the component** in `src/components/widgets/YourWidget.tsx`. Read mock data from `src/data.ts` (add a `MOCK_*` export if needed). Keep it presentational and fill its container (`h-full w-full`).
3. **Register it** in `WIDGET_LIBRARY` in `src/data.ts` with a unique `id`, the new `type`, a `title`, `description`, and a `size`.
4. **Wire routing** by adding a `case` to `renderWidgetContent()` in `src/App.tsx`.
5. (Optional) Add the widget's `id` to the default set in `App.tsx`'s `useState` initializer if it should show by default.

No other registration is required — the library drawer and grid pick it up automatically.

### Wiring real data (future)

Today widgets import `MOCK_*` constants directly. To connect a live source (a REST/WebSocket backend or an LLM SDK), introduce a data layer (hook or context) and pass data into widgets as props, replacing the direct `data.ts` imports. `App.tsx`'s `renderWidgetContent()` is the natural place to inject fetched data.

---

## 8. Local development

**Prerequisites:** Node.js (18+ recommended for Vite 6).

```bash
npm install        # install dependencies
npm run dev        # Vite dev server on http://localhost:3000 (host 0.0.0.0)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # type-check only (tsc --noEmit)
npm run clean      # remove dist/ and server.js
```

### HMR / file-watching note

`vite.config.ts` reads `DISABLE_HMR`:

- When `DISABLE_HMR=true`, **HMR and file-watching are disabled** (useful in low-CPU or automated environments).
- Locally, leave it unset for normal hot-reload.

---

## 9. Environment & deployment

- **`.env.example`** documents:
  - `APP_URL` — the URL where the app is hosted (used for self-referential links / callbacks).
- **`metadata.json`** is a small app manifest (name, description).
- Per the project's no-fallback policy: if a required credential/config is absent, the code that needs it should **fail loudly** rather than substitute a default.

> Note: there is **no server entry file in this repo** — local development and the production build are served purely by Vite.

---

## 10. Gaps / things to know

- **All data is mocked** — no persistence, no network calls. Refreshing the page resets the dashboard to its default widget set.
- **No tests** are configured.
- **No routing** — the app is a single screen.
- Widget layout order follows insertion order in `activeWidgets`; there is no drag-and-drop reordering (the grid only reflows on add/remove).
