# Alpeville Portfolio Instructions

## Project Context

This repository contains the Next.js frontend for Alps' Alpeville portfolio. It is a motion-led personal portfolio, not a generic capstone template.

The separate `alpeville-cms` repository contains the Strapi application and its content schemas. Keep frontend work in this repository unless the task explicitly includes CMS changes.

## Product Structure

- `/` is the single-page portfolio with Hero, About, What I Do, Projects, Certifications, Experience, and Contact sections.
- `/cv` is the separate CV page.
- `/work/[slug]` is the project case study route.
- `/health` is a test and diagnostics route. Do not add it to the main navigation or sitemap.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- GSAP and ScrollSmoother
- React Three Fiber and `drei`
- Strapi CMS
- Railway for Strapi and PostgreSQL hosting
- Vercel for frontend hosting

## Architecture

- `app/components/` contains reusable UI components and local component prop types.
- `app/data/` contains shared frontend configuration such as navigation items.
- `app/types/` contains shared UI types such as navigation types.
- `lib/api/[feature]/service.ts` contains data fetching and mapping for one portfolio feature.
- `lib/api/[feature]/types.ts` contains reusable types for that feature.
- `lib/api/types/common.ts` contains shared API result types.
- `lib/api/strapi/` contains the shared Strapi client, endpoints, media helpers, and health service.
- `app/sitemap.ts` generates public portfolio URLs from static routes and published work data.
- `app/robots.ts` points crawlers to the sitemap and excludes API and diagnostic routes.

## Content and CMS Rules

- Strapi schemas and components are application code in the CMS repository.
- Portfolio entries are stored in the configured Strapi database, separately from the Git repository.
- Treat deleting a Strapi field, content type, or component as a potentially destructive database change.
- Back up production PostgreSQL before destructive schema work.
- Prefer additive schema changes and content migration before removing old fields or dynamic-zone components.
- Request the required `populate` values for Strapi relations and media.
- Only published Strapi content should appear in public portfolio pages.

## Types

- Keep component-only prop types inside the component that owns them.
- Put reusable portfolio or API types in `lib/api/[feature]/types.ts`.
- Put shared UI types in `app/types/` and shared UI data in `app/data/`.
- Do not create a global catch-all types file.
- Avoid exporting a type from a component merely so another component can reuse it.
- Prefer explicit types and avoid `any`.

## Data Fetching and Errors

- Use the shared Strapi client for every Strapi request.
- Return `ApiResult<T>` for content services so successful data and expected failures are explicit.
- Keep technical error details in server logs and show safe messages in the UI.
- Hide a section only when the request succeeded with empty data.
- Show a visible section-level error when a non-critical request fails.
- Show a full-page error for critical data such as the Home hero or CV document.
- Use `notFound()` for a genuinely missing project slug, not for an unexpected Strapi failure.
- Preserve unaffected sections when one Home API request fails.

## Caching and Performance

- Public Strapi reads use ISR with `STRAPI_REVALIDATE_SECONDS`, defaulting to 900 seconds.
- Keep resource-specific cache tags when adding new Strapi requests.
- Use `no-store` only for genuinely real-time data such as a live diagnostic check.
- Do not add `force-dynamic` to public content pages without a clear reason.
- A cache reduces Strapi load but does not replace CDN, WAF, or rate-limit protection.
- Keep the 3D background and animations isolated from the static content shell.
- Avoid adding heavy visual dependencies or large assets without a performance reason.

## SEO and Accessibility

- Keep `NEXT_PUBLIC_SITE_URL` configured for production metadata and sitemap URLs.
- Add metadata for public pages when appropriate.
- Do not include `/health` or other diagnostics in the sitemap.
- Provide meaningful alt text for CMS media and empty alt text for decorative images.
- Use semantic HTML and visible keyboard focus states.
- Preserve the active navigation state for both in-page sections and separate routes.

## Validation

Run these commands after code changes:

```bash
npm run lint
npx tsc --noEmit
git diff --check
```

Run `npm run build` when validating a production deployment or route-generation change. A local build may require a running Strapi instance for CMS-backed content.

## Naming and Style

- Components use `PascalCase.tsx`.
- Hooks use `useSomething.ts`.
- Utilities use `camelCase.ts`.
- Constants use `UPPER_SNAKE_CASE` when they are true constants.
- Prefer small readable functions and comments only for non-obvious behavior.
- Preserve the existing visual language and mobile-first responsive layout.

## Git Workflow

Use Conventional Commits:

```text
feat: add project case study
fix: handle missing Strapi media
docs: update portfolio instructions
refactor: simplify section data mapping
```

Preserve unrelated user changes. Do not reset, delete, or overwrite work without explicit permission.
