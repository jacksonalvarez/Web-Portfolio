export const site = {
  name: "Production Mountain",
  tagline: "Engineer on the stack. Writer of the code.",
  description:
    "Portfolio of Jackson Alvarez — full-stack engineer who ships with agents, writes case studies worth reading, and builds things that survive production.",
  url: "https://jackson-alvarez.dev",
  author: {
    name: "Jackson Alvarez",
    role: "Full-Stack Engineer",
    email: "hello@example.com",
    github: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "jacksonalvarez",
    location: "Remote",
    available: true,
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Play", href: "/play" },
    { label: "Studio", href: "/studio" },
    { label: "Contact", href: "/contact" },
  ],
  studio: {
    stack: ["Next.js", "TypeScript", "Tailwind", "React Three Fiber", "Vercel"],
    workflow: [
      "Content lives in git — no CMS, no database.",
      "GitHub API surfaces live repo activity.",
      "EmailJS handles contact — nothing stored server-side.",
      "Cursor skills and agent loops built this site.",
      "Game state is session-only; refresh resets the mountain.",
    ],
  },
} as const;
