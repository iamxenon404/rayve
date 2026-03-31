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
        { name: "All Products", href: "/shop" },
        { name: "New Arrivals", href: "/shop/new" },
        { name: "Best Sellers", href: "/shop/best" },
      ]
    },
    { 
      name: "Collections", 
      href: "/collections",
      items: [
        { name: "Winter 24", href: "/collections/winter" },
        { name: "Archive", href: "/collections/archive" },
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
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          
          {/* 1. Desktop Left Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="h-full flex items-center"
                onMouseEnter={() => link.items && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={link.href} 
                  className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-accent transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {link.items && <ChevronDown size={12} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu - Drops from bottom of Nav */}
                <AnimatePresence>
                  {link.items && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-0 w-48 bg-brand-black border border-white/10 backdrop-blur-xl shadow-2xl py-4 flex flex-col"
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

          {/* 2. Brand Logo (Absolute Center) */}
          <Link 
            href="/" 
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-display font-bold tracking-tighter uppercase"
          >
            Rayve
          </Link>

          {/* 3. Right Side Icons & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-[10px] text-black w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
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
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-zinc-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brand-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                  {/* Simple mobile sub-links */}
                  {link.items && (
                    <div className="mt-4 flex flex-col gap-2 pl-2 border-l border-white/10">
                       {link.items.map(item => (
                         <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-sm text-zinc-500 uppercase tracking-widest">{item.name}</Link>
                       ))}
                    </div>
                  )}
                </div>
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