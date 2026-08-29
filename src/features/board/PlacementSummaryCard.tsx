import React from "react";
import { CheckCircle2, Cpu, HelpCircle, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "../../components/UI/Card";
import { StatTile } from "../../components/UI/StatTile";
import { usePlacementSummary } from "../../hooks/usePlacementSummary";
import type { BoardSummary } from "../../types";

const TILE_ICON: Record<string, LucideIcon> = {
  total: Cpu,
  placed: CheckCircle2,
  unverified: HelpCircle,
  accuracy: Target,
};

export function PlacementSummaryCard({ summary }: { summary: BoardSummary }) {
  const tiles = usePlacementSummary(summary);

  return (
    <Card title="Placement Summary" showInfo>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <StatTile key={tile.id} tile={tile} icon={TILE_ICON[tile.id]} />
        ))}
      </div>
    </Card>
  );
}
