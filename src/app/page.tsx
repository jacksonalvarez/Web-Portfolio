import Link from "next/link";
import { site } from "@/content/site";
import { getFeaturedCaseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { Button } from "@/components/ui/Button";
import { GamePreview } from "@/components/game/GameLoader";

export default function HomePage() {
  const featured = getFeaturedCaseStudies();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {site.author.role}
              {site.author.available && (
                <span className="ml-2 text-success">· Available</span>
              )}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {site.tagline}
            </h1>
            <p className="mt-4 max-w-lg text-muted leading-relaxed">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work">View case studies</Button>
              <Button href="/play" variant="secondary">
                Play Production Mountain
              </Button>
              <Button
                href={`https://github.com/${site.author.github}`}
                variant="ghost"
                external
              >
                GitHub
              </Button>
            </div>
          </div>

          <GamePreview />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">FEATURED WORK</p>
            <h2 className="mt-2 text-2xl font-semibold">Case studies worth reading</h2>
          </div>
          <Link href="/work" className="text-sm text-muted hover:text-accent transition-colors">
            All work →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs text-accent">HOW THIS SITE WORKS</p>
          <h2 className="mt-2 text-2xl font-semibold">No database. No retention.</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {site.studio.workflow.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-background px-4 py-3 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <Button href="/studio" variant="secondary">
            Read the studio log →
          </Button>
        </div>
      </section>
    </>
  );
}
