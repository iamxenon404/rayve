import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  slug: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string; // Made optional in case some products only have one photo
}

export default function ProductCard({ slug, name, price, image, hoverImage }: ProductProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        {/* Primary Image */}
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${
            hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
          }`}
        />

        {/* Hover Image (Reveals on hover if provided) */}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm uppercase font-bold tracking-tight text-brand-white">
            {name}
          </h3>
          <p className="text-zinc-400 text-xs mt-1 font-medium tracking-wide">
            Limited Edition
          </p>
        </div>
        <p className="text-sm font-bold text-brand-white">${price}</p>
      </div>
    </Link>
  );
}