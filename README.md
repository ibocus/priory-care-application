# Priory Care Services — Care Worker Application

A rebuilt, multi-step version of the [Care Worker Application](https://priorycareservices.com/care-worker-application/)
form. The original is a single long page styled like a paper form (it even
asks visitors to fill it in "in BLOCK CAPITALS using Black ink"), with no
progress indicator, no save-and-resume, and plain text boxes for structured
data like phone numbers, dates and yes/no questions.

This version keeps the same information the agency needs, but as an actual
web application: a guided multi-step wizard, proper input types and
validation, autosave so applicants don't lose progress, and a review screen
before submission.

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

## Status: front end only

This build is **client-side only** — submitting the form does not send data
anywhere yet. On submit it shows a reference number and lets the applicant
download their answers as JSON or print/save as PDF.

To make submissions actually reach the agency, edit
[`src/lib/submitApplication.ts`](src/lib/submitApplication.ts) and point it
at one of:

- **[Formspree](https://formspree.io/)** — no backend code, emails you each
  submission. Fastest option to go live.
- **Your own API route / serverless function** — `POST` the JSON payload
  wherever you want it stored (database, email, ATS, etc.).

The rest of the app needs no changes — `App.tsx` already calls
`submitApplication(data)` and handles the result.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run lint
```

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and
deploys `dist/` to GitHub Pages on every push to `main`. Enable it once in
the repo under **Settings → Pages → Source: GitHub Actions**.

## Tech stack

React + TypeScript + Vite, no UI framework or form library — plain CSS
custom properties for theming and hand-rolled validation, so the whole data
model and every field is easy to find and edit in `src/`.
