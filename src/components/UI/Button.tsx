import React from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "outline" | "ghost";

const VARIANT: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover border-brand",
  outline: "bg-white text-ink hover:bg-slate-50 border-line",
  ghost: "bg-transparent text-ink-muted hover:bg-slate-100 border-transparent",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: LucideIcon;
  /** hides the label below `sm`, keeping just the icon — used in the page header */
  collapseLabel?: boolean;
}

export function Button({
  variant = "outline",
  icon: Icon,
  collapseLabel = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${VARIANT[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      {children && (
        <span className={collapseLabel ? "hidden sm:inline" : undefined}>
          {children}
        </span>
      )}
    </button>
  );
}
