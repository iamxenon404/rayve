"use client";

import { useCart } from "@/app/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/store/useCart"; // Ensure this path matches your structure
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeItem } = useCart();
  const router = useRouter();
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); // Close drawer before navigating
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Slide-out Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-black border-l border-white/10 z-[101] p-8 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-accent" />
                <h2 className="text-xl font-display font-bold uppercase tracking-tighter">Your Bag</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="uppercase tracking-[0.2em] text-sm">Bag is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-5 group">
                    <div className="relative w-24 h-32 bg-zinc-900 overflow-hidden">
                      <Image 
                        src="/sample-product.jpg" 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                        <p className="text-[10px] text-zinc-500 uppercase mt-1 tracking-widest">
                          Size: <span className="text-white">{item.size}</span> / Qty: <span className="text-white">{item.quantity}</span>
                        </p>
                      </div>
                      <p className="text-sm font-medium">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="self-start mt-1 text-zinc-600 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-8 mt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="uppercase text-[10px] tracking-[0.3em] text-zinc-500 font-bold">Subtotal</span>
                  <span className="text-xl font-display font-bold">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-5 uppercase font-bold text-xs tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all duration-300 active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
                <p className="text-[9px] text-center text-zinc-600 uppercase tracking-widest mt-4">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}