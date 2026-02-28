import Image from "next/image";
import { useState } from "react";
import Modal from "../ui/Modal";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const safeImages = Array.isArray(images) ? images : [];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (safeImages.length === 0) return <div className="aspect-[3/4] bg-gray-100" />;

  return (
    <div>
      <div className="relative aspect-[3/4] bg-gray-50" onClick={() => setOpen(true)}>
        <Image src={safeImages[active]} alt={`${title} image`} fill className="object-cover" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {safeImages.map((img, i) => (
          <button key={img} className={`relative aspect-square border ${active === i ? "border-black" : "border-gray-200"}`} onClick={() => setActive(i)}>
            <Image src={img} alt={`${title} thumb ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}><div className="relative aspect-[3/4]"><Image src={safeImages[active]} alt={`${title} zoom`} fill className="object-contain" /></div></Modal>
    </div>
  );
}
