"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/api-client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/api";

const reviewSamples = [
  {
    name: "Janice Miller",
    date: "April 08, 2020",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
  },
  {
    name: "Benjamin Porter",
    date: "April 08, 2020",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
  },
];

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      const data = await api.getProductById(id);
      setProduct(data);

      if (!data) return;
      const list = await api.getProducts({ category: data.category.toLowerCase() });
      setRelatedProducts(list.filter((item) => item.id !== data.id).slice(0, 4));
    }

    loadProduct();
  }, [id]);

  const imageList = useMemo(() => {
    if (!product) return [];
    const images = product.images?.length ? product.images : [product.image, product.image, product.image];
    return images.slice(0, 3);
  }, [product]);

  if (!product) {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="bg-[#f5f5f5] text-[#111] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10">
          <div className="grid grid-cols-[60px_1fr] md:grid-cols-[78px_1fr] gap-4 items-start">
            <div className="space-y-3">
              {imageList.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-[58px] h-[74px] md:w-[72px] md:h-[92px] border ${activeImage === idx ? "border-black" : "border-zinc-300"}`}
                >
                  <Image src={src} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="relative w-full aspect-[4/5] border border-zinc-300 bg-zinc-200">
              <Image src={imageList[activeImage] || product.image} alt={product.name} fill className="object-cover" priority />
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[10px] uppercase tracking-[0.12em] text-zinc-500 mb-6">Home / The Shop</div>
            <h1 className="text-3xl md:text-4xl mb-3">{product.name}</h1>
            <p className="text-2xl mb-5">${product.price}</p>
            <p className="text-sm text-zinc-600 leading-7 mb-8">
              Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui.
              Aenean aliquam varius ipsum, non ultricies tellus sodales eu.
            </p>

            <div className="flex gap-3 mb-5">
              <div className="h-11 border border-zinc-400 flex items-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 text-xl">-</button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 text-xl">+</button>
              </div>
              <button onClick={() => addToCart(product, quantity)} className="h-11 px-10 bg-black text-white text-xs tracking-[0.14em] uppercase">
                Add To Cart
              </button>
            </div>

            <div className="flex gap-6 text-[11px] uppercase tracking-[0.08em] mb-6">
              <button className="flex items-center gap-2"><Heart className="w-4 h-4" />Add To Wishlist</button>
              <button className="flex items-center gap-2"><Share2 className="w-4 h-4" />Share</button>
            </div>

            <div className="text-[11px] text-zinc-600 space-y-2">
              <p><span className="text-black">SKU:</span> N/A</p>
              <p><span className="text-black">CATEGORIES:</span> Casual &amp; Urban Wear, Jackets, Men</p>
              <p><span className="text-black">TAGS:</span> biker, black, bomber, leather</p>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-zinc-300 pt-10 text-[12px] text-zinc-700 leading-7">
          <h2 className="text-[12px] uppercase tracking-[0.12em] text-black mb-4">Description</h2>
          <p className="mb-8">Sed do eiusmod tempor incididunt ut labore.</p>

          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-[12px] text-black mb-3 font-semibold">Why choose product?</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Great by cotton fabric with soft and smooth</li>
                <li>Simple, Configurable (e.g. size, color, etc), bundled</li>
                <li>Downloadable/Digital Products, Virtual Products</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] text-black mb-3 font-semibold">Sample Number List</h3>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Create Store-specific attrition rules on the fly</li>
                <li>Simple, Configurable (e.g. size, color, etc), bundled</li>
                <li>Downloadable/Digital Products, Virtual Products</li>
              </ol>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[12px] uppercase tracking-[0.12em] text-black mb-4">Additional Information</h3>
            <div className="grid grid-cols-[130px_1fr] gap-y-2 max-w-md text-[12px]">
              <span>Weight</span><span>1.25 kg</span>
              <span>Dimensions</span><span>90 x 60 x 90 cm</span>
              <span>Size</span><span>XS, S, M, L, XL</span>
              <span>Color</span><span>Black, Orange, White</span>
              <span>Storage</span><span>Relaxed fit shirtyle dress with a rugged</span>
            </div>
          </div>

          <div className="border-t border-zinc-300 pt-8">
            <div className="flex gap-8 text-[12px] uppercase tracking-[0.1em] mb-8">
              <span className="font-semibold text-black">Description</span>
              <span>Additional Information</span>
              <span>Reviews (3)</span>
            </div>

            <h3 className="text-sm text-black mb-4">Reviews</h3>
            <div className="space-y-8 mb-10">
              {reviewSamples.map((review) => (
                <div key={review.name} className="border-b border-zinc-300 pb-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black shrink-0" />
                  <div className="grow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-black">{review.name}</p>
                        <p className="text-zinc-500 text-[11px]">{review.date}</p>
                      </div>
                      <div className="flex text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <p>{review.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm text-black mb-1">Be the first to review “Message Cotton T-Shirt”</h3>
            <p className="text-[11px] text-zinc-500 mb-4">Your email address will not be published. Required fields are marked *</p>

            <form className="space-y-4 max-w-4xl">
              <textarea className="w-full border border-zinc-400 p-3 h-40 bg-transparent" placeholder="Your Review" />
              <input className="w-full border border-zinc-400 p-3 bg-transparent" placeholder="Name *" />
              <input className="w-full border border-zinc-400 p-3 bg-transparent" placeholder="Email address *" />
              <label className="flex items-center gap-2 text-[11px]"><input type="checkbox" /> Save my name, email, and website in this browser for the next time I comment.</label>
              <button type="button" className="bg-black text-white px-10 py-3 text-xs uppercase tracking-[0.12em]">Submit</button>
            </form>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl uppercase tracking-[0.08em] mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group text-sm">
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 border border-zinc-300">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-xs text-zinc-500 pt-2">Dresses</p>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
