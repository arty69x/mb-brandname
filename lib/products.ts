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

const imagePool = [
  "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
];

const categories: Category[] = ["BAGS", "ACCESSORIES", "READY-TO-WEAR", "FOOTWEAR"];

function pickImages(index: number): string[] {
  return [
    imagePool[index % imagePool.length],
    imagePool[(index + 2) % imagePool.length],
    imagePool[(index + 4) % imagePool.length],
    imagePool[(index + 6) % imagePool.length],
  ];
}

export const products: Product[] = Array.from({ length: 30 }).map((_, i) => {
  const category = categories[i % categories.length];
  const edition = i + 1;
  return {
    id: `tokyo-${edition}`,
    title: `${category} EDITION ${edition}`,
    category,
    price: 280 + i * 24,
    oldPrice: i % 3 === 0 ? 340 + i * 24 : undefined,
    sku: `MB-${category.slice(0, 3)}-${String(edition).padStart(3, "0")}`,
    grade: i % 7 === 0 ? "A+" : i % 2 === 0 ? "A" : "B",
    origin: "Tokyo JP",
    stock: (i % 11) + 1,
    tags: ["ARCHIVE", "LUXURY", i % 2 === 0 ? "COLLECTOR" : "MINIMAL"],
    images: pickImages(i),
    description: "Curated archival luxury item selected for silhouette, material integrity, and everyday wear confidence.",
    story: "Sourced through Tokyo dealers, authenticated in-house, and photographed with editorial neutrality for accurate purchase decisions.",
    details: [
      "In-house authenticity verification included",
      "Archive condition grade with transparent notes",
      "Premium protective packaging and insured dispatch",
    ],
    featured: i < 14,
    newArrival: i % 2 === 0,
  };
});

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
