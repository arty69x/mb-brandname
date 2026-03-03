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
  const [grid, setGrid] = useState(4);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryDefault);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => sortProducts(filterProducts(products, category, search), sort), [products, category, search, sort]);
  const paged = paginate(filtered, page);

  return (
    <main>
      <section className='pb-16'>
        <PageTitleBlock title={title} subtitle={subtitle} />
        <div className='container mx-auto px-4'>
          <ControlBar count={filtered.length} sort={sort} onSort={setSort} grid={grid} onGrid={setGrid} onFilterToggle={() => null} />

          <div className='my-6 lg:hidden'>
            <FilterBar search={search} onSearch={setSearch} category={category} onCategory={setCategory} />
          </div>

          <div className={grid === 2 ? 'lg:[&>div]:grid-cols-2' : grid === 3 ? 'lg:[&>div]:grid-cols-3' : ''}>
            <ProductGrid products={paged.items} />
          </div>

          <div className='mt-10'>
            <Pagination page={paged.currentPage} totalPages={paged.totalPages} onPage={setPage} />
          </div>
        </div>
      </section>
    </main>
  );
}
