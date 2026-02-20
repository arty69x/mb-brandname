import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Accessories",
  description: "Timeless jewelry, scarves, and accessories from top luxury brands. Authenticated and sourced from Japan.",
};

export default function AccessoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
