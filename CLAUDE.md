# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lume is a demo e-commerce site for a fictional handcrafted candle brand, built as a portfolio piece by SMVE Web Dev. It's a Next.js 16 / TypeScript / Tailwind CSS v4 app with Stripe checkout integration and a Resend-powered contact form.

## Commands

- `npm run dev` — start dev server (Next.js)
- `npm run build` — production build
- `npm run start` — start production server (uses `$PORT` or 3000)
- `npm run lint` — run ESLint

No test framework is configured.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS v4 (PostCSS plugin), Stripe SDK.

**Routing:** All routes live under `src/app/` using Next.js App Router conventions. Dynamic product pages use `src/app/shop/[slug]/page.tsx`.

**Product data** is static — defined in `src/lib/products.ts` as a hardcoded array (no database). Products are looked up by slug via `getProduct()`.

**API routes:**
- `POST /api/stripe/checkout` — creates a Stripe Checkout session using ad-hoc `price_data` (no pre-created Stripe Products required)
- `POST /api/contact` — sends contact form emails via Resend API; falls back to console logging if `RESEND_API_KEY` is unset

**Lib modules:**
- `src/lib/stripe.ts` — Stripe client instance + session creation helpers (`createDepositSession`, `createSubscriptionSession`)
- `src/lib/seo.ts` — `buildMeta()` generates consistent OpenGraph/Twitter metadata for all pages
- `src/lib/products.ts` — product catalog, `Product` type, `getProduct()`, `formatPrice()`

**Client components:** `Nav.tsx` (sticky responsive nav with mobile menu), `DemoBanner.tsx` (top demo notice bar), product detail page (`shop/[slug]/page.tsx`), and contact form are `"use client"`. Everything else is server-rendered.

**Styling:** Tailwind v4 via `@tailwindcss/postcss`. Global CSS in `src/app/globals.css` uses `@import "tailwindcss"` (v4 syntax). Design uses a dark theme with stone/amber color palette throughout. The `@/*` path alias maps to `./src/*`.

## Environment Variables

Copy `.env.example` to `.env.local`. Key variables:
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_SITE_NAME` — site identity
- `STRIPE_SECRET_KEY` / `STRIPE_DEPOSIT_PRICE_ID` — payments
- `RESEND_API_KEY` / `CONTACT_EMAIL` — contact form emails

## Deployment

Configured for Railway (`railway.json` with Nixpacks builder) and Vercel. The start command uses `npm start` which reads `$PORT`.
