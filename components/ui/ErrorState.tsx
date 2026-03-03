export default function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className='rounded-xl border border-[var(--danger)] p-4 text-[14px] text-[var(--danger)] flex items-center justify-between gap-4'><span>{message}</span><button onClick={onRetry} className='underline'>Retry</button></div>;
}
