import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Layout } from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
