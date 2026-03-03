interface Props { page: number; totalPages: number; onPage: (page: number) => void; }
export default function Pagination({ page, totalPages, onPage }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return <div className='mt-10 flex items-center justify-center gap-2'>{pages.map((p) => <button key={p} onClick={() => onPage(p)} className={`h-10 min-w-10 rounded-full border border-[var(--border)] px-4 text-[12px] uppercase tracking-[0.12em] hover:bg-[var(--bg-alt)] ${p === page ? 'bg-[var(--cta)] text-white border-[var(--cta)] hover:bg-[var(--ctaHover)]' : ''}`}>{p}</button>)}</div>;
}
