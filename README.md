# 3D Component Placement Viewer

An interactive PCB assembly viewer: a 3D board you can orbit, zoom and click,
with a component inspector, placement statistics, layer filters and an issues
table around it.

Built as a take-home exercise against three stated requirements — a proper
project folder structure, a responsive page, and a 3D view.

---

## Running it

```bash
npm install
npm start          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` |
| `npm test` | Test runner (no suite authored — see Known gaps) |
| `npx tsc --noEmit` | Type check |

> **Why there's an `.npmrc`.** `react-scripts@5.0.1` peer-requires TypeScript
> `^3 || ^4`, but this project runs TypeScript 5. CRA is unmaintained and the
> range is simply stale — TS 5 works with it. Without `legacy-peer-deps=true`
> pinned in `.npmrc`, a plain `npm install` fails on a fresh clone with
> `ERESOLVE`. Pinning it there means nobody has to remember a flag.

---

## How the three requirements are met

**1 — Folder structure.** Every directory has a single responsibility and no
folder is empty. The split is described below.

**2 — Responsive.** The sidebar is a permanent rail from `lg` up and an
off-canvas drawer below it; the viewport and inspector sit side by side from
`lg` and stack beneath it; the three analysis cards run 1 → 2 → 3 columns as
space allows. The issues table scrolls inside its own card so the page itself
never scrolls sideways.

**3 — 3D view.** A real `react-three-fiber` scene with OrbitControls — drag to
rotate, scroll to zoom, right-drag to pan — plus Top / Side / ISO camera presets
that animate the camera rather than swapping static images. The camera is
clamped so it can't drop below the board or zoom through it.

---

## Project structure

```
src/
  types/         Domain types. No logic, no imports from anywhere else.
  services/      The data seam — see below.
  store/         App state (React Context).
  hooks/         Reusable derivations: filtering, summary stats, media queries.
  utils/         Pure functions: coordinate mapping, display formatting.
  components/    Generic and reusable. Knows nothing about PCBs beyond geometry.
    3D/            The react-three-fiber scene.
    Layout/        App chrome: sidebar, topbar, page header, footer.
    UI/            Card, Badge, StatTile, Toggle, Button, Dropdown.
  features/      Domain-aware. Composes components/ into actual screens.
    viewer/        Things that respond to selection and filters.
    board/         Things that present the board's dataset.
  styles/        CSS that Tailwind utilities can't express.
```

The distinction that matters is **`components/` vs `features/`**: a component
takes props and renders: it never reaches into the store or the services. A
feature does — it wires state and data into the generic pieces. That keeps the
reusable layer genuinely reusable and makes the data flow one-directional.

Within `features/`, `viewer/` owns interaction (the canvas, the toolbar, the
inspector, the filters) and `board/` owns data presentation (summary, issues).

`services/boardService.ts` is the seam between the UI and its data. Nothing
above it imports the mock arrays directly, so replacing them with HTTP calls is
a change confined to that one file plus making the callers `await`.

---

## Design decisions

**React Context over a state library.** Viewer state is small — a selected id, a
hover id, six filter booleans and the camera. Splitting it into three contexts
(selection / filters / camera) with memoized values keeps updates local: toggling
a filter doesn't re-render the inspector, and moving the camera doesn't re-render
the issues table. A single context would have re-rendered everything, which
matters most for the Canvas subtree. `zustand` was scaffolded into the project
and has been removed, since nothing used it.

**Primitive geometry, not a model file.** No board model was provided, so parts
are drawn from primitives sized by their real footprints — a box for ICs and
passives, a cylinder for electrolytics, a ribbed box for connectors and
mechanical parts. Detail geometry (the pin-1 marker, the ribs) exists only to
make orientation legible when the board is rotated.

**Status drives colour, selection drives emissive.** A selected part glows rather
than changing colour, so its Verified / Warning / Critical reading survives
selection.

**The data model gained four fields** beyond the obvious ones, each because the
UI needed something the naive model couldn't express: `kind` (chooses the
geometry *and* the filter group), `footprint` (sizes the mesh), `offsetMm`, and
`tolerance` as a numeric pair rather than a `"±0.100 mm / ±1.0°"` string, so
accuracy is computable. The string is reconstructed for display in
`utils/format.ts`.

---

## Known gaps

**Two data scales on one page.** The 3D scene models ~45 representative
placements, while the summary card reports the whole assembly (1,256 components)
from `services/mockBoard.ts`. They're deliberately separate: modelling 1,256
parts wasn't the point of the exercise, but the statistics needed to look like a
real board's. Percentages are *derived* from the counts rather than hardcoded —
edit `placed` in `mockBoard.ts` and the tile moves — but the two sources
wouldn't exist behind a real API, which would return both from one response.

**No backend.** All data is typed local mock. See `services/`.

**No test suite.** CRA's Jest + Testing Library setup is intact and `npm test`
runs, but no specs were authored — the two days went to the three graded
requirements. The most valuable first tests would be `usePlacementSummary`
(pure, derives the tiles) and `useComponentFilter` (pure, drives what renders).

**Inert chrome.** The search field, notification bell, breadcrumb, project
selector and the header's dropdown menus are presentational. They're part of the
requested UI, but nothing behind them is wired.

**The package illustration** in the inspector is drawn SVG, not a photograph —
no part imagery ships with this build.

---

## With more time

- Replace `services/` internals with a real API and make the accessors async,
  with loading and error states in the features that call them.
- Cross-highlight between the issues table and the 3D scene both ways (clicking
  a row already selects the part; the reverse would filter the table).
- Instanced rendering, needed once the scene models thousands of parts rather
  than dozens.
- Measurement tooling — the reference's Tools menu implies distance and keep-out
  checks, which is where a placement viewer earns its keep.
- Tests around the pure hooks and the coordinate mapping in `utils/placement.ts`.

---

## A note on the visual design

The UI deliberately mirrors a reference screenshot of Pitronix's own 3D
Component Placement page, supplied with the exercise — including its navigation,
branding and palette. That was an explicit instruction for this exercise rather
than a design choice, and none of the visual identity here is my own work.
