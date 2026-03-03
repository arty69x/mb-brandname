import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import CookieBanner from './CookieBanner';

export default function Layout({ children, headerVariant = 'solid' }: { children: ReactNode; headerVariant?: 'home' | 'solid' }) {
  return <><Header variant={headerVariant} />{children}<Footer /><CookieBanner /></>;
}
