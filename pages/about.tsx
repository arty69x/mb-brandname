import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Button from '@/components/ui/Button';
import { canonical } from '@/lib/seo';

export default function AboutPage() { 
  return (
    <Layout>
      <SEO title='About — MB BRANDNAME' description='About MB BRANDNAME.' canonical={canonical('/about')} />
      <main>
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-4 max-w-[800px] text-center'>
            <PageTitleBlock title='OUR STORY' />
            <div className='space-y-6 text-[14px] lg:text-[15px] leading-[1.8] text-[#6b6b6b] text-left md:text-center max-w-[600px] mx-auto'>
              <p>
                100% AUTHENTIC BRANDED ITEMS FROM JAPAN WITH OVER 10 YEARS OF EXPERIENCE IN AUTHENTIC SECONDHAND BRANDED GOODS, WE GUARANTEE GENUINE QUALITY.
              </p>
              <p>
                Our mission is to bring you the finest luxury at the highest standard of authenticity and quality, curating items that tell a story of timeless elegance.
              </p>
            </div>
          </div>
        </section>
        
        <section className='pb-16 lg:pb-24'>
          <div className='container mx-auto px-4 max-w-[1200px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center'>
              <div className='p-8 border border-[#d9d9d9]'>
                <h3 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-4'>Authenticity Guarantee</h3>
                <p className='text-[14px] text-[#6b6b6b]'>100% genuine products, authenticated by our experts.</p>
              </div>
              <div className='p-8 border border-[#d9d9d9]'>
                <h3 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-4'>Free Shipping</h3>
                <p className='text-[14px] text-[#6b6b6b]'>Complimentary express delivery worldwide.</p>
              </div>
              <div className='p-8 border border-[#d9d9d9]'>
                <h3 className='text-[16px] uppercase tracking-[0.1em] font-medium mb-4'>Secure Checkout</h3>
                <p className='text-[14px] text-[#6b6b6b]'>Your transaction is protected with military-grade encryption.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  ); 
}
