import type { PlacementIssue } from "../types";

/**
 * Each `reference` matches a refDes in `mockComponents.ts` that carries a
 * corresponding non-Verified status — so clicking through from the table to the
 * board stays consistent.
 */
export const mockIssues: PlacementIssue[] = [
  {
    id: "i-1",
    reference: "C236",
    issue: "Height exceeds limit (2.10mm)",
    severity: "Warning",
    status: "Open",
  },
  {
    id: "i-2",
    reference: "U7",
    issue: "Rotation mismatch (90° vs 180°)",
    severity: "Critical",
    status: "Open",
  },
  {
    id: "i-3",
    reference: "R102",
    issue: "X/Y offset out of tolerance",
    severity: "Warning",
    status: "In Review",
  },
  {
    id: "i-4",
    reference: "J3",
    issue: "Collision risk with component H8",
    severity: "Critical",
    status: "Open",
  },
];
