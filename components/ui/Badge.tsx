export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-gray-200 px-2 py-1 text-[10px] font-black uppercase tracking-[0.3em]">{children}</span>;
}
