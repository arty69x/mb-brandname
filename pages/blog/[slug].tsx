import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BLOG_POSTS } from '@/data/blog';
import { canonical } from '@/lib/seo';

export default function BlogPostPage() { const router = useRouter(); const slug = typeof router.query.slug === 'string' ? router.query.slug : ''; const post = BLOG_POSTS.find((p)=>p.slug===slug); if (!post) return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>Post not found</div></section></main></Layout>; return <Layout><SEO title={`${post.title} — MB BRANDNAME`} description={post.excerpt} canonical={canonical(`/blog/${post.slug}`)} /><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'><Breadcrumbs items={[{label:'HOME',href:'/'},{label:'BLOG',href:'/blog'},{label:post.title}]}/><img src={post.image} alt={post.title} className='mt-6 aspect-video w-full object-cover'/><div className='mx-auto max-w-[720px] mt-8'>{post.body.map((b, i)=><p key={i} className='text-[14px] leading-[1.7] text-[var(--muted)] mb-4'>{b}</p>)}</div></div></section></main></Layout>; }
