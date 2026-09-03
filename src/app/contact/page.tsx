import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — messages sent via EmailJS, nothing stored.",
};

export default function ContactPage() {
  return (
    <div className="signal-grid min-h-[calc(100vh-4rem)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28">
        <div>
          <p className="eyebrow">Open channel</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            Let&apos;s untangle
            <br />
            something real.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            Product engineering, automation architecture, production systems, or
            an idea that needs a technical operating model.
          </p>

          <dl className="mt-12 space-y-6 border-t border-border pt-6">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Based in
              </dt>
              <dd className="mt-2 text-sm">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Direct line
              </dt>
              <dd className="mt-2 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-signal hover:underline"
                >
                  {profile.email}
                </a>
                <br />
                <a
                  href={`tel:${profile.phone.replace(/-/g, "")}`}
                  className="text-muted hover:text-signal"
                >
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Elsewhere
              </dt>
              <dd className="mt-2 flex gap-4 font-mono text-xs">
                <a
                  href={`https://github.com/${profile.github}`}
                  className="text-muted transition-colors hover:text-signal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.linkedin}
                  className="text-muted transition-colors hover:text-signal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="self-start border border-border bg-panel p-6 sm:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              New transmission
            </p>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              EmailJS / no storage
            </span>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
