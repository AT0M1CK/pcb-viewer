import { useContext } from "react";
import {
  CameraContext,
  FilterContext,
  SelectionContext,
  type CameraValue,
  type FilterValue,
  type SelectionValue,
} from "./ViewerContext";

/**
 * Consumer hooks for the viewer contexts.
 *
 * Each throws rather than returning null when used outside `ViewerProvider`,
 * so a misplaced component fails loudly at render instead of silently reading
 * undefined state.
 */

export function useSelection(): SelectionValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within a ViewerProvider");
  return ctx;
}

export function useFilters(): FilterValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within a ViewerProvider");
  return ctx;
}

export function useCameraView(): CameraValue {
  const ctx = useContext(CameraContext);
  if (!ctx) {
    throw new Error("useCameraView must be used within a ViewerProvider");
  }
  return ctx;
}
