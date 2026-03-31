"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function FeaturedDrop() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-brand-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Collection 001</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">Selected Pieces</h2>
        </div>
        <Link href="/shop" className="hidden md:block text-[10px] uppercase tracking-widest border-b border-white/20 pb-1 hover:border-brand-accent transition-colors">
          View all drops
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px] md:h-[600px]">
        
        {/* Main Large Card */}
        <motion.div 
          whileHover={{ scale: 0.99 }}
          className="md:col-span-8 relative overflow-hidden group bg-zinc-900 rounded-3xl"
        >
          <div className="absolute inset-0 bg-[url('/path-to-your-img.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl font-bold uppercase tracking-tight">Oversized "Void" Hoodie</h3>
            <p className="text-zinc-400 text-sm mb-4">Heavyweight 500GSM Cotton</p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
              Explore
            </button>
          </div>
        </motion.div>

        {/* Side Stack */}
        <div className="md:col-span-4 grid grid-rows-2 gap-4">
          {/* Top Small */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative overflow-hidden group bg-zinc-900 rounded-3xl"
          >
             <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center italic text-zinc-700 uppercase font-black text-6xl">
               LAB
             </div>
             <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">The Lab</span>
                <p className="text-sm text-zinc-400">Experimental Textures</p>
             </div>
          </motion.div>

          {/* Bottom Small */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative overflow-hidden group bg-brand-accent rounded-3xl"
          >
             <div className="absolute inset-0 p-6 flex flex-col justify-between items-start text-black">
                <ShoppingBag size={32} />
                <div>
                   <h3 className="text-xl font-bold uppercase leading-tight">Accessory<br/>Archive</h3>
                   <p className="text-[10px] uppercase font-bold mt-2">Browse Bags & Headwear</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}