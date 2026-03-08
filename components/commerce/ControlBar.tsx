import { SlidersHorizontal } from 'lucide-react';

interface Props {
  count: number;
  sort: string;
  onSort: (v: string) => void;
  grid: number;
  onGrid: (v: number) => void;
  onFilterToggle: () => void;
}

export default function ControlBar({ sort, onSort, onFilterToggle }: Props) {
  return (
    <div className='grid grid-cols-2 items-center border-y border-[#d7d7d7]'>
      <div className='flex h-[56px] items-center border-r border-[#d7d7d7] px-2 sm:h-[64px]'>
        <label htmlFor='product-sort' className='sr-only'>Sort products</label>
        <select
          id='product-sort'
          aria-label='Sort products'
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className='w-full border-b border-black bg-transparent pb-1.5 text-[13px] font-bold uppercase tracking-[0.12em] focus-visible:outline-none sm:text-[15px]'
        >
          <option value='default'>DEFAULT SORTING</option>
          <option value='price-asc'>PRICE LOW-HIGH</option>
          <option value='price-desc'>PRICE HIGH-LOW</option>
        </select>
      </div>
      <button
        onClick={onFilterToggle}
        className='flex h-[56px] items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:h-[64px] sm:text-[15px]'
      >
        <SlidersHorizontal className='h-4 w-4 sm:h-5 sm:w-5' />
        FILTER
      </button>
    </div>
  );
}
