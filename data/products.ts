export type Product = {
  id: string;
  slug: string;
  title: string;
  category: 'Accessories' | 'Bags' | 'Footwear' | 'Dresses';
  price: number;
  oldPrice?: number;
  image: string;
  badge?: 'NEW' | 'HOT' | 'SOLD OUT';
  description: string;
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'gg-logo-studs',
    title: 'GG Logo Studs',
    category: 'Accessories',
    price: 320,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    description: 'Elegant studs with a timeless statement.'
  },
  {
    id: '2',
    slug: 'monogram-charms',
    title: 'Monogram Charms',
    category: 'Accessories',
    price: 580,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    description: 'Monogram charms crafted for daily styling.'
  },
  {
    id: '3',
    slug: 'aviator-shades',
    title: 'Aviator Shades',
    category: 'Accessories',
    price: 640,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    description: 'A clean frame profile with polished hardware.'
  },
  {
    id: '4',
    slug: 'heritage-canvas-flap',
    title: 'Heritage Canvas Flap',
    category: 'Bags',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    description: 'Canvas flap silhouette with signature detailing.'
  },
  {
    id: '5',
    slug: 'mesh-mule-heels',
    title: 'Mesh Mule Heels',
    category: 'Footwear',
    price: 820,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    description: 'Slim silhouette mules with mesh upper.'
  },
  {
    id: '6',
    slug: 'silvern-logo-charm',
    title: 'Silvern Logo Charm',
    category: 'Accessories',
    price: 490,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    description: 'Minimal pendant with geometric logo form.'
  },
  {
    id: '7',
    slug: 'zessi-dresses',
    title: 'Zessi Dresses',
    category: 'Dresses',
    price: 129,
    oldPrice: 99,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
    description: 'Lightweight drape and tailored shoulder line.'
  },
  {
    id: '8',
    slug: 'cableknit-shawl',
    title: 'Cableknit Shawl',
    category: 'Dresses',
    price: 129,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Soft texture designed for all-season layering.'
  },
  {
    id: '9',
    slug: 'kirby-t-shirt',
    title: 'Kirby T-Shirt',
    category: 'Dresses',
    price: 17,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80',
    description: 'Relaxed fit tee for modern capsule wardrobes.'
  },
  {
    id: '10',
    slug: 'calvin-shorts',
    title: 'Calvin Shorts',
    category: 'Dresses',
    price: 62,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    description: 'Tailored shorts with elevated finishing touches.'
  }
];
