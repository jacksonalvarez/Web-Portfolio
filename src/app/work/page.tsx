import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and production engineering write-ups.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs text-accent">CASE STUDIES</p>
      <h1 className="mt-2 text-3xl font-bold">Work</h1>
      <p className="mt-4 max-w-2xl text-muted leading-relaxed">
        Real problems, real outcomes. Each case study maps to a big barrel on
        Production Mountain — smash one in-game to unlock the summary.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
