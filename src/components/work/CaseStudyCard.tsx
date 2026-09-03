import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40">
      <p className="font-mono text-xs text-accent">{study.stack.join(" · ")}</p>
      <h3 className="mt-2 text-xl font-semibold group-hover:text-accent transition-colors">
        <Link href={`/work/${study.slug}`}>{study.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{study.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="rounded border border-border px-3 py-1.5">
            <p className="font-mono text-[10px] text-muted">{metric.label}</p>
            <p className="text-sm font-semibold text-success">{metric.value}</p>
          </div>
        ))}
      </div>
      <Link
        href={`/work/${study.slug}`}
        className="mt-4 inline-block text-sm text-accent hover:underline"
      >
        Read case study →
      </Link>
    </article>
  );
}
