"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [selectedSize, setSelectedSize] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const product = { 
    id: "1", 
    name: "Rayve Heavyweight Tee", 
    price: 55,
    image: "https://placehold.co/600x800/000000/FFFFFF.png"
  };

  const handleAddToBag = () => {
    if (!selectedSize) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    // Trigger the popup
    setShowPopup(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative">
      
      {/* SUCCESS POPUP (The Toast Notification) */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-white text-black p-4 rounded-2xl shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-1 rounded-full text-white">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tight">Added to Bag</p>
                <p className="text-[9px] uppercase tracking-tighter opacity-60">{product.name} — Size {selectedSize}</p>
              </div>
            </div>
            <button onClick={() => setShowPopup(false)} className="opacity-40 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-[3/4] relative bg-zinc-900 rounded-2xl overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover" 
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <p className="text-brand-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Drop 01 // Archive</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none">
            {product.name}
          </h1>
          <p className="text-2xl mt-4 font-bold tracking-tighter">${product.price}</p>
          
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-50 text-white">Select Size</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 border transition-all duration-300 font-bold text-xs rounded-full ${
                    selectedSize === size 
                      ? 'bg-white text-black border-white' 
                      : 'border-white/10 hover:border-white/40 text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAddToBag}
            disabled={!selectedSize}
            className="mt-12 w-full bg-white text-black py-5 uppercase font-black tracking-widest text-[10px] hover:bg-brand-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-full"
          >
            {selectedSize ? "Add to Bag" : "Select a Size"}
          </button>

          {/* Technical Info */}
          <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-white">Composition</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter leading-relaxed">100% Organic Cotton<br />300GSM Heavyweight</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-white">Shipping</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter leading-relaxed">Global Express<br />3-5 Business Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}