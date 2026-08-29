import React from "react";
import { Info } from "lucide-react";

interface CardProps {
  title?: string;
  /** small muted info affordance beside the title, as in the reference cards */
  showInfo?: boolean;
  /** right-aligned slot in the header, e.g. a "Reset" or "View All" link */
  action?: React.ReactNode;
  /** removes the body padding, for cards whose content manages its own edges */
  flush?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  showInfo = false,
  action,
  flush = false,
  className = "",
  children,
}: CardProps) {
  return (
    <section
      className={`flex flex-col rounded-xl border border-line bg-white ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            {title}
            {showInfo && (
              <Info
                className="h-3.5 w-3.5 text-ink-muted"
                aria-hidden="true"
              />
            )}
          </h2>
          {action}
        </header>
      )}
      <div className={flush ? "flex-1" : "flex-1 p-4"}>{children}</div>
    </section>
  );
}
