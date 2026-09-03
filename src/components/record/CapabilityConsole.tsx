"use client";

import { useState } from "react";
import { capabilityGroups } from "@/content/profile";

export function CapabilityConsole() {
  const [activeId, setActiveId] = useState<
    (typeof capabilityGroups)[number]["id"]
  >(capabilityGroups[0].id);
  const active =
    capabilityGroups.find((group) => group.id === activeId) ??
    capabilityGroups[0];

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden border border-border lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-border bg-signal p-7 text-ink sm:p-10 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
              Capability console
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Range is useful.
              <br />
              Systems thinking connects it.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-ink/70">
              The stack changes with the problem. The operating model does not:
              understand the system, automate deliberately, and make the result
              observable.
            </p>
          </div>

          <div className="bg-panel">
            <div
              className="flex overflow-x-auto border-b border-border"
              role="tablist"
              aria-label="Capability groups"
            >
              {capabilityGroups.map((group, index) => (
                <button
                  key={group.id}
                  id={`tab-${group.id}`}
                  type="button"
                  role="tab"
                  aria-selected={group.id === activeId}
                  aria-controls={`panel-${group.id}`}
                  onClick={() => setActiveId(group.id)}
                  className={`min-w-max border-r border-border px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors sm:px-7 ${
                    group.id === activeId
                      ? "bg-foreground text-background"
                      : "text-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  0{index + 1} · {group.label}
                </button>
              ))}
            </div>

            <div
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              className="p-7 sm:p-10"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-signal">
                    ACTIVE SET / {active.label.toUpperCase()}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                    {active.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted">
                  {String(active.items.length).padStart(2, "0")} SIGNALS
                </span>
              </div>

              <div className="mt-10 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 xl:grid-cols-4">
                {active.items.map((item, index) => (
                  <div
                    key={item}
                    className="min-h-24 border-b border-r border-border p-4 transition-colors hover:bg-background sm:p-5"
                  >
                    <span className="font-mono text-[9px] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
