import React from "react";
import { RefreshCw, Settings } from "lucide-react";
import type { BoardMeta } from "../../types";

export function Footer({ board }: { board: BoardMeta }) {
  return (
    <footer className="flex flex-col gap-2 border-t border-line bg-white px-4 py-3 text-xs text-ink-muted sm:flex-row sm:items-center sm:gap-6 lg:px-6">
      <span>
        Project: <span className="font-medium text-ink">{board.project}</span>
      </span>
      <span>
        Revision: <span className="font-medium text-ink">{board.revision}</span>
      </span>
      <span className="flex items-center gap-1.5">
        Last Updated:{" "}
        <span className="font-medium text-ink">
          {board.lastUpdated} by {board.updatedBy}
        </span>
        <RefreshCw className="h-3 w-3" aria-hidden="true" />
      </span>
      <span className="flex items-center gap-1.5 sm:ml-auto">
        Units: <span className="font-medium text-ink">{board.units}</span>
        <Settings className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </footer>
  );
}
