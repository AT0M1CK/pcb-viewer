import React from "react";
import { CheckCircle2, MousePointerClick, MoreVertical } from "lucide-react";
import { Badge, StatusDot } from "../../components/UI/Badge";
import { getComponents } from "../../services/boardService";
import { useSelection } from "../../store/useViewer";
import type { Component, ComponentStatus } from "../../types";
import {
  formatDegrees,
  formatMm,
  formatTolerance,
} from "../../utils/format";

const LEGEND: ComponentStatus[] = ["Verified", "Warning", "Critical"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-[5px] text-[13px]">
      <span className="w-[42%] shrink-0 text-ink-muted">{label}</span>
      <span className="shrink-0 text-ink-muted" aria-hidden="true">
        :
      </span>
      <span className="min-w-0 flex-1 break-words font-medium text-ink">
        {children}
      </span>
    </div>
  );
}

/**
 * Stand-in for the package photograph in the reference.
 *
 * No real part imagery ships with this build, so the package is drawn instead
 * of showing a broken image — a dark body with pin ticks on all four sides.
 */
function PackageArt({ refDes }: { refDes: string }) {
  const pins = [0, 1, 2, 3, 4, 5, 6];

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-28 w-28"
      role="img"
      aria-label={`Illustration of the ${refDes} package`}
    >
      {pins.map((i) => {
        const offset = 26 + i * 11;
        return (
          <g key={i} fill="#94a3b8">
            <rect x={offset} y={16} width={5} height={10} rx={1} />
            <rect x={offset} y={94} width={5} height={10} rx={1} />
            <rect x={16} y={offset} width={10} height={5} rx={1} />
            <rect x={94} y={offset} width={10} height={5} rx={1} />
          </g>
        );
      })}
      <rect x={26} y={26} width={68} height={68} rx={5} fill="#1f2937" />
      <circle cx={38} cy={38} r={4} fill="#64748b" />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100">
        <MousePointerClick className="h-5 w-5 text-ink-muted" aria-hidden="true" />
      </span>
      <p className="text-sm font-medium text-ink">No component selected</p>
      <p className="max-w-[26ch] text-[13px] text-ink-muted">
        Click a part on the board, or one of the numbered pins, to inspect its
        placement.
      </p>
    </div>
  );
}

export function SelectedComponentPanel() {
  const { selectedId } = useSelection();
  const component: Component | undefined = getComponents().find(
    (c) => c.id === selectedId,
  );

  return (
    <section className="flex h-full flex-col rounded-xl border border-line bg-white">
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold text-ink">Selected Component</h2>
        <span className="flex items-center gap-2">
          {component?.status === "Verified" && (
            <CheckCircle2 className="h-4 w-4 text-verified" aria-hidden="true" />
          )}
          <MoreVertical className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        </span>
      </header>

      <div className="flex flex-1 flex-col p-4">
        {!component ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-ink">
                {component.refDes} — {component.name}
              </h3>
              <Badge label={component.status} />
            </div>

            <div className="my-3 grid place-items-center">
              <PackageArt refDes={component.refDes} />
            </div>

            <div className="divide-y divide-line/70">
              <Field label="Package">{component.package}</Field>
              <Field label="Placement Side">{component.side}</Field>
              <Field label="Rotation">{formatDegrees(component.rotation)}</Field>
              <Field label="X / Y Position (mm)">
                {formatMm(component.position.x)} / {formatMm(component.position.y)}
              </Field>
              <Field label="Height (mm)">{formatMm(component.height)}</Field>
              <Field label="Supplier">{component.supplier}</Field>
              <Field label="Part Number">{component.partNumber}</Field>
              <Field label="Status">
                <Badge label={component.status} />
              </Field>
              <Field label="Placement Tolerance">
                {formatTolerance(component.tolerance)}
              </Field>
              {component.notes && (
                <Field label="Notes">{component.notes}</Field>
              )}
            </div>
          </>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
          {LEGEND.map((status) => (
            <StatusDot key={status} status={status} />
          ))}
        </div>
      </div>
    </section>
  );
}
