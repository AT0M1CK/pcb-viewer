import React from "react";
import { FileText } from "lucide-react";
import { BoardViewer } from "../../components/3D/BoardViewer";
import { PageHeader } from "../../components/Layout/PageHeader";
import { Dropdown } from "../../components/UI/Dropdown";
import { getBoardMeta, getIssues } from "../../services/boardService";
import { PlacementIssuesTable } from "../board/PlacementIssuesTable";
import { PlacementSummaryCard } from "../board/PlacementSummaryCard";
import { LayerFilterPanel } from "./LayerFilterPanel";
import { SelectedComponentPanel } from "./SelectedComponentPanel";
import { ViewportToolbar } from "./ViewportToolbar";

/**
 * The dashboard.
 *
 * Two responsive tiers: the viewport and detail panel sit side by side from
 * `lg`, and the three analysis cards go 1 -> 2 -> 3 columns as space allows.
 * The canvas wrapper carries an explicit viewport-relative height because r3f
 * collapses to zero inside a percentage-height parent.
 */
export function ViewerPage() {
  const board = getBoardMeta();
  const issues = getIssues();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader />

      {/* grid-cols-1 is load-bearing, not decoration: without an explicit
          template the single mobile column is `auto`-sized, so its floor is the
          items' min-content and any wide child (the issues table) widens the
          whole page. `grid-cols-1` compiles to minmax(0, 1fr), floor 0. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* min-h clears the ~328px vertical toolbar plus its 12px insets, so
            the rail is never clipped by the overflow-hidden on short screens. */}
        <div className="relative h-[50vh] min-h-[360px] overflow-hidden rounded-xl border border-line bg-white lg:col-span-2 lg:h-[58vh]">
          <div className="absolute left-3 top-3 z-10 hidden sm:block">
            <Dropdown
              label={board.file}
              icon={FileText}
              items={[board.file, "ACME_CTRL_V1.1.PCB", "ACME_PSU_V2.0.PCB"]}
              variant="bare"
              className="ml-[68px]"
            />
          </div>
          <ViewportToolbar />
          <BoardViewer board={board} />
        </div>

        <div className="lg:h-[58vh] lg:overflow-y-auto">
          <SelectedComponentPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <PlacementSummaryCard summary={board.summary} />
        <LayerFilterPanel />
        <div className="md:col-span-2 xl:col-span-1">
          <PlacementIssuesTable issues={issues} />
        </div>
      </div>
    </div>
  );
}
