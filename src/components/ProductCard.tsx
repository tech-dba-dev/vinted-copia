"use client";

import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";
import { useMarketplace } from "@/components/MarketplaceProvider";
import type { Product } from "@/lib/mockData";

export type ProductCardProps = {
  product: Product;
  variant?: "home" | "search" | "compact";
};

export function ProductCard({ product, variant = "home" }: ProductCardProps) {
  const { favorites, toggleFavorite } = useMarketplace();
  const isFavorite = favorites.includes(product.id);
  const priceLabel = `${product.price.toFixed(2).replace(".", ",")} ${product.currency === "EUR" ? "€" : product.currency}`;

  if (variant === "search") {
    return (
      <div className="group flex flex-col gap-3 bg-white p-3 rounded-xl border border-[#f0f4f2] hover:shadow-xl transition-all">
        <Link href={`/produto?id=${product.id}`} className="contents">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
            <InlineImage
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button
              className="absolute top-3 right-3"
              type="button"
              aria-pressed={isFavorite}
              onClick={(event) => {
                event.preventDefault();
                toggleFavorite(product.id);
              }}
            >
              <span
                className="material-symbols-outlined text-[20px] leading-none"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">{priceLabel}</p>
              <div className="flex items-center gap-1.5">
                <span className="size-4 rounded-full bg-gray-200"></span>
                <span className="text-[10px] text-gray-500 font-medium">{product.seller}</span>
              </div>
            </div>
            <p className="text-xs text-[#61896f] font-medium">{product.size} · {product.brand}</p>
            <p className="text-sm text-gray-800 truncate">{product.title}</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group flex flex-col cursor-pointer">
      <Link href={`/produto?id=${product.id}`} className="contents">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-100">
          <InlineImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            className="absolute top-3 right-3"
            type="button"
            aria-pressed={isFavorite}
            onClick={(event) => {
              event.preventDefault();
              toggleFavorite(product.id);
            }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
          {product.badge ? (
            <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-black">
              {product.badge}
            </div>
          ) : null}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{priceLabel}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">{product.brand}</p>
          <p className="text-xs text-gray-400">Tam. {product.size} · {product.condition}</p>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 ">
          <div className="w-5 h-5 rounded-full bg-cover bg-center"></div>
          <span className="text-[11px] font-medium text-gray-600 ">{product.seller}</span>
        </div>
      </Link>
    </div>
  );
}
