import { footerGroups } from "../../lib/content";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4 md:gap-16">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">{group.title}</h4>
                <ul className="mt-6 space-y-3 text-sm opacity-80">
                  {group.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em]">Newsletter</p>
              <input
                className="mt-6 w-full border border-white/30 bg-transparent p-3 text-sm"
                placeholder="Email"
              />
              <p className="mt-6 text-xs opacity-70">Payments: VISA · MC · AMEX</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
