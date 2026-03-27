"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "@/app/store/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const cartCount = useCart((state) => state.cart.length);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "The Lab", href: "/the-lab" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-brand-black/90 border-white/10 backdrop-blur-md h-16" 
            : "bg-transparent border-transparent h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-full transition"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Brand Logo */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-display font-bold tracking-tighter uppercase"
          >
            Rayve
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-display font-bold uppercase tracking-tighter">Rayve</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 pt-8 text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
              © 2024 Rayve Studio. Engineered for the void.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}