// import ProductCard from "@/components/product/ProductCard";

import ProductCard from "./components/product/ProductCard";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="z-10 px-6">
          <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-4">
            New Drop 01
          </h1>
          <button className="bg-white text-black px-8 py-3 uppercase text-sm font-bold hover:bg-brand-accent hover:text-white transition">
            Shop the Collection
          </button>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-xl uppercase font-bold mb-10 tracking-widest">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard
            slug="heavyweight-tee" 
            name="Rayve Heavyweight Tee" 
            price={55} 
            image="/sample-product.jpg" 
          />
          {/* Add more cards here */}
        </div>
      </section>
    </div>
  );
}