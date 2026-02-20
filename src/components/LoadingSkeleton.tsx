export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-zinc-100 aspect-[3/4] w-full" />
      <div className="space-y-2">
        <div className="h-2 bg-zinc-100 w-1/3" />
        <div className="h-4 bg-zinc-100 w-2/3" />
        <div className="h-3 bg-zinc-100 w-1/4" />
      </div>
    </div>
  );
}
