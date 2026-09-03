import { projects } from "@/content/profile";

const statusLabel = {
  shipped: "SHIPPED",
  research: "RESEARCH",
  evolving: "IN MOTION",
} as const;

export function ProjectRail() {
  return (
    <section id="projects" className="overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/55">
              Selected artifacts
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Things I made
              <br />
              to learn or solve.
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/50">
            Drag / shift + scroll
          </p>
        </div>

        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          {projects.map((project, index) => {
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-signal">
                    ARTIFACT {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="border border-background/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-background/60">
                    {statusLabel[project.status]}
                  </span>
                </div>

                <div className="mt-auto pt-24">
                  <h3 className="text-3xl font-semibold tracking-[-0.035em]">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-background/70">
                    {project.description}
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-background/50">
                    {project.detail}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="bg-background px-2.5 py-1 font-mono text-[10px] text-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-background/20 pt-4 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-background/45">
                    {project.href ? "Open repository" : "Private / offline artifact"}
                  </span>
                  {project.href && <span aria-hidden="true">↗</span>}
                </div>
              </>
            );

            const className =
              "flex min-h-[520px] w-[88vw] max-w-[610px] flex-none snap-center flex-col border border-background/20 bg-[#17191d] p-6 transition-colors hover:border-signal sm:p-8";

            return project.href ? (
              <a
                key={project.slug}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <article key={project.slug} className={className}>
                {content}
              </article>
            );
          })}
          <div className="w-[5vw] flex-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
