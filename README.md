# Jackson Alvarez — Systems Record

A content-first engineering portfolio built as a career flight recorder: a
scroll-driven professional timeline, capability console, project artifact rail,
print-native résumé, and an isolated Unity WebGL slot for Backrooms.

**No database. No AWS. No retention.**

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **GitHub API** — live pinned repos on `/studio`
- **EmailJS** — contact form, client-side only
- **Unity WebGL** — click-to-load Backrooms arcade artifact
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

# Optional Unity WebGL overrides (defaults ship with Backrooms)
NEXT_PUBLIC_UNITY_LOADER_URL=/unity/Build/teststt.loader.js
NEXT_PUBLIC_UNITY_DATA_URL=/unity/Build/teststt.data.br
NEXT_PUBLIC_UNITY_FRAMEWORK_URL=/unity/Build/teststt.framework.js.br
NEXT_PUBLIC_UNITY_CODE_URL=/unity/Build/teststt.wasm.br
```

EmailJS template should accept: `from_name`, `reply_to`, `message`.

## Pages

- `/` — complete narrative, career trace, project rail, and capabilities
- `/work` — standalone professional record and selected artifacts
- `/resume` — print-native résumé generated from the same typed content
- `/play` — lazy Unity WebGL cartridge bay for Backrooms
- `/studio` — agentic build record and live GitHub activity
- `/contact` — EmailJS contact form

## Unity arcade

`/play` loads the shipped Backrooms Unity WebGL build only after an explicit
click. The export lives in `public/unity/Build/` (`teststt.*`, brotli-compressed).
Next.js and Vercel send `Content-Encoding: br` so the browser can decompress it.

Override the four `NEXT_PUBLIC_UNITY_*` URLs to swap in another build.

## Content

Edit files in `src/content/`:

- `profile.ts` — experience, projects, skills, story, and education
- `site.ts` — metadata, navigation, stack, and build workflow

## Deploy

Push to GitHub, connect to Vercel, set env vars. Done.
