import React from "react";
import { Download, SquareArrowOutUpRight, Wrench } from "lucide-react";
import { Dropdown } from "../UI/Dropdown";

export function PageHeader() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-ink lg:text-2xl">
          3D Component Placement
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Interactive PCB assembly visualization with placement analysis and
          component inspection.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Dropdown
          label="View in 2D"
          icon={SquareArrowOutUpRight}
          items={["2D Layout Viewer", "Fabrication Drawing"]}
          collapseLabel
        />
        <Dropdown
          label="Tools"
          icon={Wrench}
          items={["Measure", "Cross-probe", "Keep-out Check"]}
          collapseLabel
        />
        <Dropdown
          label="Export Report"
          icon={Download}
          items={["PDF Report", "CSV Placement List"]}
          variant="primary"
          collapseLabel
        />
      </div>
    </div>
  );
}
