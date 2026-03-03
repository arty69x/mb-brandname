import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-[var(--footer)] py-14 text-[var(--footerText)] lg:py-20'>
      <section>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-4'>
            <div>
              <p className='text-[12px] uppercase tracking-[0.22em]'>MB BRANDNAME</p>
              <p className='mt-4 text-[13px] leading-[1.8] text-white/70'>Curated secondhand luxury sourced from Japan with strict authentication and premium support.</p>
            </div>
            <div>
              <h3 className='text-[12px] uppercase tracking-[0.18em]'>Client Care</h3>
              <p className='mt-4 text-[13px] leading-[1.8] text-white/70'>1418 River Drive, Suite 35 Cottonhall, CA 9622, United States</p>
              <p className='mt-3 text-[13px] leading-[1.8] text-white/70'>sale@uomo.com · +1 246-345-0695</p>
            </div>
            <div>
              <h3 className='text-[12px] uppercase tracking-[0.18em]'>Opening Hours</h3>
              <p className='mt-4 text-[13px] leading-[1.8] text-white/70'>Mon - Fri: 8AM-9PM</p>
              <p className='text-[13px] leading-[1.8] text-white/70'>Sat: 9AM-8PM</p>
              <p className='text-[13px] leading-[1.8] text-white/70'>Sun: Closed</p>
            </div>
            <div>
              <h3 className='text-[12px] uppercase tracking-[0.18em]'>Quick Links</h3>
              <div className='mt-4 flex flex-col gap-2 text-[13px] text-white/70'>
                <Link href='/shop'>Shop</Link>
                <Link href='/contact'>Contact</Link>
                <Link href='/customer-service'>Customer Service</Link>
                <Link href='/legal-privacy'>Legal & Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
