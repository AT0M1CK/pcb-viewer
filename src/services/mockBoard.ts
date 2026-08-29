import type { BoardMeta } from "../types";

/**
 * Board-level facts and assembly statistics.
 *
 * These counts describe the whole assembly, while `mockComponents.ts` models
 * only a representative subset for the 3D scene. With a real API both would
 * come from the same response — see the README's "Known gaps".
 *
 * Only raw counts live here. Percentages are derived in `usePlacementSummary`,
 * so editing `placed` or `unverified` moves the tiles.
 */
export const mockBoard: BoardMeta = {
  project: "ACME_CTRL_V1.2",
  revision: "Rev B",
  file: "ACME_CTRL_V1.2.PCB",
  lastUpdated: "20 May 2025 10:24 AM",
  updatedBy: "Rahul Khanal",
  units: "mm",
  dimensions: { width: 100, depth: 80 },
  summary: {
    total: 1256,
    placed: 1198,
    unverified: 42,
    accuracyPct: 99.42,
    meanOffsetMm: 0.085,
  },
};
