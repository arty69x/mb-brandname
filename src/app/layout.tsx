import type { Metadata } from "next";
import { Inter, Sarabun, Prompt, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { FontProvider } from "@/context/FontContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MB BRANDNAME | Authentic Luxury Archives Tokyo",
    template: "%s | MB BRANDNAME",
  },
  description:
    "Curating the rarest luxury archives directly from Japan. Shop authenticated Chanel, Hermès, Louis Vuitton, and Dior with secure worldwide shipping.",
  keywords: [
    "luxury bags",
    "second hand brandname",
    "Japan direct",
    "Hermes",
    "Chanel",
    "Bangkok luxury",
  ],
  authors: [{ name: "MB BRANDNAME Team" }],
  creator: "MB BRANDNAME",
  publisher: "MB BRANDNAME",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://mb-brandname.com",
    siteName: "MB BRANDNAME",
    title: "MB BRANDNAME | Authentic Luxury Archives Tokyo",
    description:
      "Discover the finest selection of authenticated luxury archives direct from Japan.",
    images: [
      {
        url: "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg",
        width: 1200,
        height: 630,
        alt: "MB BRANDNAME Luxury Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MB BRANDNAME | Authentic Luxury Archives Tokyo",
    description: "Curated luxury archives from the heart of Japan.",
    images: [
      "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sarabun.variable} ${prompt.variable} ${bodoni.variable} font-sans antialiased`}
      >
        <FontProvider>
          <LanguageProvider>
            <CartProvider>
              <WishlistProvider>
                <AuthProvider>{children}</AuthProvider>
              </WishlistProvider>
            </CartProvider>
          </LanguageProvider>
        </FontProvider>
      </body>
    </html>
  );
}
