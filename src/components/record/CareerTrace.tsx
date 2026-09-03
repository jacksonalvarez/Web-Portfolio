"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/content/profile";

export function CareerTrace() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id.replace("trace-", ""));
        }
      },
      { rootMargin: "-18% 0px -52% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    Object.values(itemRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  function jumpTo(id: string) {
    itemRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const activeIndex = experience.findIndex((item) => item.id === activeId);

  return (
    <section id="record" className="border-y border-border bg-panel">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Career flight recorder</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Four environments.
              <br />
              One systems mindset.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Scroll the record. Each stop shows the operating context, the work,
            and the signal it produced.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="top-24 z-20 self-start bg-panel lg:sticky">
            <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span>Trace position</span>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(experience.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="mb-7 h-1 overflow-hidden bg-border"
              aria-hidden="true"
            >
              <div
                className="h-full bg-signal transition-[width] duration-500"
                style={{
                  width: `${((activeIndex + 1) / experience.length) * 100}%`,
                }}
              />
            </div>

            <nav
              aria-label="Career timeline"
              className="flex snap-x gap-2 overflow-x-auto pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0"
            >
              {experience.map((item, index) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpTo(item.id)}
                    aria-current={active ? "step" : undefined}
                    className={`group min-w-[220px] snap-start border p-4 text-left transition-colors lg:min-w-0 lg:w-full ${
                      active
                        ? "border-signal bg-signal text-ink"
                        : "border-transparent text-muted hover:border-border hover:bg-background hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] ${
                        active ? "text-ink/60" : "text-signal"
                      }`}
                    >
                      LOG {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block text-sm font-semibold">
                      {item.organization}
                    </span>
                    <span
                      className={`mt-1 block text-xs ${
                        active ? "text-ink/70" : "text-muted"
                      }`}
                    >
                      {item.period}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div>
            {experience.map((item, index) => (
              <article
                key={item.id}
                id={`trace-${item.id}`}
                ref={(element) => {
                  itemRefs.current[item.id] = element;
                }}
                className="flex min-h-[78vh] scroll-mt-28 items-center border-b border-border py-12 last:border-b-0 lg:py-20"
              >
                <div className="w-full">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                      Record {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="font-mono text-xs text-muted">{item.period}</p>
                  </div>

                  <h3 className="mt-7 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                    {item.role}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="font-semibold text-foreground">
                      {item.organization}
                    </span>
                    <span className="text-muted">{item.location}</span>
                  </div>

                  <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
                    {item.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.signals.map((signal) => (
                      <span
                        key={signal}
                        className="border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-10 grid gap-x-10 gap-y-5 xl:grid-cols-2">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlight}
                        className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-muted"
                      >
                        <span className="font-mono text-[10px] text-signal">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
