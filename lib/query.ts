export function getStringParam(value: string | string[] | undefined, fallback: string): string {
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return fallback;
}

export function getNumberParam(value: string | string[] | undefined, fallback: number, min: number, max: number): number {
  const raw = typeof value === 'string' ? Number(value) : Number.NaN;
  if (!Number.isFinite(raw)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(raw)));
}
