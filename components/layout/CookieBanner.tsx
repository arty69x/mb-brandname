import { useEffect, useState } from 'react';

const KEY = 'mb_cookie_pref_v1';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(KEY);
    setAccepted(saved === 'accepted');
  }, []);

  const onAccept = () => {
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, 'accepted');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <aside className='fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white/95 backdrop-blur'>
      <div className='mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <p className='max-w-[780px] text-[13px] font-semibold uppercase tracking-[0.06em]'>
            WE USE COOKIES TO ENHANCE YOUR EXPERIENCE WHILE NAVIGATE OUR SITE, ANALYZE SITE USAGE, AND ASSIST IN OUR MARKETING EFFORTS.
          </p>
          <p className='mt-3 text-[11px] uppercase text-[var(--muted)]'>Privacy policy &gt;</p>
        </div>
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={onAccept}
            className='h-14 min-w-[170px] bg-black px-6 text-[14px] font-semibold uppercase tracking-[0.08em] text-white'
          >
            Accept all
          </button>
          <button type='button' className='text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'>
            Personalize my choices &gt;
          </button>
        </div>
      </div>
    </aside>
  );
}
