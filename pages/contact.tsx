import { useState } from 'react';
import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function ContactPage() {
  const [loading] = useState(false);
  const [error] = useState('');
  const [empty] = useState(false);

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-[28px] font-light tracking-[0.06em] sm:text-[32px] md:text-[40px] lg:text-[52px]">Contact</h1>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {loading ? <LoadingUI label="contact" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {empty ? <EmptyUI label="contact" /> : null}
          {!loading && !error && !empty ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <form className="space-y-4">
                <input aria-label="Name" className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Name" />
                <input aria-label="Email" className="w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Email" />
                <textarea aria-label="Message" className="h-40 w-full border border-[#E6E6E6] bg-[#FFFFFF] px-4 py-3" placeholder="Message" />
                <button type="button" className="bg-[#111111] px-8 py-3 text-[11px] uppercase tracking-[0.1em] text-[#FFFFFF]">Send</button>
              </form>
              <div className="space-y-4">
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px]">Get in touch</h2>
                <p className="text-[14px] text-[#6D6D6D]">1418 River Drive, Suite 35 Cottonhall, CA 9622</p>
                <p className="text-[14px] text-[#6D6D6D]">sale@mbbrandname.com</p>
                <p className="text-[14px] text-[#6D6D6D]">+1 246-345-0695</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
