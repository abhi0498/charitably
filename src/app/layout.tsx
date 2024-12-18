import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Header } from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charitably - Support Charitable Organizations",
  description:
    "Discover and support verified charitable organizations. Make secure donations and track your impact.",
  keywords: [
    "charity",
    "donations",
    "nonprofit",
    "fundraising",
    "social impact",
  ],
  openGraph: {
    title: "Charitably",
    description:
      "Support verified charitable organizations and track your impact",
    url: "https://charitably.org",
    siteName: "Charitably",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
