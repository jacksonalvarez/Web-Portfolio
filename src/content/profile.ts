export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  signals: string[];
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  technologies: string[];
  href?: string;
  status: "shipped" | "research" | "evolving";
};

export const profile = {
  name: "Jackson Alvarez",
  shortName: "Jackson",
  headline: "Software Engineer & Automation Architect",
  location: "Charlotte, NC",
  email: "alvarezjd404@gmail.com",
  phone: "704-777-1158",
  github: "jacksonalvarez",
  linkedin: "https://www.linkedin.com/in/jackson-alvarez-911b12187/",
  website: "https://jackson-alvarez.dev",
  availability: "Open to ambitious engineering and technical leadership work",
  summary:
    "Systems-minded software engineer and automation specialist building scalable production systems, enterprise tooling, and cloud-native workflows across higher education, SaaS, and government-adjacent environments.",
  extendedSummary:
    "I operate across engineering, infrastructure, security, automation, and executive communication layers. My work spans AWS architecture, compliance readiness, product delivery, deployment pipelines, and operational reporting for high-impact organizations and rapidly evolving products.",
  story: [
    "My path into technology started at 11 with basic HTML and CSS, then widened into Python, Java, small games, and the question that still drives my work: how do all these systems fit together?",
    "At Appalachian State University, computer science gave that curiosity structure. A mathematics minor sharpened the way I reason about systems; enterprise IT work gave me an arena where reliability and communication mattered as much as code.",
    "Today I work across product support, security engineering, cloud infrastructure, and production delivery at Everblue while building independent automation products through Vector Labs.",
    "The thread through all of it is systems thinking: understand the real workflow, remove repetitive effort, build the right layer of automation, and leave behind documentation that another engineer can trust.",
  ],
  education: {
    degree: "B.S. Computer Science",
    minor: "Minor in Mathematics",
    school: "Appalachian State University",
    location: "Boone, NC",
    completed: "July 2025",
  },
} as const;

export const experience: Experience[] = [
  {
    id: "everblue",
    role: "Product Support Engineer / Security Engineer",
    organization: "Everblue",
    period: "Sep 2025 — Present",
    location: "Hybrid · Charlotte, NC",
    summary:
      "Engineering and operating a government-contracting SaaS platform while strengthening its security, reporting, and compliance posture.",
    highlights: [
      "Maintain and expand a production-grade government contracting web application supporting large-scale federal operational workflows and reporting pipelines.",
      "Work directly with executive leadership to streamline SOC 2 audit preparation, improve operational transparency, and strengthen platform security.",
      "Contribute across the full software lifecycle with Next.js, AWS infrastructure, GitHub workflows, and tenant-heavy SaaS architecture.",
      "Implement automation, runtime monitoring, and reporting infrastructure for week-over-week and month-over-month visibility into enterprise contract activity.",
      "Support production deployments, debugging, feature iteration, and internal tooling across engineering and business stakeholders.",
    ],
    signals: ["Next.js + AWS", "SOC 2 readiness", "Multi-tenant SaaS", "Executive reporting"],
  },
  {
    id: "vector-labs",
    role: "Founder & Lead Automation Engineer",
    organization: "Vector Labs",
    period: "Mar 2025 — Present",
    location: "Charlotte, NC",
    summary:
      "An independent software and automation laboratory turning advanced workflow ideas into practical products and operating systems.",
    highlights: [
      "Founded Vector Labs to help businesses modernize operational workflows, internal systems, and AI-assisted automation infrastructure.",
      "Architect and prototype products involving automation pipelines, AI-integrated tooling, cloud-native infrastructure, and scalable web applications.",
      "Design solutions spanning backend engineering, deployment architecture, workflow orchestration, and product strategy.",
      "Operate across executive planning, engineering leadership, systems design, product iteration, and rapid development.",
    ],
    signals: ["Product strategy", "AI automation", "Cloud architecture", "Technical leadership"],
  },
  {
    id: "app-state",
    role: "Systems Engineer I",
    organization: "Appalachian State University",
    period: "Mar 2023 — May 2025",
    location: "Boone, NC",
    summary:
      "Automated and operated university-scale device management, software delivery, and internal reporting systems.",
    highlights: [
      "Developed PowerShell automation supporting SCCM and Azure AD management across 8,000+ university devices.",
      "Maintained and optimized 400+ software deployment packages, improving consistency and deployment reliability.",
      "Automated reporting, monitoring, and internal workflows for enterprise-scale IT operations.",
      "Collaborated with vendors, engineering teams, and technical staff through Agile project workflows.",
      "Authored technical documentation and trained junior developers and student engineers on automation tooling and deployment processes.",
    ],
    signals: ["8,000+ devices", "400+ packages", "PowerShell", "SCCM + Azure AD"],
  },
  {
    id: "hypermill",
    role: "Computer Science Intern",
    organization: "Hypermill.digital",
    period: "May 2022 — Aug 2022",
    location: "Cornelius, NC",
    summary:
      "Structured a live enterprise product-data ecosystem and the workflows that kept it useful.",
    highlights: [
      "Built centralized data systems with GraphCRM and Retool to manage 10,000+ product SKUs in a live enterprise data ecosystem.",
      "Designed scalable workflows for marketing, operations, and support automation.",
      "Migrated task tracking from Trello to ClickUp, improving ticket visibility for design teams.",
      "Collaborated with data-focused teams to structure and manage dynamic product datasets.",
    ],
    signals: ["10,000+ SKUs", "Retool", "GraphCRM", "Data operations"],
  },
];

