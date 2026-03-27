"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000); // Opens after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-zinc-900 p-12 border border-white/10 text-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X size={20} />
            </button>
            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em]">Access</span>
            <h2 className="text-3xl font-display font-bold uppercase mt-2 mb-4 tracking-tighter">Join the Archive</h2>
            <p className="text-zinc-400 text-sm mb-8">Sign up for early access to Drop 02 and exclusive laboratory updates.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-black border border-white/10 p-4 text-xs outline-none focus:border-brand-accent transition"
              />
              <button className="bg-white text-black p-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}