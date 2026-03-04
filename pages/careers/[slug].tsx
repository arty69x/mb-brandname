import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { CAREER_ROLES } from '@/data/careers';
import { canonical } from '@/lib/seo';

type CareerPageProps = {
  role: {
    title: string;
    location: string;
    slug: string;
  } | null;
};

const toSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function CareerDetailPage({ role }: CareerPageProps) {
  if (!role) {
    return (
      <Layout>
        <main>
          <section className='py-16'>
            <div className='container mx-auto px-4'>
              <p className='text-center text-[14px]'>Role not found.</p>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={`${role.title} — Careers — MB BRANDNAME`} description={`Apply for ${role.title}.`} canonical={canonical(`/careers/${role.slug}`)} />
      <main>
        <section className='py-10 lg:py-14'>
          <div className='container mx-auto space-y-6 px-4'>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label: role.title }]} />
            <article className='rounded-2xl border border-[#d9d9d9] bg-white p-6 lg:p-8'>
              <h1 className='text-[24px] font-medium uppercase tracking-[0.08em]'>{role.title}</h1>
              <p className='mt-2 text-[14px] text-[#6b6b6b]'>{role.location}</p>
              <p className='mt-6 max-w-[760px] text-[16px] leading-8 text-[#6b6b6b]'>
                This role supports the premium operations and client service standards shown across the blueprinted commerce experience. Candidates
                should combine product knowledge, clear communication, and ownership across digital workflows.
              </p>
              <ul className='mt-6 list-disc space-y-2 pl-6 text-[15px] text-[#6b6b6b]'>
                <li>Lead quality checks and improve end-to-end merchandising standards.</li>
                <li>Collaborate with content, operations, and customer success teams.</li>
                <li>Document process improvements and report performance trends.</li>
              </ul>
              <div className='mt-8'>
                <Button href='/careers'>Back to careers</Button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CAREER_ROLES.map((role) => ({ params: { slug: toSlug(role.title) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CareerPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const role = CAREER_ROLES.find((item) => toSlug(item.title) === slug) ?? null;

  return {
    props: {
      role: role ? { ...role, slug } : null,
    },
  };
};
