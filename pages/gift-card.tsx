import { FormEvent, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { addToCart } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function GiftCardPage() {
  const [amount, setAmount] = useState(100);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const valid = recipient.includes('@') && sender.trim().length > 1;

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (!valid) {
      setStatus('Please add recipient email and sender name.');
      return;
    }
    addToCart(`giftcard_${amount}`, 1);
    setStatus('Gift card has been added to your cart successfully.');
  };

  return (
    <Layout>
      <SEO title='Gift Card — MB BRANDNAME' description='Send a MB BRANDNAME gift card.' canonical={canonical('/gift-card')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-8 px-4'>
            <PageTitleBlock title='DIGITAL GIFT CARD' subtitle='Send premium gifting in minutes. Perfect for birthdays, milestones, and special occasions.' />
            <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
              <form onSubmit={onSubmit} className='rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>Gift card details</h2>
                <div className='mt-4 space-y-4'>
                  <select value={amount} onChange={(e) => setAmount(Number(e.target.value))} className='h-11 w-full rounded-full border border-[var(--border)] px-4'>
                    <option value={100}>$100</option>
                    <option value={200}>$200</option>
                    <option value={500}>$500</option>
                    <option value={1000}>$1000</option>
                  </select>
                  <Input id='recipient' label='Recipient email' value={recipient} onChange={setRecipient} required />
                  <Input id='sender' label='Sender name' value={sender} onChange={setSender} required />
                  <Textarea id='giftmessage' label='Personal message (optional)' value={message} onChange={setMessage} />
                  <Button type='submit' disabled={!valid}>Add gift card to cart</Button>
                  {status ? <p className='text-sm text-[var(--muted)]'>{status}</p> : null}
                </div>
              </form>
              <article className='rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-6 lg:p-8'>
                <h2 className='text-[13px] font-medium uppercase tracking-[0.16em]'>How it works</h2>
                <ol className='mt-4 space-y-3 text-[14px] text-[var(--muted)]'>
                  <li>1. Select the amount and recipient details.</li>
                  <li>2. Gift card is delivered digitally to recipient email.</li>
                  <li>3. Recipient can redeem during checkout on any eligible item.</li>
                </ol>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
