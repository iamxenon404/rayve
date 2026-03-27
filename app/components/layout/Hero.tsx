"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img src="/hero-fallback.jpg" alt="Rayve Campaign" className="h-full w-full object-cover" />
        </video>
        {/* Subtle Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-black" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-brand-accent"
        >
          Drop 01 / Origins
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl font-display text-6xl font-bold uppercase tracking-tighter sm:text-8xl lg:text-9xl"
        >
          Rayve <br />
          <span className="text-outline-white text-transparent">Studio</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Link
            href="/shop"
            className="group relative overflow-hidden bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-brand-accent hover:text-white"
          >
            Shop Collection
          </Link>
          <Link
            href="/collections"
            className="border border-white/20 px-10 py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white/10"
          >
            Lookbook
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}