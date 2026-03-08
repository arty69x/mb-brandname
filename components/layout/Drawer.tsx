import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

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
    <div className='fixed inset-0 z-50 bg-[#f2f2f2]'>
      <div className='flex h-full flex-col'>
        <div className='border-b border-[#d7d7d7]'>
          <div className='container mx-auto px-4'>
            <div className='flex h-[56px] items-center justify-end sm:h-[64px]'>
              <button
                onClick={onClose}
                aria-label='Close menu'
                className='inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40'
              >
                <X className='h-9 w-9 stroke-[1.8]' />
              </button>
            </div>
          </div>
        </div>

        <div className='container mx-auto flex-1 px-4'>{children}</div>

        <div className='mt-8 border-t border-[#d7d7d7]'>
          <div className='container mx-auto grid grid-cols-2 gap-x-8 gap-y-6 px-4 py-8 text-[16px] font-semibold uppercase text-[#4b5565] sm:text-[18px]'>
            <Link href='/find-a-store' onClick={onClose}>STORES</Link>
            <Link href='/about' onClick={onClose}>ABOUT US</Link>
            <Link href='/affiliates' onClick={onClose}>PARTNERSHIP</Link>
            <Link href='/careers' onClick={onClose}>SUPPLIER APPLICATIONS</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
