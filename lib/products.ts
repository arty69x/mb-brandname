export type Category = "BAGS" | "ACCESSORIES" | "READY-TO-WEAR" | "FOOTWEAR";

export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  oldPrice?: number;
  sku: string;
  grade: "A+" | "A" | "B";
  origin: "Tokyo JP";
  stock: number;
  tags: string[];
  images: string[];
  description: string;
  story: string;
  details: string[];
  featured: boolean;
  newArrival: boolean;
}

const pool = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
];

function pick(i: number): string[] {
  return [pool[i % pool.length], pool[(i + 2) % pool.length], pool[(i + 4) % pool.length]];
}

const categories: Category[] = ["BAGS", "ACCESSORIES", "READY-TO-WEAR", "FOOTWEAR"];

export const products: Product[] = Array.from({ length: 24 }).map((_, i) => {
  const category = categories[i % categories.length];
  return {
    id: `tokyo-${i + 1}`,
    title: `${category} Archive Piece ${i + 1}`,
    category,
    price: 220 + i * 25,
    oldPrice: i % 3 === 0 ? 290 + i * 20 : undefined,
    sku: `MB-${category.slice(0, 3)}-${(i + 1).toString().padStart(3, "0")}`,
    grade: i % 5 === 0 ? "A+" : i % 2 === 0 ? "A" : "B",
    origin: "Tokyo JP",
    stock: (i % 10) + 1,
    tags: ["Archive", "Tokyo", i % 2 === 0 ? "Collector" : "Minimal"],
    images: pick(i),
    description: "A carefully selected luxury archive item with a timeless silhouette and clean proportions.",
    story: "Sourced from Tokyo archive circles and selected for condition, rarity, and practical elegance for everyday use.",
    details: ["Authenticated by in-house team", "Premium finish and hardware", "Stored in climate-safe archive environment"],
    featured: i < 12,
    newArrival: i % 2 === 0,
  };
});

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
