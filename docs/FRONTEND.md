# MB BRANDNAME — Frontend Architectural Blueprint

## I. Overarching Philosophy

The MB BRANDNAME frontend is engineered to evoke the atmosphere of a high-end Tokyo boutique. Every interaction, transition, and typographic choice is curated to reflect the "Authentic Luxury Archive" status of the products.

## II. Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS (Primitive Layer) + Custom Design Tokens
- **Typography**:
  - _Bodoni Moda_: Elevated luxury serif for headings and hero moments.
  - _Inter_: High-legibility sans-serif for functional UI.
  - _Sarabun/Prompt_: Seamless Thai language integration.
- **Animations**: Framer Motion (Orchestration Layer)
- **Icons**: Lucide React (Thin stroke variants)

## III. Key Pillars

### 1. Bilingual Core (`LanguageContext`)

A sophisticated localization engine supporting **Thai** and **English**.

- Uses a `translations` map for UI strings.
- Dynamic font switching: Thai glyphs are rendered with specialized typography to maintain the luxury aesthetic.

### 2. Transactional Suite (`CartContext`)

A real-time inventory management layer on the client side.

- Handles formatted currency (THB ฿) with automatic normalization.
- Syncs across all product and category views.

### 3. Authentication Vault (`AuthContext`)

Simulated secure access for the client profile and administrative bridge.

- Persistent sessions for personalized curation.
- Redirect logic for secure routes like `Checkout` and `Backend`.

## IV. Design System: "Tokyo Archive"

- **Palette**: Zinc-based neutrals (`#09090b` to `#fafafa`) allowing product photography to dominate the visual stage.
- **Signature Element**: `.luxury-serif` — Uppercase, 0.15em letter-spacing, Bodoni font.
- **Imagery**: 3:4 Aspect ratios common in luxury editorial lookbooks.

## V. Key Pages

- **Homepage**: Cinematic hero sequences with video integration and latest archive drops.
- **Dynamic Product Discovery**: High-fidelity detail page featuring image zoom, localized narratives, and category-intelligent recommendations.
- **Modular Category Grid**: Highly responsive layout with dynamic column toggling for the "New Arrivals" and "Bags" archives.
- **Seamless Checkout**: A 3-step transactional flow with immersive success states.

---

_MB BRANDNAME — Curating the Future of Heritage._
