import { FormEvent, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { addToCart } from '@/lib/cart';

export default function GiftCardPage() { const [amount, setAmount] = useState(50); return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='GIFT CARD' /><div className='max-w-xl border p-6 space-y-4'><select value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className='h-11 rounded-full border border-[var(--border)] px-4'><option value={50}>50</option><option value={100}>100</option><option value={200}>200</option><option value={500}>500</option></select><Input id='recipient' label='Recipient email' value='' onChange={()=>null} /><Input id='sender' label='Sender name' value='' onChange={()=>null} /><Textarea id='giftmessage' label='Message' value='' onChange={()=>null} /><Button onClick={()=>addToCart(`giftcard_${amount}`, 1)}>Add gift card to cart</Button></div></div></section></main></Layout>; }
