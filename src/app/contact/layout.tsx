import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Go7Studio for web development, mobile apps, game development, or AI automation projects. Let's build something great together.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Work With Us | Go7Studio",
    description:
      "Have a project in mind? Contact Go7Studio for custom development, games, and automation solutions.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
