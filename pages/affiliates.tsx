import { FormEvent, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
export default function AffiliatesPage() { return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='AFFILIATES' /><div className='grid grid-cols-1 gap-4 md:grid-cols-3'><div className='border p-4'>High commissions</div><div className='border p-4'>Premium catalog</div><div className='border p-4'>Fast payouts</div></div><div className='mt-8 max-w-xl border p-6 space-y-4'><Input id='email2' label='Email' value='' onChange={()=>null}/><Button>Apply</Button></div></div></section></main></Layout>; }
