"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/types/database";
import type { Product as UIProduct } from "@/components/MarketplaceProvider";

// Transformar produto do banco para o formato da UI
function transformProduct(dbProduct: Product): UIProduct {
  const attrs = (dbProduct.dynamic_attributes || {}) as Record<string, unknown>;

  return {
    id: dbProduct.id,
    title: dbProduct.title,
    price: dbProduct.price,
    currency: "EUR",
    brand: (attrs.brand as string) || (attrs.marca as string) || "",
    size: (attrs.size as string) || (attrs.tamanho as string) || "",
    condition: (attrs.condition as string) || (attrs.condicao as string) || "Bom",
    image: dbProduct.images?.[0] || "",
    images: dbProduct.images || [],
    seller: dbProduct.seller?.username || dbProduct.seller?.full_name || "Vendedor",
    sellerId: dbProduct.seller_id,
    category: dbProduct.category?.slug || "",
    subcategory: "",
    description: dbProduct.description || "",
  };
}

export function BuscarResults() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Extrair filtros da URL (strings brutas para dependências estáveis do useEffect)
  const searchQuery = searchParams.get("q") || "";
  const categoria = searchParams.get("categoria") || "";
  const subcategoria = searchParams.get("sub") || "";
  const item = searchParams.get("item") || "";
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const brandsParam = searchParams.get("brands") || "";
  const sizesParam = searchParams.get("sizes") || "";
  const conditionsParam = searchParams.get("conditions") || "";
  const colorsParam = searchParams.get("colors") || "";
  const sort = (searchParams.get("sort") as 'recent' | 'price_asc' | 'price_desc') || 'recent';
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Buscar produtos quando os filtros mudarem
  useEffect(() => {
    const fetchProducts = async () => {
      console.log('[BuscarResults] ========== INÍCIO DA BUSCA ==========');
      console.log('[BuscarResults] Parâmetros da URL:', { categoria, subcategoria, item, searchQuery, page });
      setIsLoading(true);
      const limit = 20;
      const offset = (page - 1) * limit;

      try {
        // Usar a categoria mais específica disponível: item > subcategoria > categoria
        let categoryIds: string[] | undefined;
        if (categoria || subcategoria || item) {
          console.log('[BuscarResults] Parâmetros de categoria:', { categoria, subcategoria, item });
          const { getCategories } = await import('@/lib/products');
          const categories = await getCategories();
          console.log('[BuscarResults] Total de categorias carregadas:', categories.length);

          // Função para normalizar slugs (remover acentos e caracteres especiais)
          const normalizeSlug = (str: string): string => {
            return str
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // Remove acentos
              .toLowerCase()
              .trim();
          };

          // Determinar qual categoria usar (da mais específica para a mais geral)
          let targetSlug = item || subcategoria || categoria;

          // Função para tentar variações plural/singular
          const tryPluralSingular = (str: string): string[] => {
            const variations = [str];
            // Se termina com 's', adicionar versão sem 's'
            if (str.endsWith('s')) {
              variations.push(str.slice(0, -1));
            } else {
              // Se não termina com 's', adicionar versão com 's'
              variations.push(str + 's');
            }
            return variations;
          };

          // Se tem item OU subcategoria, precisamos tentar combinar para formar o slug completo
          if (item || subcategoria) {
            const possibleSlugs: string[] = [];

            if (item) {
              // Tentar variações de plural/singular para o item
              const itemVariations = tryPluralSingular(item);

              itemVariations.forEach(itemVar => {
                // Se tem item, tentar todas as combinações possíveis
                possibleSlugs.push(
                  `${categoria}_${subcategoria}_${itemVar}`,
                  `${categoria}_${itemVar}`,
                  `${subcategoria}_${itemVar}`,
                  itemVar
                );
              });
            } else if (subcategoria) {
              // Se tem apenas subcategoria (sem item), tentar combinações com categoria
              possibleSlugs.push(
                `${categoria}_${subcategoria}`,
                subcategoria
              );
            }

            // Filtrar slugs vazios ou malformados
            const validSlugs = possibleSlugs.filter(s => s && !s.startsWith('_') && !s.endsWith('_') && !s.includes('__'));

            console.log('[BuscarResults] Tentando slugs compostos (incluindo variações):', validSlugs);

            // Tentar encontrar com cada slug possível (normalizando para ignorar acentos)
            for (const slug of validSlugs) {
              const normalizedSlug = normalizeSlug(slug);
              const found = categories.find(c => {
                const catSlug = normalizeSlug(c.slug);
                return catSlug === normalizedSlug || catSlug.includes(normalizedSlug);
              });
              if (found) {
                targetSlug = found.slug;
                console.log('[BuscarResults] ✅ Encontrado com slug composto:', targetSlug);
                break;
              }
            }
          }

          console.log('[BuscarResults] Slug final para busca:', targetSlug);

          // Buscar a categoria pelo slug (normalizando para ignorar acentos)
          const normalizedTargetSlug = normalizeSlug(targetSlug);
          const foundCategory = categories.find(c => normalizeSlug(c.slug) === normalizedTargetSlug);

          if (foundCategory) {
            console.log('[BuscarResults] ✅ Categoria encontrada:', {
              id: foundCategory.id,
              name: foundCategory.name,
              slug: foundCategory.slug
            });

            // Função recursiva para buscar TODAS as categorias descendentes
            const getAllDescendants = (parentId: string): string[] => {
              const children = categories.filter(c => c.parent_id === parentId);
              let allDescendants = children.map(c => c.id);

              // Para cada filho, buscar seus descendentes também (recursão)
              children.forEach(child => {
                const grandchildren = getAllDescendants(child.id);
                allDescendants = [...allDescendants, ...grandchildren];
              });

              return allDescendants;
            };

            // Incluir a categoria + todas as descendentes
            const descendants = getAllDescendants(foundCategory.id);
            categoryIds = [foundCategory.id, ...descendants];

            console.log('[BuscarResults] ✅ Total de categorias para buscar:', categoryIds.length);
            console.log('[BuscarResults] Categoria:', foundCategory.name, '+ descendentes:', descendants.length);
          } else {
            console.log('[BuscarResults] ❌ Categoria NÃO encontrada para slug:', targetSlug);
            // IMPORTANTE: Retornar array com ID impossível para não retornar produtos
            // Em vez de undefined (que buscaria TODOS), usar array vazio força 0 resultados
            categoryIds = ['00000000-0000-0000-0000-000000000000'];
          }
        } else {
          console.log('[BuscarResults] Sem filtro de categoria');
        }

        // Parsear arrays dos params brutos
        const brands = brandsParam ? brandsParam.split(",").filter(Boolean) : [];
        const sizes = sizesParam ? sizesParam.split(",").filter(Boolean) : [];
        const conditions = conditionsParam ? conditionsParam.split(",").filter(Boolean) : [];
        const colors = colorsParam ? colorsParam.split(",").filter(Boolean) : [];

        const searchFilters = {
          q: searchQuery,
          category_ids: categoryIds,
          min_price: minPrice ? parseFloat(minPrice) : undefined,
          max_price: maxPrice ? parseFloat(maxPrice) : undefined,
          brands: brands.length > 0 ? brands : undefined,
          sizes: sizes.length > 0 ? sizes : undefined,
          conditions: conditions.length > 0 ? conditions : undefined,
          colors: colors.length > 0 ? colors : undefined,
          sort,
          limit,
          offset,
        };

        console.log('[BuscarResults] Filtros enviados para searchProducts:', searchFilters);

        const result = await searchProducts(searchFilters);

        console.log('[BuscarResults] Resultado da busca:', {
          produtos: result.products.length,
          total: result.total,
          primeiroProduto: result.products[0] ? {
            id: result.products[0].id,
            title: result.products[0].title,
            category_id: result.products[0].category_id
          } : 'nenhum'
        });

        setProducts(result.products.map(transformProduct));
        setTotal(result.total);
        console.log('[BuscarResults] ========== FIM DA BUSCA ==========');
      } catch (error) {
        console.error('[BuscarResults] ❌ ERRO ao buscar:', error);
        setProducts([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoria, subcategoria, item, searchQuery, minPrice, maxPrice, brandsParam, sizesParam, conditionsParam, colorsParam, sort, page]);

  if (isLoading) {
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

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        {searchQuery
          ? `Nenhum resultado encontrado para "${searchQuery}".`
          : "Nenhum resultado encontrado. Tente ajustar os filtros."}
        <p className="mt-2 text-xs">Total de produtos disponíveis: {total}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>{total} {total === 1 ? 'produto encontrado' : 'produtos encontrados'}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="search" />
        ))}
      </div>
    </>
  );
}
