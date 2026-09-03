import type { GitHubRepo } from "@/lib/github";

export function RepoGrid({ repos }: { repos: GitHubRepo[] }) {
  if (repos.length === 0) {
    return (
      <p className="text-sm text-muted">
        GitHub activity unavailable. Set NEXT_PUBLIC_GITHUB_USERNAME to enable live repos.
      </p>
    );
  }

  return (
    <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, index) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-52 border-b border-r border-border bg-background p-5 transition-colors hover:bg-signal hover:text-ink"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-[9px] text-muted group-hover:text-ink/50">
              REPO {String(index + 1).padStart(2, "0")}
            </span>
            {repo.language && (
              <span className="border border-border px-2 py-0.5 font-mono text-[9px] text-muted group-hover:border-ink/25 group-hover:text-ink/60">
                {repo.language}
              </span>
            )}
          </div>
          <h3 className="mt-9 font-mono text-sm font-semibold">{repo.name}</h3>
          {repo.description && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted group-hover:text-ink/70">
              {repo.description}
            </p>
          )}
          <div className="mt-5 flex items-center justify-between font-mono text-[9px] text-muted group-hover:text-ink/60">
            <span>★ {repo.stargazers_count}</span>
            <span>OPEN ↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
