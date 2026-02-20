export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: string;
  oldPrice?: string;
  image: string;
  images?: string[];
  description: {
    en: string;
    th: string;
  };
  details?: {
    en: string[];
    th: string[];
  };
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  condition?: string;
  dimensions?: string;
  period?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: {
    en: string;
    th: string;
  };
  image: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  video?: string;
  title?: {
    en: string;
    th: string;
  };
  subtitle?: {
    en: string;
    th: string;
  };
  titleKey?: string;
  subtitleKey?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId?: string;
  guestId?: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
