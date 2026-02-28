import type { AppProps } from "next/app";
import "../styles/globals.css";
import { StoreProvider } from "../context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
