import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designer Bags",
  description: "Explore our curated collection of authenticated luxury bags from Hermès, Chanel, Louis Vuitton, and more. Direct from Tokyo.",
};

export default function BagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
