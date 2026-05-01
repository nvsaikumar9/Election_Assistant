import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import ChunavGuru from "@/components/ChunavGuru";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Election Pathways | India's Election Assistant",
  description: "Explore and understand the Indian election process with our interactive assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col relative antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
        <ChunavGuru />
      </body>
    </html>
  );
}
