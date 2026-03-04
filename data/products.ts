import { Product } from './types';

const add = (
  id: string,
  slug: string,
  title: string,
  category: Product['category'],
  price: number,
  compareAtPrice: number | null,
  image: string,
  tags: string[]
): Product => ({
  id,
  slug,
  title,
  category,
  price,
  compareAtPrice,
  currency: 'USD',
  images: [image, '/assets/mb/v1/ref/hero1.svg', '/assets/mb/v1/ref/hero2.svg', '/assets/mb/v1/ref/hero3.svg'],
  shortDescription: 'Phasellus sed volutpat orci. Fusce eget lorem mauris vehicula elementum gravida nec dui.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  tags,
  additionalInfo: [
    { label: 'Weight', value: '1.25 kg' },
    { label: 'Dimensions', value: '90 x 60 x 90 cm' },
    { label: 'Lining', value: '100% Polyester' }
  ],
  inventory: 20,
  createdAtISO: '2026-01-01T00:00:00.000Z'
});

export const PRODUCTS: Product[] = [
  add('p1', 'cropped-faux-leather-jacket', 'Cropped Faux Leather Jacket', 'dresses', 29, null, '/assets/mb/v1/ref/p1a.svg', ['biker', 'black']),
  add('p2', 'bottega-brown', 'Bottega Brown', 'bags', 62, null, '/assets/mb/v1/ref/p1b.svg', ['brown', 'daily']),
  add('p3', 'kirby-tshirt', 'Kirby T-Shirt', 'dresses', 17, null, '/assets/mb/v1/ref/p2a.svg', ['casual', 'summer']),
  add('p4', 'cableknit-shawl', 'Cableknit Shawl', 'accessories', 99, 129, '/assets/mb/v1/ref/p3a.svg', ['shawl', 'winter']),
  add('p5', 'zessi-dresses', 'Zessi Dresses', 'dresses', 99, 129, '/assets/mb/v1/ref/p4a.svg', ['new', 'limited']),
  add('p6', 'calvin-shorts', 'Calvin Shorts', 'new-arrivals', 62, null, '/assets/mb/v1/ref/hero1.svg', ['street']),
  add('p7', 'gucci-earring', 'Gucci Earring', 'accessories', 17, null, '/assets/mb/v1/ref/hero2.svg', ['earring']),
  add('p8', 'lv-charms', 'LV Charms', 'accessories', 99, 129, '/assets/mb/v1/ref/hero3.svg', ['jewel']),
  add('p9', 'cartier-shades', 'Cartier Shades', 'accessories', 99, 129, '/assets/mb/v1/ref/blog1.svg', ['sunglasses']),
  add('p10', 'chanel-heels', 'Chanel Heels', 'dresses', 29, null, '/assets/mb/v1/ref/blog2.svg', ['heels']),
  add('p11', 'dior-pendant', 'Dior Pendant', 'accessories', 62, null, '/assets/mb/v1/ref/p2a.svg', ['necklace']),
  add('p12', 'chanel-frame', 'Chanel Frame', 'accessories', 17, null, '/assets/mb/v1/ref/p3a.svg', ['frame'])
];
