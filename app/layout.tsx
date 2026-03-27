import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
// import Navbar from "@/components/layout/Navbar";

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
    <html lang="en" className="bg-brand-black text-brand-white">
      <body className={`${inter.variable} ${archivo.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        {/* Footer component would go here */}
      </body>
    </html>
  );
}