import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <div className="group relative rounded-2xl border border-stone-800/60 bg-stone-900/50 overflow-hidden hover:border-amber-800/40 transition-all duration-300">
      {/* Product visual — gradient + candle icon */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-28 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="w-1.5 h-5 bg-amber-300/80 rounded-full mb-1 group-hover:animate-pulse" />
            <div className="w-12 h-14 rounded-lg bg-white/10 border border-white/10" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-stone-900/90 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-amber-50 group-hover:text-amber-200 transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-semibold text-amber-400">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <p className="text-sm text-stone-400 mb-4">{product.tagline}</p>

        {/* Notes */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="px-2.5 py-1 text-xs rounded-full bg-stone-800/80 text-stone-400 border border-stone-700/50"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-xs text-stone-400 mb-5">
          <span>{product.weight}</span>
          <span className="w-1 h-1 rounded-full bg-stone-700" />
          <span>{product.burnTime} burn time</span>
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="block w-full text-center px-4 py-2.5 rounded-lg bg-amber-700/80 text-amber-50 font-semibold text-sm hover:bg-amber-600 transition-colors"
        >
          View &amp; Buy
        </Link>
      </div>
    </div>
  );
}
