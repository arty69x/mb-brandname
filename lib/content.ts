import type { Category } from "./products";

export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    headline: "LUXURY TOKYO ARCHIVE",
    subline: "Curated contemporary commerce with verified archive pieces.",
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
    headline: "EDITORIAL DISCOVERY",
    subline: "A monochrome-first browsing experience for modern collectors.",
  },
  {
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    headline: "AUTHENTICITY ASSURED",
    subline: "Each item is inspected and documented before release.",
  },
  {
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1600&q=80",
    headline: "COLLECTOR STANDARD",
    subline: "Quiet luxury styling with practical commerce controls.",
  },
];

export const editorialBlocks = [
  { title: "Archive Method", body: "Every piece passes condition grading, provenance checks, and image consistency before publishing." },
  { title: "Tokyo Rhythm", body: "Designed around calm spacing, clear labels, and durable UI patterns for long browsing sessions." },
];

export const trustBadges = ["100% AUTHENTIC", "TOKYO SOURCED", "INSURED SHIPPING", "SECURE CHECKOUT"];

export const featuredCategories: { title: Category; href: string }[] = [
  { title: "BAGS", href: "/shop?category=BAGS" },
  { title: "ACCESSORIES", href: "/shop?category=ACCESSORIES" },
  { title: "READY-TO-WEAR", href: "/shop?category=READY-TO-WEAR" },
  { title: "FOOTWEAR", href: "/shop?category=FOOTWEAR" },
];

export const footerGroups = [
  { title: "Shop", links: ["/shop", "/wishlist", "/compare"] },
  { title: "Support", links: ["/account", "/orders", "/personalize"] },
  { title: "Company", links: ["/", "/api/health", "/cart"] },
];

export const reviews = [
  { author: "Mina K", rating: 5, date: "2026-01-04", title: "Precise curation", body: "Condition notes were exact and the piece arrived in perfect form." },
  { author: "Taro S", rating: 4, date: "2026-01-07", title: "Elegant packaging", body: "Minimal and premium shipping experience with quick dispatch." },
  { author: "Nok P", rating: 5, date: "2026-01-12", title: "Great support", body: "Team answered stock and sizing questions quickly." },
  { author: "Ari M", rating: 4, date: "2026-01-19", title: "Authentic item", body: "Exactly as listed and authenticated documentation included." },
  { author: "Ken L", rating: 5, date: "2026-01-21", title: "Collector grade", body: "Rare colorway with clean detail shots and reliable grading." },
  { author: "Pim T", rating: 4, date: "2026-01-24", title: "Smooth checkout", body: "Payment flow was clear and order tracking worked immediately." },
  { author: "June R", rating: 5, date: "2026-01-28", title: "Will buy again", body: "Editorial feel plus solid commerce features makes this standout." },
  { author: "Beam H", rating: 4, date: "2026-02-02", title: "Fast delivery", body: "Arrived quickly and the quality matched the product story." },
];
