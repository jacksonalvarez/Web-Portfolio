import type { Metadata } from "next";
import { UnityArcade } from "@/components/arcade/UnityArcade";

export const metadata: Metadata = {
  title: "Arcade Lab",
  description:
    "Production Mountain — an optional Unity WebGL game artifact, isolated from the professional record.",
};

export default function PlayPage() {
  return <UnityArcade />;
}
