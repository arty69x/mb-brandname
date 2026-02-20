# MB BRANDNAME — Frontend Architectural Blueprint

## I. Overarching Philosophy

The MB BRANDNAME frontend is engineered to evoke the atmosphere of a high-end Tokyo boutique. Every interaction, transition, and typographic choice is curated to reflect the "Authentic Luxury Archive" status of the products.

## II. Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 (Primitive Layer) + Custom Vanilla CSS
- **Animations**: Framer Motion (Orchestration Layer)
- **Carousel**: Swiper (Cinematic Transitions)
- **Icons**: Lucide React

## III. Core System Components

### 1. Bilingual Localization (`LanguageContext`)
A sophisticated engine supporting **Thai** and **English**.
- Global `t()` function for string retrieval.
- specialized fonts: `Bodoni Moda` (Serif) integrated with `Prompt/Sarabun` (Thai).

### 2. Transactional Engine (`CartContext` & `Checkout`)
- Real-time cart state with local storage persistence.
- Multi-step checkout flow (Information -> Shipping -> Payment -> Success).
- Support for Guest Checkout and Profile-linked purchases.

### 3. Navigation & Search Overlay
- **Navbar**: High-fidelity sticky navigation with mobile-responsive menu.
- **Global Search**: Modal-based search overlay with real-time results, brand highlighting, and instant product access.

## IV. Design System: "Tokyo Archive"

- **Visual Tone**: Minimalist monochrome layout (Zinc/White/Black) to accentuate luxury product photography.
- **Typography Tokens**:
  - `.luxury-serif`: Uppercase, high-tracking, Bodoni-inspired.
  - `.narrative-text`: Italicized, elegant storytelling.
- **UX Patterns**: 
  - **Loading Skeletons**: Custom CSS-shimmer backgrounds replacing generic spinners.
  - **Glassmorphism**: Subtle backdrop blurs for UI overlays and dropdown menus.

## V. Strategic Pages

### 1. Immersive Homepage
- Cinematic Swiper carousel with 4K video backgrounds.
- Bento-grid layout for editorial storytelling.
- Instagram-ready style galleries.

### 2. Collection Discovery
- **Bags/Accessories**: Grid layouts with real-time `FilterBar` (Filter by Brand, Sort by Price/Newest).
- **Product Detail**: Multi-image zoom gallery, localized luxury descriptions, and dynamic "Related Products" feed.

### 3. Administrative Interface
- Secure login and unified dashboard for order and inventory tracking.

---

_MB BRANDNAME — Curating the Future of Heritage._
