import React from "react";
import type { LucideIcon } from "lucide-react";
import type { SummaryTile } from "../../hooks/usePlacementSummary";

const DETAIL_TONE: Record<SummaryTile["tone"], string> = {
  neutral: "text-ink-muted",
  positive: "text-verified",
  caution: "text-caution",
  info: "text-brand",
};

const ICON_TONE: Record<SummaryTile["tone"], string> = {
  neutral: "text-ink-muted",
  positive: "text-verified",
  caution: "text-caution",
  info: "text-brand",
};

interface StatTileProps {
  tile: SummaryTile;
  icon: LucideIcon;
}

export function StatTile({ tile, icon: Icon }: StatTileProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-line px-2 py-3 text-center">
      <Icon className={`h-4 w-4 ${ICON_TONE[tile.tone]}`} aria-hidden="true" />
      <span className="text-[11px] leading-tight text-ink-muted">
        {tile.label}
      </span>
      <span className="text-lg font-semibold leading-none text-ink">
        {tile.value}
      </span>
      <span className={`text-[11px] ${DETAIL_TONE[tile.tone]}`}>
        {tile.detail}
      </span>
    </div>
  );
}
