import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "../consent/CookieBanner";
import NotificationStack from "../ui/NotificationStack";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
      <CookieBanner />
      <NotificationStack />
    </>
  );
}
