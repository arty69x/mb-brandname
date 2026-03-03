import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { addToCart } from '@/lib/cart';
import { canonical } from '@/lib/seo';

export default function GiftCardPage() {
  const [amount, setAmount] = useState(50);

  return (
    <Layout>
      <SEO title='Gift Card — MB BRANDNAME' description='Send a MB BRANDNAME gift card.' canonical={canonical('/gift-card')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-10 px-4'>
            <PageTitleBlock title='GIFT CARD' />
            <div className='max-w-2xl rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <p className='mb-5 text-[14px] text-[var(--muted)]'>Choose an amount and personalize your digital gift card.</p>
              <div className='space-y-4'>
                <select
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className='h-11 w-full rounded-full border border-[var(--border)] px-4'
                >
                  <option value={50}>$50</option>
                  <option value={100}>$100</option>
                  <option value={200}>$200</option>
                  <option value={500}>$500</option>
                </select>
                <Input id='recipient' label='Recipient email' value='' onChange={() => null} />
                <Input id='sender' label='Sender name' value='' onChange={() => null} />
                <Textarea id='giftmessage' label='Message' value='' onChange={() => null} />
                <Button onClick={() => addToCart(`giftcard_${amount}`, 1)}>Add gift card to cart</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
