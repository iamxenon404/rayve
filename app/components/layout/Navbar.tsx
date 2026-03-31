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

                  {/* DESKTOP DROPDOWN (Bottom of Header) */}
                  <AnimatePresence>
                    {link.items && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
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
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-display font-bold tracking-tighter uppercase text-white"
          >
            Rayve
          </Link>

          {/* RIGHT: Cart Icon */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition relative text-white"
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

      {/* MOBILE MENU: SLIDES FROM BOTTOM */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[60] bg-brand-black border-t border-white/10 p-8 pt-12 rounded-t-[2rem] max-h-[85vh] overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Grab handle for visual cue */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
              
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-display font-bold uppercase tracking-tighter text-white">Rayve</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col gap-4">
                    <Link 
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-accent transition-colors text-white"
                    >
                      {link.name}
                    </Link>
                    {link.items && (
                      <div className="flex flex-wrap gap-4 pl-1">
                        {link.items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-white/10 pt-8 text-zinc-600 text-[9px] uppercase tracking-[0.2em] text-center">
                © 2024 Rayve Studio. Built for the streets.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}