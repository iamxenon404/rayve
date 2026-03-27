import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";

export default async function CollectionDetail({ params }: { params: { slug: string } }) {
  const allProducts = await getProducts();
  
  // In a real app, you'd fetch by collection ID/Slug from your CMS
  const filteredProducts = allProducts; 

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <p className="text-brand-accent uppercase text-xs tracking-widest mb-2 font-bold">Rayve Archive</p>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">{params.slug.replace('-', ' ')}</h1>
        </div>
        <p className="text-zinc-500 text-sm uppercase font-medium">{filteredProducts.length} Items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}