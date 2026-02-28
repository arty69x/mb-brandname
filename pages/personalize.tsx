import Layout from "../components/layout/Layout";
import { useStore } from "../context/store";

export default function PersonalizePage() {
  const { cookiePrefs, setCookiePrefs } = useStore();

  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Personalize</h1>
              <div className="mt-8 space-y-4">
                {(["analytics", "marketing"] as const).map((key) => (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={cookiePrefs[key]}
                      onChange={(e) => setCookiePrefs({ ...cookiePrefs, [key]: e.target.checked })}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
