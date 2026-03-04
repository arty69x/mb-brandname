# MB UI Reverse Engineering Master

## 1 Environment Profile
- Viewport width: **1440px**
- Device pixel ratio: **1**
- Zoom: **100%**
- Scrollbar width assumption: **0px** unless visible in reference imagery
- Font rendering assumption: **system sans stack** (`Helvetica Neue, Helvetica, Arial, sans-serif`)
- Coordinate space origin for measurements: **top-left of each blueprint file**

## 2 Global Defaults
- Container fallback: `max-width:1280px`, `margin-inline:auto`, `padding-inline:16px`
- Typography fallback: family `Helvetica Neue, Helvetica, Arial, sans-serif`, line-height `1.5`, letter-spacing `0`
- Spacing fallback: base `8px`, sub-unit `4px`
- Radius fallback: card `4px`, pill/button `9999px`
- Shadow fallback: `0 10px 30px rgba(0,0,0,0.08)`
- Viewport validation baseline: `1440xauto`

## 3 Design Tokens
Repeated values extracted from existing references and reconstruction:
- `--color-bg: #ffffff`
- `--color-bg-subtle: #f3f3f3`
- `--color-text: #1a1a1a`
- `--color-muted: #6b6b6b`
- `--color-border: #d9d9d9`
- `--color-danger: #d83535`
- `--color-footer: #020202`
- `--color-footer-text: #f5f5f5`
- `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`

## 4 Page Map
| Filename | Intrinsic Size | Inferred Route | Notes |
|---|---:|---|---|
| home.png | 1920x4325 | `/` | Primary homepage blueprint |
| 02_home.png | 1920x4325 | `/` | Alternate export of homepage |
| new-arrivals.png | 1920x2639 | `/new-arrivals` | Listing page visual |
| page-for-newarrivals-bags-accessories.png | 2203x2897 | `/bags`, `/accessories`, `/shop` | Shared listing layout |
| detail.png | 1920x4396 | `/product/[slug]` | Product detail composition |
| lock-for-mobile01..05.png | ~498 wide | `UNKNOWN` | Mobile lock overlays/components |
| HEADER.png | 569x36 | shared component | Header fragment |
| SLIDER.png | 1920x1018 | shared component | Hero slider state |
| Frame 6/7/8/18, Group 6/7, Section 2, highlight, banner01, screenshots | mixed | `UNKNOWN` | Supporting snippets/exports requiring manual mapping |

## 5 Section Structure (per page)
- `/`: header, hero collage, featured listing, editorial highlight, trust/about block, footer.
- `/new-arrivals`, `/bags`, `/accessories`, `/shop`: header, title/breadcrumb block, controls/filter row, product grid, pagination, footer.
- `/product/[slug]`: header, breadcrumb, gallery and meta two-column section, detail tabs/specs, related products, footer.
- Form pages (`/contact`, `/checkout`, `/account`, `/gift-card`, `/affiliates`, `/careers`): title block, form card, helper content, status messages.
- Static pages (`/about`, `/customer-service`, `/legal-privacy`, `/find-a-store`): title block and prose/card modules.

## 6 Component Structure (shared + per page)
Shared components:
- `Layout/Header/Footer`
- `UI/Button/Input/Textarea/Tabs/Accordion/Breadcrumbs/PageTitleBlock/Pagination/ErrorState/EmptyState`
- Commerce: `ListingPage`, `ControlBar`, `FilterBar`, `ProductGrid`, `ProductCard`, `CartSummary`, `QuantityStepper`, `WishlistButton`

Per-page composition follows templates in section 17.

## 7 Full DOM Tree (per page)
Canonical hierarchy:
- `main`
  - `section`
    - `div.container.mx-auto.px-4`
      - page-specific blocks (title, controls, grid/forms/content)

Homepage additionally includes layered hero stack:
- background image grid layer (z0)
- dark overlay (z10)
- centered title content layer (z20)

## 8 Node Table (all nodes with properties)
Node table is normalized by reusable component contracts:
- `node-header`: `display:flex`, sticky/absolute variant, border bottom.
- `node-hero-grid`: `display:grid`, 12 columns, image tiles with `object-cover`.
- `node-product-card`: media square, text meta, price row, action row.
- `node-form-card`: bordered card, 2-column fields on md+, status row.
- `node-footer`: dark background, 4-column link/info grid.

All text nodes use explicit Tailwind typography utilities and color tokens listed above.

## 9 Bounding Box Map (per page)
Measured reference bounds (page-level):
- Home: `0,0,1920,4325`
- Listing: `0,0,1920,2639`
- Product detail: `0,0,1920,4396`
- Shared fragments: retained for component-specific calibration in future pass.

