export function LoadingUI({ label }: { label: string }) {
  return <div className="py-16 text-center text-sm uppercase tracking-[0.24em] text-black/50">Loading {label}...</div>;
}

export function EmptyUI({ label }: { label: string }) {
  return <div className="py-16 text-center text-sm uppercase tracking-[0.24em] text-black/50">No {label} found</div>;
}

export function ErrorUI({ message }: { message: string }) {
  return <div className="py-16 text-center text-sm uppercase tracking-[0.24em] text-red-500">{message}</div>;
}
