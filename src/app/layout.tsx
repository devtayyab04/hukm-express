import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HukamExpress — Pakistan’s On-Demand Delivery Service",
    template: "%s | HukamExpress",
  },
  description:
    "Order anything and get it delivered fast across Pakistan. No app needed — food, groceries, medicine, emergency supplies, parcels, and more.",
  keywords: [
    "HukamExpress",
    "Delivery Pakistan",
    "Food delivery",
    "Grocery delivery",
    "Medicine delivery",
    "On-demand delivery",
  ],
  metadataBase: new URL("https://hukamexpress.com"),
  alternates: {
    canonical: "https://hukamexpress.com",
  },
  openGraph: {
    title: "HukamExpress — Order Anything. Get It Fast.",
    description:
      "Pakistan’s most convenient on-demand delivery service. Fast delivery for food, groceries, electronics, medicine, and more.",
    url: "https://hukamexpress.com",
    siteName: "HukamExpress",
    images: [
      {
        url: "/og-image.jpg", // add your OG image in public folder
        width: 1200,
        height: 630,
        alt: "HukamExpress Delivery Service",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HukamExpress — Your On-Demand Delivery Solution",
    description:
      "Order anything across Pakistan with fast delivery. No app required.",
    images: ["/og-image.jpg"],
    creator: "@hukamexpress",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts for better performance */}
        <link
          rel="preload"
          href="/fonts/Geist.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
