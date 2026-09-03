import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-xs text-muted">
            {site.name} · Session-only game state · No database
          </p>
          <p className="mt-1 text-xs text-muted">
            Built with Next.js, R3F, GitHub API, EmailJS, Vercel
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="/work" className="text-muted hover:text-accent transition-colors">
            Skip to work
          </Link>
          <a
            href={`https://github.com/${site.author.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
