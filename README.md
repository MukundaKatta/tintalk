# Tintalk

Therapy. Built for teenagers. A text-first mental health app that actually talks like a teen — and escalates to a real human when it matters.

**Status:** v0 skeleton — landing page + text-first therapy chat route. Full AI not yet wired.

**Landing:** https://tintalk.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy & design preserved) |
| `/try` | v0 text-first therapy chat — type a feeling, get an empathetic canned response |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "tintalk"` |

## What's next

- Wire real AI (empathetic responses + context tracking) behind `/try`
- Human escalation flow for crisis keywords
- Auth + per-user session history
