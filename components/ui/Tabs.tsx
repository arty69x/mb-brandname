import { useState } from 'react';

interface TabItem { id: string; label: string; content: string; }
export default function Tabs({ items }: { items: TabItem[] }) {
  const tabs = Array.isArray(items) ? items : [];
  const [active, setActive] = useState(0);
  const onKeyDown = (index: number, key: string): void => {
    if (key === 'ArrowRight') setActive((index + 1) % tabs.length);
    if (key === 'ArrowLeft') setActive((index - 1 + tabs.length) % tabs.length);
  };
  return <div><div role='tablist' className='flex flex-wrap gap-2 border-b border-[#d9d9d9]'>{tabs.map((tab, idx) => <button key={tab.id} role='tab' aria-selected={active === idx} aria-controls={`panel-${tab.id}`} id={`tab-${tab.id}`} onKeyDown={(e) => onKeyDown(idx, e.key)} onClick={() => setActive(idx)} className={`rounded-full border border-[#d9d9d9] px-5 py-2 text-[12px] uppercase tracking-[0.12em] hover:bg-[#f3f3f3] ${active === idx ? 'bg-[var(--cta)] text-white border-[var(--cta)]' : ''}`}>{tab.label}</button>)}</div>{tabs[active] ? <div role='tabpanel' id={`panel-${tabs[active].id}`} aria-labelledby={`tab-${tabs[active].id}`} className='py-8 text-[14px] leading-[1.7] text-[#6b6b6b]'>{tabs[active].content}</div> : null}</div>;
}
