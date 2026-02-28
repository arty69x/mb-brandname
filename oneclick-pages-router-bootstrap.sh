#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${1:-mb-pages-router-bootstrap}"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

cat > package.json <<'JSON'
{
  "name": "mb-pages-router-bootstrap",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "lucide-react": "^0.574.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.1.6"
  }
}
JSON

cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
JSON

cat > next.config.ts <<'TS'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }]
  }
};

export default nextConfig;
TS

cat > postcss.config.mjs <<'JS'
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};
JS

cat > next-env.d.ts <<'TS'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
TS

mkdir -p styles pages pages/product components context lib

cat > styles/globals.css <<'CSS'
@import "tailwindcss";
body { @apply bg-zinc-100 text-zinc-900; }
CSS

cat > lib/mock-data.ts <<'TS'
export type Item = { id: string; name: string; category: string; brand: string; image: string; price: number; featured?: boolean; newArrival?: boolean; description: string; };

export const items: Item[] = [
  { id: "h1", name: "Birkin 30", category: "Bags", brand: "Hermès", image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=900", price: 680500, featured: true, newArrival: true, description: "Authenticated archive from Japan." },
  { id: "c1", name: "Classic Flap", category: "Bags", brand: "Chanel", image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=900", price: 390000, featured: true, newArrival: true, description: "Timeless classic and investment piece." },
  { id: "l1", name: "Capucines", category: "Bags", brand: "Louis Vuitton", image: "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=900", price: 240000, newArrival: true, description: "Premium taurillon leather archive." },
  { id: "d1", name: "Lady Dior", category: "Bags", brand: "Dior", image: "https://images.pexels.com/photos/5709668/pexels-photo-5709668.jpeg?auto=compress&cs=tinysrgb&w=900", price: 280000, featured: true, description: "Iconic structured silhouette." }
];
TS

cat > context/store.tsx <<'TSX'
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Item } from "@/lib/mock-data";

type CartLine = Item & { qty: number };

type StoreCtx = {
  cart: CartLine[];
  wishlist: Item[];
  addCart: (item: Item) => void;
  setQty: (id: string, qty: number) => void;
  removeCart: (id: string) => void;
  toggleWish: (item: Item) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Item[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);

  const value = useMemo<StoreCtx>(() => ({
    cart,
    wishlist,
    addCart: (item) => setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      return found ? prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p) : [...prev, { ...item, qty: 1 }];
    }),
    setQty: (id, qty) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, qty } : p).filter((p) => p.qty > 0)),
    removeCart: (id) => setCart((prev) => prev.filter((p) => p.id !== id)),
    toggleWish: (item) => setWishlist((prev) => prev.some((p) => p.id === item.id) ? prev.filter((p) => p.id !== item.id) : [...prev, item])
  }), [cart, wishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used in StoreProvider");
  return ctx;
}
TSX

cat > pages/_app.tsx <<'TSX'
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { StoreProvider } from "@/context/store";

export default function App({ Component, pageProps }: AppProps) {
  return <StoreProvider><Component {...pageProps} /></StoreProvider>;
}
TSX

cat > pages/index.tsx <<'TSX'
import Link from "next/link";
import Image from "next/image";
import { items } from "@/lib/mock-data";

export default function Home() {
  const featured = items.filter((i) => i.featured);
  return (
    <main className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-4xl">Mockup Storefront</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featured.map((it) => (
          <Link key={it.id} href={`/product/${it.id}`} className="bg-white p-3 border">
            <div className="relative aspect-[3/4]"><Image src={it.image} alt={it.name} fill className="object-cover" /></div>
            <p className="mt-2 text-sm">{it.name}</p>
          </Link>
        ))}
      </div>
      <Link href="/store" className="inline-block bg-black text-white px-4 py-2">Go to Store</Link>
    </main>
  );
}
TSX

cat > pages/store.tsx <<'TSX'
import { useMemo, useState } from "react";
import Link from "next/link";
import { items } from "@/lib/mock-data";
import { useStore } from "@/context/store";

