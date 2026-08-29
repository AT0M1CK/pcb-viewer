import { useMemo } from "react";
import { useFilters } from "../store/useViewer";
import type { ViewerFilters } from "../store/ViewerContext";
import type { Component, PackageKind } from "../types";

/**
 * Which filter toggle governs each package kind.
 *
 * Electrolytics ride along with passives — the reference panel offers four
 * category toggles, not five, and an electrolytic is a passive component.
 */
const KIND_FILTER: Record<PackageKind, keyof ViewerFilters> = {
  IC: "ics",
  Passive: "passives",
  Electrolytic: "passives",
  Connector: "connectors",
  Mechanical: "mechanical",
};

export function isVisible(component: Component, filters: ViewerFilters): boolean {
  const sideVisible =
    component.side === "Top" ? filters.topSide : filters.bottomSide;
  return sideVisible && filters[KIND_FILTER[component.kind]];
}

/** Narrows a component list to what the current filter toggles allow. */
export function useComponentFilter(components: Component[]): Component[] {
  const { filters } = useFilters();

  return useMemo(
    () => components.filter((c) => isVisible(c, filters)),
    [components, filters],
  );
}
