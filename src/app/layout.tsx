import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Header } from "./components/header";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Toaster } from "@/components/ui/toaster";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://charitably.in"),
  title: {
    default: "Charitably - Support Charitable Organizations",
    template: "%s | Charitably",
  },
  description:
    "Discover and support verified charitable organizations in India. Make secure donations and track your impact.",
  keywords: [
    "charity",
    "donations",
    "nonprofit",
    "fundraising",
    "social impact",
    "India charity",
  ],
  authors: [{ name: "Charitably" }],
  creator: "Charitably",
  publisher: "Charitably",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-4">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
