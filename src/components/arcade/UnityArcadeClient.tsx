"use client";

import nextDynamic from "next/dynamic";

const UnityArcade = nextDynamic(
  () =>
    import("@/components/arcade/UnityArcade").then(
      (module) => module.UnityArcade,
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className="min-h-[calc(100vh-4rem)] bg-[#090a0d]"
        aria-busy="true"
        aria-label="Loading Arcade Lab"
      />
    ),
  },
);

export function UnityArcadeClient() {
  return <UnityArcade />;
}
