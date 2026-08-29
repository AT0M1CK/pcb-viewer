import React, { useState } from "react";
import { getBoardMeta } from "../../services/boardService";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Frame around the page: a sidebar that is a permanent rail from `lg` up and an
 * off-canvas drawer below it, plus the sticky topbar and the footer status bar.
 *
 * The content column is offset by the sidebar width with a left margin rather
 * than a grid, so the sticky topbar keeps working while the sidebar scrolls
 * independently.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const board = getBoardMeta();

  return (
    <div className="min-h-screen bg-page">
      <Sidebar
        open={navOpen}
        onClose={() => setNavOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />

      <div
        className={`drawer-transition flex min-h-screen flex-col transition-[margin] duration-200 ${
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        }`}
      >
        <Topbar onOpenNav={() => setNavOpen(true)} />
        <main className="flex-1 px-4 py-5 lg:px-6">{children}</main>
        <Footer board={board} />
      </div>
    </div>
  );
}
