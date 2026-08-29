/** A placement problem flagged against a component. */

export type Severity = "Warning" | "Critical";

export type IssueStatus = "Open" | "In Review" | "Resolved";

export interface PlacementIssue {
  id: string;
  /** refDes of the offending component, e.g. "C236" */
  reference: string;
  issue: string;
  severity: Severity;
  status: IssueStatus;
}
