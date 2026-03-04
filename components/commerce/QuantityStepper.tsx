export default function QuantityStepper({ qty, onChange }: { qty: number; onChange: (qty: number) => void }) {
  const value = Math.max(1, qty);
  return <div className='inline-flex items-center rounded-full border border-[#d9d9d9]'><button aria-label='Decrease quantity' className='h-10 w-10' onClick={() => onChange(Math.max(1, value - 1))}>-</button><span className='w-12 text-center text-[12px] uppercase tracking-[0.12em]'>{value}</span><button aria-label='Increase quantity' className='h-10 w-10' onClick={() => onChange(value + 1)}>+</button></div>;
}
