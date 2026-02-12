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
    default: "Go7Studio",
    template: "%s | Go7Studio",
  },
  description:
    "Go7Studio crafts fun-first mobile and Roblox games with satisfying progression, juicy polish, and replayable worlds.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Go7Studio",
    description:
      "Go7Studio crafts fun-first mobile and Roblox games with satisfying progression, juicy polish, and replayable worlds.",
    siteName: "Go7Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go7Studio",
    description:
      "Go7Studio crafts fun-first mobile and Roblox games with satisfying progression, juicy polish, and replayable worlds.",
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
