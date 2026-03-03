import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';
import CookieBar from './CookieBar';
import OfferModal from './OfferModal';

export default function Layout({ children, headerVariant = 'solid' }: { children: ReactNode; headerVariant?: 'home' | 'solid' }) {
  const router = useRouter();
  const showOffer = router.pathname === '/';

  return (
    <>
      <Header variant={headerVariant} />
      {children}
      <Footer />
      <CookieBar />
      {showOffer ? <OfferModal /> : null}
    </>
  );
}
