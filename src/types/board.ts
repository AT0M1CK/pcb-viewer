/**
 * Board-level metadata and statistics.
 *
 * `BoardSummary` describes the *whole* assembly, while the 3D scene renders
 * only a representative subset of placements — see the README's "Known gaps".
 * Only raw counts live here; percentages are derived in `usePlacementSummary`.
 */

export interface BoardSummary {
  total: number;
  placed: number;
  /** components not yet in the "Verified" state */
  unverified: number;
  /** measured placement accuracy as a percentage, not a count ratio */
  accuracyPct: number;
  /** mean positional deviation across the assembly, in mm */
  meanOffsetMm: number;
}

export interface BoardMeta {
  project: string;
  revision: string;
  /** design file name shown in the viewport dropdown */
  file: string;
  lastUpdated: string;
  updatedBy: string;
  units: "mm";
  /** board outline in mm, used to size the substrate and map coordinates */
  dimensions: { width: number; depth: number };
  summary: BoardSummary;
}
