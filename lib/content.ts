import type { Category } from "./products";

export interface HeroSlide {
  image: string;
  headline: string;
  subline: string;
}

export interface TrustBadge {
  title: string;
  body: string;
}

export interface EditorialFeature {
  image: string;
  title: string;
  paragraph: string;
}

export interface FeaturedCategory {
  label: Category;
  href: string;
  image: string;
}

export const HeroSlides: HeroSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=2000&q=80",
    headline: "LUXURY ARCHIVE COMMERCE",
    subline: "Curated Tokyo-grade pieces for a modern monochrome wardrobe.",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80",
    headline: "EDITORIAL DISCOVERY",
    subline: "Slow browsing, rich imagery, and complete buying confidence.",
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80",
    headline: "AUTHENTICITY STANDARD",
    subline: "Every item is graded, verified, and documented before launch.",
  },
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=80",
    headline: "CINEMATIC RETAIL",
    subline: "Luxury editorial atmosphere with practical commerce flow.",
  },
];

export const TrustBadges: TrustBadge[] = [
  { title: "AUTHENTICITY", body: "Expert verification on every archive release." },
  { title: "GLOBAL SHIPPING", body: "Insured and trackable delivery worldwide." },
  { title: "EASY RETURNS", body: "Transparent returns window with support." },
  { title: "PAYMENT SAFETY", body: "Secure checkout and transaction protection." },
];

export const EditorialFeatures: EditorialFeature[] = [
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80",
    title: "ARCHIVE METHOD",
    paragraph:
      "We source quietly, inspect thoroughly, and publish only after condition grading, provenance checks, and visual consistency review across the full gallery.",
  },
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
    title: "TOKYO RHYTHM",
    paragraph:
      "The interface follows editorial rhythm: generous spacing, strict typography, and product-first composition that feels calm on mobile and expansive on desktop.",
  },
];

export const FeaturedCategories: FeaturedCategory[] = [
  {
    label: "BAGS",
    href: "/shop?category=BAGS",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "ACCESSORIES",
    href: "/shop?category=ACCESSORIES",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "READY-TO-WEAR",
    href: "/shop?category=READY-TO-WEAR",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "FOOTWEAR",
    href: "/shop?category=FOOTWEAR",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
];

export const FooterLinks = [
  { title: "SHOP", links: ["/shop", "/wishlist", "/compare", "/cart"] },
  { title: "CUSTOMER", links: ["/checkout", "/orders", "/personalize"] },
  { title: "ACCOUNT", links: ["/account", "/orders/index", "/api/health"] },
  { title: "ABOUT", links: ["/", "/404", "/shop?category=READY-TO-WEAR"] },
];

export const reviews = [
  { author: "Mina K", rating: 5, date: "2026-01-04", title: "Precise curation", body: "Condition notes were exact and the piece arrived in perfect form." },
  { author: "Taro S", rating: 4, date: "2026-01-07", title: "Elegant packaging", body: "Minimal and premium shipping experience with quick dispatch." },
  { author: "Nok P", rating: 5, date: "2026-01-12", title: "Great support", body: "Team answered stock and sizing questions quickly." },
  { author: "Ari M", rating: 4, date: "2026-01-19", title: "Authentic item", body: "Exactly as listed and authenticated documentation included." },
];
