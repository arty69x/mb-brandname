interface Props {
  count: number;
  sort: string;
  onSort: (v: string) => void;
  grid: number;
  onGrid: (v: number) => void;
  onFilterToggle: () => void;
}

export default function ControlBar({ count, sort, onSort, grid, onGrid, onFilterToggle }: Props) {
  return (
    <div className='flex flex-col gap-4 border-y border-[var(--border)] py-4 lg:flex-row lg:items-center lg:justify-between'>
      <p className='text-[12px] uppercase tracking-[0.12em] text-[var(--caption)]'>{count} results</p>

      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4'>
        <button
          className='h-10 rounded-full border border-[var(--border)] px-4 text-[12px] uppercase tracking-[0.12em] lg:hidden'
          onClick={onFilterToggle}
          aria-label='Open filters'
        >
          Filters
        </button>

        <select
          aria-label='Sort products'
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className='h-10 rounded-full border border-[var(--border)] bg-white px-4 text-[12px] uppercase tracking-[0.12em]'
        >
          <option value='default'>Default</option>
          <option value='price-asc'>Price asc</option>
          <option value='price-desc'>Price desc</option>
        </select>

        <div className='flex gap-2'>
          {[2, 3, 4].map((g) => (
            <button
              key={g}
              onClick={() => onGrid(g)}
              aria-label={`Set grid to ${g} columns`}
              className={`h-10 w-10 rounded-full border border-[var(--border)] text-[12px] uppercase tracking-[0.12em] ${
                grid === g ? 'bg-[var(--cta)] text-white border-[var(--cta)]' : ''
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
