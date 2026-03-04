import Button from '../ui/Button';

export default function CartSummary({ subtotal, disabled }: { subtotal: number; disabled: boolean }) {
  return <div className='border border-[#d9d9d9] p-6'><p className='mb-4 uppercase tracking-[0.12em] text-[12px]'>Summary</p><div className='flex justify-between mb-6'><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><Button href='/checkout' disabled={disabled}>Proceed to checkout</Button></div>;
}
