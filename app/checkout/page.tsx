"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate a payment delay
    setTimeout(() => {
      setIsProcessing(false);
      alert("Order Received. Check email for confirmation.");
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-display uppercase tracking-tighter">Your bag is empty</h2>
        <Link href="/shop" className="mt-4 inline-block underline uppercase text-[10px] tracking-widest">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative">
      
      {/* PROCESSING POPUP */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-zinc-900 border border-white/10 p-12 rounded-[2rem] text-center max-w-sm w-full"
            >
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-brand-accent" />
              <h2 className="text-xl font-display uppercase font-bold tracking-tighter mb-2">Processing Payment</h2>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Do not refresh the page...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-12">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Side: Shipping Form */}
        <div className="space-y-8">
          <section className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-50">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
              <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
              <input type="email" placeholder="Email" className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
              <input type="text" placeholder="Address" className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
              <input type="text" placeholder="City" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
              <input type="text" placeholder="Postcode" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-white transition text-sm" />
            </div>
          </section>

          <button 
            onClick={handlePayment}
            className="w-full bg-white text-black py-6 rounded-full uppercase font-black tracking-[0.2em] text-[10px] hover:bg-brand-accent transition-all flex items-center justify-center gap-2"
          >
            <Lock size={14} />
            Complete Order
          </button>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-zinc-900/50 p-8 h-fit border border-white/5 rounded-3xl backdrop-blur-sm">
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-50">Order Summary</h2>
          <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center group">
                <div className="flex gap-4">
                  <div className="relative w-16 h-20 bg-zinc-800 rounded-lg overflow-hidden border border-white/5">
                    {/* FIX: Use item.image from store, fallback to placeholder if null */}
                    <Image 
                      src={item.image || "https://placehold.co/400x500/000000/FFFFFF.png"} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[11px] font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                      Size: <span className="text-white">{item.size}</span> / Qty: <span className="text-white">{item.quantity}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold tracking-tighter">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex justify-between text-[10px] uppercase tracking-widest">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest">
              <span className="text-zinc-500">Shipping</span>
              <span className="font-bold">${shipping}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold border-t border-white/10 mt-4 pt-6 tracking-tighter">
              <span className="uppercase text-[10px] tracking-[0.3em] self-center">Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}