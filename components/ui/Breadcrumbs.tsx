import Link from 'next/link';
interface Crumb { label: string; href?: string; }
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const list = Array.isArray(items) ? items : [];
  return <nav aria-label='Breadcrumb' className='pt-4'><ol className='flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-[var(--caption)]'>{list.map((item, idx) => <li key={`${item.label}-${idx}`}>{item.href ? <Link className='hover:text-[var(--text)] transition-colors' href={item.href}>{item.label}</Link> : item.label}</li>)}</ol></nav>;
}
