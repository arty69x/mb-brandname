import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MB Brandname | Luxury Vintage Boutique",
  description: "Luxury flagship homepage with verified authentic brandname pieces."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
