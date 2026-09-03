# Production Mountain

A hybrid portfolio: editorial case studies + a Three.js arcade where you jump production incidents and smash case-study barrels.

**No database. No AWS. No retention.**

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **React Three Fiber** + Three.js
- **GitHub API** — live pinned repos on `/studio`
- **EmailJS** — contact form, client-side only
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
```

EmailJS template should accept: `from_name`, `reply_to`, `message`.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero + game preview + featured work |
| `/work` | All case studies |
| `/work/[slug]` | Individual case study |
| `/play` | Fullscreen Production Mountain |
| `/studio` | Build log + live GitHub repos |
| `/contact` | EmailJS contact form |

## Game

Production Mountain is a one-screen arcade:

- **Legacy** (the gremlin) hurls incident barrels
- **Jump** over small barrels to mark incidents solved
- **Anger escalates** as you clear more — faster spawns, bigger barrels
- **Hammer** spawns when Legacy is furious — smash case-study barrels to unlock write-ups
- **Session-only state** — refresh resets everything

Controls: `←` `→` or `A` `D` to move, `Space` to jump.

## Content

Edit files in `src/content/`:

- `site.ts` — name, bio, nav
- `incidents.ts` — small barrel labels (resume problems)
- `case-studies.ts` — full case study write-ups

## Deploy

Push to GitHub, connect to Vercel, set env vars. Done.
