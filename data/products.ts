import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1', slug: 'tokyo-signature-tote', title: 'Tokyo Signature Tote', category: 'bags', price: 380, compareAtPrice: 430,
    currency: 'USD', images: ['/assets/mb/v1/p1a.svg', '/assets/mb/v1/p1b.svg'], shortDescription: 'Elegant daily tote in premium leather.',
    description: 'A timeless tote crafted for everyday use with premium stitching and structured silhouette.',
    tags: ['leather', 'tote', 'new'], additionalInfo: [{ label: 'Material', value: 'Leather' }, { label: 'Origin', value: 'Japan' }],
    inventory: 12, createdAtISO: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'p2', slug: 'kyoto-mini-crossbody', title: 'Kyoto Mini Crossbody', category: 'new-arrivals', price: 260, compareAtPrice: null,
    currency: 'USD', images: ['/assets/mb/v1/p2a.svg'], shortDescription: 'Compact and refined for evening wear.',
    description: 'Minimal crossbody design with sleek hardware and adjustable strap.',
    tags: ['crossbody'], additionalInfo: [{ label: 'Strap', value: 'Adjustable' }], inventory: 18, createdAtISO: '2026-01-02T00:00:00.000Z'
  },
  {
    id: 'p3', slug: 'osaka-silk-scarf', title: 'Osaka Silk Scarf', category: 'accessories', price: 120, compareAtPrice: null,
    currency: 'USD', images: ['/assets/mb/v1/p3a.svg'], shortDescription: 'Soft silk scarf with monogram motif.',
    description: 'Pure silk finish for a refined accent through all seasons.', tags: ['silk', 'scarf'],
    additionalInfo: [{ label: 'Fabric', value: '100% Silk' }], inventory: 32, createdAtISO: '2026-01-03T00:00:00.000Z'
  },
  {
    id: 'p4', slug: 'ginza-structured-bag', title: 'Ginza Structured Bag', category: 'bags', price: 510, compareAtPrice: 560,
    currency: 'USD', images: ['/assets/mb/v1/p4a.svg'], shortDescription: 'Statement structured bag for formal styling.',
    description: 'Architectural silhouette with polished clasp and interior compartments.', tags: ['structured'],
    additionalInfo: [{ label: 'Compartments', value: '3' }], inventory: 8, createdAtISO: '2026-01-04T00:00:00.000Z'
  }
];
