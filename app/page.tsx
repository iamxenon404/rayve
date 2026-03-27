// import ProductCard from "@/components/product/ProductCard";

import ProductCard from "./components/product/ProductCard";

export default function Home() {
  return (
    <div className="pt-16">
     
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