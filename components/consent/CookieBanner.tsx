import Link from "next/link";
import { useStore } from "../../context/store";
import Button from "../ui/Button";

export default function CookieBanner() {
  const { cookiePrefs, setCookiePrefs } = useStore();
  if (cookiePrefs.acceptedAll) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
        <p className="text-sm opacity-80">We use cookies for analytics and personalization.</p>
        <div className="flex items-center gap-4">
          <Button onClick={() => setCookiePrefs({ analytics: true, marketing: true, necessary: true, acceptedAll: true })}>Accept All</Button>
          <Link href="/personalize" className="text-[11px] font-black uppercase tracking-[0.3em]">Personalize</Link>
        </div>
      </div>
    </div>
  );
}
