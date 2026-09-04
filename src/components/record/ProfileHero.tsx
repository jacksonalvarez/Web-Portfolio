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
      <div className="signal-grid absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-5 sm:px-8 lg:px-12 lg:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>Professional record / JA-2026</span>
          <span className="flex items-center gap-2 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Charlotte signal online
          </span>
        </div>

        <div className="grid items-center gap-10 py-9 lg:grid-cols-[minmax(240px,0.78fr)_minmax(0,1.22fr)] lg:gap-16 lg:py-12">
          <figure className="relative mx-auto w-[min(100%,22rem)] lg:mx-0 lg:w-full lg:max-w-[22.5rem]">
            <span
              className="absolute -inset-x-3 top-8 -bottom-3 -z-10 rounded-[2rem] bg-portrait-moss/35"
              aria-hidden="true"
            />
            <span
              className="absolute -right-4 top-0 -z-10 hidden h-24 w-24 rounded-full bg-portrait-rose/20 blur-2xl sm:block"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <Image
                src="/jackson-alvarez.jpg"
                alt={`${profile.name} headshot`}
                width={960}
                height={1280}
                priority
                sizes="(min-width: 1024px) 360px, 88vw"
                className="aspect-[3/4] h-auto w-full object-cover object-[50%_18%]"
              />
            </div>
          </figure>

          <div className="flex flex-col justify-center lg:max-w-[40rem] lg:pt-2">
            <p className="eyebrow">{profile.headline}</p>
            <h1 className="mt-4 text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
              Jackson
              <br />
              <span className="text-signal">Alvarez.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground">
              {profile.summary}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              {profile.extendedSummary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
