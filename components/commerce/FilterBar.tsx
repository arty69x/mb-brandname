interface Props { search: string; onSearch: (v: string) => void; category: string; onCategory: (v: string) => void; }
export default function FilterBar({ search, onSearch, category, onCategory }: Props) {
  return <div className='space-y-4'><input aria-label='Search products' value={search} onChange={(e)=>onSearch(e.target.value)} className='h-10 w-full rounded-full border border-[var(--border)] px-4' placeholder='Search'/><select aria-label='Filter category' value={category} onChange={(e)=>onCategory(e.target.value)} className='h-10 w-full rounded-full border border-[var(--border)] px-4'><option value=''>All</option><option value='new-arrivals'>New Arrivals</option><option value='bags'>Bags</option><option value='accessories'>Accessories</option></select></div>;
}
