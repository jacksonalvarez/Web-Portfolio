import type { Metadata } from "next";
import { UnityArcade } from "@/components/arcade/UnityArcade";

export const metadata: Metadata = {
  title: "Arcade Lab",
  description:
    "Backrooms — a Unity WebGL horror exploration artifact, isolated from the professional record.",
};

export default function PlayPage() {
  return <UnityArcade />;
}
