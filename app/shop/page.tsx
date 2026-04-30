"use client";

import { useState } from "react";
import ProductCard from "../components/product/ProductCard";

export default function ShopPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Tees", "Hoodies", "Accessories"];

  // Mock data - eventually this comes from your DB
  const products = [
    { slug: "heavyweight-tee", name: "Rayve Heavyweight Tee", price: 55, category: "Tees", image: "https://placehold.co/600x800/000000/FFFFFF/png" },
    { slug: "void-hoodie", name: "Void Oversized Hoodie", price: 120, category: "Hoodies", image: "https://placehold.co/600x800/000000/FFFFFF/png" },
    { slug: "structural-cargo", name: "Structural Cargo", price: 145, category: "Accessories", image: "https://placehold.co/600x800/000000/FFFFFF/png" },
    // Add more...
  ];

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <p className="text-brand-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Collection 001</p>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">Full Archive</h1>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                filter === cat ? "text-white border-b border-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">No items found in this category.</p>
        </div>
      )}
    </main>
  );
}