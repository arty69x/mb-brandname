"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  Layers,
  Image as ImageIcon,
  Settings,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  // Auth Guard
  useEffect(() => {
    // If we're on the login page, don't redirect
    if (pathname === "/backend/login") {
      setTimeout(() => setIsVerifying(false), 0);
      return;
    }

    if (!isAdmin) {
      router.push("/backend/login");
    } else {
      setTimeout(() => setIsVerifying(false), 0);
    }
  }, [isAdmin, pathname, router]);

  const navItems = [
    { href: "/backend", label: "Dashboard", icon: LayoutDashboard },
    { href: "/backend/products", label: "Inventory", icon: Package },
    { href: "/backend/categories", label: "Categories", icon: Layers },
    { href: "/backend/hero", label: "Hero Experience", icon: ImageIcon },
    { href: "/backend/settings", label: "System Config", icon: Settings },
  ];

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-thai">
        <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin mb-6" />
        <span className="text-[10px] tracking-[0.5em] uppercase opacity-50">
          Authenticating Session
        </span>
      </div>
    );
  }

  // If on login page, just show children without sidebar
  if (pathname === "/backend/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Backend Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-10 border-b border-zinc-900">
          <Link href="/" className="flex flex-col gap-1 group">
            <span className="text-2xl luxury-serif tracking-[0.2em] text-white">
              MB <span className="text-zinc-500 italic">Vault</span>
            </span>
            <span className="text-[8px] tracking-[0.4em] text-zinc-600 uppercase font-bold">
              Japan Licensing / v2.0
            </span>
          </Link>
        </div>

        <nav className="grow py-10 px-6 space-y-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/backend" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-5 py-4 rounded-sm text-[10px] tracking-[0.25em] uppercase font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-lg translate-x-1"
                    : "text-zinc-600 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={16} strokeWidth={1.5} />
                  {item.label}
                </div>
                {isActive && (
                  <ChevronRight size={10} className="text-white/40" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-zinc-900 bg-zinc-950/50">
          <Link
            href="/"
            className="flex items-center gap-4 px-5 py-3 text-zinc-500 hover:text-white text-[10px] tracking-[0.2em] uppercase font-bold transition-colors group"
          >
            <ExternalLink
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            Live Boutique
          </Link>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center gap-4 px-5 py-3 text-zinc-500 hover:text-red-400 text-[10px] tracking-[0.2em] uppercase font-bold transition-colors group"
          >
            <LogOut
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="grow pl-72 min-h-screen">
        <header className="h-20 border-b border-zinc-100 flex items-center justify-between px-12 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="text-[10px] tracking-[0.3em] text-zinc-900 uppercase font-black">
                Secure Node
              </span>
            </div>
            <div className="w-px h-5 bg-zinc-200" />
            <span className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-bold">
              {pathname === "/backend"
                ? "System Insight"
                : pathname?.split("/").pop()?.replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black">
                {user?.name || "Custodian"}
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-400 mt-1">
                Authorized Level 4
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden shadow-inner">
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-tighter">
                Admin
              </span>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
