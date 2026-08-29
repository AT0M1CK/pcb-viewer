import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  /** renders the disclosure arrow for sections that have children */
  expandable?: boolean;
  expanded?: boolean;
  /** icon-only rail state */
  collapsed?: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({
  label,
  icon: Icon,
  active = false,
  expandable = false,
  expanded = false,
  collapsed = false,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      aria-expanded={expandable ? expanded : undefined}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
        active
          ? "bg-brand font-medium text-white"
          : "text-sidebar-muted hover:bg-sidebar-hover hover:text-white"
      } ${collapsed ? "justify-center px-2" : ""}`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{label}</span>
          {expandable && (
            <ChevronRight
              className={`h-4 w-4 shrink-0 transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
}

interface SidebarSubItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarSubItem({
  label,
  active = false,
  onClick,
}: SidebarSubItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-2 rounded-md py-1.5 pl-10 pr-3 text-left text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
        active
          ? "font-medium text-white"
          : "text-sidebar-muted hover:text-white"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          active ? "bg-brand" : "bg-transparent"
        }`}
        aria-hidden="true"
      />
      <span className="truncate">{label}</span>
    </button>
  );
}
