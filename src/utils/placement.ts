import type { Component, ComponentStatus } from "../types";

/** PCB substrate thickness in mm — real FR-4 stackups are 1.6mm. */
export const BOARD_THICKNESS = 1.6;

/**
 * Status colours, mirrored from `styles/tokens.css`.
 * three.js materials can't read CSS custom properties, so these are duplicated
 * as literals. Change both together.
 */
const STATUS_COLOR: Record<ComponentStatus, string> = {
  Verified: "#16a34a",
  Warning: "#f59e0b",
  Critical: "#dc2626",
};

export function statusColor(status: ComponentStatus): string {
  return STATUS_COLOR[status];
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Board-relative millimetres to scene coordinates.
 *
 * Mock data uses a bottom-left origin like a real placement file; the scene is
 * centred on the board so orbiting feels natural. Board Y maps to scene Z, and
 * the part sits on whichever face its `side` names.
 */
export function toScenePosition(
  component: Component,
  board: { width: number; depth: number },
): [number, number, number] {
  const x = component.position.x - board.width / 2;
  const z = component.position.y - board.depth / 2;

  const halfHeight = component.height / 2;
  const y =
    component.side === "Top"
      ? BOARD_THICKNESS / 2 + halfHeight
      : -(BOARD_THICKNESS / 2 + halfHeight);

  return [x, y, z];
}

/** Bottom-side parts are mirrored so their silkscreen faces outward. */
export function toSceneRotation(component: Component): [number, number, number] {
  const yaw = degToRad(component.rotation);
  return component.side === "Top" ? [0, yaw, 0] : [Math.PI, yaw, 0];
}
