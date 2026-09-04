import Link from "next/link";
import { ProfileHero } from "@/components/record/ProfileHero";
import { CareerTrace } from "@/components/record/CareerTrace";
import { CapabilityConsole } from "@/components/record/CapabilityConsole";
// import { ProjectRail } from "@/components/record/ProjectRail";
import { buildPrinciples, profile } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <ProfileHero />
      <CareerTrace />

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12 lg:py-32">
          <div>
            <p className="eyebrow">Origin signal</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Curiosity became a systems practice.
            </h2>
            <div className="mt-8 border-l border-signal pl-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Education
              </p>
              <p className="mt-3 font-semibold">{profile.education.degree}</p>
              <p className="text-sm text-muted">{profile.education.minor}</p>
              <p className="mt-2 text-sm text-muted">
                {profile.education.school} · {profile.education.completed}
              </p>
            </div>
          </div>

          <div className="space-y-7 text-lg leading-8 text-muted">
            {profile.story.map((paragraph, index) => (
              <p key={paragraph}>
                <span className="mr-4 font-mono text-[10px] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* <ProjectRail /> */}
      <CapabilityConsole />

      <section className="bg-panel">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="eyebrow">Build protocol</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                How I approach the work.
              </h2>
            </div>
            <div className="grid border-l border-t border-border sm:grid-cols-2">
              {buildPrinciples.map((principle) => (
                <article
                  key={principle.index}
                  className="min-h-56 border-b border-r border-border p-6 transition-colors hover:bg-background sm:p-8"
                >
                  <span className="font-mono text-[10px] text-signal">
                    {principle.index}
                  </span>
                  <h3 className="mt-12 text-xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-signal text-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
              Open channel
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Have a system worth untangling?
            </h2>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/contact"
              className="bg-ink px-5 py-3 text-sm font-semibold text-foreground"
            >
              Start a conversation
            </Link>
            <Link
              href="/play"
              className="border border-ink px-5 py-3 text-sm font-semibold"
            >
              Enter Arcade Lab
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
