import Layout from "../components/layout/Layout";
import { useStore } from "../context/store";

export default function PersonalizePage() {
  const { cookiePrefs, setCookiePrefs } = useStore();
  return <Layout><main><section className="py-32 md:py-40"><div className="container mx-auto px-4 max-w-xl"><h1 className="text-4xl font-light uppercase tracking-[0.45em]">Personalize</h1><div className="mt-8 space-y-4">{(["analytics","marketing"] as const).map((k)=><label key={k} className="flex items-center gap-3"><input type="checkbox" checked={cookiePrefs[k]} onChange={(e)=>setCookiePrefs({...cookiePrefs,[k]:e.target.checked})} />{k}</label>)}</div></div></section></main></Layout>;
}
