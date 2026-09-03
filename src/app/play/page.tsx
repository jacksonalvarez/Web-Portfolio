import type { Metadata } from "next";
import Link from "next/link";
import { GamePlayShell } from "./GamePlayShell";

export const metadata: Metadata = {
  title: "Play",
  description: "Production Mountain — jump incidents, smash case studies.",
};

export default function PlayPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="font-mono text-xs text-accent">ARCADE MODE</p>
            <h1 className="text-lg font-semibold">Production Mountain</h1>
          </div>
          <Link href="/work" className="text-sm text-muted hover:text-accent transition-colors">
            Skip to work →
          </Link>
        </div>
      </div>
      <GamePlayShell />
    </div>
  );
}
