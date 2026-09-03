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
    <div className="grid gap-4 sm:grid-cols-2">
      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/40"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono text-sm font-semibold">{repo.name}</h3>
            {repo.language && (
              <span className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-muted">
                {repo.language}
              </span>
            )}
          </div>
          {repo.description && (
            <p className="mt-2 text-sm text-muted line-clamp-2">{repo.description}</p>
          )}
          <p className="mt-3 font-mono text-[10px] text-muted">
            ★ {repo.stargazers_count}
          </p>
        </a>
      ))}
    </div>
  );
}
