"use client";

import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { ProductCard } from "@/components/ProductCard";

export function BuscarResults() {
  const searchParams = useSearchParams();
  const { products, isLoadingProducts } = useMarketplace();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const categoryKey = searchParams.get("categoria")?.toLowerCase() || "";
  const subKey = searchParams.get("sub")?.toLowerCase() || "";

  const filtered = products.filter((product) => {
    // Filtro por texto de busca
    if (searchQuery) {
      const searchableText = `${product.title} ${product.brand} ${product.description || ""} ${product.seller}`.toLowerCase();
      if (!searchableText.includes(searchQuery)) {
        return false;
      }
    }
    // Filtro por categoria
    if (categoryKey && product.category !== categoryKey) {
      return false;
    }
    // Filtro por subcategoria
    if (subKey && subKey !== "tudo" && product.subcategory !== subKey) {
      return false;
    }
    return true;
  });

  if (isLoadingProducts) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
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

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        {searchQuery
          ? `Nenhum resultado encontrado para "${searchQuery}".`
          : "Nenhum resultado encontrado para esta categoria."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} variant="search" />
      ))}
    </div>
  );
}
