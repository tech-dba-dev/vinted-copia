"use client";

import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { ProductCard } from "@/components/ProductCard";

export function BuscarResults() {
  const searchParams = useSearchParams();
  const { products } = useMarketplace();
  const categoryKey = (searchParams.get("categoria") ?? "mulher").toLowerCase();
  const subKey = (searchParams.get("sub") ?? "tudo").toLowerCase();

  const filtered = products.filter((product) => {
    if (categoryKey && product.category !== categoryKey) {
      return false;
    }
    if (subKey && subKey !== "tudo" && product.subcategory !== subKey) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        Nenhum resultado encontrado para esta categoria.
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
