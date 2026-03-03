import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1', slug: 'tokyo-signature-tote', title: 'Tokyo Signature Tote', category: 'bags', price: 380, compareAtPrice: 430,
    currency: 'USD', images: ['/assets/mb/v1/p1a.svg', '/assets/mb/v1/p1b.svg'], shortDescription: 'Elegant daily tote in premium leather.',
    description: 'A timeless tote crafted for everyday use with premium stitching and structured silhouette inspired by Tokyo minimalism.',
    tags: ['leather', 'tote', 'new'], additionalInfo: [{ label: 'Material', value: 'Leather' }, { label: 'Origin', value: 'Japan' }, { label: 'Condition', value: 'Excellent' }],
    inventory: 12, createdAtISO: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'p2', slug: 'kyoto-mini-crossbody', title: 'Kyoto Mini Crossbody', category: 'new-arrivals', price: 260, compareAtPrice: null,
    currency: 'USD', images: ['/assets/mb/v1/p2a.svg', '/assets/mb/v1/p1a.svg'], shortDescription: 'Compact and refined for evening wear.',
    description: 'Minimal crossbody design with sleek hardware, adjustable strap, and compact luxury profile for day-to-night styling.',
    tags: ['crossbody'], additionalInfo: [{ label: 'Strap', value: 'Adjustable' }, { label: 'Origin', value: 'Japan' }, { label: 'Condition', value: 'Very Good' }],
    inventory: 18, createdAtISO: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'p3', slug: 'osaka-silk-scarf', title: 'Osaka Silk Scarf', category: 'accessories', price: 120, compareAtPrice: null,
    currency: 'USD', images: ['/assets/mb/v1/p3a.svg', '/assets/mb/v1/p2a.svg'], shortDescription: 'Soft silk scarf with monogram motif.',
    description: 'Pure silk finish with collectible monogram details, perfect for styling as neck scarf, bag charm, or head wrap.',
    tags: ['silk', 'scarf'], additionalInfo: [{ label: 'Fabric', value: '100% Silk' }, { label: 'Size', value: '90 x 90 cm' }, { label: 'Condition', value: 'Excellent' }],
    inventory: 32, createdAtISO: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'p4', slug: 'ginza-structured-bag', title: 'Ginza Structured Bag', category: 'bags', price: 510, compareAtPrice: 560,
    currency: 'USD', images: ['/assets/mb/v1/p4a.svg', '/assets/mb/v1/p1b.svg'], shortDescription: 'Statement structured bag for formal styling.',
    description: 'Architectural silhouette with polished clasp, interior compartments, and premium edge finishing for formal looks.',
    tags: ['structured'], additionalInfo: [{ label: 'Compartments', value: '3' }, { label: 'Origin', value: 'Japan' }, { label: 'Condition', value: 'Excellent' }],
    inventory: 8, createdAtISO: '2026-01-04T00:00:00.000Z',
  },
  {
    id: 'p5', slug: 'harajuku-chain-wallet', title: 'Harajuku Chain Wallet', category: 'accessories', price: 190, compareAtPrice: 220,
    currency: 'USD', images: ['/assets/mb/v1/p1b.svg', '/assets/mb/v1/p3a.svg'], shortDescription: 'Wallet-on-chain for compact luxury styling.',
    description: 'Refined chain wallet with smart card layout and detachable chain strap for evening and travel versatility.',
    tags: ['wallet', 'chain'], additionalInfo: [{ label: 'Material', value: 'Grained leather' }, { label: 'Condition', value: 'Very Good' }],
    inventory: 14, createdAtISO: '2026-01-05T00:00:00.000Z',
  },
  {
    id: 'p6', slug: 'sapporo-weekend-duffle', title: 'Sapporo Weekend Duffle', category: 'new-arrivals', price: 450, compareAtPrice: null,
    currency: 'USD', images: ['/assets/mb/v1/p4a.svg', '/assets/mb/v1/p2a.svg'], shortDescription: 'Travel-ready duffle with elevated details.',
    description: 'Spacious luxury duffle with reinforced handles, detachable strap, and polished metal feet for premium travel.',
    tags: ['travel', 'duffle'], additionalInfo: [{ label: 'Capacity', value: '32L' }, { label: 'Condition', value: 'Excellent' }],
    inventory: 6, createdAtISO: '2026-01-06T00:00:00.000Z',
  },
];
