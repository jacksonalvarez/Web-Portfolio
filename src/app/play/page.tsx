import type { Metadata } from "next";
import { UnityArcadeClient } from "@/components/arcade/UnityArcadeClient";

export const dynamic = "force-static";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Arcade Lab",
  description:
    "Backrooms — a Unity WebGL horror exploration artifact, isolated from the professional record.",
};

export default function PlayPage() {
  return <UnityArcadeClient />;
}
