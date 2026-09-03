# Jackson Alvarez — Systems Record

A content-first engineering portfolio built as a career flight recorder: a
scroll-driven professional timeline, capability console, project artifact rail,
print-native résumé, and an isolated slot for a future Unity WebGL game.

**No database. No AWS. No retention.**

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **GitHub API** — live pinned repos on `/studio`
- **EmailJS** — contact form, client-side only
- **Unity WebGL** — optional, click-to-load arcade artifact
- **Vercel** — deployment target

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

```env
NEXT_PUBLIC_GITHUB_USERNAME=jacksonalvarez
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key

# Optional Unity WebGL build
NEXT_PUBLIC_UNITY_LOADER_URL=/unity/Build/ProductionMountain.loader.js
NEXT_PUBLIC_UNITY_DATA_URL=/unity/Build/ProductionMountain.data
NEXT_PUBLIC_UNITY_FRAMEWORK_URL=/unity/Build/ProductionMountain.framework.js
NEXT_PUBLIC_UNITY_CODE_URL=/unity/Build/ProductionMountain.wasm
```

EmailJS template should accept: `from_name`, `reply_to`, `message`.

## Pages

- `/` — complete narrative, career trace, project rail, and capabilities
- `/work` — standalone professional record and selected artifacts
- `/resume` — print-native résumé generated from the same typed content
- `/play` — lazy Unity WebGL cartridge bay and game brief
- `/studio` — agentic build record and live GitHub activity
- `/contact` — EmailJS contact form

## Unity arcade

The site does not ship a substitute browser game. `/play` is a production-ready
Unity WebGL loader that stays off the homepage and requires an explicit click.
Export a Unity build into `public/unity/`, configure the four public URLs, and
the cartridge bay becomes playable.

The portfolio remains fully usable when no Unity build is configured.

## Content

Edit files in `src/content/`:

- `profile.ts` — experience, projects, skills, story, and education
- `site.ts` — metadata, navigation, stack, and build workflow

## Deploy

Push to GitHub, connect to Vercel, set env vars. Done.
