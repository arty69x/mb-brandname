import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import CookieBanner from "@/components/CookieBanner";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <PromoPopup />
      <CookieBanner />
      {children}
      <Footer />
    </>
  );
}
