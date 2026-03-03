import Link from 'next/link';

const company = ['About Us', 'Careers', 'Affiliates', 'Blog', 'Contact Us'];
const shop = ['New Arrivals', 'Accessories', 'Bags'];
const help = ['Customer Service', 'My Account', 'Find a Store', 'Legal & Privacy', 'Contact', 'Gift Card'];

export default function Footer() {
  return (
    <footer className='bg-[var(--footer)] pt-16 text-[var(--footerText)]'>
      <div className='container mx-auto grid grid-cols-1 gap-10 px-4 pb-14 lg:grid-cols-5'>
        <div>
          <p className='text-[42px] leading-none tracking-[-0.05em]'>m3</p>
          <p className='-mt-1 mb-8 text-[11px]'>MB BRANDNAME</p>
          <p className='text-[14px] leading-7 text-[var(--footerMuted)]'>1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
          <p className='text-[14px] leading-7 text-[var(--footerMuted)]'>United States</p>
          <p className='mt-4 text-[14px] leading-7 text-[var(--footerMuted)]'>sale@uomo.com</p>
          <p className='text-[14px] leading-7 text-[var(--footerMuted)]'>+1 246-345-0695</p>
        </div>

        <div>
          <p className='mb-6 text-[16px] uppercase'>Company</p>
          <div className='space-y-3 text-[14px] text-[var(--footerMuted)]'>
            {company.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-6 text-[16px] uppercase'>Shop</p>
          <div className='space-y-3 text-[14px] text-[var(--footerMuted)]'>
            {shop.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-6 text-[16px] uppercase'>Help</p>
          <div className='space-y-3 text-[14px] text-[var(--footerMuted)]'>
            {help.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <p className='mb-6 text-[16px] uppercase'>Opening time</p>
          <div className='space-y-3 text-[14px] text-[var(--footerMuted)]'>
            <p>Mon – Fri: 8AM – 9PM</p>
            <p>Sat: 9 AM – 8 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 py-5 text-center text-[12px] text-[var(--footerMuted)]'>
        <span>©2020 Uomo</span>
        <span className='mx-4'>|</span>
        <Link href='/legal-privacy'>Legal & Privacy</Link>
      </div>
    </footer>
  );
}
