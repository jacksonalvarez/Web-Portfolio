import type { Metadata } from "next";
import { PrintButton } from "@/components/resume/PrintButton";
import {
  capabilityGroups,
  experience,
  profile,
  projects,
} from "@/content/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Professional résumé for ${profile.name}.`,
};

export default function ResumePage() {
  return (
    <div className="resume-page bg-[#e9e7df] py-10 text-[#111318] print:bg-white print:py-0">
      <div className="mx-auto mb-5 flex max-w-[900px] items-center justify-between px-5 print:hidden">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#555b65]">
          Live résumé · generated from site content
        </p>
        <div className="flex items-center gap-3">
          <a
            href="/Jackson-Alvarez-Resume.pdf"
            download
            className="print:hidden border border-[#111318] px-5 py-3 text-sm font-semibold"
          >
            Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto max-w-[900px] bg-white p-7 sm:p-12 print:max-w-none print:p-0">
        <header className="grid gap-6 border-b-2 border-[#111318] pb-7 sm:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.045em]">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg font-semibold">{profile.headline}</p>
          </div>
          <div className="text-sm leading-6 sm:text-right">
            <p>{profile.location}</p>
            <p>{profile.phone}</p>
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            <br />
            <a href={profile.website} className="underline">
              jackson-alvarez.dev
            </a>
            <br />
            <a
              href={`https://github.com/${profile.github}`}
              className="underline"
            >
              github.com/{profile.github}
            </a>
          </div>
        </header>

        <section className="mt-7">
          <h2 className="resume-heading">Executive summary</h2>
          <p className="mt-3 text-[13px] leading-5">{profile.summary}</p>
          <p className="mt-2 text-[13px] leading-5">
            {profile.extendedSummary}
          </p>
        </section>

        <section className="mt-7">
          <h2 className="resume-heading">Professional experience</h2>
          <div className="mt-4 space-y-6">
            {experience.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <div>
                    <h3 className="text-sm font-bold">{item.role}</h3>
                    <p className="text-[13px] font-semibold">
                      {item.organization} · {item.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-[12px] font-semibold">
                    {item.period}
                  </p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-[1.45]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 break-inside-avoid">
          <h2 className="resume-heading">Selected projects</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <div key={project.slug}>
                <h3 className="text-sm font-bold">{project.name}</h3>
                <p className="mt-1 text-[12px] leading-[1.45]">
                  {project.description} {project.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-7 break-inside-avoid sm:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="resume-heading">Education</h2>
            <p className="mt-3 text-[13px] font-bold">
              {profile.education.degree}
            </p>
            <p className="text-[12px]">{profile.education.minor}</p>
            <p className="mt-1 text-[12px]">
              {profile.education.school}
              <br />
              {profile.education.completed}
            </p>
          </div>
          <div>
            <h2 className="resume-heading">Core competencies</h2>
            <div className="mt-3 space-y-2">
              {capabilityGroups.map((group) => (
                <p key={group.id} className="text-[12px] leading-[1.45]">
                  <strong>{group.label}:</strong> {group.items.join(", ")}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-7 break-inside-avoid">
          <h2 className="resume-heading">Additional highlights</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px] leading-[1.45]">
            <li>
              Experience operating in fast-moving startup-style engineering
              environments with executive-level communication exposure.
            </li>
            <li>
              Strong understanding of scalable SaaS architecture, cloud
              deployment workflows, compliance-oriented engineering, and
              automation-first operational design.
            </li>
            <li>
              Actively building independent software ventures and
              automation-focused business systems through Vector Labs.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
