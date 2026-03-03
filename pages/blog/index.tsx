import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import PageTitleBlock from '@/components/ui/PageTitleBlock';
import { BLOG_POSTS } from '@/data/blog';
import { canonical } from '@/lib/seo';

export default function BlogIndexPage() {
  return (
    <Layout>
      <SEO title='Blog — MB BRANDNAME' description='Editorial and styling guides from MB BRANDNAME.' canonical={canonical('/blog')} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto px-4'>
            <PageTitleBlock title='BLOG & INSIGHTS' subtitle='Luxury styling, authentication knowledge, and care tips from MB BRANDNAME editors.' />
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {BLOG_POSTS.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className='overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4'>
                  <img src={post.image} alt={post.title} className='aspect-video w-full rounded-xl object-cover' />
                  <h2 className='mt-4 text-[16px] leading-[1.4]'>{post.title}</h2>
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
