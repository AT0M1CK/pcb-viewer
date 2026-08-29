import { useMemo } from "react";
import type { BoardSummary } from "../types";
import {
  formatCount,
  formatOffset,
  formatPercent,
  ratioPercent,
} from "../utils/format";

export interface SummaryTile {
  id: string;
  label: string;
  value: string;
  /** the smaller line beneath the value */
  detail: string;
  tone: "neutral" | "positive" | "caution" | "info";
}

/**
 * Turns raw board counts into the four display tiles.
 *
 * Every percentage is computed here rather than stored, so editing a count in
 * `mockBoard.ts` moves the tiles. Accuracy is the exception — it's a measured
 * figure, not a ratio of the counts, so it's carried through as-is.
 */
export function usePlacementSummary(summary: BoardSummary): SummaryTile[] {
  return useMemo(
    () => [
      {
        id: "total",
        label: "Total Components",
        value: formatCount(summary.total),
        detail: ratioPercent(summary.total, summary.total, 0),
        tone: "neutral" as const,
      },
      {
        id: "placed",
        label: "Placed",
        value: formatCount(summary.placed),
        detail: ratioPercent(summary.placed, summary.total),
        tone: "positive" as const,
      },
      {
        id: "unverified",
        label: "Unverified",
        value: formatCount(summary.unverified),
        detail: ratioPercent(summary.unverified, summary.total),
        tone: "caution" as const,
      },
      {
        id: "accuracy",
        label: "Placement Accuracy",
        value: formatPercent(summary.accuracyPct),
        detail: formatOffset(summary.meanOffsetMm),
        tone: "info" as const,
      },
    ],
    [summary],
  );
}
