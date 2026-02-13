"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import type { Product as DBProduct, Profile, Category } from "@/types/database";
import { getProducts } from "@/lib/products";
import {
  createOrder as createOrderInDB,
  getBuyerOrders,
  getSellerOrders,
  updateOrderStatus as updateOrderStatusInDB,
  cancelOrder as cancelOrderInDB,
  type OrderWithDetails,
} from "@/lib/orders";

// Tipo do produto para a UI (compatível com componentes existentes)
export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  brand: string;
  size: string;
  condition: string;
  image: string;
  images: string[];
  seller: string;
  sellerId: string;
  category: string;
  subcategory: string;
  badge?: string;
  description?: string;
};

export type MarketplaceContextValue = {
  products: Product[];
  favorites: string[];
  buyerOrders: OrderWithDetails[];
  sellerOrders: OrderWithDetails[];
  isLoadingProducts: boolean;
  isLoadingFavorites: boolean;
  isLoadingOrders: boolean;
  refreshProducts: () => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addOrder: (productId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: 'shipped' | 'delivered') => Promise<boolean>;
  cancelOrder: (orderId: string, productId: string) => Promise<boolean>;
  isFavorite: (id: string) => boolean;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

// Transformar produto do banco para o formato da UI
function transformDBProduct(dbProduct: DBProduct & { seller?: Profile; category?: Category }): Product {
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
    badge: dbProduct.created_at && isNewProduct(dbProduct.created_at) ? "Novo" : undefined,
  };
}

// Verificar se o produto foi criado nos últimos 7 dias
function isNewProduct(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [buyerOrders, setBuyerOrders] = useState<OrderWithDetails[]>([]);
  const [sellerOrders, setSellerOrders] = useState<OrderWithDetails[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Carregar produtos do Supabase
  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const dbProducts = await getProducts({ limit: 50 });
      const transformedProducts = dbProducts.map(transformDBProduct);
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  // Carregar produtos ao montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Carregar favoritos e pedidos do usuário
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      setBuyerOrders([]);
      setSellerOrders([]);
      return;
    }

    const loadUserData = async () => {
      setIsLoadingFavorites(true);
      setIsLoadingOrders(true);
      try {
        // Carregar favoritos
        const { data: favoritesData } = await supabase
          .from("favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (favoritesData) {
          setFavorites(favoritesData.map((f) => f.product_id));
        }

        // Carregar pedidos como comprador e vendedor em paralelo
        const [buyer, seller] = await Promise.all([
          getBuyerOrders(user.id),
          getSellerOrders(user.id),
        ]);

        setBuyerOrders(buyer);
        setSellerOrders(seller);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setIsLoadingFavorites(false);
        setIsLoadingOrders(false);
      }
    };

    loadUserData();
  }, [isAuthenticated, user]);

  // Toggle favorito
  const toggleFavorite = useCallback(async (productId: string) => {
    if (!user) return;

    const isFav = favorites.includes(productId);

    // Atualização otimista
    setFavorites((prev) =>
      isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    try {
      if (isFav) {
        // Remover favorito
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } else {
        // Adicionar favorito
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: productId });
      }
    } catch (error) {
      // Reverter em caso de erro
      console.error("Erro ao atualizar favorito:", error);
      setFavorites((prev) =>
        isFav ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
    }
  }, [user, favorites]);

  // Adicionar pedido
  const addOrder = useCallback(async (productId: string) => {
    if (!user) return;

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    try {
      const order = await createOrderInDB(productId, user.id, product.sellerId, product.price);

      if (order) {
        setBuyerOrders((prev) => [order, ...prev]);
        // Remover produto da lista (agora está vendido)
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  }, [user, products]);

  // Atualizar status do pedido (vendedor)
  const updateOrderStatus = useCallback(async (orderId: string, status: 'shipped' | 'delivered'): Promise<boolean> => {
    const success = await updateOrderStatusInDB(orderId, status);
    if (success) {
      // Atualizar na lista de vendas
      setSellerOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      // Atualizar na lista de compras também (caso exista)
      setBuyerOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    }
    return success;
  }, []);

  // Cancelar pedido (comprador)
  const cancelOrder = useCallback(async (orderId: string, productId: string): Promise<boolean> => {
    const success = await cancelOrderInDB(orderId, productId);
    if (success) {
      setBuyerOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
      );
      // Recarregar produtos para mostrar o restaurado
      loadProducts();
    }
    return success;
  }, [loadProducts]);

  // Verificar se é favorito
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({
      products,
      favorites,
      buyerOrders,
      sellerOrders,
      isLoadingProducts,
      isLoadingFavorites,
      isLoadingOrders,
      refreshProducts: loadProducts,
      toggleFavorite,
      addOrder,
      updateOrderStatus,
      cancelOrder,
      isFavorite,
    }),
    [products, favorites, buyerOrders, sellerOrders, isLoadingProducts, isLoadingFavorites, isLoadingOrders, loadProducts, toggleFavorite, addOrder, updateOrderStatus, cancelOrder, isFavorite]
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error("useMarketplace must be used within MarketplaceProvider");
  }
  return ctx;
}

// Mapear status do banco para texto em português
export function mapOrderStatus(status: string | null): string {
  switch (status) {
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregue";
    case "cancelled":
      return "Cancelado";
    case "pending":
    default:
      return "Em processamento";
  }
}

// Cor do badge de status
export function getStatusColor(status: string | null): string {
  switch (status) {
    case "shipped":
      return "bg-blue-100 text-blue-600";
    case "delivered":
      return "bg-primary/20 text-primary";
    case "cancelled":
      return "bg-red-100 text-red-600";
    case "pending":
    default:
      return "bg-amber-100 text-amber-600";
  }
}
