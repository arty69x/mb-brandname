import { useState } from 'react';

export default function OfferModal() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-40 hidden items-center justify-center bg-black/70 p-4 lg:flex'>
      <div className='grid w-full max-w-[900px] grid-cols-[1fr_1fr] overflow-hidden rounded bg-[#ffffff]'>
        <img src='/assets/mb/v1/ref/hero2.svg' alt='Offer visual' className='h-full min-h-[500px] w-full object-cover' />
        <div className='relative flex flex-col items-center justify-center px-12 text-center'>
          <button onClick={() => setOpen(false)} className='absolute right-7 top-6 text-3xl text-[#9b97a0]'>×</button>
          <h2 className='text-[58px] font-light leading-[1.05] text-[#8b8890]'>You deserve it</h2>
          <p className='mt-6 text-[38px] uppercase leading-[1.25] tracking-[0.08em] text-[#76727b]'>A special offer just for you and your first order.</p>
          <button className='mt-10 h-14 w-full max-w-[320px] border border-black text-[18px] font-semibold uppercase tracking-[0.12em]'>Claim offer</button>
          <button onClick={() => setOpen(false)} className='mt-8 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#8f8b92]'>No thanks</button>
        </div>
      </div>
    </div>
  );
}
