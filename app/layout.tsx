import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import NewsletterModal from "./components/ui/NewsletterModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "RAYVE | Modern Essentials",
  description: "Premium clothing for the modern era.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The body MUST wrap the NewsletterModal and everything else 
        to fix that "div cannot be a child of html" error.
      */}
      <body className={`${inter.variable} ${archivo.variable} antialiased bg-brand-black text-brand-white`}>
        <NewsletterModal />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}