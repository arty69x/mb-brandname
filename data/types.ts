export type ProductCategory = 'new-arrivals' | 'bags' | 'accessories' | 'dresses' | 'other';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number | null;
  priceRange?: { min: number; max: number } | null;
  currency: 'USD';
  images: string[];
  shortDescription: string;
  description: string;
  tags: string[];
  additionalInfo: { label: string; value: string }[];
  inventory: number;
  createdAtISO: string;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAtISO: string;
  shipping: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
}
