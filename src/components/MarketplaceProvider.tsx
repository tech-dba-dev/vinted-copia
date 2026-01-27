"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Order, Product } from "@/lib/mockData";
import { products } from "@/lib/mockData";

export type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};

export type MarketplaceContextValue = {
  products: Product[];
  favorites: string[];
  orders: Order[];
  user: UserProfile | null;
  toggleFavorite: (id: string) => void;
  addOrder: (productId: string) => void;
  login: (profile: UserProfile) => void;
  logout: () => void;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

const STORAGE_KEYS = {
  favorites: "marketplace:favorites",
  orders: "marketplace:orders",
  user: "marketplace:user",
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore persistence errors
  }
}

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.favorites, []),
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.orders, []),
  );
  const [user, setUser] = useState<UserProfile | null>(() =>
    readStorage<UserProfile | null>(STORAGE_KEYS.user, null),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orders, orders);
  }, [orders]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.user, user);
  }, [user]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const addOrder = (productId: string) => {
    const order: Order = {
      id: `o-${Date.now()}`,
      productId,
      status: "Em processamento",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
  };

  const login = (profile: UserProfile) => setUser(profile);
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      products,
      favorites,
      orders,
      user,
      toggleFavorite,
      addOrder,
      login,
      logout,
    }),
    [favorites, orders, user],
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
