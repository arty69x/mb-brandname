import { FormEvent, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
export default function ContactPage() { 
  const [loading, setLoading] = useState(false); 
  const [status, setStatus] = useState(''); 

  return (
    <Layout>
      <main>
        <section className='py-16 lg:py-24'>
          <div className='container mx-auto px-4'>
            <PageTitleBlock title='CONTACT US' subtitle='We are here to assist you with any inquiries regarding our products, styling, or your order.' />
            
            <div className='max-w-[1000px] mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
              <div className='space-y-8'>
                <h2 className='text-[18px] uppercase tracking-[0.1em] font-medium'>Store Information</h2>
                <div className='space-y-6 text-[14px] lg:text-[15px] leading-[1.8] text-[#6b6b6b]'>
                  <p>
                    1418 River Drive, Suite 35<br/>
                    Cottonhall, CA 9622<br/>
                    United States
                  </p>
                  <p>
                    <a href='mailto:sale@uomo.com' className='hover:text-[#1a1a1a] transition-colors'>sale@uomo.com</a><br/>
                    <a href='tel:+12463450695' className='hover:text-[#1a1a1a] transition-colors'>+1 246-345-0695</a>
                  </p>
                  <p>
                    <strong>Opening Hours:</strong><br/>
                    Mon - Fri: 8AM - 9PM<br/>
                    Sat: 9AM - 8PM<br/>
                    Sun: Closed
                  </p>
                </div>
              </div>

              <div className='space-y-8'>
                <h2 className='text-[18px] uppercase tracking-[0.1em] font-medium'>Send a Message</h2>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input id='fullName' label='Full Name' value='' onChange={()=>null}/>
                    <Input id='email' label='Email' value='' onChange={()=>null}/>
                  </div>
                  <Input id='subject' label='Subject' value='' onChange={()=>null}/>
                  <Textarea id='message' label='Message' value='' onChange={()=>null}/>
                  
                  <div className='pt-2'>
                    <Button 
                      onClick={async ()=>{
                        setLoading(true); 
                        try { 
                          await new Promise((r)=>setTimeout(r,800)); 
                          setStatus('success'); 
                        } catch { 
                          setStatus('error'); 
                        } 
                        setLoading(false); 
                      }}
                    >
                      {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </Button>
                    {status === 'success' && <p className='mt-4 text-[14px] text-green-600'>Your message has been sent successfully.</p>}
                    {status === 'error' && <p className='mt-4 text-[14px] text-red-600'>An error occurred. Please try again.</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  ); 
}
