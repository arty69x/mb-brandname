"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { Product } from "@/types/api";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { PDP_MOCK_REVIEWS } from "@/lib/mock-content";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    async function load() {
      const data = await api.getProductById(id);
      setProduct(data);
      if (data) {
        setSelectedImage(data.image);
        const all = await api.getProducts({ category: data.category.toLowerCase() });
        setRelated(all.filter((item) => item.id !== data.id).slice(0, 4));
      }
    }
    load();
  }, [id]);

  const gallery = useMemo(() => {
    if (!product) return [];
    return [product.image, ...(product.images ?? [])].slice(0, 4);
  }, [product]);

  const productSpecs = useMemo(() => {
    if (!product) return [];

    return [
      { label: "Weight", value: "1.25 kg" },
      { label: "Dimensions", value: product.dimensions ?? "90 × 60 × 90 cm" },
      { label: "Condition", value: product.condition ?? "Grade A" },
      { label: "Period", value: product.period ?? "Archive Series" },
      { label: "Brand", value: product.brand },
      { label: "Category", value: product.category },
    ];
  }, [product]);

  if (!product) return <main className="pt-24 px-6">Loading...</main>;

  return (
    <main className="pt-20 bg-[#f2f2f2] min-h-screen">
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-10 grid lg:grid-cols-[1.1fr_1fr] gap-10">
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {gallery.map((img, k) => (
              <button
                className={`relative w-16 h-20 border ${selectedImage === img ? "border-black" : "border-zinc-300"}`}
                key={String(k) + img}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-square w-full border border-zinc-300 bg-white overflow-hidden group">
            <Image src={selectedImage || product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-5">Home / The shop / {product.category}</p>
          <h1 className="text-4xl mb-2">{product.name}</h1>
          <p className="text-3xl mb-6">${product.price}</p>
          <p className="text-zinc-700 leading-7 mb-7">{product.description.en}</p>

          <div className="flex gap-3 mb-5">
            <div className="h-11 border border-zinc-400 flex items-center">
              <button className="px-4 hover:bg-zinc-100" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <span className="px-4">{qty}</span>
              <button className="px-4 hover:bg-zinc-100" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              className="h-11 px-10 bg-black text-white uppercase text-sm hover:bg-zinc-800"
            >
              Add to Cart
            </button>
          </div>

          <div className="text-sm text-zinc-700 space-y-1 border-t border-zinc-300 pt-4">
            <p>♡ Add to wishlist &nbsp;&nbsp; Share</p>
            <p>SKU: {product.id.toUpperCase()}</p>
            <p>CATEGORY: {product.category}</p>
            <p>BRAND: {product.brand}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-3 text-center text-xs uppercase tracking-wide border-b border-zinc-300 mb-8">
          <button className={`py-3 ${activeTab === "description" ? "border-b-2 border-black" : ""}`} onClick={() => setActiveTab("description")}>Description</button>
          <button className={`py-3 ${activeTab === "details" ? "border-b-2 border-black" : ""}`} onClick={() => setActiveTab("details")}>Additional Information</button>
          <button className={`py-3 ${activeTab === "reviews" ? "border-b-2 border-black" : ""}`} onClick={() => setActiveTab("reviews")}>Reviews ({PDP_MOCK_REVIEWS.length})</button>
        </div>

        {activeTab === "description" && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase underline mb-4">Description</h2>
            <p className="text-zinc-700 leading-7 mb-4">{product.description.en}</p>
            <Link href="/new-arrivals" className="text-xs uppercase tracking-[0.2em] border-b border-black pb-1">Back to collection</Link>
          </div>
        )}

        {activeTab === "details" && (
          <div className="mb-12 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold mb-3">Why choose this product?</h3>
              <ul className="list-disc ml-6 text-zinc-700 space-y-1">
                {product.details?.en?.slice(0, 4).map((detail) => <li key={detail}>{detail}</li>) ?? (
                  <>
                    <li>Officially authenticated by Japan licensed specialists</li>
                    <li>Condition checked with strict archive standards</li>
                    <li>Insured shipping and quality guarantee included</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Additional Information</h3>
              <div className="space-y-2 text-sm">
                {productSpecs.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 border-b border-zinc-200 pb-1">
                    <span className="text-zinc-500">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              {PDP_MOCK_REVIEWS.map((review) => (
                <div key={review.name} className="border-b border-zinc-200 pb-4">
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-zinc-500 mb-1">{review.date}</p>
                  <p className="text-sm text-zinc-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5">
          <h3 className="text-3xl uppercase">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
