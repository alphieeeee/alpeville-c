# Alpeville Portfolio

Alpeville is a motion-led personal portfolio for Alps. It combines a single-page portfolio experience with project case studies and a separate CV page.

The Next.js application is backed by a separate Strapi CMS repository. The frontend reads published portfolio content from Strapi and keeps the content model in the CMS repository.

## Portfolio Routes

- `/` - Home page with Hero, About, What I Do, Projects, Certifications, Experience, and Contact sections
- `/cv` - CV page with profile, summary, roles, skills, education, highlights, and achievements
- `/work/[slug]` - Project case study pages loaded from Strapi
- `/health` - Development and deployment health check; intentionally excluded from the navigation and sitemap

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- GSAP and ScrollSmoother for motion and section navigation
- React Three Fiber and `drei` for the 3D background
- Strapi for portfolio content
- Vitest and React Testing Library for unit tests
- Railway for Strapi and PostgreSQL hosting
- Vercel for the Next.js frontend deployment

## Repositories

This frontend and the CMS are separate projects:

- Frontend: `alpeville-c`
- CMS: `alpeville-cms`

Changes to React pages are deployed from this repository. Changes to Strapi content types, components, routes, or schemas must be committed and deployed from the CMS repository. Back up the production database before deleting or changing Strapi fields or components.

## Local Setup

### Prerequisites

- Node.js 20 or newer
- npm
- A running Strapi CMS for CMS-backed content
- An OpenAI API key if you want to use the portfolio assistant

### Install and Run

Install dependencies:

```bash
cd /Users/alps/Documents/flyrank-ai/alpeville-c
npm install
```

Create a local `.env` file using `.env.example` as a guide. At minimum, configure the Strapi URL and token. Add `OPENAI_API_KEY` to enable the assistant. Do not commit real API tokens or database credentials.

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

The Strapi CMS must also be running when testing CMS-backed pages. The frontend falls back to safe error states when Strapi is unavailable.

For a production-mode local check, run:

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `STRAPI_URL` | Server-side URL of the Strapi API |
| `STRAPI_API_TOKEN` | Server-side read token for Strapi |
| `NEXT_PUBLIC_STRAPI_URL` | Public Strapi URL used for media and browser-safe helpers |
| `STRAPI_API_PREFIX` | Strapi API prefix, normally `/api` |
| `STRAPI_REVALIDATE_SECONDS` | ISR lifetime for normal Strapi content; defaults to 900 seconds |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used by metadata and the sitemap |
| `CV_DATA_SOURCE` | Set to `strapi` or `mock` when switching the CV data source |
| `OPENAI_API_KEY` | Server-side OpenAI API key used by the portfolio assistant |
| `OPENAI_MODEL` | Optional OpenAI model override; defaults to `gpt-5.4-mini` |

`STRAPI_API_TOKEN` must be configured in Vercel as a server-side secret. Preview and Production should point to the intended Strapi environment independently.
`OPENAI_API_KEY` must also remain server-side and must never use a `NEXT_PUBLIC_` prefix.

## AI Portfolio Assistant

The site includes an Ask Alps assistant that answers visitor questions using published portfolio context from the frontend services. It is exposed through the server-side `POST /api/assistant` route, so the OpenAI key is not sent to the browser. The assistant uses `OPENAI_MODEL` when configured and otherwise uses `gpt-5.4-mini`.

Requests are limited to 10 questions per client key within a 10-minute window, and questions are limited to 500 characters. If OpenAI is not configured, the route returns a safe unavailable response and the rest of the portfolio remains usable.

## Deployment

The production services are split between two hosts:

- Vercel deploys this Next.js frontend.
- Railway deploys the Strapi CMS and runs a separate PostgreSQL service.

Configure the Strapi Railway service with:

```env
NODE_ENV=production
HOST=0.0.0.0
DATABASE_CLIENT=postgres
DATABASE_URL=<Railway PostgreSQL connection string>
```

Also configure Strapi's required production secrets: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, and `ENCRYPTION_KEY`. Railway provides the runtime `PORT`; the Strapi server configuration reads it automatically.

Use the public Railway Strapi domain as the Vercel `STRAPI_URL`. Use a read-only Strapi API token in Vercel, and keep the token server-side. Do not use the local SQLite fallback for production because `.tmp/data.db` is not a reliable deployment database.

Deploy schema changes from the `alpeville-cms` repository, then publish the related content in Strapi. Schema changes and content data are separate deployment concerns.

## Content Fetching and Error Handling

Strapi services live under `lib/api/[feature]/`. Reusable feature types stay in that feature's `types.ts` file. Shared API result types live in `lib/api/types/common.ts`.

Expected API failures return a typed `ApiResult<T>` and are logged on the server with a safe message for visitors:

- Home hero failure shows a full-page error state.
- Other Home section failures show a visible section error.
- Empty successful collections hide their section.
- A missing project slug uses Next.js `notFound()`.
- Unexpected coding errors should not be silently ignored.

## ISR and Caching

Public Strapi reads use Incremental Static Regeneration. The default cache lifetime is 15 minutes:

```env
STRAPI_REVALIDATE_SECONDS=900
```

Resource tags are assigned for future webhook invalidation, including `strapi:home`, `strapi:cv`, and `strapi:works`. Time-based revalidation works without a webhook. A future protected Strapi webhook can call `revalidateTag` after publishing content for immediate refresh.

Caching reduces repeated requests from Next.js to Strapi. CDN or WAF rate limiting is still needed to protect the public site from abusive traffic and unexpected hosting costs.

## Validation Commands

```bash
npm run lint
npx tsc --noEmit
npm test
```

Run these checks before opening a pull request. Use a production build when validating deployment-specific behavior:

```bash
npm run build
```

## Testing

The project uses Vitest for the test runner and React Testing Library for component tests. Unit tests run in a simulated browser environment and do not require the Strapi CMS to be running.

Run the complete test suite once:

```bash
npm test
```

Run tests in watch mode while developing:

```bash
npm run test:watch
```

Run one test file or filter tests by name:

```bash
npx vitest run tests/unit/work-service.test.ts
npx vitest run -t "maps a project"
```

Generate an HTML coverage report:

```bash
npm run test:coverage
```

Open `coverage/index.html` locally to inspect which files and lines are covered. The coverage percentage is a guide; prioritize meaningful tests for data mapping, error handling, accessibility, and important user behavior instead of aiming for 100% coverage.

The current tests cover Strapi media URL formatting, safe API errors, home hero mapping, work project mapping and lookup behavior, and basic `ContentCard` rendering. Tests mock CMS requests so the suite stays fast and deterministic.

Recommended checks before pushing changes:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Animations, Three.js rendering, responsive layout, and full navigation flows are better candidates for future browser smoke tests rather than unit tests.

## Sitemap

The sitemap is generated by [`app/sitemap.ts`](app/sitemap.ts). It includes the Home page, CV page, and available project detail pages. [`app/robots.ts`](app/robots.ts) points crawlers to the sitemap and excludes API and diagnostic routes. Set `NEXT_PUBLIC_SITE_URL` in Vercel so sitemap URLs use the real production domain.

## Git Workflow

Use Conventional Commits, for example:

```text
feat: add project case study
fix: handle missing Strapi media
docs: update portfolio deployment guide
```
