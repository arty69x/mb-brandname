import Layout from '@/components/layout/Layout';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CAREER_ROLES } from '@/data/careers';
export default function CareersPage() { return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><PageTitleBlock title='CAREERS' /><div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{CAREER_ROLES.map((r)=><div key={r.title} className='border p-4'>{r.title} — {r.location}</div>)}</div><div className='mt-8 max-w-xl border p-6 space-y-4'><Input id='name' label='Full Name' value='' onChange={()=>null}/><Button>Apply</Button></div></div></section></main></Layout>; }
