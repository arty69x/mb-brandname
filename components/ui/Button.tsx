import { ButtonHTMLAttributes } from "react";

export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`border border-black bg-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white transition duration-700 ease-out hover:bg-white hover:text-black ${className}`} {...props} />;
}
