import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/app/components/headerNav/headerNav";
import Footer from "@/app/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Rakshak | Women Safety Platform',
  description: 'Empowering women with technology, awareness, and immediate SOS community support across India.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-50 font-sans flex flex-col text-gray-800">
        <HeaderNav />
        <main className="flex-grow">
          {children} {/* This is where the page content will load */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
