# HUAN Surveillance — Website

React + Vite storefront/admin for HUAN Surveillance. Backend: **Appwrite Cloud**
(Auth + Database + Storage + Functions), hosted on **Cloudflare Pages**.
Quote leads are also backed up to a **Google Sheet + email** via Apps Script.
AI quote generation uses **Groq** (server-side, via an Appwrite Function).

## Architecture

- **Cloudflare Pages** — static hosting for the built React app
- **Appwrite** — Auth (admin login), Database (products, reviews, blog, quote
  leads, company stats), Storage (product images, catalog PDFs)
- **Appwrite Function** (`functions/generate-quote`) — calls Groq server-side
  so the API key never reaches the browser; falls back to a local heuristic
  engine if unreachable
- **Google Apps Script + Sheet** — secondary backup + instant email on every
  quote lead submission

## One-time setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Fill in `.env`** (copy `.env.example` if starting fresh) with your
   Appwrite project's endpoint, project ID, database ID, bucket ID, and
   (server-only) API key.

3. **Provision the Appwrite database + storage** (runs once, locally, using
   your server API key — never committed):
   ```bash
   npm run setup:appwrite
   ```
   This creates the `products`, `reviews`, `blog_posts`, `quote_leads`, and
   `company_stats` collections with the right attributes and permissions
   (public read, admin-only write), and sets the storage bucket to public
   read / admin write.

4. **Create the admin login** in Appwrite Console → Auth → Users → Create
   user, using the admin email + a password you choose.

5. **Deploy the AI quote function**: install the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation),
   then:
   ```bash
   appwrite login
   appwrite push functions
   ```
   In Appwrite Console → Functions → generate-quote → Settings → Variables,
   add `GROQ_API_KEY` with your Groq key. This key lives only here — never
   in the repo, never in `.env`.

6. **Quote leads Google Sheet**: already wired — `VITE_APPS_SCRIPT_URL` in
   `.env` points at the deployed Apps Script web app.

## Local development

```bash
npm run dev
```

## Deploying to Cloudflare Pages

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
   → select this repo.
2. Build settings: **Build command** `npm run build`, **Build output
   directory** `dist`.
3. Add the `VITE_*` environment variables from `.env.example` under
   Settings → Environment variables (values only — never the server-only
   `APPWRITE_API_KEY` or `GROQ_API_KEY`, those don't belong on Pages at all).
4. Push to the connected branch — Cloudflare auto-builds and deploys.
5. Point your domain (`huan-surveillance.com`) at the Pages project under
   Custom domains, once nameservers are on Cloudflare.

## Notes on data

- Public storefront data (products, reviews, blog) is seeded from
  `src/data/initialData.ts` until the admin adds real entries — the app
  shows Appwrite data once any collection has documents in it.
- Product images/catalog PDFs uploaded from the Admin panel go straight to
  Appwrite Storage (10GB free) — nothing large gets committed to git.
- Every quote lead is saved twice: Appwrite (source of truth, admin CRM) and
  the Google Sheet (human-readable backup + instant email) — no single point
  of failure.
