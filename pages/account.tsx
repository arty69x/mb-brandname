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
  return <Layout><SEO title='My Account — MB BRANDNAME' description='Manage your account.' canonical={canonical('/account')} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='MY ACCOUNT' />{session ? <div className='border p-6'><p>{session.email}</p><Button onClick={() => { logout(); setSession(null); }}>Logout</Button></div> : <div className='max-w-xl border p-6 space-y-4'><Input id='email' label='Email' value={email} onChange={setEmail} /><Input id='password' label='Password' value={password} onChange={setPassword} type='password' /><Button onClick={() => setSession(login(email, password))}>Sign in</Button></div>}</div></section></main></Layout>;
}
