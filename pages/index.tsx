import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import { editorialBlocks, featuredCategories, heroSlides, trustBadges } from "../lib/content";
import { products } from "../lib/products";
import ProductGrid from "../components/product/ProductGrid";

export default function HomePage() {
  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40 bg-black text-white relative">
          <Image src={heroSlides[0].image} alt="hero" fill className="object-cover opacity-30" />
          <div className="container mx-auto px-4 relative">
            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Luxury Tokyo Archive</p>
            <h1 className="mt-8 text-5xl font-light uppercase tracking-[0.55em] md:text-7xl">Archive Commerce</h1>
            <p className="mt-8 max-w-2xl text-base font-medium opacity-80">A production-ready monochrome storefront with curated product discovery and complete commerce flow.</p>
          </div>
        </section>
        <section className="py-32 md:py-40 border-b border-gray-100"><div className="container mx-auto px-4 grid gap-16 md:grid-cols-2">{editorialBlocks.map((b)=><article key={b.title}><h2 className="text-3xl font-light uppercase tracking-[0.45em]">{b.title}</h2><p className="mt-6 opacity-80">{b.body}</p></article>)}</div></section>
        <section className="py-32 md:py-40"><div className="container mx-auto px-4"><h2 className="text-3xl font-light uppercase tracking-[0.45em] mb-12">New Arrivals</h2><ProductGrid products={products.filter((p) => p.newArrival).slice(0, 8)} /></div></section>
        <section className="py-32 md:py-40 border-y border-gray-100"><div className="container mx-auto px-4 grid gap-8 md:grid-cols-4">{trustBadges.map((t)=><p key={t} className="text-[11px] font-black uppercase tracking-[0.3em]">{t}</p>)}</div></section>
        <section className="py-32 md:py-40"><div className="container mx-auto px-4 grid gap-8 md:grid-cols-4">{featuredCategories.map((c)=><Link key={c.title} href={c.href} className="border border-gray-100 p-8"><p className="text-[11px] font-black uppercase tracking-[0.3em]">{c.title}</p></Link>)}</div></section>
      </main>
    </Layout>
  );
}
