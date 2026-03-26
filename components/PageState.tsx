export function LoadingUI({ label }: { label: string }) {
  return <div className="py-16 text-center text-[14px] uppercase tracking-[0.08em] text-[#6D6D6D]">Loading {label}...</div>;
}

export function EmptyUI({ label }: { label: string }) {
  return <div className="py-16 text-center text-[14px] uppercase tracking-[0.08em] text-[#6D6D6D]">No {label} found</div>;
}

export function ErrorUI({ message }: { message: string }) {
  return <div className="py-16 text-center text-[14px] uppercase tracking-[0.08em] text-[#C8A96A]">{message || 'Error'}</div>;
}
