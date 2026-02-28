import Link from "next/link";
import Image from "next/image";

import Layout from "../components/layout/Layout";
import { editorialBlocks, featuredCategories, heroSlides, trustBadges } from "../lib/content";
import { products } from "../lib/products";
import ProductGrid from "../components/product/ProductGrid";

export default function HomePage() {
  const newArrivals = products.filter((product) => product.newArrival).slice(0, 8);

  return (
    <Layout>
      <main>
        <section className="relative h-screen overflow-hidden bg-black text-white">
          <Image src={heroSlides[0].image} alt="Luxury Tokyo Archive hero" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
          <div className="relative flex h-full items-center justify-center px-4 text-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em]">Luxury Tokyo Archive</p>
              <h1 className="mt-10 text-5xl font-light uppercase tracking-[0.55em] md:text-7xl">Archive Commerce</h1>
              <p className="mx-auto mt-10 max-w-2xl text-base font-medium opacity-80">
                A refined commerce blueprint with clean spacing rhythm, full-bleed storytelling, and editorial product discovery.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4">
            <div className="grid gap-16 md:grid-cols-2 md:gap-20">
              {editorialBlocks.map((block) => (
                <article key={block.title}>
                  <h2 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">{block.title}</h2>
                  <p className="mt-8 max-w-2xl text-base font-medium opacity-80">{block.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-gray-100 py-32 md:py-40">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">New Arrivals</h2>
            <div className="mt-16">
              <ProductGrid products={newArrivals} cols={4} />
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Trust Signals</h2>
            <div className="mt-16 grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16">
              {trustBadges.map((badge) => (
                <p key={badge} className="text-[11px] font-black uppercase tracking-[0.3em]">
                  {badge}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 py-32 md:py-40">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Featured Categories</h2>
            <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
              {featuredCategories.map((category) => (
                <Link key={category.title} href={category.href} className="border border-gray-100 p-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em]">{category.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
