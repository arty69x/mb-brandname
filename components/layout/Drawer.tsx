import { ReactNode, useEffect, useRef } from 'react';

interface Props { open: boolean; onClose: () => void; children: ReactNode; }

export default function Drawer({ open, onClose, children }: Props): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>('button,a,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return <div className='fixed inset-0 z-50'><button aria-label='Close drawer overlay' onClick={onClose} className='absolute inset-0 bg-black/40' /><div ref={ref} className='absolute right-0 top-0 h-full w-80 bg-white p-6'><button onClick={onClose} className='mb-6'>Close</button>{children}</div></div>;
}
