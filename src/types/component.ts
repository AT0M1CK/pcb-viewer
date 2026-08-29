/**
 * A physical part placed on the board.
 *
 * `kind` is what the 3D scene and the Layer/Filter panel switch on; `package`
 * is only ever displayed. Tolerances are numeric so placement accuracy can be
 * computed — `formatTolerance` renders them back to "±0.100 mm / ±1.0°".
 */

export type BoardSide = "Top" | "Bottom";

export type ComponentStatus = "Verified" | "Warning" | "Critical";

/**
 * Five semantic kinds, four visual treatments — "Mechanical" reuses the ribbed
 * box the connectors use, since a heatsink is exactly that. The extra kind
 * exists so the Layer/Filter panel's Mechanical toggle has something to filter.
 */
export type PackageKind =
  | "IC"
  | "Electrolytic"
  | "Passive"
  | "Connector"
  | "Mechanical";

export interface Footprint {
  /** mm along the board's X axis */
  width: number;
  /** mm along the board's Y axis */
  depth: number;
}

export interface Tolerance {
  /** positional tolerance in mm */
  xy: number;
  /** rotational tolerance in degrees */
  rot: number;
}

export interface Component {
  id: string;
  /** reference designator, e.g. "U14" */
  refDes: string;
  name: string;
  /** display-only package name, e.g. "QFP-64" */
  package: string;
  kind: PackageKind;
  side: BoardSide;
  /** board-relative placement in mm, origin at the board's bottom-left corner */
  position: { x: number; y: number };
  /** degrees, clockwise about the board normal */
  rotation: number;
  /** component height above the board surface, in mm */
  height: number;
  footprint: Footprint;
  supplier: string;
  partNumber: string;
  status: ComponentStatus;
  tolerance: Tolerance;
  /** measured positional deviation from nominal, in mm */
  offsetMm: number;
  notes?: string;
  /** 1-4 for the numbered pins overlaid on the viewport */
  calloutIndex?: number;
}
