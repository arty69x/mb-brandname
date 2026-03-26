export function LoadingUI({ label }: { label: string }) {
  return (
    <div className="py-16">
      <p className="mb-6 text-center text-sm uppercase tracking-[0.24em] text-black/50">Loading {label}...</p>
      <div className="grid grid-cols-2 gap-0 border-l border-t border-black/10 lg:grid-cols-5 lg:gap-8 lg:border-0">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="border-b border-r border-black/10 p-4 lg:border-0 lg:p-0">
            <div className="aspect-[3/4] animate-pulse bg-[#EAEAEA]" />
            <div className="mt-4 h-3 w-20 animate-pulse bg-[#EAEAEA]" />
            <div className="mt-3 h-4 w-40 animate-pulse bg-[#EAEAEA]" />
            <div className="mt-3 h-4 w-24 animate-pulse bg-[#EAEAEA]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyUI({ label }: { label: string }) {
  return <div className="py-16 text-center text-sm uppercase tracking-[0.24em] text-black/50">No {label} found</div>;
}

export function ErrorUI({ message }: { message: string }) {
  return <div className="py-16 text-center text-sm uppercase tracking-[0.24em] text-red-500">{message}</div>;
}
