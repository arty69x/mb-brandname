import { useMemo, useState } from 'react';
import { Product } from '@/data/types';
import { filterProducts } from '@/lib/filter';
import { paginate } from '@/lib/pagination';
import { sortProducts } from '@/lib/sort';
import ControlBar from './ControlBar';
import FilterBar from './FilterBar';
import ProductGrid from './ProductGrid';
import Pagination from '../ui/Pagination';
import PageTitleBlock from '../ui/PageTitleBlock';

interface Props { products: Product[]; title: string; subtitle: string; categoryDefault?: string; }

export default function ListingPage({ products, title, subtitle, categoryDefault = '' }: Props) {
  const [sort, setSort] = useState('default');
  const [grid, setGrid] = useState(4);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryDefault);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => sortProducts(filterProducts(products, category, search), sort), [products, category, search, sort]);
  const paged = paginate(filtered, page);

  return (
    <main>
      <section className='py-10 lg:py-14'>
        <div className='container mx-auto px-4'>
          <PageTitleBlock title={title} subtitle={subtitle} />
          <div className='rounded-2xl border border-[var(--border)] bg-white px-4 py-4 lg:px-6'>
            <ControlBar count={filtered.length} sort={sort} onSort={setSort} grid={grid} onGrid={setGrid} onFilterToggle={() => null} />
          </div>
          <div className='grid grid-cols-1 gap-10 py-10 lg:grid-cols-[280px_1fr]'>
            <div className='hidden w-[280px] shrink-0 lg:block'>
              <FilterBar search={search} onSearch={setSearch} category={category} onCategory={setCategory} />
            </div>
            <div className={grid === 2 ? 'lg:[&>div]:grid-cols-2' : grid === 3 ? 'lg:[&>div]:grid-cols-3' : ''}>
              <ProductGrid products={paged.items} />
            </div>
          </div>
          <Pagination page={paged.currentPage} totalPages={paged.totalPages} onPage={setPage} />
        </div>
      </section>
    </main>
  );
}