export default function StorePage() {
  const { addCart, toggleWish, wishlist } = useStore();
  const [brand, setBrand] = useState("All");
  const [qv, setQv] = useState<string | null>(null);
  const brands = ["All", ...new Set(items.map((i) => i.brand))];
  const filtered = useMemo(() => brand === "All" ? items : items.filter((i) => i.brand === brand), [brand]);
  const quick = items.find((i) => i.id === qv) || null;

  return <main className="p-6 max-w-6xl mx-auto space-y-6">
    <h1 className="text-3xl">Store</h1>
    <div className="flex flex-wrap gap-2">{brands.map((b)=><button key={b} onClick={()=>setBrand(b)} className={`px-3 py-1 border ${b===brand?"bg-black text-white":""}`}>{b}</button>)}</div>
    <div className="grid md:grid-cols-4 gap-4">{filtered.map((i)=><div key={i.id} className="bg-white border p-3 space-y-2"><Link href={`/product/${i.id}`}>{i.name}</Link><p className="text-sm">${i.price.toLocaleString()}</p><div className="flex gap-2"><button className="px-2 py-1 bg-black text-white text-xs" onClick={()=>addCart(i)}>Add cart</button><button className="px-2 py-1 border text-xs" onClick={()=>toggleWish(i)}>{wishlist.some(w=>w.id===i.id)?"Unwish":"Wish"}</button><button className="px-2 py-1 border text-xs" onClick={()=>setQv(i.id)}>Quick View</button></div></div>)}</div>
    {quick && <div className="fixed inset-0 bg-black/40 grid place-items-center p-4" onClick={()=>setQv(null)}><div className="bg-white p-6 max-w-md w-full" onClick={(e)=>e.stopPropagation()}><h2 className="text-xl mb-2">{quick.name}</h2><p className="text-sm mb-3">{quick.description}</p><button className="bg-black text-white px-3 py-2" onClick={()=>addCart(quick)}>Add to cart</button></div></div>}
  </main>;
}
TSX

cat > pages/cart.tsx <<'TSX'
import { useStore } from "@/context/store";

export default function CartPage() {
  const { cart, setQty, removeCart } = useStore();
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  return <main className="p-6 max-w-4xl mx-auto space-y-4"><h1 className="text-3xl">Cart</h1>{cart.map((c)=><div key={c.id} className="bg-white border p-3 flex justify-between"><div><p>{c.name}</p><p className="text-sm">${c.price.toLocaleString()}</p></div><div className="flex items-center gap-2"><button onClick={()=>setQty(c.id,c.qty-1)}>-</button><span>{c.qty}</span><button onClick={()=>setQty(c.id,c.qty+1)}>+</button><button onClick={()=>removeCart(c.id)}>Remove</button></div></div>)}<p className="text-xl">Total: ${total.toLocaleString()}</p></main>;
}
TSX

cat > pages/wishlist.tsx <<'TSX'
import { useStore } from "@/context/store";

export default function WishlistPage() {
  const { wishlist, toggleWish, addCart } = useStore();
  return <main className="p-6 max-w-4xl mx-auto space-y-4"><h1 className="text-3xl">Wishlist</h1>{wishlist.map((w)=><div key={w.id} className="bg-white border p-3 flex justify-between"><p>{w.name}</p><div className="flex gap-2"><button onClick={()=>addCart(w)} className="bg-black text-white px-2 py-1">Add cart</button><button onClick={()=>toggleWish(w)} className="border px-2 py-1">Remove</button></div></div>)}</main>;
}
TSX

cat > pages/product/[id].tsx <<'TSX'
import { useRouter } from "next/router";
import { items } from "@/lib/mock-data";
import { useStore } from "@/context/store";

export default function ProductPage() {
  const { query } = useRouter();
  const { addCart, toggleWish } = useStore();
  const product = items.find((i) => i.id === query.id);
  if (!product) return <main className="p-6">Loading...</main>;
  return <main className="p-6 max-w-4xl mx-auto space-y-4"><h1 className="text-4xl">{product.name}</h1><p>{product.description}</p><p>${product.price.toLocaleString()}</p><div className="flex gap-2"><button onClick={()=>addCart(product)} className="bg-black text-white px-4 py-2">Add cart</button><button onClick={()=>toggleWish(product)} className="border px-4 py-2">Wishlist</button></div></main>;
}
TSX

cat > components/CookieBanner.tsx <<'TSX'
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(!localStorage.getItem("cookie-consent")), []);
  if (!open) return null;
  return <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex justify-between"><p className="text-sm">We use cookies for analytics and UX optimization.</p><button className="bg-black text-white px-3 py-1" onClick={()=>{localStorage.setItem("cookie-consent","accepted");setOpen(false);}}>Accept</button></div>;
}
TSX

echo "✅ Bootstrap complete in $APP_DIR"
echo "Next steps: cd $APP_DIR && npm install && npm run dev"
