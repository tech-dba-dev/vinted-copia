"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/components/MarketplaceProvider";

export function BuscarHero() {
  const searchParams = useSearchParams();
  const { products } = useMarketplace();
  const searchQuery = searchParams.get("q") || "";
  const categoryKey = (searchParams.get("categoria") ?? "").toLowerCase();
  const subKey = (searchParams.get("sub") ?? "tudo").toLowerCase();

  const categoryLabels: Record<string, string> = {
    moda: "Moda",
    eletronicos: "Eletrônicos",
    casa: "Casa",
    esporte: "Esporte",
    livros: "Livros",
    automotivo: "Automotivo",
    infantil: "Infantil",
    promocoes: "Promoções",
  };
  const subcategoryLabels: Record<string, Record<string, string>> = {
    moda: {
      tudo: "Tudo",
      roupas: "Roupas",
      calcados: "Calçados",
      acessorios: "Acessórios",
    },
    eletronicos: {
      tudo: "Tudo",
      smartphones: "Smartphones",
      notebooks: "Notebooks",
      tvs: "TVs",
      audio: "Áudio",
      games: "Games",
    },
    casa: {
      tudo: "Tudo",
      decoracao: "Decoração",
      cozinha: "Cozinha",
      organizacao: "Organização",
      moveis: "Móveis",
      eletrodomesticos: "Eletrodomésticos",
    },
    esporte: {
      tudo: "Tudo",
      ciclismo: "Ciclismo",
      fitness: "Fitness",
      futebol: "Futebol",
      aventura: "Aventura",
    },
    livros: {
      tudo: "Tudo",
      literatura: "Literatura",
      didaticos: "Didáticos",
      colecoes: "Coleções",
    },
    automotivo: {
      tudo: "Tudo",
      pecas: "Peças",
      acessorios: "Acessórios",
      ferramentas: "Ferramentas",
    },
    infantil: {
      tudo: "Tudo",
      brinquedos: "Brinquedos",
      roupas: "Roupas",
      bebe: "Bebê",
      escola: "Escola",
    },
    promocoes: {
      tudo: "Promoções",
    },
  };

  // Contar resultados filtrados
  const filteredCount = products.filter((product) => {
    if (searchQuery) {
      const searchableText = `${product.title} ${product.brand} ${product.description || ""} ${product.seller}`.toLowerCase();
      if (!searchableText.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    if (categoryKey && product.category !== categoryKey) {
      return false;
    }
    if (subKey && subKey !== "tudo" && product.subcategory !== subKey) {
      return false;
    }
    return true;
  }).length;

  const subcategoryLabel =
    subcategoryLabels[categoryKey]?.[subKey] ??
    subcategoryLabels[categoryKey]?.tudo ??
    "Tudo";
  const breadcrumbLabel = categoryLabels[categoryKey] ?? "Marketplace";

  // Título da página
  const pageTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : subcategoryLabel;

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <Link className="text-[#61896f] hover:text-primary transition-colors" href="/">
          Início
        </Link>
        <span className="material-symbols-outlined text-xs text-[#61896f]">
          chevron_right
        </span>
        {searchQuery ? (
          <span className="text-[#111813]">Busca</span>
        ) : (
          <>
            <span className="text-[#111813] ">{breadcrumbLabel}</span>
            <span className="material-symbols-outlined text-xs text-[#61896f]">
              chevron_right
            </span>
            <span className="font-bold">{subcategoryLabel}</span>
          </>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-[#61896f] text-sm">
            {filteredCount === 1
              ? "1 resultado encontrado"
              : `${filteredCount} resultados encontrados`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium whitespace-nowrap">Ordenar por:</p>
          <div className="relative min-w-[180px]">
            <select className="w-full pl-3 pr-10 py-2 rounded-lg bg-white border border-[#f0f4f2] text-sm focus:ring-primary appearance-none cursor-pointer">
              <option>Mais recentes</option>
              <option>Preço: mais baixo</option>
              <option>Preço: mais alto</option>
              <option>Mais populares</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2 pointer-events-none text-gray-500">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
