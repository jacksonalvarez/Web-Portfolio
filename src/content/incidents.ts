export type Incident = {
  id: string;
  label: string;
  summary: string;
  skill: string;
};

export const incidents: Incident[] = [
  {
    id: "flaky-ci",
    label: "Flaky CI",
    summary: "Stabilized a pipeline that failed 30% of the time on unrelated PRs.",
    skill: "DevOps",
  },
  {
    id: "n-plus-one",
    label: "N+1 Queries",
    summary: "Cut API latency 4× by batching ORM calls and adding strategic indexes.",
    skill: "Backend",
  },
  {
    id: "zero-downtime",
    label: "Zero-Downtime Cutover",
    summary: "Migrated 2M rows with dual-write and feature-flagged rollback.",
    skill: "Architecture",
  },
  {
    id: "auth-breach",
    label: "Auth Token Leak",
    summary: "Rotated secrets, scoped JWTs, and added audit logging in 4 hours.",
    skill: "Security",
  },
  {
    id: "cache-stampede",
    label: "Cache Stampede",
    summary: "Added request coalescing and stale-while-revalidate under load spikes.",
    skill: "Performance",
  },
  {
    id: "mobile-crash",
    label: "Mobile Crash Loop",
    summary: "Traced a race condition to a singleton init order — fixed in one deploy.",
    skill: "Debugging",
  },
  {
    id: "schema-drift",
    label: "Schema Drift",
    summary: "Introduced migration gates and contract tests between services.",
    skill: "Platform",
  },
  {
    id: "observability-gap",
    label: "Blind Production",
    summary: "Shipped structured logging, trace IDs, and SLO dashboards in a sprint.",
    skill: "Observability",
  },
];
