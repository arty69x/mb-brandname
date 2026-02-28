import { useState } from "react";

import Layout from "../components/layout/Layout";
import { useStore } from "../context/store";
import { validateEmail } from "../lib/validation";

export default function AccountPage() {
  const { account, signIn, signOut } = useStore();
  const [email, setEmail] = useState("");

  return (
    <Layout>
      <main>
        <section className="py-32 md:py-40">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-2xl font-light uppercase tracking-[0.45em] md:text-4xl">Account</h1>
              {account.signedIn ? (
                <div className="mt-6">
                  <p>Signed in as {account.email}</p>
                  <button
                    className="mt-4 border border-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em]"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-6">
                  <input
                    className="w-full border border-gray-200 p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                  <button
                    className="mt-4 border border-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em]"
                    onClick={() => validateEmail(email) && signIn(email)}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
