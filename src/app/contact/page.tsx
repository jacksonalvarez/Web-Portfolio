import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — messages sent via EmailJS, nothing stored.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="font-mono text-xs text-accent">CONTACT</p>
      <h1 className="mt-2 text-3xl font-bold">Say hello</h1>
      <p className="mt-4 text-muted leading-relaxed">
        Messages go through EmailJS directly to my inbox. Nothing is stored on
        this site — no database, no retention.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
      <p className="mt-8 font-mono text-xs text-muted">
        Or find me on{" "}
        <a
          href={`https://github.com/${site.author.github}`}
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
