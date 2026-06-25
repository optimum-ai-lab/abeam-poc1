# Agent Dashboard

A customizable, single-page dashboard for monitoring and managing a global fleet of LLM agents. Build your own view by adding, arranging, and removing widgets that surface real-time metrics, performance trends, deployment health, and agent activity at a glance.

## What this website does

The **Agent Dashboard** is an operations dashboard ("Global Agent Fleet") for teams running large numbers of LLM-powered agents. Instead of a fixed layout, the dashboard is **composed from a library of widgets** that each user can pick from to assemble the view they care about.

### Core experience

- **Composable dashboard canvas** — Start from a default set of widgets and customize freely. The responsive 12-column grid reflows automatically as widgets are added or removed, with animated transitions (powered by Motion).
- **Widget Library** — Click **Add Widget** to open a slide-in panel listing every available widget. Widgets already on the dashboard are marked so you don't add duplicates.
- **Remove anything** — Each widget has its own container with a remove control, so you can declutter the canvas at any time.
- **Empty state** — When no widgets are active, the dashboard prompts you to open the library and start building.

### Available widgets

| Widget | What it shows |
|--------|---------------|
| **Key Metrics** | Headline numbers — total agents, active agents, and cost overview. |
| **Performance Trends** | Token usage and latency plotted over time (line/area charts). |
| **Agent Status** | Success vs. failure vs. pending breakdown. |
| **Work States** | How many agents are Working, Pending Confirm, Idle, Ideating, or Blocked. |
| **Deployment Regions** | Geographic distribution of agents and per-region health (us-east-1, eu-central-1, ap-northeast-1, etc.). |
| **Issue Rate** | Error rates compared across models (e.g. Claude, GPT-4o, Llama). |
| **Recent Activities** | Real-time log of agent actions with success / failed / pending status. |

> The dashboard currently runs on **mock data** (see `src/data.ts`) for demonstration. Charts and metrics are wired to render real values once connected to a live data source.

## Tech stack

- **React 19** + **TypeScript** — UI and type-safe widget configuration.
- **Vite 6** — dev server and build tooling.
- **Tailwind CSS 4** — styling and the dark, glassmorphic dashboard theme.
- **Recharts** — charts for trends, status, and rate widgets.
- **Motion** — layout animations for adding/removing widgets.
- **lucide-react** — icons.

## Project structure

```
src/
  App.tsx                      # Dashboard shell, grid layout, widget routing
  data.ts                      # Widget library definitions + mock data
  types.ts                     # WidgetConfig, AgentActivity, DeploymentLocation types
  components/
    WidgetLibrary.tsx          # Slide-in "Add Widget" panel
    widgets/
      WidgetContainer.tsx      # Shared widget frame (title + remove)
      MetricsWidget.tsx
      TrendsWidget.tsx
      StatusWidget.tsx
      AgentStateWidget.tsx
      DeploymentLocationWidget.tsx
      IssueRateWidget.tsx
      ActivitiesWidget.tsx
```

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server (runs on port 3000):
   ```bash
   npm run dev
   ```
3. Open <http://localhost:3000>.

### Other scripts

- `npm run build` — production build.
- `npm run preview` — preview the production build.
- `npm run lint` — type-check with `tsc --noEmit`.

## Configuration

Copy `.env.example` to `.env` and fill in the required values. Missing required configuration is intended to fail loudly rather than fall back to defaults.
