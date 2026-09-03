export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  excerpt: string;
  stack: string[];
  featured: boolean;
  metrics: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "incident-response-platform",
    title: "Incident Response Platform",
    tagline: "From pager chaos to a 3-minute mean time to acknowledge.",
    excerpt:
      "Built an on-call workflow that routes, escalates, and documents incidents without a dedicated ops team.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    featured: true,
    metrics: [
      { label: "MTTA", value: "3 min" },
      { label: "False pages", value: "-62%" },
      { label: "Runbooks linked", value: "100%" },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Alerts fired into a Slack channel with no ownership model. Engineers missed pages, duplicated work, and postmortems never happened.",
      },
      {
        heading: "Approach",
        body: "Designed a state machine for incidents: open → acknowledged → mitigated → resolved. Webhook ingestion from monitoring tools, automatic escalation timers, and a single timeline per incident.",
      },
      {
        heading: "Outcome",
        body: "MTTA dropped from 18 minutes to 3. Every resolved incident links to a runbook diff. The team stopped dreading on-call.",
      },
    ],
  },
  {
    slug: "agentic-refactor",
    title: "Agentic Refactor at Scale",
    tagline: "Migrated 40k LOC with Cursor skills, not a big-bang rewrite.",
    excerpt:
      "Used agent skills and scoped rules to incrementally modernize a legacy React codebase without stopping feature work.",
    stack: ["React", "TypeScript", "Cursor", "Vitest"],
    featured: true,
    metrics: [
      { label: "Files migrated", value: "312" },
      { label: "Test coverage", value: "+28%" },
      { label: "Ship velocity", value: "unchanged" },
    ],
    sections: [
      {
        heading: "Problem",
        body: "A class-component monolith blocked new hires and slowed every PR. Leadership wanted migration; the team feared a freeze.",
      },
      {
        heading: "Approach",
        body: "Authored Cursor skills for component patterns, a11y, and test scaffolds. Migrated leaf components first; agents followed the same checklist every time.",
      },
      {
        heading: "Outcome",
        body: "312 files converted with zero feature freeze. Coverage rose 28%. New engineers onboard via skills instead of tribal knowledge.",
      },
    ],
  },
  {
    slug: "edge-caching-layer",
    title: "Edge Caching Layer",
    tagline: "Global p95 under 120ms without rewriting the origin.",
    excerpt:
      "Added a cache-aside layer at the edge with stale-while-revalidate and cache key normalization.",
    stack: ["Vercel", "Redis", "Node.js", "Cloudflare"],
    featured: true,
    metrics: [
      { label: "p95 latency", value: "118ms" },
      { label: "Origin load", value: "-74%" },
      { label: "Cache hit rate", value: "91%" },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Traffic spiked globally but origin lived in us-east-1. p95 exceeded 800ms for EU users during peak.",
      },
      {
        heading: "Approach",
        body: "Normalized cache keys, added SWR headers, and warmed hot paths on deploy. Invalidation via tag-based purge.",
      },
      {
        heading: "Outcome",
        body: "Global p95 landed at 118ms. Origin CPU dropped 74%. No application rewrite required.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((study) => study.featured);
}
