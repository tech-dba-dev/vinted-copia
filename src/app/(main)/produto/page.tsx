"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { getOrCreateConversation } from "@/lib/messages";
import type { Product, Profile, Category } from "@/types/database";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { useAuth } from "@/components/AuthProvider";

type ProductWithRelations = Product & {
  seller?: Profile;
  category?: Category;
};

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite, addOrder } = useMarketplace();
  const { user } = useAuth();

  const productId = searchParams.get("id");
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        router.push("/");
        return;
      }

      setIsLoading(true);
      const data = await getProductById(productId);

      if (!data) {
        router.push("/");
        return;
      }

      setProduct(data);
      setIsLoading(false);
    }

    loadProduct();
  }, [productId, router]);

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  const attrs = (product.dynamic_attributes || {}) as Record<string, unknown>;
  const brand = (attrs.brand as string) || (attrs.marca as string) || "Sem marca";
  const size = (attrs.size as string) || (attrs.tamanho as string) || "Único";
  const condition = (attrs.condition as string) || (attrs.condicao as string) || "Bom";
  const color = (attrs.color as string) || (attrs.cor as string) || "";

  const images = product.images || [];
  const currentImage = images[currentImageIndex] || "";

  const isFav = isFavorite(product.id);

  async function handleContactSeller() {
    if (!user || !product) {
      router.push("/entrar");
      return;
    }

    if (product.seller_id === user.id) {
      alert("Você não pode enviar mensagem para si mesmo");
      return;
    }

    setIsCreatingConversation(true);
    const conversation = await getOrCreateConversation(
      product.id,
      product.seller_id,
      user.id
    );

    if (conversation) {
      router.push("/mensagens");
    } else {
      alert("Erro ao criar conversa. Tente novamente.");
    }

    setIsCreatingConversation(false);
  }

  async function handleBuyNow() {
    if (!user || !product) {
      router.push("/entrar");
      return;
    }

    if (product.seller_id === user.id) {
      alert("Você não pode comprar seu próprio produto");
      return;
    }

    setIsPurchasing(true);
    try {
      await addOrder(product.id);
      router.push("/meus-pedidos");
    } catch (error) {
      console.error("Erro ao comprar:", error);
      alert("Erro ao processar a compra. Tente novamente.");
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
      <nav className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link className="hover:underline" href="/">Início</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link className="hover:underline" href="/buscar">
          {product.category?.name || "Produtos"}
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#111813] font-medium">{product.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {images.length > 0 ? (
            <>
              <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <span className={`material-symbols-outlined ${"fill-current text-red-500"}`}>
                    favorite
                  </span>
                </button>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img src={img} alt={product.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}

          <section className="mt-12 py-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">Descrição</h3>
            <div className="prose max-w-none text-gray-600 leading-relaxed">
              <p>{product.description || "Sem descrição disponível."}</p>
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-[380px]">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-[#111813]">
                    {(product.price ?? 0).toFixed(2)} €
                  </h2>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-gray-100">
                {brand && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Marca</span>
                    <span className="font-semibold">{brand}</span>
                  </div>
                )}
                {size && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tamanho</span>
                    <span className="font-semibold">{size}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estado</span>
                  <span className="font-semibold">{condition}</span>
                </div>
                {color && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cor</span>
                    <span className="font-semibold">{color}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleBuyNow}
                  disabled={isPurchasing || product.seller_id === user?.id || product.status === 'sold'}
                  className="w-full h-12 bg-primary text-black font-bold rounded-lg hover:brightness-105 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPurchasing ? "Processando..." : product.status === 'sold' ? "Produto vendido" : "Comprar agora"}
                </button>
                <button
                  onClick={handleContactSeller}
                  disabled={isCreatingConversation || product.seller_id === user?.id}
                  className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined !text-[20px]">mail</span>
                  {isCreatingConversation ? "Carregando..." : "Enviar mensagem"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Sobre o vendedor
              </h4>
              <Link
                href={product.seller?.username ? `/perfil/${product.seller.username}` : "#"}
                className="flex items-center gap-4 mb-4 group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-xl font-bold group-hover:bg-primary/30 transition-colors">
                  {product.seller?.avatar_url ? (
                    <img
                      src={product.seller.avatar_url}
                      alt={product.seller.username || "Vendedor"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {(product.seller?.full_name || product.seller?.username || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold group-hover:text-primary transition-colors">
                    {product.seller?.username || "Vendedor"}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span className="material-symbols-outlined text-[16px] text-yellow-400 fill-current">star</span>
                    <span>{(product.seller?.rating || 0).toFixed(1)}</span>
                    <span className="text-xs">({product.seller?.reviews_count || 0})</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    }>
      <ProductContent />
    </Suspense>
  );
}
