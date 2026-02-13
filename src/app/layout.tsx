import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  createSchemaGraph,
  getOrganizationSchema,
  getWebsiteSchema,
} from "@/lib/schema";

const GA_MEASUREMENT_ID = "G-ER8B7QWQBY";

const siteUrl = "https://go7studio.com";
const rootSchemaGraph = createSchemaGraph(
  getOrganizationSchema(),
  getWebsiteSchema(),
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Go7Studio | Game Development & Consulting",
    template: "%s | Go7Studio",
  },
  description:
    "Go7Studio builds fun-first mobile and Roblox games with satisfying progression and juicy polish. Expert game development consulting for indie studios.",
  alternates: { canonical: "/" },
  keywords: ["game development", "mobile games", "Roblox", "Flutter", "game consulting", "indie studio"],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Go7Studio | Game Development & Consulting",
    description:
      "We build fun-first games and offer expert consulting for indie studios. Mobile games, Roblox development, monetization strategy, and MVP prototyping.",
    siteName: "Go7Studio",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Go7Studio - Game Development & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go7Studio | Game Development & Consulting",
    description:
      "We build fun-first games and offer expert consulting for indie studios. Mobile games, Roblox development, monetization strategy.",
    images: ["/images/og-default.jpg"],
    creator: "@Steve_mlc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="root-schema-graph-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootSchemaGraph),
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <Header />
        <main className="min-h-[calc(100vh-72px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