export const projects: Project[] = [
  {
    slug: "vibecode-cli",
    name: "VibeCodeCLI",
    description:
      "A cross-language developer CLI assistant for execution, testing, and automation across 10+ programming languages.",
    detail:
      "Built dynamic token budgeting, runtime orchestration, and context-aware cost optimization into a Python-first development suite.",
    technologies: ["Python", "LLM tooling", "Runtime orchestration", "Prompt engineering"],
    href: "https://github.com/jacksonalvarez/VibeCodeCLI",
    status: "evolving",
  },
  {
    slug: "runoff-lstm",
    name: "Runoff Forecasting with LSTM",
    description:
      "A machine-learning flood prediction system using recurrent neural networks and time-series forecasting.",
    detail:
      "Preprocessed environmental datasets and trained LSTM models to forecast runoff patterns and hydrological behavior.",
    technologies: ["Python", "TensorFlow", "LSTM", "Environmental data"],
    href: "https://github.com/jacksonalvarez/LSTM-Runoff-Forecasting",
    status: "research",
  },
  {
    slug: "y86-simulator",
    name: "y86-64 Simulator & Compiler",
    description:
      "A low-level simulator and compiler built to understand assembly and CPU architecture.",
    detail:
      "Implemented as coursework. Source is not public.",
    technologies: ["C / C++", "Assembly", "Computer architecture"],
    status: "shipped",
  },
  {
    slug: "the-lighthouse",
    name: "The Lighthouse",
    description:
      "A hobbyist Unity story game: a horror-movie parody inspired by The Lighthouse.",
    detail:
      "Early proof that I think in game runtimes, not just web canvases. This is why Arcade Lab is a Unity slot, not another browser prototype.",
    technologies: ["Unity", "C#", "Narrative systems"],
    status: "research",
  },
  {
    slug: "haskell-rasterizer",
    name: "2D Drawing Engine",
    description:
      "A functional graphics engine built in Haskell with custom rendering algorithms and recursive pattern generation.",
    detail:
      "An experiment in declarative graphics, tokenization, custom file types, and modular architecture.",
    technologies: ["Haskell", "Rasterization", "Tokenization", "Functional design"],
    href: "https://github.com/jacksonalvarez/Rasterization-Engine-in-Haskell",
    status: "shipped",
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    description:
      "A content-first engineering portfolio with a Unity-ready arcade slot and a live GitHub signal.",
    detail:
      "Next.js renders the professional record; EmailJS handles contact without storage; a future Unity WebGL build stays opt-in and off the critical path.",
    technologies: ["Next.js", "TypeScript", "Vercel", "Agentic workflows"],
    href: "https://github.com/jacksonalvarez/Web-Portfolio",
    status: "evolving",
  },
];

export const capabilityGroups = [
  {
    id: "programming",
    label: "Programming",
    description: "Languages used across product, automation, systems, and research work.",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Java",
      "C / C++",
      "SQL",
      "Rust",
      "PHP",
      "Haskell",
      "MATLAB",
      "PowerShell",
      "Lua",
      "R",
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    description: "The delivery surface: web products, cloud infrastructure, and enterprise systems.",
    items: [
      "AWS",
      "Next.js",
      "React",
      "Node.js",
      "Azure AD",
      "GitHub",
      "SCCM",
      "Terraform",
      "TensorFlow",
      "Flask",
      "OpenAI APIs",
    ],
  },
  {
    id: "operating",
    label: "Operating modes",
    description: "The layers where I am most useful when the problem is ambiguous.",
    items: [
      "Systems architecture",
      "Automation strategy",
      "Cloud infrastructure",
      "Security operations",
      "Product engineering",
      "Technical leadership",
      "Compliance readiness",
      "Executive communication",
    ],
  },
] as const;

export const buildPrinciples = [
  {
    index: "01",
    title: "Trace the real system",
    body: "Start with the workflow, its operators, and its failure modes—not the framework.",
  },
  {
    index: "02",
    title: "Automate the repeatable",
    body: "Move recurring operational work into observable, documented software.",
  },
  {
    index: "03",
    title: "Ship with evidence",
    body: "Runtime signals, useful reporting, and reversible deployments belong in the product.",
  },
  {
    index: "04",
    title: "Leave a readable trail",
    body: "Clear code and technical writing turn individual output into team capability.",
  },
] as const;
