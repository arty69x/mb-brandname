import { ButtonHTMLAttributes } from "react";

export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`h-10 border border-black bg-black px-4 text-[11px] font-black uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
