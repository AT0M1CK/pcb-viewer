import React, { createContext, useCallback, useMemo, useState } from "react";
import { DEFAULT_SELECTED_ID } from "../services/boardService";

/**
 * Viewer state, split across three contexts on purpose.
 *
 * A single context would re-render every consumer on any change — toggling a
 * filter would re-render the detail panel, and moving the camera would re-render
 * the issues table. Splitting keeps each update local to the components that
 * actually depend on it, which matters most for the Canvas subtree.
 *
 * Consume these through the hooks in `useViewer.ts`, not directly.
 */

// ----------------------------------------------------------------- selection

export interface SelectionValue {
  selectedId: string | null;
  hoveredId: string | null;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
}

export const SelectionContext = createContext<SelectionValue | null>(null);

// ------------------------------------------------------------------- filters

export interface ViewerFilters {
  topSide: boolean;
  bottomSide: boolean;
  ics: boolean;
  passives: boolean;
  connectors: boolean;
  mechanical: boolean;
}

/** Defaults mirror the reference screenshot: everything on except Bottom Side. */
export const DEFAULT_FILTERS: ViewerFilters = {
  topSide: true,
  bottomSide: false,
  ics: true,
  passives: true,
  connectors: true,
  mechanical: true,
};

export interface FilterValue {
  filters: ViewerFilters;
  toggleFilter: (key: keyof ViewerFilters) => void;
  resetFilters: () => void;
}

export const FilterContext = createContext<FilterValue | null>(null);

// -------------------------------------------------------------------- camera

export type CameraView = "iso" | "top" | "side";

export interface CameraValue {
  view: CameraView;
  autoRotate: boolean;
  /**
   * Command counters. The viewport toolbar fires one-shot actions (zoom, fit)
   * that aren't really state, so each bump of a counter is observed by
   * `BoardViewer` and translated into a camera move.
   */
  zoomInSignal: number;
  zoomOutSignal: number;
  fitSignal: number;
  setView: (view: CameraView) => void;
  toggleAutoRotate: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
}

export const CameraContext = createContext<CameraValue | null>(null);

// ------------------------------------------------------------------ provider

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    DEFAULT_SELECTED_ID,
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ViewerFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<CameraView>("iso");
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomInSignal, setZoomInSignal] = useState(0);
  const [zoomOutSignal, setZoomOutSignal] = useState(0);
  const [fitSignal, setFitSignal] = useState(0);

  const toggleFilter = useCallback((key: keyof ViewerFilters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);
  const toggleAutoRotate = useCallback(() => setAutoRotate((v) => !v), []);
  const zoomIn = useCallback(() => setZoomInSignal((n) => n + 1), []);
  const zoomOut = useCallback(() => setZoomOutSignal((n) => n + 1), []);
  const fit = useCallback(() => setFitSignal((n) => n + 1), []);

  const selection = useMemo<SelectionValue>(
    () => ({
      selectedId,
      hoveredId,
      select: setSelectedId,
      hover: setHoveredId,
    }),
    [selectedId, hoveredId],
  );

  const filterValue = useMemo<FilterValue>(
    () => ({ filters, toggleFilter, resetFilters }),
    [filters, toggleFilter, resetFilters],
  );

  const camera = useMemo<CameraValue>(
    () => ({
      view,
      autoRotate,
      zoomInSignal,
      zoomOutSignal,
      fitSignal,
      setView,
      toggleAutoRotate,
      zoomIn,
      zoomOut,
      fit,
    }),
    [
      view,
      autoRotate,
      zoomInSignal,
      zoomOutSignal,
      fitSignal,
      toggleAutoRotate,
      zoomIn,
      zoomOut,
      fit,
    ],
  );

  return (
    <SelectionContext.Provider value={selection}>
      <FilterContext.Provider value={filterValue}>
        <CameraContext.Provider value={camera}>
          {children}
        </CameraContext.Provider>
      </FilterContext.Provider>
    </SelectionContext.Provider>
  );
}
