"use client";

import { useRef, useState } from "react";

type UnityInstance = {
  SetFullscreen: (value: number) => void;
  Quit: () => Promise<void>;
};

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: {
        dataUrl: string;
        frameworkUrl: string;
        codeUrl: string;
        streamingAssetsUrl: string;
        companyName: string;
        productName: string;
        productVersion: string;
      },
      onProgress: (progress: number) => void,
    ) => Promise<UnityInstance>;
  }
}

const unityConfig = {
  loaderUrl: process.env.NEXT_PUBLIC_UNITY_LOADER_URL,
  dataUrl: process.env.NEXT_PUBLIC_UNITY_DATA_URL,
  frameworkUrl: process.env.NEXT_PUBLIC_UNITY_FRAMEWORK_URL,
  codeUrl: process.env.NEXT_PUBLIC_UNITY_CODE_URL,
};

const configured = Object.values(unityConfig).every(Boolean);

export function UnityArcade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<UnityInstance | null>(null);
  const [status, setStatus] = useState<
    "cartridge-missing" | "idle" | "loading" | "running" | "error"
  >(configured ? "idle" : "cartridge-missing");
  const [progress, setProgress] = useState(0);

  async function loadGame() {
    if (!configured || !canvasRef.current || !unityConfig.loaderUrl) return;

    setStatus("loading");
    setProgress(0);

    try {
      if (!window.createUnityInstance) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = unityConfig.loaderUrl!;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Unity loader failed to load."));
          document.body.appendChild(script);
        });
      }

      if (!window.createUnityInstance) {
        throw new Error("Unity loader did not expose createUnityInstance.");
      }

      instanceRef.current = await window.createUnityInstance(
        canvasRef.current,
        {
          dataUrl: unityConfig.dataUrl!,
          frameworkUrl: unityConfig.frameworkUrl!,
          codeUrl: unityConfig.codeUrl!,
          streamingAssetsUrl: "StreamingAssets",
          companyName: "Jackson Alvarez",
          productName: "Production Mountain",
          productVersion: "1.0",
        },
        setProgress,
      );
      setStatus("running");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[#090a0d] text-[#f3f0e8]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 border-y border-[#30343b] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#c8ff45]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
              Arcade laboratory / Build slot 01
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
            Runtime: Unity WebGL · Load policy: explicit
          </span>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="relative aspect-video overflow-hidden border border-[#30343b] bg-black">
              <canvas
                ref={canvasRef}
                className={`h-full w-full ${status === "running" ? "block" : "invisible"}`}
                aria-label="Production Mountain Unity game"
              />

              {status !== "running" && (
                <div className="absolute inset-0 grid place-items-center p-6">
                  <div className="w-full max-w-xl text-center">
                    <div className="mx-auto mb-8 grid h-28 w-48 place-items-center border border-[#4b515b] bg-[#14161b]">
                      <div className="h-3 w-28 border border-[#4b515b] bg-black">
                        <div
                          className="h-full bg-[#c8ff45] transition-[width]"
                          style={{
                            width:
                              status === "loading"
                                ? `${Math.max(progress * 100, 3)}%`
                                : "0%",
                          }}
                        />
                      </div>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8ff45]">
                      {status === "cartridge-missing"
                        ? "Cartridge bay empty"
                        : status === "loading"
                          ? `Loading build · ${Math.round(progress * 100)}%`
                          : status === "error"
                            ? "Build failed integrity check"
                            : "Cartridge detected"}
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
                      Production Mountain
                    </h1>
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#9ca3af]">
                      A real game belongs in a real game runtime. The disposable
                      Three.js prototype is gone; this bay is ready for an
                      exported Unity WebGL build and loads it only when a visitor
                      asks.
                    </p>

                    {status === "idle" && (
                      <button
                        type="button"
                        onClick={loadGame}
                        className="mt-7 bg-[#c8ff45] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white"
                      >
                        Insert cartridge & load
                      </button>
                    )}
                    {status === "error" && (
                      <button
                        type="button"
                        onClick={loadGame}
                        className="mt-7 border border-[#c8ff45] px-6 py-3 text-sm font-semibold text-[#c8ff45]"
                      >
                        Retry load
                      </button>
                    )}
                  </div>
                </div>
              )}

              {status === "running" && (
                <button
                  type="button"
                  onClick={() => instanceRef.current?.SetFullscreen(1)}
                  className="absolute bottom-3 right-3 border border-white/30 bg-black/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em]"
                >
                  Fullscreen
                </button>
              )}
            </div>
          </div>

          <aside className="border border-[#30343b] bg-[#111318] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8ff45]">
              Build brief
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              The game is an artifact, not navigation.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#9ca3af]">
              Hiring managers can read the complete professional record without
              downloading a game. Players opt into a richer, heavier experience.
            </p>

            <dl className="mt-8 space-y-5 border-t border-[#30343b] pt-6">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6b7280]">
                  Concept
                </dt>
                <dd className="mt-1 text-sm">
                  Climb a failing production stack. Dodge incidents. Convert
                  chaos into shipped systems.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6b7280]">
                  Runtime
                </dt>
                <dd className="mt-1 text-sm">Unity WebGL · desktop first</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6b7280]">
                  Performance contract
                </dt>
                <dd className="mt-1 text-sm">
                  No homepage payload · user-initiated load · compressed build
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6b7280]">
                  Status
                </dt>
                <dd className="mt-1 text-sm text-[#c8ff45]">
                  {configured ? "Build configured" : "Awaiting Unity export"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
