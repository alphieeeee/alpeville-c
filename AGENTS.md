# Project Instructions

## Project Overview

This repository is for the `alpeville-c` capstone: a single-page 3D portfolio site with a GSAP-driven scrolling experience, a React Three Fiber hero scene, and a CMS-backed content model.

Build with the assumption that the site should feel polished, performant, and SEO-friendly from the start.

## Target Stack

* Next.js with the App Router
* React
* TypeScript
* Tailwind CSS
* GSAP + ScrollSmoother for section navigation and motion
* React Three Fiber + `drei` for the 3D hero/background
* Strapi as the CMS
* PostgreSQL for Strapi persistence
* Vercel for the Next.js deployment target
* Node.js, Git, and GitHub for local development and workflow
* Vitest + React Testing Library for unit/component testing
* Playwright for E2E and screenshot checks

## Product Shape

The site should follow the portfolio plan:

* Home page: a single scrolling page with Hero, About, What I Do, Work, Certifications, Experience, and Contact sections
* Project detail route: `/work/[slug]` for SEO/AEO-friendly case studies
* CV route: a separate route, not a scroll target

## CMS Expectations

When working on content-driven features, assume Strapi content types similar to the plan:

* `About` single type for headline, bio, job title, headshot, skills, status, resume, email, and social links
* `WhatIDo` single type for service cards/items
* `Certifications` single type for credentials
* `Experience` single type for roles and timeline entries
* `Project` collection type for work items, slugs, descriptions, rich content, tools, URLs, thumbnails, and hero media
* Reusable `SEO` component for metadata fields

Strapi relations and media are not populated by default, so remember to request `populate` in API calls.

## Development Principles

* Write clean, readable, and maintainable code.
* Follow the existing project architecture and coding style.
* Prefer simple solutions over unnecessary complexity.
* Keep components focused on a single responsibility.
* Reuse existing components and utilities whenever possible.
* Avoid introducing unnecessary dependencies.
* Treat the 3D scene and animation work as performance-sensitive.
* Lazy-load heavy client-only visuals when possible.

## TypeScript

* Use TypeScript whenever possible.
* Avoid using `any` unless there is no reasonable alternative.
* Prefer explicit and descriptive types.
* Maintain strict type safety.

## React

* Use functional components.
* Prefer React Hooks.
* Keep components modular and reusable.
* Extract shared logic into custom hooks when appropriate.
* Prefer SSR-safe patterns in App Router code.
* Keep heavy 3D or animation logic isolated from the static page shell.

## Styling

* Use Tailwind CSS.
* Follow a mobile-first responsive approach.
* Use semantic HTML.
* Consider accessibility when implementing UI.
* Preserve a deliberate visual direction instead of defaulting to generic layouts.

## SEO / AEO

* Add page metadata through `generateMetadata()` where appropriate.
* Include alt text for media sourced from the CMS.
* Support structured data for `Person`, `CreativeWork`, and `BreadcrumbList` when relevant.
* Keep project descriptions concise and answer-friendly for extraction.

## Performance

* Avoid loading the 3D canvas or other heavy client-only code during the initial render unless necessary.
* Prefer `dynamic(() => import(...), { ssr: false })` for the 3D hero if it helps first paint.
* Keep models and textures small and optimized.
* Do not add animation complexity that hurts mobile performance without a clear visual payoff.

## Testing

Prefer the plan’s testing split:

* Unit/component: Vitest + React Testing Library
* E2E: Playwright
* Visual regression: Playwright screenshots for key flows

When adding tests, focus on critical rendering, navigation, and content display behavior.

## Naming Conventions

* Components: `PascalCase.tsx`
* Hooks: `useSomething.ts`
* Utilities: `camelCase.ts`
* Constants: `UPPER_SNAKE_CASE`

## Git Workflow

Follow the Conventional Commits specification.

Examples:

* `feat: add work detail route`
* `fix: resolve api populate issue`
* `docs: update portfolio instructions`
* `chore: initialize cms types`
* `refactor: simplify hero animation`
* `test: add playright coverage`

## AI Assistant Guidelines

When making changes:

* Understand the relevant code before making changes.
* Preserve the existing project structure and conventions.
* Make the smallest reasonable change that satisfies the request.
* Explain non-obvious implementation decisions when appropriate.
* Avoid modifying unrelated files.
* Do not remove existing functionality unless explicitly requested.
* Suggest improvements only when they provide clear value.
* Ask for clarification if requirements are ambiguous instead of making assumptions.
* When adding or changing content models, pages, SEO, or motion, align with the portfolio plan rather than inventing a different product shape.

## Goal

Produce a production-ready portfolio site that is maintainable, performant, SEO-friendly, and visually distinctive.
