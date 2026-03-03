import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { BLOG_POSTS } from '@/data/blog';
import { canonical } from '@/lib/seo';

export default function BlogPostPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Layout><main><section className='py-10 lg:py-14'><div className='container mx-auto px-4'>Post not found</div></section></main></Layout>;
  }

  return (
    <Layout>
      <SEO title={`${post.title} — MB BRANDNAME`} description={post.excerpt} canonical={canonical(`/blog/${post.slug}`)} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <Breadcrumbs items={[{ label: 'HOME', href: '/' }, { label: 'BLOG', href: '/blog' }, { label: post.title }]} />
            <img src={post.image} alt={post.title} className='mt-6 aspect-video w-full rounded-2xl object-cover' />
            <article className='mx-auto mt-8 max-w-[780px] rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8'>
              <h1 className='text-[22px] lg:text-[30px]'>{post.title}</h1>
              <p className='mt-3 text-[14px] text-[var(--muted)]'>{post.excerpt}</p>
              <div className='mt-6 space-y-4'>
                {post.body.map((b, i) => <p key={i} className='text-[14px] leading-[1.8] text-[var(--muted)]'>{b}</p>)}
              </div>
              <div className='mt-8'><Button href='/blog' variant='secondary'>Back to blog</Button></div>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
