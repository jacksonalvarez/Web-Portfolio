"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { incidents } from "@/content/incidents";
import { caseStudies } from "@/content/case-studies";
import { getCaseStudy } from "@/content/case-studies";
import { Scene } from "./GameScene";
import { useGameState } from "./useGameState";
import Link from "next/link";

type ProductionMountainProps = {
  fullscreen?: boolean;
};

export function ProductionMountain({ fullscreen = false }: ProductionMountainProps) {
  const game = useGameState(incidents, caseStudies);
  const state = useSyncExternalStore(game.subscribe, game.getState, game.getState);
  const selectedStudy = state.selectedCaseStudy
    ? getCaseStudy(state.selectedCaseStudy)
    : null;

  return (
    <div
      className={`relative overflow-hidden border border-border bg-surface ${
        fullscreen ? "h-[calc(100vh-3.5rem)]" : "h-[420px] rounded-lg"
      }`}
    >
      <div className="crt-overlay absolute inset-0 z-10" />

      <Canvas
        camera={{ position: [0, 2.5, 12], fov: 45 }}
        className="!absolute inset-0"
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Scene getState={game.getState} />
          {!fullscreen && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 2, 0]}
            />
          )}
        </Suspense>
      </Canvas>

      <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between p-3">
        <div className="rounded-md border border-border bg-background/80 px-3 py-2 font-mono text-xs backdrop-blur-sm">
          <p className="text-accent">LEGACY: {state.anger.toUpperCase()}</p>
          <p className="text-muted">Score: {state.score}</p>
          {state.hasHammer && (
            <p className="text-success animate-pulse">HAMMER ACTIVE</p>
          )}
        </div>
        <button
          type="button"
          onClick={game.reset}
          className="rounded-md border border-border bg-background/80 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur-sm hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-border bg-background/80 p-3 backdrop-blur-sm">
        <p className="font-mono text-[10px] text-muted sm:text-xs">
          ← → move · Space jump · Jump incidents · Hammer smashes case studies
        </p>
        {state.solved.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {state.solved.slice(-5).map((label) => (
              <span
                key={label}
                className="rounded border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success"
              >
                ✓ {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {selectedStudy && (
        <div className="absolute inset-y-0 right-0 z-30 w-full max-w-sm border-l border-border bg-background/95 p-4 backdrop-blur-md sm:p-6">
          <button
            type="button"
            onClick={game.clearCaseStudy}
            className="mb-4 font-mono text-xs text-muted hover:text-foreground"
          >
            ← Back to mountain
          </button>
          <p className="font-mono text-xs text-accent">CASE STUDY UNLOCKED</p>
          <h3 className="mt-2 text-lg font-semibold">{selectedStudy.title}</h3>
          <p className="mt-2 text-sm text-muted">{selectedStudy.excerpt}</p>
          <Link
            href={`/work/${selectedStudy.slug}`}
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            Read full case study →
          </Link>
        </div>
      )}
    </div>
  );
}
