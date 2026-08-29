import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface DropdownProps {
  label: string;
  items: string[];
  icon?: LucideIcon;
  variant?: "primary" | "outline" | "bare";
  /** hides the label below `sm` so the header can shrink on mobile */
  collapseLabel?: boolean;
  className?: string;
}

const VARIANT: Record<NonNullable<DropdownProps["variant"]>, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover border-brand",
  outline: "bg-white text-ink hover:bg-slate-50 border-line",
  bare: "bg-white/90 text-ink hover:bg-white border-line shadow-sm",
};

/**
 * Menu trigger used for the project selector, the design-file picker and the
 * page-header actions. The items are inert — this is a UI shell over mock data,
 * so selecting one closes the menu without changing state.
 */
export function Dropdown({
  label,
  items,
  icon: Icon,
  variant = "outline",
  collapseLabel = false,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${VARIANT[variant]}`}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
        <span className={collapseLabel ? "hidden truncate sm:inline" : "truncate"}>
          {label}
        </span>
        <ChevronDown className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 z-30 mt-1 min-w-full whitespace-nowrap rounded-lg border border-line bg-white py-1 shadow-lg"
        >
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="w-full px-3 py-1.5 text-left text-sm text-ink hover:bg-slate-50"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
