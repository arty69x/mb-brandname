export const SITE_NAME = 'MB BRANDNAME';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const canonical = (path: string): string => `${SITE_URL}${path}`;
