# Implementation Plan — 3D Component Placement Viewer

Planning document for the two-day take-home. Status markers reflect what was
actually delivered; see `README.md` for how to run it and what the gaps are.

---

## Requirements

The interviewer's email named three, and these are the grading rubric:

1. Proper project folder structure
2. Support for a responsive page
3. The page should be in a 3D view

Everything else below is inferred scope to make the deliverable coherent.

A reference screenshot of Pitronix's own 3D Component Placement page was
supplied. Per instruction it was reproduced closely — layout, navigation,
branding and palette.

---

## Decisions

| Question | Choice | Why |
|---|---|---|
| State | React Context, three providers | State is small; splitting selection / filters / camera keeps re-renders local, which matters for the Canvas subtree. `zustand` was scaffolded and removed unused. |
| Visual fidelity | Close clone, incl. branding | Explicit instruction for this exercise. |
| 3D scope | 4 geometry treatments, ~45 placements | No model file was provided. Enough parts to read as a populated board without instancing. |
| Summary tiles | Board-level mock data | ~45 modelled parts can't produce the reference's 1,256. Counts are mock; percentages are derived. |
| Icons | `lucide-react` | Feather-style set closest to the reference's icons. |

---

## Folder structure

```
src/
  types/         Domain types, no logic
  services/      Data seam — mock today, HTTP tomorrow
  store/         App state (Context)
  hooks/         Filtering, summary derivation, media queries
  utils/         Coordinate mapping, display formatting
  components/    Generic, reusable, prop-driven
    3D/  Layout/  UI/
  features/      Domain-aware, wires state + data into components
    viewer/  board/
  styles/        CSS Tailwind can't express
```

The load-bearing rule: `components/` never touches the store or services;
`features/` does. See README for the full rationale.

---

## Data model

`Component` carries identity (`refDes`, `name`, `package`, `partNumber`,
`supplier`), placement (`position`, `rotation`, `side`, `height`, `footprint`),
and verification (`status`, `tolerance`, `offsetMm`). `PlacementIssue` is a flat
row keyed to a `refDes`. `BoardMeta` holds project facts plus a `BoardSummary`
of raw counts.

Four fields exist beyond the obvious because the UI needed them: `kind` (drives
both geometry and filter group), `footprint` (sizes the mesh), `offsetMm`, and
`tolerance` as a numeric pair so accuracy is computable rather than a display
string.

---

## Component breakdown

**Extracted** — the four 3D files, the five layout files, the six UI primitives
(each used three or more times), and the five feature components.

**Left inline** — individual stat tiles, table rows, sidebar nav items, and the
inspector's field rows. All single-use; extracting them would be structure for
its own sake.

---

## 3D approach

`react-three-fiber` + drei, primitives only. `BoardViewer` owns the Canvas,
lights and OrbitControls; `Board` is the 1.6 mm substrate with grid, mm ticks
and an axis triad; `ComponentMesh` maps a part to one of four treatments;
`CalloutPin` is a DOM-rendered numbered marker.

Coordinate mapping lives in `utils/placement.ts` rather than in the meshes:
board millimetres (bottom-left origin) → scene coordinates (centred), with
bottom-side parts mirrored under the slab.

`CameraRig` translates the toolbar's view presets and zoom commands into eased
camera moves through OrbitControls, so dragging keeps working mid-animation.

> Gotcha worth recording: r3f auto-resizes via ResizeObserver, but the Canvas
> parent needs a **definite** height or it collapses to zero. The wrapper uses
> `h-[50vh] lg:h-[58vh]`, never a percentage.

---

## Responsive strategy

| Width | Sidebar | Main | Cards |
|---|---|---|---|
| `<768` | drawer + scrim | stacked | 1 column |
| `md` | drawer | canvas above inspector | 2 columns |
| `lg` | permanent, labelled | canvas 2fr + inspector 1fr | 3 columns |
| `xl` | permanent | as `lg`, wider | 3 columns |

Topbar degrades too: search collapses to an icon, the breadcrumb drops to its
last crumb, header buttons shed their labels.

---

## Task list

### Day 1 — architecture, chrome, 3D

- [x] `types/` and the Tailwind palette — **must**
- [x] `services/` — ~45 placements, 4 issues, board meta, accessors — **must**
- [x] `utils/` — coordinate mapping and formatting — **must**
- [x] `store/` — three contexts, hooks that throw outside the provider — **must**
- [x] `components/UI/` — six primitives — **must**
- [x] `components/Layout/` — sidebar, topbar, header, footer, shell — **must (req 1)**
- [x] `components/3D/` — four files, OrbitControls live — **must (req 3)**

### Day 2 — panels, interactivity, submission

- [x] `ViewerPage` responsive grid + viewport toolbar — **must (req 2)**
- [x] `SelectedComponentPanel` with package art and legend — **must**
- [x] `PlacementSummaryCard`, percentages derived — **must**
- [x] `LayerFilterPanel` with toggles and Reset — **must**
- [x] `PlacementIssuesTable` with severity/status badges — **must**
- [x] Click-to-select drives inspector, pin and highlight — *stretch, delivered*
- [x] Filters hide/show meshes; camera presets wired — *stretch, delivered*
- [x] Responsive pass — **must**
- [x] Cleanup: remove `zustand`, retitle `index.html`, write README — **must**

### Out of scope

Real backend, imported GLTF/OBJ model, authored test suite.

---

## Verification

- `npm start`, then drag-rotate / scroll-zoom / right-drag-pan; confirm the
  camera can't drop below the board and that Top / Side / ISO / Fit move it.
- Resize through 375 / 768 / 1024 / 1440 — sidebar becomes a drawer below `lg`,
  cards stack, canvas resizes without clipping, no horizontal page scroll.
- Toggle every filter; click parts and issue rows; confirm the inspector,
  callout pins and highlight track selection.
- Edit a count in `mockBoard.ts` — the tile percentages should move, proving
  derivation rather than hardcoded strings.
- `npx tsc --noEmit` clean; `CI=true npm run build` clean with no ESLint
  warnings; `npm install && npm start` from a fresh clone.
