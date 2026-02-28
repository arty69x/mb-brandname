# MB BRANDNAME — FRONTEND AUTHORITATIVE SPEC
Version: 1.0
Status: LOCKED
This document overrides any existing implementation.
If code conflicts with this document, this document wins.

============================================================
1. FRAMEWORK & BASELINE
============================================================

- Next.js Pages Router ONLY
- No App Router
- TypeScript strict: true
- No `any`
- No unused code
- No console errors
- No hydration mismatch

Tailwind:
- Version 4
- styles/globals.css MUST contain exactly:
  @import "tailwindcss";
- No arbitrary px values (px-[13px] forbidden)
- No dynamic Tailwind interpolation
- No inline styles

============================================================
2. GLOBAL LAYOUT RULE (MANDATORY)
============================================================

All pages must follow:

Layout
  main
    section.py-24 OR section.py-32
      div.container.mx-auto.px-4

Exception:
Hero section MUST NOT use container.

Hero:
<section class="relative h-[75vh] w-full">

No nested containers.
No container wrapping Layout root.
No max-w-screen-* at root.

============================================================
3. SPACING SCALE (STRICT)
============================================================

Allowed vertical spacing ONLY:
- py-16
- py-24
- py-32

Allowed gap values:
- gap-8
- gap-12
- gap-16

Allowed margin:
- mt-8
- mt-12
- mt-16
- mt-24

Any other spacing value must be removed.

============================================================
4. TYPOGRAPHY SYSTEM
============================================================

Hero:
- uppercase
- font-light
- tracking-[0.55em]
- text-5xl mobile
- text-7xl desktop

Section heading:
- uppercase
- font-light
- tracking-[0.45em]
- text-2xl mobile
- text-4xl desktop

UI labels:
- uppercase
- font-black
- tracking-[0.3em]
- text-[11px]

Body:
- font-medium
- opacity-80
- max-w-3xl for long paragraphs

============================================================
5. COLOR SYSTEM
============================================================

Primary:
- bg-white
- text-black

Borders:
- border-gray-100 only

Light background:
- bg-gray-50 or bg-gray-100

Accent:
- minimal use only for badges or errors

============================================================
6. HOMEPAGE STRUCTURE (EXACTLY 6 SECTIONS)
============================================================

1. Hero (full-bleed)
2. New Arrivals
3. Editorial Story
4. About Us
5. Trust Icons
6. Footer

No additional sections allowed.
No compare, no filters, no cart blocks on homepage.

============================================================
7. SHOP REQUIREMENTS
============================================================

Must include:

- Search input
- Category filter
- Tag filter
- Sort select
- Pagination
- Grid toggle (desktop only)
- Skeleton loading
- Empty state safe

Grid rules:

Mobile:
grid-cols-2 gap-8

Desktop:
md:grid-cols-4 gap-16

No table layout on mobile.

============================================================
8. PRODUCT DETAIL PAGE
============================================================

Must include:

- Image gallery with thumbnails
- Badge row (Authentic, Grade, Origin, Stock)
- Tabs: Description / Details / Reviews
- Related products (4 items)
- Sticky mobile buy bar
- Real-time stock simulation (interval 6–8 seconds)
- Stock never negative

============================================================
9. CART
============================================================

- No table on mobile
- Quantity clamp 1–99
- Remove item
- Summary separated by border-t pt-12
- Empty state safe

============================================================
10. CHECKOUT (MOCK PAYMENT)
============================================================

Validation required:

- Email validation
- Luhn card validation
- Expiry must be future
- CVC 3–4 digits

Behavior:

- Disable form during processing
- 20% random failure
- On success:
  - Create PAID order
  - Clear cart
  - Redirect to order detail
- On failure:
  - Create FAILED order
  - Keep cart

All JSON parsing must use try/catch.
Guard window before localStorage.

============================================================
11. WISHLIST & COMPARE
============================================================

Wishlist:
- Toggle
- Grid layout
- Empty state

Compare:
- Max 4 items
- Mobile stacked layout
- Desktop grid layout
- No table on mobile

============================================================
12. STATE MANAGEMENT SAFETY
============================================================

Store must include:
- cart
- wishlist
- compare
- orders
- account
- cookiePrefs
- notifications
- analytics

Must:
- Guard window
- Wrap JSON.parse in try/catch
- Validate arrays before map
- No undefined property access

============================================================
13. ANALYTICS
============================================================

Track events:
- view_product
- add_to_cart
- begin_checkout
- purchase_success
- purchase_failed

Dashboard must show:
- Revenue (PAID orders)
- Orders count
- Conversion rate (mock)
- Average order value

============================================================
14. PWA
============================================================

Must include:
- manifest.webmanifest
- theme-color meta
- icons

============================================================
15. TESTING
============================================================

Must include:
- Jest tests for validation and reducer
- Playwright test for full checkout flow

============================================================
16. FINAL VALIDATION BEFORE COMPLETION
============================================================

- npm run build must pass
- No TypeScript errors
- No runtime crash
- No nested container
- Hero full-bleed
- No spacing drift
- No table mobile layout
- No arbitrary px values
- No dynamic Tailwind interpolation

END OF FRONTEND AUTHORITATIVE SPEC
