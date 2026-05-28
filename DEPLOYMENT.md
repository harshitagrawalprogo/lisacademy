# Deployment

This project is split as:

- Render: Node/Express API from `server/index.js`
- Vercel: Vite React frontend from `src/`

## Render backend

Create or update a Render Web Service from this repository.

Use these settings:

- Runtime: Node
- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm run start`
- Health check path: `/api/health`

Required environment variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `VITE_DONATION_PAYMENT_URL_TEMPLATE`

Use `.env.render.example` as the checklist for Render. The Neon database value should use this host:

```text
ep-sparkling-unit-aob53h94-pooler.c-2.ap-southeast-1.aws.neon.tech
```

Keep the full database URL in Render's Environment tab. Do not commit the real password to this repository.

After the first deploy, run the schema once from Render Shell:

```sh
node server/apply-schema.mjs
```

Then verify:

```sh
curl https://lis-website.onrender.com/api/health
```

Expected response:

```json
{"ok":true,"databaseReady":true}
```

## Vercel frontend

Use these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Set this Vercel environment variable:

- `VITE_API_BASE_URL=https://lis-website.onrender.com`

Use `.env.vercel.example` as the checklist for Vercel. The frontend does not connect to PostgreSQL directly; it calls the Render API. Keep `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` on Render only unless you later add Vercel serverless API routes.

If you prefer to keep `VITE_API_BASE_URL` empty, `vercel.json` already rewrites `/api/*` to the current Render service URL: `https://lis-website.onrender.com`.

After deploying Vercel, test the frontend from the browser. If you are using the `vercel.json` rewrite instead of `VITE_API_BASE_URL`, you can also test:

```sh
curl https://YOUR-VERCEL-SITE.vercel.app/api/health
```

or open the site and test member/admin login.
