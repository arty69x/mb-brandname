import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <style>{`:root{--bg:#FFFFFF;--bg-alt:#F3F3F3;--text:#111111;--muted:#6D6D6D;--caption:#9B9B9B;--border:#E6E6E6;--footer:#000000;--footerText:#FFFFFF;--footerMuted:#CFCFCF;--accentGold:#C8A96A;--cta:#444444;--ctaHover:#2F2F2F;--danger:#CC3333;}`}</style>
      </Head>
      <body className='bg-[var(--bg)] text-[var(--text)]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
