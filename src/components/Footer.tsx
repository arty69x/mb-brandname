"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Footer() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const isBackend = pathname?.startsWith("/backend");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (isBackend) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks = [
    {
      title: t("footer.collections").toUpperCase(),
      links: [
        { href: "/new-arrivals", label: t("nav.newArrivals") },
        { href: "/bags", label: t("nav.bags") },
        { href: "/accessories", label: t("nav.accessories") },
      ],
    },
    {
      title: t("footer.assistance"),
      links: [
        { href: "/about", label: t("footer.contact") },
        {
          href: "/terms",
          label: t("footer.returns"),
        },
        {
          href: "/privacy",
          label: t("footer.authenticity"),
        },
      ],
    },
    {
      title: t("footer.boutique"),
      links: [
        {
          href: "/about",
          label: t("footer.ourStory"),
        },
        {
          href: "/about",
          label: t("footer.locations"),
        },
        {
          href: "/about",
          label: t("footer.concierge"),
        },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white pt-32 pb-16 font-thai relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-black tracking-tighter leading-none">
          MB
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 pb-20 border-b border-zinc-900">
          {/* Brand Identity / Newsletter */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <span className="text-4xl luxury-serif tracking-[0.2em] block">
                MB
              </span>
              <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase max-w-sm leading-loose">
                Curating the rarest luxury archives directly from Japan. 100%
                Authenticity guaranteed since 2015.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-6">
              <p className="text-[10px] tracking-[0.4em] uppercase font-black">
                {t("footer.subscribe")}
              </p>
              <div className="flex gap-4 border-b border-zinc-800 pb-4 group focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-[12px] grow tracking-widest placeholder:text-zinc-700 font-bold"
                />
                <button
                  type="submit"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  {subscribed ? (
                    t("footer.subscribed")
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-10">
              <h4 className="text-[11px] font-black tracking-[0.4em] uppercase">
                {section.title}
              </h4>
              <ul className="space-y-6">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex gap-8">
              <Facebook className="w-4 h-4 text-zinc-600 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="w-4 h-4 text-zinc-600 hover:text-white transition-colors cursor-pointer" />
              <Youtube className="w-4 h-4 text-zinc-600 hover:text-white transition-colors cursor-pointer" />
            </div>
            <p className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase">
              {t("footer.copyrightText")}
            </p>
          </div>

          <div className="flex items-center gap-10">
            {isAdmin && (
              <Link
                href="/backend"
                className="flex items-center gap-2 text-zinc-700 hover:text-emerald-500 transition-colors text-[9px] tracking-[0.4em] uppercase font-black"
              >
                <ShieldCheck size={14} /> {t("footer.vaultAccess")}
              </Link>
            )}
            <Link
              href="/terms"
              className="text-[9px] tracking-[0.3em] text-zinc-700 hover:text-white transition-colors uppercase"
            >
              {t("footer.termsPrivilege")}
            </Link>
            <Link
              href="/privacy"
              className="text-[9px] tracking-[0.3em] text-zinc-700 hover:text-white transition-colors uppercase"
            >
              {t("footer.privacyProtocol")}
            </Link>
            <Link
              href="/cookies"
              className="text-[9px] tracking-[0.3em] text-zinc-700 hover:text-white transition-colors uppercase"
            >
              {t("footer.cookieManagement")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
