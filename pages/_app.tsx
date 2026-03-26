import type { AppProps } from 'next/app';
import { Jost } from 'next/font/google';
import '@/styles/globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Layout } from '@/components/Layout';

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className={jost.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </StoreProvider>
  );
}
