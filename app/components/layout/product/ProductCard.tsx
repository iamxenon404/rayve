import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ slug, name, price, image }: ProductProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm uppercase font-bold tracking-tight">{name}</h3>
          <p className="text-zinc-400 text-xs mt-1">Limited Edition</p>
        </div>
        <p className="text-sm font-medium">${price}</p>
      </div>
    </Link>
  );
}