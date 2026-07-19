# pranavpiedy.com

Pranav Piedy's personal portfolio. The site is built around one idea: a prism
splitting a beam of light into three colors. The landing page is a dark stage
where a white beam enters a prism and refracts into three colored beams —
Work, Beyond, and About — which double as the site's navigation.

## Pages

- **`/`** — the landing page: the animated prism/beam scene, hover a beam to
  navigate.
- **`/work`** — case studies and professional projects.
- **`/beyond`** — an interactive canvas "ripple pond": move your cursor or hover
  an interest word to send ripples across the page.
- **`/about`** — bio, photo, contact links, and a message form.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — theme tokens defined via `@theme` in `app/globals.css`
  (not a `tailwind.config.ts` — v4 moved theme config into CSS)
- **Framer Motion** — the landing page's entry sequence and beam interactions
- **next/font/google** — EB Garamond (display) + Inter (body), self-hosted,
  zero layout shift
- **Resend** + **zod** — contact form email delivery and server-side validation

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY and CONTACT_TO_EMAIL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without a real
`RESEND_API_KEY`, the contact form still works end-to-end in dev — the API
route just logs the submission to the console instead of sending an email.

## Editing content

All editable copy (case studies, Beyond interests, bio, links) lives in
`lib/content.ts` as plain typed objects — edit that one file, no component
surgery needed.

| Task                             | Where                                              |
|-----------------------------------|-----------------------------------------------------|
| Edit case studies / Beyond text   | `lib/content.ts`                                    |
| Change a beam color               | `app/globals.css` (`--beam-*` custom properties) + `lib/tokens.ts` — keep in sync |
| Update headshot / OG preview image| `public/website-photo.jpg`                          |
| Rotate the Resend API key         | Hosting provider's environment variable settings (Vercel → Settings → Environment Variables, or the equivalent on your host) |
| Adjust prism geometry             | `components/landing/PrismStage.tsx`                 |

## Deployment

Scaffolded for Vercel (`git push` → auto-deploy, zero config for Next.js).
Custom domain (`pranavpiedy.com`) and final hosting provider (possibly
Hostinger) are still being decided — if hosting moves off Vercel, note that
the contact form depends on the `/api/contact` server route, so a fully
static export (`output: 'export'`) would break it; the host needs to support
running Next.js server-side (Node.js/Edge runtime), not just static files.

Required environment variables in production:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=you@example.com
```
