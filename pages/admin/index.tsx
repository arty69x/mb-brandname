import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { isAdmin } from '@/lib/auth';

export default function AdminPage() { const router = useRouter(); useEffect(()=>{ if (!isAdmin()) void router.replace('/account'); }, [router]); return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>MB BRANDNAME ADMIN</div></section></main></Layout>; }
