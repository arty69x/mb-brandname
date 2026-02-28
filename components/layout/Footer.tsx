import Link from "next/link";
import { FooterLinks } from "../../lib/content";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            {FooterLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">{group.title}</h4>
                <ul className="mt-5 space-y-3 text-sm opacity-80">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link href={link}>{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}
