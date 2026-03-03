interface Props { id: string; label: string; value: string; onChange: (value: string) => void; required?: boolean; }
export default function Textarea({ id, label, value, onChange, required }: Props) {
  return <div className='space-y-2'><label htmlFor={id} className='text-[12px] uppercase tracking-[0.12em] text-[var(--caption)]'>{label}</label><textarea id={id} required={required} value={value} onChange={(e) => onChange(e.target.value)} className='min-h-32 w-full rounded-2xl border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accentGold)]'/></div>;
}
