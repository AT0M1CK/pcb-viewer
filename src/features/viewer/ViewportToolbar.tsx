import React from "react";
import {
  Box,
  Maximize2,
  RotateCw,
  Square,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";
import { useCameraView } from "../../store/useViewer";

interface ToolProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function Tool({ icon: Icon, label, active = false, onClick }: ToolProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-md p-2 text-[10px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-full sm:flex-none sm:px-2 sm:py-1.5 ${
        active
          ? "bg-brand/10 text-brand"
          : "text-ink-muted hover:bg-slate-100 hover:text-ink"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {/* Icon-only below sm; aria-label and title carry the name there. */}
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}

/**
 * The floating control rail over the viewport.
 *
 * This is DOM positioned above the canvas rather than scene geometry, so it
 * lives with the feature rather than in `components/3D`.
 *
 * The labelled vertical rail is ~328px tall, which overflows the viewport on a
 * phone — 50vh of a 667px screen is 333px, less the 12px inset — and the last
 * button gets clipped by the parent's `overflow-hidden`. Below `sm` it becomes
 * a horizontal icon-only strip instead, which also stops it covering a fifth
 * of an already narrow canvas.
 */
export function ViewportToolbar() {
  const {
    view,
    autoRotate,
    setView,
    toggleAutoRotate,
    zoomIn,
    zoomOut,
    fit,
  } = useCameraView();

  return (
    <div className="absolute inset-x-3 top-3 z-10 flex flex-row items-stretch gap-0.5 rounded-lg border border-line bg-white/95 p-1 shadow-sm backdrop-blur sm:inset-x-auto sm:left-3 sm:w-14 sm:flex-col">
      <Tool
        icon={RotateCw}
        label="Rotate"
        active={autoRotate}
        onClick={toggleAutoRotate}
      />
      <Tool icon={ZoomIn} label="Zoom +" onClick={zoomIn} />
      <Tool icon={ZoomOut} label="Zoom −" onClick={zoomOut} />
      <Tool icon={Maximize2} label="Fit" onClick={fit} />

      <span
        className="mx-0.5 w-px self-stretch bg-line sm:mx-0 sm:my-0.5 sm:h-px sm:w-auto"
        aria-hidden="true"
      />

      <Tool
        icon={Square}
        label="Top"
        active={view === "top"}
        onClick={() => setView("top")}
      />
      <Tool
        icon={Square}
        label="Side"
        active={view === "side"}
        onClick={() => setView("side")}
      />
      <Tool
        icon={Box}
        label="ISO"
        active={view === "iso"}
        onClick={() => setView("iso")}
      />
    </div>
  );
}
