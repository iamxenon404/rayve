"use client";

import { useState } from "react";
import { useCart } from "@/app/store/useCart";
import { motion } from "framer-motion";
import { Plus, Minus, ShieldCheck, Truck } from "lucide-react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [size, setSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  // This would eventually come from a database/CMS
  const product = {
    id: "1",
    name: "Heavyweight Box Tee",
    price: 55,
    description: "A structural masterpiece. Engineered with 300GSM organic cotton for a rigid, oversized silhouette that maintains its shape.",
    details: ["300GSM Heavyweight Cotton", "Drop Shoulder Fit", "High-density Screen Print", "Pre-shrunk"],
    images: ["https://placehold.co/800x1000/000000/FFFFFF/png"], 
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      size: size
    });
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden"
          >
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-brand-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-4">In Stock // Drop 01</p>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tighter mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-8">${product.price}</p>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-md">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-4">Select Size</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-full border text-[10px] font-bold transition-all ${
                    size === s ? "bg-white text-black border-white" : "border-white/10 hover:border-white/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4 mb-12">
            <div className="flex items-center border border-white/10 rounded-full px-4 gap-6">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14}/></button>
              <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={14}/></button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black font-black uppercase tracking-widest py-4 rounded-full hover:bg-brand-accent transition-colors text-[10px]"
            >
              Add to Cart
            </button>
          </div>

          {/* Technical Specs Bento-lite */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
            <div className="flex items-start gap-3">
              <Truck size={18} className="text-zinc-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Global Shipping</p>
                <p className="text-[9px] text-zinc-500 uppercase">3-5 Business Days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-zinc-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Authentic</p>
                <p className="text-[9px] text-zinc-500 uppercase">Verified Studio Piece</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}