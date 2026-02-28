# MB BRANDNAME — MASTER BLUEPRINT
Authoritative Specification
Version: 1.0
This file is the single source of truth for the entire project.
If implementation conflicts with this file, this file always wins.

---

# 1. ARCHITECTURE

## 1.1 Framework
- Next.js Pages Router only
- No App Router
- TypeScript strict true
- No `any` type
- No runtime unsafe access

## 1.2 Tailwind
- Tailwind CSS v4
- styles/globals.css MUST contain:
  @import "tailwindcss";
- No arbitrary px values
- No dynamic Tailwind class interpolation

---

# 2. GLOBAL LAYOUT RULE

All pages MUST follow:

Layout
  main
    section.py-24 or py-32
      div.container.mx-auto.px-4

Exception:
Hero section MUST NOT use container.

Hero:
<section class="relative h-[75vh] w-full">

No nested containers allowed.

---

# 3. SPACING SCALE

Allowed vertical spacing only:
- py-16
- py-24
- py-32

Allowed gap values:
- gap-8
- gap-12
- gap-16

Allowed margin values:
- mt-8
- mt-12
- mt-16
- mt-24

No other spacing values allowed.

---

# 4. TYPOGRAPHY

Hero:
- uppercase
- font-light
- tracking-[0.55em]
- text-5xl mobile
- text-7xl desktop

Section headings:
- uppercase
- font-light
- tracking-[0.45em]
- text-2xl mobile
- text-4xl desktop

UI labels/buttons:
- uppercase
- font-black
- tracking-[0.3em]
- text-[11px]

Body:
- font-medium
- opacity-80
- max-w-3xl for long text

---

# 5. COLOR SYSTEM

Primary:
- background: white
- text: black

Borders:
- gray-100 only

Light sections:
- gray-50 or gray-100

Accent:
- minimal (badges, errors only)

---

# 6. HOMEPAGE STRUCTURE (EXACTLY 6 SECTIONS)

1. Hero
2. New Arrivals
3. Editorial Story
4. About Us
5. Trust Icons
6. Footer

No additional sections allowed.

---

# 7. SHOP REQUIREMENTS

Must include:
- Search
- Category filter
- Tag filter
- Sort
- Pagination
- Grid toggle (desktop only)
- Skeleton loading
- Empty state

Grid:
Mobile:
grid-cols-2 gap-8

Desktop:
md:grid-cols-4 gap-16

---

# 8. PRODUCT DETAIL PAGE

Must include:
- Image gallery with thumbnails
- Badges (Authentic, Grade, Origin, Stock)
- Tabs (Description, Details, Reviews)
- Related products (4 items)
- Sticky mobile buy bar
- Real-time stock ticker simulation

---

# 9. CART

- No table on mobile
- Quantity clamp 1–99
- Remove item
- Summary separated with border-t pt-12
- Empty state safe

---

# 10. CHECKOUT (MOCK PAYMENTS)

Validation:
- Email validation
- Luhn card validation
- Expiry future check
- CVC 3–4 digits

Behavior:
- Disable during processing
- 20% random failure
- On success:
  - Create PAID order
  - Clear cart
  - Redirect to order page
- On failure:
  - Create FAILED order
  - Keep cart

---

# 11. WISHLIST & COMPARE

Wishlist:
- Toggle
- Grid layout
- Empty state

Compare:
- Max 4 items
- Mobile stacked layout
- Desktop grid layout
- No table on mobile

---

# 12. STATE MANAGEMENT

Global store must include:
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
- Wrap JSON parse in try/catch
- Validate arrays before map
- No undefined access

---

# 13. ANALYTICS

Track:
- view_product
- add_to_cart
- begin_checkout
- purchase_success
- purchase_failed

Dashboard must display:
- Revenue (PAID orders)
- Orders count
- Conversion rate (mock)
- Average order value

---

# 14. PWA

Must include:
- manifest.webmanifest
- theme-color meta
- icons

---

# 15. TESTING

Must include:
- Jest unit tests for validation + reducer
- Playwright e2e for full checkout flow

---

# 16. FINAL VALIDATION

Before completion:
- npm run build passes
- No TypeScript errors
- No runtime crashes
- No nested container
- Hero full-bleed
- No spacing drift
- No mobile table layout
- No arbitrary px values
- No dynamic Tailwind interpolation

End of authoritative specification.
