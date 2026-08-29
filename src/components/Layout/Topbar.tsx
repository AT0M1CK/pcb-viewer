import React from "react";
import { Bell, Building2, HelpCircle, Menu, Search } from "lucide-react";
import { Dropdown } from "../UI/Dropdown";

const BREADCRUMB = ["NPI", "Product Understanding", "3D Component Placement"];

interface TopbarProps {
  onOpenNav: () => void;
}

export function Topbar({ onOpenNav }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        className="rounded-lg p-2 text-ink-muted hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb — collapses to the current page on small screens. */}
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-2 text-sm">
          {BREADCRUMB.map((crumb, i) => {
            const isLast = i === BREADCRUMB.length - 1;
            return (
              <li
                key={crumb}
                className={`flex items-center gap-2 ${
                  isLast ? "min-w-0" : "hidden lg:flex"
                }`}
              >
                <span
                  className={
                    isLast
                      ? "truncate font-medium text-ink"
                      : i === 0
                        ? "text-brand"
                        : "text-ink-muted"
                  }
                >
                  {crumb}
                </span>
                {!isLast && (
                  <span className="text-ink-muted" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="ml-auto flex items-center gap-2 lg:gap-3">
        <Dropdown
          label="ACME Circuits · EMS"
          icon={Building2}
          items={["ACME Circuits · EMS", "Northwind Devices", "Helios Robotics"]}
          className="hidden xl:block"
        />

        {/* Search: full field on desktop, icon-only below lg. */}
        <label className="relative hidden lg:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search components, refs, nets..."
            aria-label="Search components, refs, nets"
            className="w-56 rounded-lg border border-line py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand xl:w-72"
          />
        </label>
        <button
          type="button"
          className="rounded-lg p-2 text-ink-muted hover:bg-slate-100 lg:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="relative rounded-lg p-2 text-ink-muted hover:bg-slate-100"
          aria-label="Notifications, 6 unread"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-semibold text-white">
            6
          </span>
        </button>

        <button
          type="button"
          className="hidden rounded-lg p-2 text-ink-muted hover:bg-slate-100 sm:block"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <div className="relative shrink-0">
          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-xs font-semibold text-white"
            aria-label="Signed in as RK"
          >
            RK
          </span>
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-verified"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
