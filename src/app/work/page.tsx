import type { Metadata } from "next";
import { CareerTrace } from "@/components/record/CareerTrace";
import { ProjectRail } from "@/components/record/ProjectRail";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Professional Record",
  description:
    "Jackson Alvarez's professional experience across software engineering, automation, infrastructure, and security.",
};

export default function WorkPage() {
  return (
    <>
      <section className="signal-grid border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow">Full professional record</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Software is only
              <br />
              one layer of the system.
            </h1>
            <p className="border-l border-signal pl-5 text-lg leading-8 text-muted">
              {profile.extendedSummary}
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span className="border border-border bg-background px-3 py-2">
              Higher education
            </span>
            <span className="border border-border bg-background px-3 py-2">
              Government-adjacent SaaS
            </span>
            <span className="border border-border bg-background px-3 py-2">
              Product engineering
            </span>
            <span className="border border-border bg-background px-3 py-2">
              Automation ventures
            </span>
          </div>
      </div>
      </section>
      <CareerTrace />
      <ProjectRail />
    </>
  );
}
