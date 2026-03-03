import { useState } from 'react';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const list = Array.isArray(items) ? items : [];
  const [open, setOpen] = useState<number | null>(0);
  return <div>{list.map((item, idx) => <div key={`${item.q}-${idx}`} className='border-b border-[var(--border)] py-5'><button aria-expanded={open === idx} className='flex w-full items-center justify-between text-left text-[13px] uppercase tracking-[0.12em]' onClick={() => setOpen(open === idx ? null : idx)}>{item.q}</button>{open === idx ? <div className='pt-4 text-[14px] leading-[1.7] text-[var(--muted)]'>{item.a}</div> : null}</div>)}</div>;
}
