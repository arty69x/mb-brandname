# mb-brandname

Production-ready storefront UI built with **Next.js 16 (Pages Router)**, **TypeScript (strict mode)**, and **Tailwind CSS v4**.

## Project goals
- Reconstruct UI from blueprint references in `/public/blueprint` with pixel-accurate precision.
- Keep a consistent mobile-first layout and spacing system across all pages.
- Maintain production quality with strong safety guards and reusable UI patterns.

## Required layout and UI standards

### Layout hierarchy (must be preserved)
Every page should use this structure:

```txt
main
  section
    div.container.mx-auto.px-4
```

### Grid and responsive rules
- Mobile-first by default.
- Use `sm`, `md`, `lg`, `xl` breakpoints.
- Product listing grids must follow:
  - Mobile: `grid-cols-2`
  - Tablet: `md:grid-cols-3`
  - Desktop: `lg:grid-cols-4`

### Spacing system
Use base-8 spacing rhythm where possible:
- `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`

### Image rules
- Product images must be **1:1 ratio** (`aspect-square`).
- Always use responsive image sizing.

### Tailwind usage
- Use Tailwind utilities first.
- Avoid custom CSS unless strictly required.
- Use arbitrary values only when necessary for blueprint parity.

## Supported routes
- `/`
- `/new-arrivals`
- `/bags`
- `/accessories`
- `/product/[slug]`
- `/cart`
- `/checkout`

## Engineering safety rules
- Validate arrays before `.map()`.
- Guard `null`/`undefined` access.
- Wrap async logic in `try/catch`.
- Wrap JSON parsing in `try/catch`.
- Always handle loading, empty, and error states.

## Local development

### Prerequisites
- Node.js 20+
- npm 10+

### Install and run
```bash
npm install
npm run dev
```

### Common scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## UX/UI documentation
- Audit report: `docs/UX_UI_AUDIT.md`
- Close-out plan (TH): `docs/UX_UI_CLOSEOUT_PLAN_TH.md`

## Definition of done (UX/UI)
A page is considered complete when:
1. It follows `main > section > div.container.mx-auto.px-4`.
2. Product grids follow 2/3/4 columns across breakpoints.
3. Product images are 1:1 where required.
4. Spacing is aligned with base-8 rhythm.
5. Interactive states are present (`hover`, `focus-visible`, `active`, `disabled`).
6. Blueprint parity is verified for key visual blocks.
7. Build, lint, and type checks pass.
