"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "@/app/store/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const cartCount = useCart((state) => state.cart.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      name: "Shop", 
      href: "/shop",
      items: [
        { name: "Hoodies", href: "/shop" },
        { name: "Sweatpants", href: "/shop" },
        { name: "Accessories", href: "/shop" },
      ]
    },
    { 
      name: "Collections", 
      href: "/collections",
      items: [
        { name: "Winter 26", href: "/collections" },
        { name: "Archive", href: "/collections" },
      ]
    },
    { name: "The Lab", href: "/the-lab" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-brand-black/95 border-white/10 backdrop-blur-md h-16" 
            : "bg-transparent border-transparent h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LEFT: Mobile Menu Toggle & Desktop Nav */}
          <div className="flex items-center h-full">
            <button 
              className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-full transition"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="hidden md:flex items-center gap-8 h-full">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.items && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={link.href} 
                    className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-accent transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    {link.items && <ChevronDown size={10} className="opacity-50" />}
                  </Link>

                  {/* DROPDOWN: Attached to bottom of header */}
                  <AnimatePresence>
                    {link.items && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        // top-full makes it start exactly at the bottom of the <nav>
                        className="absolute top-full left-0 w-48 bg-brand-black border-x border-b border-white/10 shadow-2xl py-4 flex flex-col"
                      >
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="px-6 py-3 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Brand Logo */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-display font-bold tracking-tighter uppercase"
          >
            Rayve
          </Link>

          {/* RIGHT: Cart Icon */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer remains the same */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
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
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-accent transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}