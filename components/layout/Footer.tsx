import { footerGroups } from "../../lib/content";

export default function Footer() {
  return (
    <footer className="bg-black py-20 text-white">
      <section>
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">{group.title}</h4>
              <ul className="mt-4 space-y-2 text-sm opacity-80">
                {group.links.map((l) => (<li key={l}>{l}</li>))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Newsletter</p>
            <input className="mt-4 w-full border border-white/30 bg-transparent p-3 text-sm" placeholder="Email" />
            <p className="mt-5 text-xs opacity-70">Payments: VISA · MC · AMEX</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
