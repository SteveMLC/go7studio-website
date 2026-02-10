import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Development Services",
  description:
    "Professional game development consulting services: mobile game development with Flutter, Roblox game creation, monetization strategy, technical architecture review, and MVP prototyping. Expert guidance starting at $500.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Game Development Services | Go7Studio",
    description:
      "Expert game development consulting: Flutter mobile games, Roblox development, monetization strategy, and technical architecture reviews.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
