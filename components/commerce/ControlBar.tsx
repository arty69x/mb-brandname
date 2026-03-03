interface Props {
  count: number;
  sort: string;
  onSort: (v: string) => void;
  grid: number;
  onGrid: (v: number) => void;
  onFilterToggle: () => void;
}

export default function ControlBar({ sort, onSort, grid, onGrid, onFilterToggle }: Props) {
  return (
    <div className='flex flex-col gap-4 border-b border-[var(--border)] pb-5 lg:flex-row lg:items-center lg:justify-end'>
      <select
        aria-label='Sort products'
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className='h-10 border-b border-[var(--text)] bg-transparent px-1 text-[12px] uppercase tracking-[0.08em]'
      >
        <option value='default'>Default sorting</option>
        <option value='price-asc'>Price low-high</option>
        <option value='price-desc'>Price high-low</option>
      </select>

      <div className='flex items-center gap-3 border-l border-[var(--border)] pl-4 text-[12px] uppercase tracking-[0.08em]'>
        <span>View</span>
        {[2, 3, 4].map((g) => (
          <button
            key={g}
            onClick={() => onGrid(g)}
            aria-label={`Set grid to ${g} columns`}
            className={grid === g ? 'font-bold underline' : ''}
          >
            {g}
          </button>
        ))}
      </div>

      <button onClick={onFilterToggle} className='border-l border-[var(--border)] pl-4 text-[12px] uppercase tracking-[0.08em] lg:hidden'>
        Filter
      </button>
    </div>
  );
}
