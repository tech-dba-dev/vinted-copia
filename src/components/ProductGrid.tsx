"use client";

import { useMarketplace } from "@/components/MarketplaceProvider";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ limit = 10 }: { limit?: number }) {
  const { products, isLoadingProducts } = useMarketplace();
  const displayProducts = products.slice(0, limit);

  if (isLoadingProducts) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] rounded-xl bg-gray-200 mb-3" />
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum produto disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} variant="home" />
      ))}
    </div>
  );
}
