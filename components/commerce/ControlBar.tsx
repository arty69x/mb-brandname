interface Props { count: number; sort: string; onSort: (v: string) => void; grid: number; onGrid: (v: number) => void; onFilterToggle: () => void; }

export default function ControlBar({ sort, onSort, grid, onGrid, onFilterToggle }: Props) {
  return (
    <div className='flex flex-col gap-4 py-2 lg:flex-row lg:items-center lg:justify-end'>
      <select aria-label='Sort products' value={sort} onChange={(e) => onSort(e.target.value)} className='h-8 border-b border-black bg-transparent px-2 text-[11px] uppercase tracking-[0.08em]'>
        <option value='default'>Default sorting</option>
        <option value='price-asc'>Price asc</option>
        <option value='price-desc'>Price desc</option>
      </select>
      <div className='flex items-center gap-2 text-[11px] uppercase tracking-[0.08em]'>
        <span>View</span>
        {[2, 3, 4].map((g) => <button key={g} onClick={() => onGrid(g)} className={grid === g ? 'underline' : ''}>{g}</button>)}
      </div>
      <button className='h-8 px-2 text-[11px] uppercase tracking-[0.08em]' onClick={onFilterToggle}>Filter</button>
    </div>
  );
}
