import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";

const operatingLayers = [
  ["PRODUCT", "Next.js · SaaS · delivery"],
  ["SYSTEMS", "AWS · Azure AD · SCCM"],
  ["AUTOMATION", "Python · PowerShell · AI"],
  ["SECURITY", "SOC 2 · monitoring · operations"],
] as const;

export function ProfileHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="signal-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-5 sm:px-8 lg:px-12 lg:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>Professional record / JA-2026</span>
          <span className="flex items-center gap-2 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Charlotte signal online
          </span>
        </div>

        <div className="grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,0.9fr)] lg:gap-10 lg:py-10 xl:grid-cols-[minmax(0,1.05fr)_260px_minmax(0,0.95fr)]">
          <div>
            <p className="eyebrow">{profile.headline}</p>
            <h1 className="mt-3 text-[clamp(3.4rem,8vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Jackson
              <br />
              <span className="text-signal">Alvarez.</span>
            </h1>
          </div>

          <figure className="justify-self-start lg:justify-self-center">
            <div className="relative aspect-square w-44 overflow-hidden border border-signal/40 bg-panel sm:w-52 lg:w-[220px] xl:w-[248px]">
              <Image
                src="/jackson-alvarez.jpg"
                alt={`${profile.name} headshot`}
                fill
                priority
                sizes="(min-width: 1280px) 248px, (min-width: 1024px) 220px, 208px"
                className="object-cover object-[50%_18%]"
              />
              <span
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-signal/30"
                aria-hidden="true"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Identity capture / Charlotte
            </figcaption>
          </figure>

          <div className="max-w-[34rem] border-l border-border pl-6 lg:translate-y-1 lg:justify-self-center">
            <p className="text-lg leading-7 text-foreground sm:text-xl sm:leading-8">
              {profile.summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              {profile.extendedSummary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="bg-signal px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-strong"
              >
                Inspect the record
              </Link>
              <Link
                href="/resume"
                className="border border-border bg-panel px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground"
              >
                Print-ready résumé
              </Link>
              <a
                href="/Jackson-Alvarez-Resume.pdf"
                download
                className="px-3 py-3 font-mono text-xs text-muted transition-colors hover:text-foreground"
              >
                Download PDF
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-3 font-mono text-xs text-muted transition-colors hover:text-foreground"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {operatingLayers.map(([label, detail], index) => (
            <div
              key={label}
              className="group min-h-32 border-b border-r border-border bg-background/80 p-5 transition-colors hover:bg-panel"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] text-muted">
                  LAYER {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-2 w-2 bg-border transition-colors group-hover:bg-signal" />
              </div>
              <p className="mt-8 font-mono text-xs tracking-[0.12em]">{label}</p>
              <p className="mt-2 text-xs text-muted">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-track border-t border-border bg-signal py-3 text-ink">
        <div className="marquee-content font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span>8,000+ university devices</span>
          <span>400+ deployment packages</span>
          <span>10,000+ product SKUs</span>
          <span>Government workflow software</span>
          <span>Automation-first systems</span>
          <span aria-hidden="true">8,000+ university devices</span>
          <span aria-hidden="true">400+ deployment packages</span>
          <span aria-hidden="true">10,000+ product SKUs</span>
          <span aria-hidden="true">Government workflow software</span>
          <span aria-hidden="true">Automation-first systems</span>
        </div>
      </div>
    </section>
  );
}
