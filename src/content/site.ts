export const site = {
  name: "Jackson Alvarez",
  tagline: "I build software—and the systems around it.",
  description:
    "Software engineer and automation architect working across product engineering, infrastructure, security, and operational systems.",
  url: "https://jackson-alvarez.dev",
  author: {
    name: "Jackson Alvarez",
    role: "Software Engineer & Automation Architect",
    email: "alvarezjd404@gmail.com",
    github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "jacksonalvarez",
    location: "Charlotte, NC",
    available: true,
  },
  nav: [
    { label: "Record", href: "/work" },
    { label: "Arcade Lab", href: "/play" },
    { label: "Studio", href: "/studio" },
    { label: "Résumé", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
  studio: {
    stack: ["Next.js", "TypeScript", "Tailwind", "GitHub API", "EmailJS", "Vercel"],
    workflow: [
      "Professional history is modeled as typed content and rendered in multiple views.",
      "GitHub supplies a live repository signal; it is never copied into a database.",
      "EmailJS delivers contact messages without a custom backend or retained form data.",
      "Focused agent passes recover content, challenge the interaction model, implement, and verify.",
      "The Unity WebGL arcade is lazy-loaded as an optional cartridge, never as a homepage dependency.",
    ],
  },
} as const;
