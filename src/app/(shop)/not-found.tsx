import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black font-thai p-6 relative overflow-hidden">
      {/* Background 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-bold text-zinc-50 tracking-tighter leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md">
        <div className="w-16 h-px bg-black mx-auto" />
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase">
          Page Not Found
        </h2>
        <p className="text-zinc-500 text-xs tracking-[0.15em] uppercase leading-loose">
          The item you&apos;re looking for may have been moved or is no longer
          available in our collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/"
            className="bg-black text-white px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-zinc-800 transition-colors"
          >
            Return to Boutique
          </Link>
          <Link
            href="/new-arrivals"
            className="border border-zinc-200 px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500 hover:border-black hover:text-black transition-all"
          >
            New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
