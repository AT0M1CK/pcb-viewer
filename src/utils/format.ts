import type { Tolerance } from "../types";

/** 1256 -> "1,256" */
export function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

/**
 * Share of a total, as a display percentage.
 * `ratioPercent(1198, 1256)` -> "95.4%"
 */
export function ratioPercent(value: number, total: number, digits = 1): string {
  if (total === 0) return "0%";
  return `${((value / total) * 100).toFixed(digits)}%`;
}

/** 99.42 -> "99.42%" */
export function formatPercent(value: number, digits = 2): string {
  return `${value.toFixed(digits)}%`;
}

/** 0.085 -> "±0.085 mm" */
export function formatOffset(mm: number, digits = 3): string {
  return `±${mm.toFixed(digits)} mm`;
}

/** 46.35 -> "46.350" */
export function formatMm(mm: number, digits = 3): string {
  return mm.toFixed(digits);
}

/** { xy: 0.1, rot: 1 } -> "±0.100 mm / ±1.0°" */
export function formatTolerance({ xy, rot }: Tolerance): string {
  return `±${xy.toFixed(3)} mm / ±${rot.toFixed(1)}°`;
}

/** 90 -> "90°" */
export function formatDegrees(deg: number): string {
  return `${deg}°`;
}
