import Link from "next/link";
import Image from "next/image";

const collections = [
  { id: 1, name: "Drop 01: Origins", slug: "drop-01", image: "/hero-1.jpg" },
  { id: 2, name: "Core Essentials", slug: "essentials", image: "/hero-2.jpg" },
  { id: 3, name: "Accessories", slug: "accessories", image: "/hero-3.jpg" },
];

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h1 className="text-5xl font-display font-bold uppercase mb-12 tracking-tighter">Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <Link key={col.id} href={`/collections/${col.slug}`} className="group relative aspect-[16/9] overflow-hidden">
            <Image 
              src={col.image} 
              alt={col.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-3xl font-display font-bold uppercase tracking-widest">{col.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}