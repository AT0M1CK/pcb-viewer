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
      className={`flex w-full flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        active
          ? "bg-brand/10 text-brand"
          : "text-ink-muted hover:bg-slate-100 hover:text-ink"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

/**
 * The floating control rail over the viewport.
 *
 * This is DOM positioned above the canvas rather than scene geometry, so it
 * lives with the feature rather than in `components/3D`.
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
    <div className="absolute left-3 top-3 z-10 flex w-14 flex-col gap-0.5 rounded-lg border border-line bg-white/95 p-1 shadow-sm backdrop-blur">
      <Tool
        icon={RotateCw}
        label="Rotate"
        active={autoRotate}
        onClick={toggleAutoRotate}
      />
      <Tool icon={ZoomIn} label="Zoom +" onClick={zoomIn} />
      <Tool icon={ZoomOut} label="Zoom −" onClick={zoomOut} />
      <Tool icon={Maximize2} label="Fit" onClick={fit} />

      <span className="my-0.5 border-t border-line" aria-hidden="true" />

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
