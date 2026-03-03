import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import Button from '@/components/ui/Button';
import { BLOG_POSTS } from '@/data/blog';
import { canonical } from '@/lib/seo';

export default function BlogIndexPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <Layout>
      <SEO title='Blog — MB BRANDNAME' description='Editorial and styling guides from MB BRANDNAME.' canonical={canonical('/blog')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <PageTitleBlock title='BLOG & INSIGHTS' subtitle='Luxury styling, authentication knowledge, and care tips from MB BRANDNAME editors.' />
            {featured ? (
              <article className='grid gap-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-white lg:grid-cols-[1.05fr_0.95fr]'>
                <img src={featured.image} alt={featured.title} className='h-full min-h-[320px] w-full object-cover' />
                <div className='p-6 lg:p-8'>
                  <p className='text-[11px] uppercase tracking-[0.16em] text-[var(--caption)]'>Featured article</p>
                  <h2 className='mt-3 text-[24px] font-light leading-[1.3]'>{featured.title}</h2>
                  <p className='mt-4 text-[14px] leading-[1.8] text-[var(--muted)]'>{featured.excerpt}</p>
                  <div className='mt-6'><Button href={`/blog/${featured.slug}`}>Read article</Button></div>
                </div>
              </article>
            ) : null}
            <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2'>
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className='overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4'>
                  <img src={post.image} alt={post.title} className='aspect-video w-full rounded-xl object-cover' />
                  <h2 className='mt-4 text-[18px] leading-[1.4]'>{post.title}</h2>
                  <p className='mt-2 text-[14px] text-[var(--muted)]'>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
