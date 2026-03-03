import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
export default function ContactPage() { const [loading, setLoading] = useState(false); const [status, setStatus] = useState(''); return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='CONTACT US' /><div className='grid grid-cols-1 gap-10 lg:grid-cols-2'><div className='space-y-4 border p-6'><Input id='fullName' label='Full Name' value='' onChange={()=>null}/><Input id='email' label='Email' value='' onChange={()=>null}/><Input id='subject' label='Subject' value='' onChange={()=>null}/><Textarea id='message' label='Message' value='' onChange={()=>null}/><Button onClick={async ()=>{setLoading(true); try { await new Promise((r)=>setTimeout(r,200)); setStatus('success'); } catch { setStatus('error'); } setLoading(false); }}>{loading ? 'Sending' : 'Send'}</Button>{status ? <p>{status}</p> : null}</div><div>1418 River Drive, Suite 35 Cottonhall, CA 9622, United States<br/>sale@uomo.com<br/>+1 246-345-0695<br/>Mon - Fri: 8AM-9PM, Sat: 9AM-8PM, Sun: Closed</div></div></div></section></main></Layout>; }
