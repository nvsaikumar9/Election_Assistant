import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import ChunavGuru from "@/components/ChunavGuru";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Election Pathways | India's Election Assistant",
  description: "Explore and understand the Indian election process with our interactive assistant. Learn about voter registration, nominations, and polling.",
  keywords: ["India Elections", "Election Process", "Voter Education", "Digital India", "Election Commission"],
  openGraph: {
    title: "Election Pathways",
    description: "Your interactive guide to Indian Elections",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative antialiased font-sans">
        <GoogleAnalytics />
        {children}
        <ChunavGuru />
      </body>
    </html>
  );
}
