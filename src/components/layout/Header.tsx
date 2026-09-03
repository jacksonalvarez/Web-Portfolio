import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center bg-signal font-mono text-[10px] font-black text-ink">
            JA
          </span>
          <span className="hidden font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors group-hover:text-signal sm:block">
            {site.name} / Systems record
          </span>
        </Link>

        <nav className="flex items-center">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-l border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:bg-signal hover:text-ink sm:px-4 ${
                item.label === "Studio" || item.label === "Résumé"
                  ? "hidden md:inline-flex"
                  : "inline-flex"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
