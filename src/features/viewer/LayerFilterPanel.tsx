import React from "react";
import { Cpu, Eye, EyeOff, Plug, RefreshCw, Settings, Zap } from "lucide-react";
import { Card } from "../../components/UI/Card";
import { Toggle } from "../../components/UI/Toggle";
import { useFilters } from "../../store/useViewer";
import type { ViewerFilters } from "../../store/ViewerContext";

const SIDE_TOGGLES: { key: keyof ViewerFilters; label: string }[] = [
  { key: "topSide", label: "Top Side" },
  { key: "bottomSide", label: "Bottom Side" },
];

const CATEGORY_TOGGLES: {
  key: keyof ViewerFilters;
  label: string;
  icon: typeof Cpu;
}[] = [
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
      <div className="grid gap-x-6 sm:grid-cols-2">
        <div>
          {SIDE_TOGGLES.map(({ key, label }) => (
            <Toggle
              key={key}
              label={label}
              icon={filters[key] ? Eye : EyeOff}
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
            />
          ))}
        </div>
        <div>
          {CATEGORY_TOGGLES.map(({ key, label, icon }) => (
            <Toggle
              key={key}
              label={label}
              icon={icon}
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
