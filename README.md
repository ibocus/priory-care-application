# Priory Care Services — Care Worker Application

A rebuilt, multi-step version of the [Care Worker Application](https://priorycareservices.com/care-worker-application/)
form. The original is a single long page styled like a paper form (it even
asks visitors to fill it in "in BLOCK CAPITALS using Black ink"), with no
progress indicator, no save-and-resume, and plain text boxes for structured
data like phone numbers, dates and yes/no questions.

This version keeps the same information the agency needs, but as an actual
web application: a guided multi-step wizard, proper input types and
validation, autosave so applicants don't lose progress, a review screen
before submission, and a real backend that stores the application and
notifies the team by email and WhatsApp.

**Live:** https://priory-care-application.vercel.app

## What changed vs. the original

- **Multi-step wizard** with a progress bar and section-by-section
  validation, instead of one giant page.
- **Proper input types** — date pickers, `tel`/`email` inputs, dropdowns and
  toggle buttons instead of free-text boxes for structured answers.
- **Inline validation** with accessible error messages (UK postcode, phone
  and National Insurance number formats are checked as you type).
- **Autosave to the browser** (`localStorage`) — closing the tab or losing
  connection doesn't lose progress; there's a "Clear saved draft" option too.
- **Review & edit screen** before submitting, with jump-back links to any
  incomplete section.
- **Repeatable sections** (employment history, education, two references)
  with add/remove controls instead of a fixed number of boxes.
- **Mobile-responsive layout** and no paper-form instructions.
- **A real backend** — submissions are stored in Supabase and trigger an
  email + WhatsApp notification, instead of going nowhere.

## Architecture

- `src/` — the React frontend (Vite + TypeScript), deployed as static
  assets.
- `api/apply.ts` — a Vercel serverless function. Validates the payload,
  saves it to Supabase, then best-effort sends an email (Resend) and a
  WhatsApp message (Meta Cloud API). A notification failure doesn't fail
  the request, since the application is already safely stored.
- `server/` — the Supabase/email/WhatsApp helpers used by `api/apply.ts`.
  Kept outside `api/` so they're plain modules, not extra routes.
- `supabase/schema.sql` — the `applications` table. Row level security is
  on with no public policies — only the serverless function's service-role
  key can read/write it.

## Required setup (no secrets are included in this repo)

Copy `.env.example` to `.env.local` and fill these in, or set them directly
in the Vercel project (**Settings → Environment Variables**):

| Variable | Where to get it |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Create a project at [supabase.com](https://supabase.com), run `supabase/schema.sql` in its SQL editor, then copy these from **Project Settings → API**. Use the **service role** key (server-only, never the anon key here). |
| `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` | Create an account at [resend.com](https://resend.com). You can send from their `onboarding@resend.dev` sandbox address while testing; verify your own domain before relying on this for real applicants. |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `NOTIFY_WHATSAPP_TO` | Create an app at [developers.facebook.com](https://developers.facebook.com), add the **WhatsApp** product. It gives you a free test number, a token and a phone number ID to start with. |

Until these are set, submissions fail with a clear "not configured" error
(check `vercel logs`) rather than silently doing nothing.

**Note on WhatsApp:** Meta's Cloud API only allows freeform text messages
to a number that has messaged your business number in the last 24 hours
(or is added as a tester on the app while in development mode). For a
notification that fires at arbitrary times, you'll eventually want an
approved message template — see Meta's
[message templates docs](https://developers.facebook.com/docs/whatsapp/message-templates)
once you move past testing.

**Note on WHOM to notify:** the env vars above currently point at
whichever email/number you configure — nothing is hard-coded to Priory
Care Services' real contact details. Point `NOTIFY_EMAIL_TO` /
`NOTIFY_WHATSAPP_TO` at their real inbox/number only once you're
authorized to submit applications on their behalf.

## Development

```bash
npm install
vercel env pull .env.local   # if env vars are set in the Vercel project
npm run dev                  # frontend only, http://localhost:5173
vercel dev                   # frontend + /api/apply together
npm run build                # typecheck + production build to dist/
npm run lint
```

## Deployment

Connected to Vercel (project `ibocus-projects/priory-care-application`) —
every push to `main` deploys to production automatically. A GitHub Actions
workflow (`.github/workflows/ci.yml`) runs lint + typecheck + build on
every push and pull request as a safety check independent of Vercel's own
build.

## Tech stack

React + TypeScript + Vite on the frontend, a Vercel serverless function on
the backend, Supabase (Postgres) for storage. No UI framework or form
library — plain CSS custom properties for theming and hand-rolled
validation, so the whole data model and every field is easy to find and
edit in `src/`.
