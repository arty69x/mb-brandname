import Link from 'next/link';

const companyLinks = ['About Us', 'Careers', 'Affiliates', 'Blog', 'Contact Us'];
const shopLinks = ['New Arrivals', 'Accessories', 'Bags'];
const helpLinks = ['Customer Service', 'My Account', 'Find a Store', 'Legal & Privacy', 'Contact', 'Gift Card'];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#FFFFFF]">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4">
              <p className="text-[32px] font-light leading-none">MB</p>
              <p className="text-[14px] text-[#E6E6E6]">1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
              <p className="text-[14px] text-[#E6E6E6]">info@brandname.com</p>
              <p className="text-[14px]">+66 2 123 4567</p>
            </div>
            <div className="space-y-4">
              <p className="text-[13px] uppercase tracking-[0.08em]">Company</p>
              {companyLinks.map((item) => (
                <p key={item} className="text-[14px] text-[#E6E6E6]">{item}</p>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[13px] uppercase tracking-[0.08em]">Shop</p>
              {shopLinks.map((item) => (
                <p key={item} className="text-[14px] text-[#E6E6E6]">{item}</p>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[13px] uppercase tracking-[0.08em]">Help</p>
              {helpLinks.map((item) => (
                <p key={item} className="text-[14px] text-[#E6E6E6]">{item}</p>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[13px] uppercase tracking-[0.08em]">Subscribe</p>
              <p className="text-[14px] text-[#E6E6E6]">Be the first to get updates and promotions.</p>
              <div className="flex bg-[#FFFFFF]">
                <input className="w-full px-4 py-3 text-[14px] text-[#111111] outline-none" placeholder="Your email address" />
                <button type="button" className="px-4 text-[13px] uppercase tracking-[0.08em] text-[#111111]">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#6D6D6D] pt-8 text-[14px] text-[#E6E6E6]">
            <p>©2020 Uomo</p>
            <div className="flex items-center gap-2">
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
