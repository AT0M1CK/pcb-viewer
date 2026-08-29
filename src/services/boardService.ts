import type { BoardMeta, Component, PlacementIssue } from "../types";
import { mockBoard } from "./mockBoard";
import { mockComponents } from "./mockComponents";
import { mockIssues } from "./mockIssues";

/**
 * The seam between the UI and its data.
 *
 * Everything above this module reads the board through these three functions,
 * so swapping the mock arrays for HTTP calls is a change confined to this file
 * (plus making the callers await). Nothing else imports the mock data directly.
 */

export function getComponents(): Component[] {
  return mockComponents;
}

export function getIssues(): PlacementIssue[] {
  return mockIssues;
}

export function getBoardMeta(): BoardMeta {
  return mockBoard;
}

/** The component the viewer opens on, matching the reference screenshot. */
export const DEFAULT_SELECTED_ID = "c-u14";
