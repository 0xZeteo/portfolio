# Deploy to Cloudflare Workers

The project is already configured for Cloudflare Workers (`wrangler.jsonc` + `@cloudflare/vite-plugin`). No code changes needed — just wiring up deployment.

## Two ways to deploy (pick one)

### Path 1 — One-off / manual deploy (fastest, no GitHub needed)

1. Create a free Cloudflare account at https://dash.cloudflare.com/sign-up
2. Push code to GitHub (or just clone locally)
3. Locally run:
   ```
   npm install
   npx wrangler login        # opens browser, authorizes
   npm run build
   npx wrangler deploy
   ```
4. Done — site is live at `https://tanstack-start-app.<your-subdomain>.workers.dev`

### Path 2 — Auto-deploy from GitHub (recommended)

1. Push the repo to GitHub.
2. In Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → select your repo.
3. Configure build:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
4. Save & deploy. Every push to `main` auto-deploys.

## Things to update before deploying

1. **Rename the worker** in `wrangler.jsonc` — change `"name": "tanstack-start-app"` to something like `"paul-ayegbusi-portfolio"` (this becomes the subdomain).
2. **Custom domain (optional):** in Cloudflare dashboard → your Worker → Settings → Domains & Routes → Add custom domain. Domain must be on Cloudflare DNS (free to transfer).

## Why Vercel didn't work (for reference)

Vercel tried to serve this as a static site, but the build outputs a Cloudflare Worker bundle (SSR), not static HTML — so every route returned 404. Cloudflare Workers is the build target this project was set up for, so deployment is plug-and-play there.

## What I'll do if you approve

Switch to build mode and:
1. Update the worker name in `wrangler.jsonc` (tell me what name you want, or I'll use `paul-ayegbusi-portfolio`).
2. Add a short `DEPLOY.md` at the repo root with the exact commands above so you have them handy.

The actual `wrangler login` + `wrangler deploy` steps you'll run yourself — they need your Cloudflare account credentials, which I can't access.
