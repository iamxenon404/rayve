"use client";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-brand-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter uppercase">
          Rayve
        </Link>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <Link href="/shop" className="hover:text-brand-accent transition-colors">Shop</Link>
          <Link href="/collections" className="hover:text-brand-accent transition-colors">Collections</Link>
          <Link href="/about" className="hover:text-brand-accent transition-colors">The Lab</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <ShoppingBag size={20} />
          </button>
          <button className="md:hidden p-2">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}