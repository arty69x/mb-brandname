import Link from 'next/link';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' }
];
const shopLinks = [
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/bags', label: 'Bags' }
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#FFFFFF]">
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4">
              <p className="text-[32px] leading-none">MB</p>
              <p className="text-[14px] text-white/80">1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
              <p className="text-[14px] text-white/80">sale@mbbrandname.com</p>
              <p className="text-[14px]">+1 246-345-0695</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.1em]">Company</p>
              {companyLinks.map((item) => (
                <Link key={item.label} href={item.href} className="block text-[14px] text-white/80">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.1em]">Shop</p>
              {shopLinks.map((item) => (
                <Link key={item.label} href={item.href} className="block text-[14px] text-white/80">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.1em]">Services</p>
              <p className="text-[14px] text-white/80">Authentication</p>
              <p className="text-[14px] text-white/80">Global Shipping</p>
              <p className="text-[14px] text-white/80">Customer Support</p>
            </div>
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.1em]">Subscribe</p>
              <p className="text-[14px] text-white/80">Get updates on restocks and new collections.</p>
              <div className="flex border border-white/20">
                <input aria-label="Subscribe email" className="w-full bg-transparent px-3 py-2 text-[14px] outline-none" placeholder="Your email" />
                <button type="button" className="px-4 text-[11px] uppercase tracking-[0.1em]">Join</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
