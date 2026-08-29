import React from "react";
import type { ComponentStatus, IssueStatus, Severity } from "../../types";

type BadgeLabel = ComponentStatus | Severity | IssueStatus;

const TONE: Record<BadgeLabel, string> = {
  Verified: "bg-verified-bg text-verified",
  Warning: "bg-caution-bg text-[#b45309]",
  Critical: "bg-critical-bg text-critical",
  Open: "bg-info-bg text-info",
  "In Review": "bg-violet-100 text-violet-700",
  Resolved: "bg-verified-bg text-verified",
};

interface BadgeProps {
  label: BadgeLabel;
  className?: string;
}

/** Pill used for component status, issue severity, and issue workflow state. */
export function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${TONE[label]} ${className}`}
    >
      {label}
    </span>
  );
}

const DOT: Record<ComponentStatus, string> = {
  Verified: "bg-verified",
  Warning: "bg-caution",
  Critical: "bg-critical",
};

/** The legend row beneath the component detail panel. */
export function StatusDot({ status }: { status: ComponentStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
      <span className={`h-2 w-2 rounded-full ${DOT[status]}`} aria-hidden="true" />
      {status}
    </span>
  );
}
