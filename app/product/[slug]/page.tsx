"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/store/useCart";

// Note: In Next.js 15, params is a Promise
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCart((state) => state.addItem);

  // Updated mock data with the missing 'image' field
  const product = { 
    id: "1", 
    name: "Rayve Heavyweight Tee", 
    price: 55,
    image: "/sample-product.jpg" // Added this to match your CartItem type
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
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="aspect-[3/4] relative bg-zinc-900 rounded-2xl overflow-hidden">
        {/* Placeholder logic: if sample-product.jpg 404s, this might throw a console error until you add the file to /public */}
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
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
          {product.name}
        </h1>
        <p className="text-2xl mt-4 font-bold">${product.price}</p>
        
        <div className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-50">Select Size</p>
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

        {/* Technical Info Teaser */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Composition</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">100% Organic Cotton // 300GSM</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Shipping</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Global Express // 3-5 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}