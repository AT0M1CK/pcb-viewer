import React from "react";
import {
  Cpu,
  Eye,
  EyeOff,
  Plug,
  RefreshCw,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../../components/UI/Card";
import { Toggle } from "../../components/UI/Toggle";
import { useFilters } from "../../store/useViewer";
import type { ViewerFilters } from "../../store/ViewerContext";

interface ToggleSpec {
  key: keyof ViewerFilters;
  label: string;
  /** side toggles show an eye that reflects state; categories show a fixed icon */
  icon?: LucideIcon;
}

/**
 * Ordered to fill a three-row grid column-first, so the two columns line up:
 * Top Side / Bottom Side / ICs on the left, the remaining categories on the
 * right. Splitting them into separate lists left the rows ragged.
 */
const TOGGLES: ToggleSpec[] = [
  { key: "topSide", label: "Top Side" },
  { key: "bottomSide", label: "Bottom Side" },
  { key: "ics", label: "ICs", icon: Cpu },
  { key: "passives", label: "Passives", icon: Zap },
  { key: "connectors", label: "Connectors", icon: Plug },
  { key: "mechanical", label: "Mechanical", icon: Settings },
];

export function LayerFilterPanel() {
  const { filters, toggleFilter, resetFilters } = useFilters();

  return (
    <Card
      title="Layer / Filter"
      showInfo
      action={
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-medium text-brand hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      }
    >
      {/* One column on narrow cards; two columns of three rows from sm up. */}
      <div className="grid gap-x-8 sm:grid-flow-col sm:grid-rows-3">
        {TOGGLES.map(({ key, label, icon }) => (
          <Toggle
            key={key}
            label={label}
            icon={icon ?? (filters[key] ? Eye : EyeOff)}
            checked={filters[key]}
            onChange={() => toggleFilter(key)}
          />
        ))}
      </div>
    </Card>
  );
}
