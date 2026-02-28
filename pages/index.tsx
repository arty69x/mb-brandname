import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { EditorialFeatures, FeaturedCategories, HeroSlides, TrustBadges } from "../lib/content";
import { products } from "../lib/products";

export default function HomePage() {
  return (
    <Layout>
      <main>
        <section className="relative h-screen w-full">
          <Image src={HeroSlides[0].image} alt="Hero" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/55" />
          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em]">TOKYO EDITORIAL COMMERCE</p>
              <h1 className="mt-8 text-5xl font-light uppercase tracking-[0.55em] md:text-7xl">{HeroSlides[0].headline}</h1>
              <p className="mx-auto mt-8 max-w-2xl text-sm uppercase tracking-[0.25em]">{HeroSlides[0].subline}</p>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4 grid gap-16 md:grid-cols-2">
            {EditorialFeatures.map((feature) => (
              <article key={feature.title}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                </div>
                <h2 className="mt-8 text-3xl font-light uppercase tracking-[0.45em]">{feature.title}</h2>
                <p className="mt-6 text-sm opacity-80">{feature.paragraph}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-32 md:py-40 border-y border-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-3xl font-light uppercase tracking-[0.45em]">NEW ARRIVALS</h2>
            <ProductGrid products={products.filter((product) => product.newArrival).slice(0, 8)} />
          </div>
        </section>

        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4 grid gap-10 md:grid-cols-4">
            {TrustBadges.map((badge) => (
              <div key={badge.title}>
                <p className="text-[11px] font-black uppercase tracking-[0.3em]">{badge.title}</p>
                <p className="mt-4 text-sm opacity-70">{badge.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-32 md:py-40 border-y border-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-3xl font-light uppercase tracking-[0.45em]">FEATURED CATEGORIES</h2>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-20">
              {FeaturedCategories.map((category) => (
                <Link key={category.label} href={category.href} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                    <Image src={category.image} alt={category.label} fill className="object-cover" />
                  </div>
                  <p className="mt-4 text-[11px] font-black uppercase tracking-[0.3em]">{category.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
