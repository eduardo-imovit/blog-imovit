# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Next.js App Router, Turbopack by default)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next`)

There is no test suite configured in this repo.

## Architecture

This is the marketing blog for Imovit, a boutique real-estate agency in Campinas, Brazil. It's a single Next.js App Router app with no route groups beyond posts.

- `app/page.tsx` — home page; client component that loads all posts, then filters client-side by `theme` (button group over `THEMES`).
- `app/posts/[slug]/page.tsx` — server component for a single post; async, reads `params` as a `Promise` (Next 16 App Router convention) and renders `post.content` via `dangerouslySetInnerHTML` (content is HTML, not Markdown).
- `app/not-found.tsx` — custom 404.
- `components/` — `Header`, `Footer`, `PostCard`. No component library; everything is hand-rolled against the CSS below.

**Data layer (`lib/supabase.ts`)**: this is the one file that matters most for backend changes.
- Exports the `Post` type, a Supabase client (`supabase`, or `null` if unconfigured), and `isSupabaseConfigured`.
- `getPosts()` / `getPostBySlug(slug)` try Supabase first and **silently fall back to the in-file `mockPosts` array** (5 hardcoded posts) on any error or empty result. When debugging "why isn't my Supabase data showing up," check for a caught error (logged via `console.warn`) causing silent fallback to mock data before assuming the query is wrong.
- Supabase env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). Both are public/anon-key only — there's no server-side/service-role Supabase usage.
- Expected Supabase table: `posts`, columns matching the `Post` interface, queried/ordered by `date` (string, not a real timestamp — mock data uses Portuguese date strings like `"14 de Julho de 2026"`).

**Design system (`app/globals.css`)**: a single global stylesheet, no CSS modules (except the unused default `page.module.css`) and no Tailwind. All styling is done through CSS custom properties defined in `:root` — colors (base palette + 5 named "segment" colors: `solteiros`, `casais`, `ninho-cheio`, `ninho-vazio`, `investidores`, each with matching badge bg/text variants), an 8pt spacing scale (`--space-1`..`--space-8`), and a type scale (`--text-xs`..`--text-3xl`). Components map a post's `theme` field to one of these segment colors via local `getBadgeClass`/`getSegmentColor` switch functions duplicated in both `PostCard.tsx` and `app/posts/[slug]/page.tsx` — keep them in sync if the theme set changes. Fonts are Google Fonts (`Noto Serif Display` for headings/serif, `DM Sans` for body) loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS vars (`--font-noto-serif`, `--font-dm-sans`).

## Important: read the bundled Next.js docs first

Per `AGENTS.md`, this project pins a Next.js version (`16.2.10`) that post-dates typical training data and has breaking API/convention changes. Before writing or editing any Next.js code (routing, data fetching, `params`/`searchParams`, config), check `node_modules/next/dist/docs/` (organized into `01-app`, `02-pages`, `03-architecture`, `04-community`) rather than relying on prior Next.js knowledge.
