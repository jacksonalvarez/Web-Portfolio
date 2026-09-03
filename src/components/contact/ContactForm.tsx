"use client";

import { FormEvent, useState } from "react";
import { sendContactEmail } from "@/lib/emailjs";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactEmail({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          01 / Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors focus:border-signal"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          02 / Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors focus:border-signal"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
        >
          03 / What are we solving?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors focus:border-signal"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-signal px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-strong disabled:cursor-wait disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p role="status" className="border-l border-success pl-4 text-sm text-success">
          Transmission received. Nothing was stored on this site.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="border-l border-danger pl-4 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
