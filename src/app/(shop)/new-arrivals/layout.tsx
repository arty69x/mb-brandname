import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest additions to our luxury archive. Freshly sourced bags and accessories from Tokyo's finest boutiques.",
};

export default function NewArrivalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
