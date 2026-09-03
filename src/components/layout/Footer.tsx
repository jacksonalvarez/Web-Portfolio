import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer mt-auto border-t border-border bg-panel">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
            End of record
          </p>
          <p className="mt-3 max-w-lg text-sm text-muted">
            {site.author.name} · {site.author.role}
            <br />
            Content in git. Contact through EmailJS. No visitor database.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
          <Link href="/resume" className="text-muted transition-colors hover:text-signal">
            Résumé
          </Link>
          <Link href="/contact" className="text-muted transition-colors hover:text-signal">
            Contact
          </Link>
          <a
            href={`https://github.com/${site.author.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-signal"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
