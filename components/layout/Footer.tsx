const footerItems = [
  '1418 River Drive, Suite 35 Cottonhall, CA 9622, United States',
  'sale@uomo.com',
  '+1 246-345-0695',
  'Mon - Fri: 8AM-9PM, Sat: 9AM-8PM, Sun: Closed'
];

export default function Footer() {
  return (
    <footer className='bg-[var(--footer)] text-[var(--footerText)] py-14 lg:py-20'>
      <section>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-5'>
            <div>
              <p className='text-[12px] uppercase tracking-[0.12em]'>MB BRANDNAME</p>
            </div>
            {footerItems.map((item) => (
              <div key={item}>
                <p className='text-[14px] leading-[1.7] text-[var(--footerMuted)]'>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
