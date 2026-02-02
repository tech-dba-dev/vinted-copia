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
  const itemKey = (searchParams.get("item") ?? "").toLowerCase();

  const categoryLabels: Record<string, string> = {
    mulher: "Mulher",
    homem: "Homem",
    crianca: "Criança",
    casa: "Casa",
    entretenimento: "Entretenimento",
    hobbies: "Hobbies",
    esportes: "Esportes",
  };
  const subcategoryLabels: Record<string, Record<string, string>> = {
    mulher: {
      tudo: "Tudo",
      roupa: "Roupa",
      calçado: "Calçado",
      bolsas: "Bolsas",
      acessórios: "Acessórios",
      beleza: "Beleza",
    },
    homem: {
      tudo: "Tudo",
      roupa: "Roupa",
      calçado: "Calçado",
      bolsas: "Bolsas",
      acessórios: "Acessórios",
      beleza: "Beleza",
    },
    crianca: {
      tudo: "Tudo",
      meninas: "Meninas",
      meninos: "Meninos",
      bebês: "Bebês",
      calçados: "Calçados",
      acessórios: "Acessórios",
    },
    casa: {
      tudo: "Tudo",
      decoração: "Decoração",
      cozinha: "Cozinha",
      "cama e banho": "Cama e Banho",
      móveis: "Móveis",
    },
    entretenimento: {
      tudo: "Tudo",
      livros: "Livros",
      "filmes e séries": "Filmes e Séries",
      música: "Música",
      games: "Games",
      colecionáveis: "Colecionáveis",
    },
    hobbies: {
      tudo: "Tudo",
      instrumentos: "Instrumentos",
      arte: "Arte",
      artesanato: "Artesanato",
      jardinagem: "Jardinagem",
      fotografia: "Fotografia",
    },
    esportes: {
      tudo: "Tudo",
      fitness: "Fitness",
      futebol: "Futebol",
      natação: "Natação",
      ciclismo: "Ciclismo",
      tênis: "Tênis",
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

  // Capitalizar primeira letra do item
  const itemLabel = itemKey
    ? itemKey.charAt(0).toUpperCase() + itemKey.slice(1)
    : "";

  // Título da página
  const pageTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : itemLabel || subcategoryLabel;

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
            <Link
              className="text-[#61896f] hover:text-primary transition-colors"
              href={`/buscar?categoria=${categoryKey}`}
            >
              {breadcrumbLabel}
            </Link>
            <span className="material-symbols-outlined text-xs text-[#61896f]">
              chevron_right
            </span>
            {itemLabel ? (
              <>
                <Link
                  className="text-[#61896f] hover:text-primary transition-colors"
                  href={`/buscar?categoria=${categoryKey}&sub=${subKey}`}
                >
                  {subcategoryLabel}
                </Link>
                <span className="material-symbols-outlined text-xs text-[#61896f]">
                  chevron_right
                </span>
                <span className="font-bold">{itemLabel}</span>
              </>
            ) : (
              <span className="font-bold">{subcategoryLabel}</span>
            )}
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
