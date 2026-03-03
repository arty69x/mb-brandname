import Head from 'next/head';

interface SEOProps { title: string; description: string; canonical: string; }

export default function SEO({ title, description, canonical }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
