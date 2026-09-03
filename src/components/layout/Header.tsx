import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-[pulse-glow_2s_ease-in-out_infinite]" />
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
