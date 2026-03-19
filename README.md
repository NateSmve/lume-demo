# SMVE Client Project Template

Next.js 16 / TypeScript / Tailwind CSS starter for SMVE Web Dev client projects.

## Quick start

```bash
# 1. Copy this directory to a new repo
cp -r client-template my-client-project
cd my-client-project

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with client-specific values

# 4. Run dev server
npm run dev
```

## Environment variables

See `.env.example` for all required variables. At minimum:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL of the site (e.g. `https://client.com`) |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Business name shown in nav/footer |
| `STRIPE_SECRET_KEY` | Yes (if payments) | Stripe secret key |
| `STRIPE_DEPOSIT_PRICE_ID` | Yes (if payments) | Stripe Price ID for the deposit product |
| `STRIPE_WEBHOOK_SECRET` | Yes (if payments) | Stripe webhook signing secret |
| `RESEND_API_KEY` | Recommended | Resend API key for contact form emails |
| `CONTACT_EMAIL` | Yes | Where contact form submissions go |

## Customisation checklist

- [ ] Replace all placeholder text in `src/app/page.tsx`
- [ ] Update nav links in `src/components/Nav.tsx`
- [ ] Set `NEXT_PUBLIC_SITE_NAME` env var (updates nav + footer automatically)
- [ ] Update metadata in `src/app/layout.tsx`
- [ ] Add service options to `src/app/contact/page.tsx`
- [ ] Create Stripe product + price, set `STRIPE_DEPOSIT_PRICE_ID`
- [ ] Add `/public/og-image.png` (1200×630px)
- [ ] Add `/public/favicon.ico`
- [ ] Set up Resend domain for the client
- [ ] Configure Stripe webhook endpoint in Stripe Dashboard

## Deploy

### Vercel (recommended)
1. Push repo to GitHub
2. Import in Vercel
3. Add all env vars in Vercel project settings
4. Deploy

### Railway
1. Create new Railway project
2. Connect GitHub repo
3. Add env vars in Railway variables tab
4. Railway auto-deploys on push to `main`

## File structure

```
src/
  app/
    layout.tsx          — root layout, Nav, Footer, Analytics
    page.tsx            — homepage (Hero, Services, Why Us, Testimonials, CTA)
    globals.css         — Tailwind + base styles
    robots.ts           — auto-generated robots.txt
    sitemap.ts          — auto-generated sitemap.xml
    not-found.tsx       — 404 page
    contact/
      page.tsx          — contact form
    pay/
      page.tsx          — deposit payment page (Stripe)
      success/page.tsx  — post-payment success page
      cancel/page.tsx   — payment cancelled page
    api/
      contact/route.ts  — contact form handler (Resend email)
      stripe/
        checkout/route.ts — create Stripe checkout session
        webhook/route.ts  — handle Stripe events
  components/
    Nav.tsx             — responsive sticky nav
  lib/
    seo.ts              — buildMeta() helper + JSON-LD schema
    stripe.ts           — Stripe client + session helpers
```
