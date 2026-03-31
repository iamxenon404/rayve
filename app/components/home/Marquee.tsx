"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const text = "New Drop Live // Engineered for the Void // Rayve Studio 2026 // No Restocks // ";
  
  return (
    <div className="py-4 border-y border-white/5 overflow-hidden bg-white text-black select-none">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap gap-10 items-center"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[10px] font-black uppercase tracking-[0.4em]">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}