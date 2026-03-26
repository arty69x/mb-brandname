import Link from 'next/link';

const companyLinks = ['About Us', 'Careers', 'Affiliates', 'Blog', 'Contact Us'];
const shopLinks = ['New Arrivals', 'Accessories', 'Bags'];
const helpLinks = ['Customer Service', 'My Account', 'Find a Store', 'Legal & Privacy', 'Contact', 'Gift Card'];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4">
              <p className="text-[32px] leading-none">MB</p>
              <p className="text-sm text-white/80">1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
              <p className="text-sm text-white/80">sale@uomo.com</p>
              <p className="text-sm">+1 246-345-0695</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em]">Company</p>
              {companyLinks.map((item) => (
                <p key={item} className="text-sm text-white/80">{item}</p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em]">Shop</p>
              {shopLinks.map((item) => (
                <p key={item} className="text-sm text-white/80">{item}</p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em]">Help</p>
              {helpLinks.map((item) => (
                <p key={item} className="text-sm text-white/80">{item}</p>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em]">Subscribe</p>
              <p className="text-sm text-white/80">Be the first to get the latest news about trends.</p>
              <div className="flex border border-white/20">
                <input className="w-full bg-transparent px-3 py-2 text-sm outline-none" placeholder="Your email" />
                <button type="button" className="px-4 text-xs uppercase">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/70">
            <p>©2020 Uomo</p>
            <div className="flex items-center gap-3">
              <Link href="/">United Kingdom</Link>
              <span>|</span>
              <Link href="/">English</Link>
              <span>|</span>
              <Link href="/">$ USD</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
