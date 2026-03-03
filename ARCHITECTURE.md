# MB BRANDNAME Architecture Blueprint

This document captures the current repository blueprint and responsibilities per layer.

## 1) Runtime Stack

- **Framework**: Next.js 16, Pages Router (`pages/`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (`styles/globals.css` imports only tailwind)
- **State/Persistence**: localStorage wrappers in `lib/storage.ts`
- **Deterministic Commerce Rules**:
  - Stable sort (`lib/stableSort.ts`)
  - Canonical order payload + SHA-256 order id (`lib/order.ts`)

## 2) Repository Layout

- `pages/`: route-level composition
  - Commerce: `/`, `/shop`, `/new-arrivals`, `/bags`, `/accessories`, `/product/[slug]`, `/cart`, `/checkout`, `/wishlist`, `/account`
  - Content: `/about`, `/careers`, `/affiliates`, `/blog`, `/blog/[slug]`, `/contact`, `/customer-service`, `/find-a-store`, `/legal-privacy`, `/gift-card`
  - System: `/404`, `/500`
  - Admin scaffold: `/admin`, `/admin/products`, `/admin/orders`, `/admin/users`
- `components/layout/`: shell (`Layout`, `Header`, `Footer`, `Drawer`, `SEO`)
- `components/ui/`: primitives and state UX components
- `components/commerce/`: product/listing/cart-specific UI blocks
- `lib/`: deterministic domain logic and utility guards
- `data/`: static typed content packs
- `public/assets/mb/v1/`: local static assets
- `.github/workflows/`: build + preview deployment automation

## 3) Key Domain Modules

### `lib/storage.ts`
Safe wrappers:
- `getItem(key, fallback)`
- `setItem(key, value)`

SSR-safe behavior and corruption fallback through `safeParse`.

### `lib/cart.ts`
Storage key: `mb_cart_v1`
- `getCart`
- `addToCart`
- `updateQty` (qty clamp >= 1)
- `removeFromCart`
- `clearCart`

### `lib/wishlist.ts`
Storage key: `mb_wishlist_v1`
- `getWishlist`
- `toggleWishlist`
- `clearWishlist`

### `lib/order.ts`
Deterministic order ID strategy:
1. sort cart items by `productId`
2. canonical join as `productId:qty|...`
3. SHA-256 lowercase hex
4. `ord_` + first 12 chars

## 4) Build & Delivery Pipeline

### CI
- `.github/workflows/build.yml`
  - Node 20
  - `npm ci`
  - `npm run lint`
  - `npm run build`

### Vercel Preview
- `.github/workflows/vercel-preview.yml`
  - PR-triggered preview deployment
  - Requires secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### Container Runtime
- `Dockerfile`: multi-stage build (builder + production runner)
- `docker-compose.yml`: exposes port `3000`

## 5) Validation Commands

```bash
npm ci
npm run lint
npm run build
npm start
```

## 6) Known Operational Notes

- If preview deployment fails, verify Vercel secrets in GitHub repository settings.
- If local storage is corrupted in browser, app utilities fall back to safe defaults.
- Project uses local SVG assets to avoid external image dependency.
