"use client";
import { useState } from "react";
// import { useCart } from "@/store/useCart";
import Image from "next/image";
import { useCart } from "@/app/store/useCart";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCart((state) => state.addItem);

  // In a real app, you'd fetch the product based on the slug here
  const product = { id: "1", name: "Rayve Heavyweight Tee", price: 55 };

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] relative bg-zinc-900">
        <Image src="/sample-product.jpg" alt="Product" fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-display font-bold uppercase">{product.name}</h1>
        <p className="text-2xl mt-2">${product.price}</p>
        
        <div className="mt-10">
          <p className="text-xs uppercase tracking-widest mb-4">Select Size</p>
          <div className="flex gap-4">
            {["S", "M", "L", "XL"].map((size) => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border ${selectedSize === size ? 'bg-white text-black' : 'border-white/20'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => addItem({ ...product, size: selectedSize, quantity: 1 })}
          disabled={!selectedSize}
          className="mt-8 w-full bg-white text-black py-4 uppercase font-bold hover:bg-brand-accent transition disabled:opacity-50"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}