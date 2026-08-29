import React from "react";
import type { LucideIcon } from "lucide-react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: LucideIcon;
}

/** Labelled switch used by the Layer / Filter panel. */
export function Toggle({ label, checked, onChange, icon: Icon }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5">
      <span className="flex items-center gap-2 text-sm text-ink">
        {Icon && (
          <Icon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        )}
        {label}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
          checked ? "bg-brand" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
