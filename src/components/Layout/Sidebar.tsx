import React, { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Box,
  ChevronsLeft,
  Cpu,
  Factory,
  Home,
  Share2,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { SidebarNavItem, SidebarSubItem } from "./SidebarNavItem";

interface NavEntry {
  label: string;
  icon: LucideIcon;
  expandable?: boolean;
  children?: string[];
}

const NAV: NavEntry[] = [
  { label: "Home", icon: Home },
  { label: "NPI", icon: Box, expandable: true },
  { label: "Line Configuration", icon: Share2, expandable: true },
  { label: "Customer Requirements", icon: Users },
  {
    label: "Product Understanding",
    icon: Cpu,
    expandable: true,
    children: ["BOM Explorer", "2D Layout Viewer", "3D Placement Viewer"],
  },
  { label: "Reports & Dashboards", icon: BarChart3 },
  { label: "Knowledge Bank", icon: BookOpen },
  { label: "Mass Manufacturing", icon: Factory },
  { label: "Service Requests", icon: Wrench },
];

/** The one page this build actually implements. */
const ACTIVE_SECTION = "Product Understanding";
const ACTIVE_PAGE = "3D Placement Viewer";

interface SidebarProps {
  /** drawer visibility below `lg` */
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expanded, setExpanded] = useState<string | null>(ACTIVE_SECTION);

  const width = collapsed ? "w-[72px]" : "w-64";

  return (
    <>
      {/* Scrim — only below lg, where the sidebar is a drawer. */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`drawer-transition fixed inset-y-0 left-0 z-50 flex ${width} flex-col bg-sidebar transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-4">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white"
            aria-hidden="true"
          >
            <span className="text-lg font-bold text-brand">P</span>
          </span>
          {!collapsed && (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-bold tracking-wide text-white">
                PITRONIX
              </span>
              <span className="block truncate text-[9px] uppercase tracking-wider text-sidebar-muted">
                Engineering · Production · Excellence
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded p-1 text-sidebar-muted hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="scrollbar-slim flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {NAV.map((entry) => {
            const isSection = entry.label === ACTIVE_SECTION;
            const isExpanded = expanded === entry.label;

            return (
              <div key={entry.label}>
                <SidebarNavItem
                  label={entry.label}
                  icon={entry.icon}
                  active={isSection}
                  expandable={entry.expandable}
                  expanded={isExpanded}
                  collapsed={collapsed}
                  onClick={() =>
                    entry.expandable
                      ? setExpanded(isExpanded ? null : entry.label)
                      : undefined
                  }
                />
                {!collapsed && entry.children && isExpanded && (
                  <div className="mt-0.5 space-y-0.5">
                    {entry.children.map((child) => (
                      <SidebarSubItem
                        key={child}
                        label={child}
                        active={child === ACTIVE_PAGE}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Collapse control — desktop only; on mobile the drawer just closes. */}
        <div className="border-t border-white/10 px-3 py-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-hover hover:text-white lg:flex ${
              collapsed ? "justify-center px-2" : ""
            }`}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <ChevronsLeft
              className={`h-[18px] w-[18px] shrink-0 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
