"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import type { Product as DBProduct, Profile, Category } from "@/types/database";
import { getProducts } from "@/lib/products";
import type { Order } from "@/lib/mockData";

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
  orders: Order[];
  isLoadingProducts: boolean;
  isLoadingFavorites: boolean;
  refreshProducts: () => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addOrder: (productId: string) => Promise<void>;
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

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
      setOrders([]);
      return;
    }

    const loadUserData = async () => {
      setIsLoadingFavorites(true);
      try {
        // Carregar favoritos
        const { data: favoritesData } = await supabase
          .from("favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (favoritesData) {
          setFavorites(favoritesData.map((f) => f.product_id));
        }

        // Carregar pedidos
        const { data: ordersData } = await supabase
          .from("orders")
          .select("*")
          .eq("buyer_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersData) {
          setOrders(
            ordersData.map((o) => ({
              id: o.id,
              productId: o.product_id,
              status: mapOrderStatus(o.status),
              createdAt: o.created_at,
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setIsLoadingFavorites(false);
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
      const { data, error } = await supabase
        .from("orders")
        .insert({
          product_id: productId,
          buyer_id: user.id,
          seller_id: product.sellerId,
          amount: product.price,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newOrder: Order = {
          id: data.id,
          productId: data.product_id,
          status: "Em processamento",
          createdAt: data.created_at,
        };
        setOrders((prev) => [newOrder, ...prev]);
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  }, [user, products]);

  // Verificar se é favorito
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({
      products,
      favorites,
      orders,
      isLoadingProducts,
      isLoadingFavorites,
      refreshProducts: loadProducts,
      toggleFavorite,
      addOrder,
      isFavorite,
    }),
    [products, favorites, orders, isLoadingProducts, isLoadingFavorites, loadProducts, toggleFavorite, addOrder, isFavorite]
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

// Mapear status do banco para o formato da UI
function mapOrderStatus(status: string | null): Order["status"] {
  switch (status) {
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregue";
    default:
      return "Em processamento";
  }
}
