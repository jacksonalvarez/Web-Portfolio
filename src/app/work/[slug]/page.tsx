import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  return {
    title: study.title,
    description: study.excerpt,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/work" className="font-mono text-xs text-muted hover:text-accent">
        ← All work
      </Link>
      <p className="mt-6 font-mono text-xs text-accent">{study.stack.join(" · ")}</p>
      <h1 className="mt-2 text-3xl font-bold">{study.title}</h1>
      <p className="mt-2 text-lg text-muted">{study.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border px-4 py-3">
            <p className="font-mono text-[10px] text-muted">{metric.label}</p>
            <p className="text-xl font-semibold text-success">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-mono text-sm text-accent">{section.heading}</h2>
            <p className="mt-3 text-muted leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
