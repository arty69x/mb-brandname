import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type HeroSlide = {
  id: string;
  image: string;
  title: string;
};

const slides: HeroSlide[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80', title: 'NO.1 Luxury Brandname' },
  { id: '2', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1800&q=80', title: '100% Authentic Branded Items from Japan' },
  { id: '3', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1800&q=80', title: 'Crafted Details for Everyday Luxury' }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const safeSlides = Array.isArray(slides) ? slides : [];
  const current = safeSlides[index] ?? safeSlides[0];

  if (!current) return null;

  return (
    <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[600px]">
      <Image src={current.image} alt={current.title} fill className="object-cover transition-all duration-300 ease-in-out" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <h1 className="max-w-[720px] text-[28px] font-light tracking-[0.06em] text-[#FFFFFF] sm:text-[32px] md:text-[40px] lg:text-[52px]">{current.title}</h1>
      </div>
      <button type="button" onClick={() => setIndex((prev) => (prev === 0 ? safeSlides.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-70" aria-label="Previous slide"><ChevronLeft size={28} /></button>
      <button type="button" onClick={() => setIndex((prev) => (prev === safeSlides.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFFFFF] transition-all duration-300 ease-in-out hover:opacity-70" aria-label="Next slide"><ChevronRight size={28} /></button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {safeSlides.map((slide, dotIndex) => (
          <button key={slide.id} type="button" onClick={() => setIndex(dotIndex)} className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out ${dotIndex === index ? 'bg-[#FFFFFF]' : 'bg-[#E6E6E6]'}`} aria-label={`Go to slide ${dotIndex + 1}`} />
        ))}
      </div>
    </div>
  );
}
