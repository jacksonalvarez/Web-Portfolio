import type { Metadata } from "next";
import { site } from "@/content/site";
import { fetchPinnedRepos } from "@/lib/github";
import { RepoGrid } from "@/components/studio/RepoGrid";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "The architecture and agentic workflow behind Jackson Alvarez's portfolio.",
};

const passes = [
  {
    id: "01",
    name: "Recover",
    body: "Mine the previous Git history and résumé for verified facts. Separate evidence from invented placeholder copy.",
  },
  {
    id: "02",
    name: "Challenge",
    body: "Audit the interaction honestly. Remove the unplayable Three.js prototype instead of polishing a weak premise.",
  },
  {
    id: "03",
    name: "Model",
    body: "Represent experience, projects, skills, and education once as typed content, then render the same truth in multiple formats.",
  },
  {
    id: "04",
    name: "Verify",
    body: "Build, lint, test responsive states, and keep the heavyweight Unity artifact outside the critical path.",
  },
] as const;

export default async function StudioPage() {
  const repos = await fetchPinnedRepos(site.author.github);

  return (
    <>
      <section className="signal-grid border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow">Studio log / build record</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              Agentic does not mean
              <br />
              unattended.
            </h1>
            <p className="border-l border-signal pl-5 text-lg leading-8 text-muted">
              This site is an exercise in directed iteration: recover the truth,
              challenge weak output, encode the system, and verify the result.
              The human still owns taste and direction.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="grid border-l border-t border-border md:grid-cols-2 xl:grid-cols-4">
            {passes.map((pass) => (
              <article
                key={pass.id}
                className="min-h-72 border-b border-r border-border p-6 sm:p-8"
              >
                <span className="font-mono text-xs text-signal">{pass.id}</span>
                <h2 className="mt-16 text-2xl font-semibold">{pass.name}</h2>
                <p className="mt-4 text-sm leading-6 text-muted">{pass.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
              Small surface.
              <br />
              Explicit boundaries.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              There is no portfolio database. Git is the content source, GitHub
              is a live public signal, and EmailJS is the only message transport.
              Unity loads only after an explicit click.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {site.studio.stack.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-panel px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  {item}
                </span>
              ))}
            </div>
            <ol className="mt-8 border-t border-border">
              {site.studio.workflow.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[34px_1fr] gap-4 border-b border-border py-5 text-sm leading-6 text-muted"
                >
                  <span className="font-mono text-[10px] text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-panel">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Live repository signal</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                Recently touched on GitHub
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              @{site.author.github} · refreshed hourly · not stored
            </p>
          </div>
          <div className="mt-8">
            <RepoGrid repos={repos} />
          </div>
        </div>
      </section>
    </>
  );
}
