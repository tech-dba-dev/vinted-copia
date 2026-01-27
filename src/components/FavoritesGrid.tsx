"use client";

import { useMarketplace } from "@/components/MarketplaceProvider";
import { ProductCard } from "@/components/ProductCard";

export function FavoritesGrid() {
  const { favorites, products } = useMarketplace();
  const favoriteItems = products.filter((product) => favorites.includes(product.id));

  if (favoriteItems.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        Você ainda não favoritou nenhum item.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
      {favoriteItems.map((product) => (
        <ProductCard key={product.id} product={product} variant="home" />
      ))}
    </div>
  );
}
