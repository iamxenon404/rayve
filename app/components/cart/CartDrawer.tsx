"use client";
import { useCart } from "@/app/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/store/useCart";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeItem } = useCart();
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-black border-l border-white/10 z-[101] p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold uppercase tracking-tighter">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-zinc-500 text-center mt-20 uppercase tracking-widest text-sm">Bag is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-zinc-900">
                      <Image src="/sample-product.jpg" alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold uppercase">{item.name}</h3>
                      <p className="text-xs text-zinc-400">Size: {item.size}</p>
                      <p className="text-sm mt-2">${item.price}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-white">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex justify-between mb-4">
                  <span className="uppercase text-xs tracking-widest text-zinc-400">Subtotal</span>
                  <span className="font-bold">${total}</span>
                </div>
                <button className="w-full bg-white text-black py-4 uppercase font-bold hover:bg-brand-accent transition">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}