import React from "react";
import { Badge } from "../../components/UI/Badge";
import { Card } from "../../components/UI/Card";
import { getComponents } from "../../services/boardService";
import { useSelection } from "../../store/useViewer";
import type { PlacementIssue } from "../../types";

/**
 * Issues are keyed by refDes, so a row can jump the 3D view to the offending
 * part when one exists in the modelled subset.
 */
export function PlacementIssuesTable({ issues }: { issues: PlacementIssue[] }) {
  const { select } = useSelection();
  const components = getComponents();

  const selectByRef = (reference: string) => {
    const match = components.find((c) => c.refDes === reference);
    if (match) select(match.id);
  };

  return (
    <Card
      title="Placement Issues"
      showInfo
      flush
      action={
        <button
          type="button"
          className="text-xs font-medium text-brand hover:underline"
        >
          View All
        </button>
      }
    >
      {/* Scrolls inside the card so the page never scrolls sideways. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink-muted">
              <th scope="col" className="px-4 py-2 font-medium">
                #
              </th>
              <th scope="col" className="px-2 py-2 font-medium">
                Reference
              </th>
              <th scope="col" className="px-2 py-2 font-medium">
                Issue
              </th>
              <th scope="col" className="px-2 py-2 font-medium">
                Severity
              </th>
              <th scope="col" className="px-4 py-2 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr
                key={issue.id}
                onClick={() => selectByRef(issue.reference)}
                className="cursor-pointer border-b border-line/70 last:border-0 hover:bg-slate-50"
              >
                <td className="px-4 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-2 py-2.5 font-medium text-ink">
                  {issue.reference}
                </td>
                <td className="px-2 py-2.5 text-ink">{issue.issue}</td>
                <td className="px-2 py-2.5">
                  <Badge label={issue.severity} />
                </td>
                <td className="px-4 py-2.5">
                  <Badge label={issue.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
