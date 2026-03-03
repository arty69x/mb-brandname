# MB BRANDNAME

Production-ready Next.js 16 (Pages Router) ecommerce website for **MB BRANDNAME**.

## Stack

- Next.js 16 (Pages Router)
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- Docker / docker-compose
- GitHub Actions CI + Vercel preview workflow

## Prerequisites

- Node.js >= 20
- npm >= 10

## Quick Start

```bash
npm install
npm run build
npm start
```

App runs on `http://localhost:3000`.

## Development

```bash
npm run dev
```

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm start` - start production server
- `npm run lint` - lint checks

## Docker

Build and run:

```bash
docker compose up --build
```

Then open `http://localhost:3000`.

## Environment

Copy:

```bash
cp .env.example .env.local
```

Default:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## GitHub Repository Connection

Remote is configured to:

- `https://github.com/arty69x/mb-brandname.git`

If needed, push with:

```bash
git push -u origin <branch-name>
```

## Vercel Preview Connection

This repository includes:

- `vercel.json`
- `.github/workflows/vercel-preview.yml`

To fully enable preview deployments, set these repository secrets in GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### How to obtain IDs

1. Install and login Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   ```
2. Link project once from repo root:
   ```bash
   vercel link
   ```
3. Check generated `.vercel/project.json` for `orgId` and `projectId`.

Once secrets are set, every PR triggers **Vercel Preview** workflow and deploys preview URL.

## CI

- `.github/workflows/build.yml` runs `npm ci`, `npm run lint`, and `npm run build` on push/PR.
## Blueprint

For full architecture and responsibility map, see `ARCHITECTURE.md`.

