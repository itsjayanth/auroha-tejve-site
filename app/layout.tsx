import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Noise from "@/components/ui/noise";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Auroha Tejve — Software behind modern commerce",
    template: "%s · Auroha Tejve",
  },
  description:
    "Auroha Tejve Private Limited is a software studio building Shopify apps, Shopify stores, B2B SaaS products, and applied AI solutions for modern commerce.",
  keywords: [
    "Shopify app development",
    "Shopify store development",
    "B2B SaaS development",
    "AI solutions for ecommerce",
    "Auroha Tejve",
  ],
  authors: [{ name: "Auroha Tejve Private Limited" }],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Auroha Tejve — Software behind modern commerce",
    description:
      "We build Shopify apps, Shopify stores, B2B SaaS products, and AI solutions for modern commerce.",
    url: siteUrl,
    siteName: "Auroha Tejve",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aurohatejve",
    title: "Auroha Tejve — Software behind modern commerce",
    description:
      "We build Shopify apps, Shopify stores, B2B SaaS products, and AI solutions for modern commerce.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-bg text-ink">
        <Noise />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
