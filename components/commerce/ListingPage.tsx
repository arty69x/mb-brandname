import { useMemo, useState } from 'react';
import { Product } from '@/data/types';
import { filterProducts } from '@/lib/filter';
import { paginate } from '@/lib/pagination';
import { sortProducts } from '@/lib/sort';
import ControlBar from './ControlBar';
import FilterBar from './FilterBar';
import ProductGrid from './ProductGrid';
import Pagination from '../ui/Pagination';

interface Props { products: Product[]; title: string; subtitle: string; categoryDefault?: string; }

export default function ListingPage({ products, title, categoryDefault = '' }: Props) {
  const [sort, setSort] = useState('default');
  const [grid, setGrid] = useState(4);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryDefault);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => sortProducts(filterProducts(products, category, search), sort), [products, category, search, sort]);
  const paged = paginate(filtered, page);

  return (
    <main>
      <section className='py-8 lg:py-10'>
        <div className='container mx-auto px-4'>
          <div className='relative overflow-hidden'>
            <img src='/assets/mb/v1/hero3.svg' alt='listing hero' className='h-[220px] w-full object-cover lg:h-[360px]' />
            <h1 className='absolute inset-0 flex items-center justify-center text-[36px] font-light uppercase text-white lg:text-[58px]'>{title}</h1>
          </div>

          <ControlBar count={filtered.length} sort={sort} onSort={setSort} grid={grid} onGrid={setGrid} onFilterToggle={() => null} />

          <div className='mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]'>
            <aside className='hidden lg:block'>
              <FilterBar search={search} onSearch={setSearch} category={category} onCategory={setCategory} />
            </aside>
            <div className={grid === 2 ? 'lg:[&>div]:grid-cols-2' : grid === 3 ? 'lg:[&>div]:grid-cols-3' : 'lg:[&>div]:grid-cols-5'}>
              <ProductGrid products={paged.items} />
            </div>
          </div>

          <div className='mt-12'><Pagination page={paged.currentPage} totalPages={paged.totalPages} onPage={setPage} /></div>
        </div>
      </section>
    </main>
  );
}
