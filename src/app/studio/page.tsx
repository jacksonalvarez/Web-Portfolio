import type { Metadata } from "next";
import { site } from "@/content/site";
import { fetchPinnedRepos } from "@/lib/github";
import { RepoGrid } from "@/components/studio/RepoGrid";

export const metadata: Metadata = {
  title: "Studio",
  description: "How this portfolio was built — stack, workflow, and live GitHub activity.",
};

export default async function StudioPage() {
  const repos = await fetchPinnedRepos(site.author.github);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs text-accent">STUDIO LOG</p>
      <h1 className="mt-2 text-3xl font-bold">How this site was built</h1>
      <p className="mt-4 max-w-2xl text-muted leading-relaxed">
        A portfolio that practices what it preaches: content in git, contact via
        EmailJS, live proof from GitHub, and a Three.js arcade that resets on
        refresh. No database. No AWS. Deployed on Vercel.
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-sm text-accent">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {site.studio.stack.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-sm text-accent">Agentic workflow</h2>
        <ul className="mt-4 space-y-3">
          {site.studio.workflow.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted">
              <span className="text-accent">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-sm text-accent">Live from GitHub</h2>
        <p className="mt-2 text-sm text-muted">
          Pinned repos for @{site.author.github} — fetched at build/revalidate time, not stored.
        </p>
        <div className="mt-6">
          <RepoGrid repos={repos} />
        </div>
      </section>
    </div>
  );
}
