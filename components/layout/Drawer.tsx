import { ReactNode, useEffect } from 'react';

interface Props { open: boolean; onClose: () => void; children: ReactNode; }

export default function Drawer({ open, onClose, children }: Props): ReactNode {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 bg-[var(--bg)]'>
      <div className='flex h-full flex-col'>
        <div className='flex items-center justify-end p-3'>
          <button onClick={onClose} className='text-4xl leading-none'>×</button>
        </div>
        <div className='flex-1 px-4'>{children}</div>
        <div className='grid grid-cols-2 border-t border-[var(--border)] px-4 py-4 text-[27px] uppercase tracking-[0.1em]'>
          <span>Stores</span>
          <span>About us</span>
        </div>
      </div>
    </div>
  );
}