Computed implementation alignment baseline:
- Container width: `<=1220` inside required `.container.mx-auto.px-4`
- Hero target height: `~78vh` with min-height floor
- Product cards: square media, equal-height grid rows

## 10 Stacking Context Map (per page)
- **Background layer**: page background color blocks.
- **Content layer**: standard section content (`z-auto`).
- **Overlay layer**: hero tint overlays (`z-10`).
- **Controls layer**: header controls and drawers (`z-30` to `z-50`).
- **Modal layer**: offer modal/cookie elements (`z-40`+).

Paint order: background -> structural media -> overlay tints -> textual CTA -> fixed utility surfaces.

## 11 Interaction State Matrix
Implemented state coverage:
- Buttons/links: `default`, `hover`, `active`, `focus-visible`, `disabled`
- Inputs/selects/textarea: `default`, `focus`, `error` (via validation copy), `disabled`
- Tabs/accordions/pagination: `default`, `selected/open`, `focus-visible`
- Async forms: `loading` (submit handling), `empty`, `error`, `success`

## 12 Responsive Rule Tree
Mobile-first derived rules:
- `sm`: preserve single-column content-first flow.
- `md`: listing/forms split into 2 columns where blueprint logic supports it (COMPUTED_VALUE).
- `lg`: desktop control bars, 3+ column product grids, widened hero typography.
- `xl/2xl`: preserve scale and spacing without introducing new modules.

## 13 Accessibility Map
- Semantic landmarks: `main`, `section`, `header`, `footer`
- Controls carry `aria-label` where icon-only or ambiguous
- Tabs use `role=tablist/tab` + `aria-selected`
- Images include descriptive `alt`
- Keyboard navigation expected via native tab order and focus-visible styles

## 14 Animation Map
- No mandatory motion in references; transitions are minimal (`transition-colors`, `transition-opacity`) where already present.
- No autonomous animations by default (DEFAULT_VALUE).

## 15 Validation Plan
1. Build project and inspect route rendering.
2. Capture rendered screenshots at 1440px for key pages.
3. Compare spacing, typography scale, and bounding alignment against blueprint files.
4. Iterate utility classes for mismatch reduction.

## 16 Global Default Values Used
- `node-font-base`: system sans stack used where blueprint does not expose custom webfont (DEFAULT_VALUE).
- `node-shadow-card`: fallback shadow token retained where no shadow visible in blueprint snippets (DEFAULT_VALUE).
- `node-animation`: no animation used for unspecified motions (DEFAULT_VALUE).
- `node-container-fallback`: 1280/16 fallback for ambiguous fragment-only references (DEFAULT_VALUE).

## 17 Missing Reference Pages
| Route | Expected Blueprint Filename | Chosen Template | Derived From | Notes |
|---|---|---|---|---|
| `/checkout` | `checkout.png` (not present) | FormPage | `detail.png`, listing controls | COMPUTED_VALUE spacing/field grouping |
| `/account` | `account.png` (not present) | FormPage | shared forms/cards | COMPUTED_VALUE |
| `/contact` | `contact.png` (not present) | FormPage | shared forms/cards | COMPUTED_VALUE |
| `/about` | `about.png` (not present) | StaticPage | homepage editorial section | COMPUTED_VALUE |
| `/customer-service` | `customer-service.png` (not present) | StaticPage | static prose modules | COMPUTED_VALUE |
| `/legal-privacy` | `legal-privacy.png` (not present) | StaticPage | static prose modules | COMPUTED_VALUE |
| `/find-a-store` | `find-a-store.png` (not present) | StaticPage | form card + listing cards | COMPUTED_VALUE |
| `/gift-card` | `gift-card.png` (not present) | FormPage | checkout/form controls | COMPUTED_VALUE |
| `/affiliates` | `affiliates.png` (not present) | FormPage | shared form UI | COMPUTED_VALUE |
| `/careers` | `careers.png` (not present) | FormPage | cards + forms | COMPUTED_VALUE |
| `/careers/[slug]` | `career-detail.png` (not present) | DetailPage | `detail.png` | TEMPLATE_FALLBACK (DEFAULT_VALUE) |
| `/blog/index` | `blog.png` (not present) | ListingPage | product listing grid | COMPUTED_VALUE |
| `/blog/[slug]` | `blog-detail.png` (not present) | DetailPage | product detail rhythm | COMPUTED_VALUE |
| `/404` | `404.png` (not present) | NotFoundPage/System | empty-state card pattern | COMPUTED_VALUE |

### System Consistency Checklist (Missing Pages)
All missing-reference routes were checked for:
- required hierarchy `main > section > div.container.mx-auto.px-4`
- base-8 spacing compliance
- token-consistent color and typography usage
- accessible labels/headings/semantic structure
- no horizontal overflow on small screens
