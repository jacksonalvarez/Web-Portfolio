"use client";

import dynamic from "next/dynamic";

export const GamePreview = dynamic(
  () =>
    import("@/components/game/ProductionMountain").then(
      (mod) => mod.ProductionMountain,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-lg border border-border bg-surface">
        <p className="font-mono text-sm text-muted">Loading Production Mountain…</p>
      </div>
    ),
  },
);

export const GameFullscreen = dynamic(
  () =>
    import("@/components/game/ProductionMountain").then(
      (mod) => mod.ProductionMountain,
    ),
  { ssr: false },
);
