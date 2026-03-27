"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "@/store/useCart";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useCart((state) => state.cart.length);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-brand-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold tracking-tighter uppercase">
            Rayve
          </Link>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}