import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getSession, login, logout } from '@/lib/auth';
import { canonical } from '@/lib/seo';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(getSession());

  return (
    <Layout>
      <SEO title='My Account — MB BRANDNAME' description='Manage your account.' canonical={canonical('/account')} />
      <main>
        <section className='bg-[#f3f3f3] py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <PageTitleBlock title='MY ACCOUNT' subtitle='Manage profile, orders, and personalized luxury recommendations.' />
            {session ? (
              <div className='mx-auto max-w-xl rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
                <p className='text-[14px] text-[#6b6b6b]'>Signed in as</p>
                <p className='mt-1 text-[16px]'>{session.email}</p>
                <div className='mt-6'><Button onClick={() => { logout(); setSession(null); }}>Logout</Button></div>
              </div>
            ) : (
              <div className='mx-auto max-w-xl rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
                <div className='space-y-4'>
                  <Input id='email' label='Email' value={email} onChange={setEmail} />
                  <Input id='password' label='Password' value={password} onChange={setPassword} type='password' />
                  <Button onClick={() => setSession(login(email, password))}>Sign in</Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
