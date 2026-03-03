import { useState } from 'react';

export default function CookieBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]'>
      <div className='mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='max-w-[760px] text-[11px] font-medium uppercase leading-[1.4] tracking-[0.04em]'>
            We use cookies to enhance your experience while navigate our site, analyze site usage, and assist in our marketing efforts.
          </p>
          <button className='mt-2 text-[10px] uppercase underline'>Privacy policy &gt;</button>
        </div>
        <div className='flex items-end gap-5 md:flex-col md:items-end md:gap-2'>
          <button onClick={() => setOpen(false)} className='h-10 min-w-[112px] bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white'>
            Accept all
          </button>
          <button className='text-[10px] font-medium uppercase'>Personalize my choices &gt;</button>
        </div>
      </div>
    </div>
  );
}
