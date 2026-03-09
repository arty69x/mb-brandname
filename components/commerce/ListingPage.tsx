import { useMemo, useState } from 'react';
import { Product } from '@/data/types';
import { filterProducts } from '@/lib/filter';
import { paginate } from '@/lib/pagination';
import { sortProducts } from '@/lib/sort';
import ControlBar from './ControlBar';
import FilterBar from './FilterBar';
import ProductGrid from './ProductGrid';
import Pagination from '../ui/Pagination';

interface Props {
  products: Product[];
  title: string;
  subtitle: string;
  categoryDefault?: string;
}

export default function ListingPage({ products, title, categoryDefault = '' }: Props) {
  const [sort, setSort] = useState('default');
  const [grid, setGrid] = useState(2);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryDefault);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => sortProducts(filterProducts(products, category, search), sort), [products, category, search, sort]);
  const paged = paginate(filtered, page);

  return (
    <main>
      <section className='pb-16'>
        <div className='container mx-auto px-4'>
          <div className='flex min-h-[96px] items-center justify-center border-b border-[#d7d7d7] sm:min-h-[120px]'>
            <h1 className='text-center text-[20px] font-normal uppercase tracking-[0.12em] sm:text-[28px]'>{title}</h1>
          </div>
        </div>

        <div className='container mx-auto px-4'>
          <ControlBar
            count={filtered.length}
            sort={sort}
            onSort={setSort}
            grid={grid}
            onGrid={setGrid}
            onFilterToggle={() => setShowFilter((prev) => !prev)}
          />

          {showFilter ? (
            <div className='my-4'>
              <FilterBar search={search} onSearch={setSearch} category={category} onCategory={setCategory} />
            </div>
          ) : null}

          <ProductGrid products={paged.items} />

          <div className='mt-8'>
            <Pagination page={paged.currentPage} totalPages={paged.totalPages} onPage={setPage} />
          </div>
        </div>
      </section>
    </main>
  );
}
