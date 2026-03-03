export const PER_PAGE = 12;

export function paginate<T>(items: T[], page: number): { items: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  return { items: items.slice(start, start + PER_PAGE), totalPages, currentPage };
}
