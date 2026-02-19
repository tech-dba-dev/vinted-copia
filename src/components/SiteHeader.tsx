"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { useAuth } from "@/components/AuthProvider";
import { MegaMenu } from "@/components/MegaMenu";
import { getUnreadMessagesCount, subscribeToUnreadMessages } from "@/lib/messages";

export function SiteHeader() {
  const router = useRouter();
  const { favorites } = useMarketplace();
  const { profile, isAuthenticated, signOut, isLoading, user } = useAuth();
  const favoritesCount = favorites.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Carregar contagem de mensagens não lidas
  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    // Carregar contagem inicial
    getUnreadMessagesCount(user.id).then(setUnreadCount);

    // Subscribe para atualizações em tempo real
    const unsubscribe = subscribeToUnreadMessages(user.id, setUnreadCount);

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f4f2] bg-white ">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 lg:gap-8 lg:px-10">
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-primary size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <Link
            className="hidden md:block text-[#111813] text-lg font-bold leading-tight tracking-tight"
            href="/"
          >
            EcoMarket
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <label className="relative flex items-center w-full h-10">
            <div className="absolute left-3 text-[#61896f] ">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              className="w-full h-full rounded-lg text-[#111813] border-none bg-[#f0f4f2] focus:ring-2 focus:ring-primary/50 placeholder:text-[#61896f] pl-10 pr-4 text-sm"
              placeholder="Pesquisar itens, marcas ou utilizadores"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </form>
        <div className="flex items-center gap-2 lg:gap-4">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : isAuthenticated && profile ? (
            <>
              {/* Elementos visíveis apenas quando logado */}
              <Link
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-colors"
                href="/criar-anuncio"
              >
                Anunciar agora
              </Link>
              <div className="flex items-center gap-1">
                <Link
                  className="w-9 h-9 flex items-center justify-center hover:bg-[#f0f4f2] rounded-full text-[#111813] relative transition-colors"
                  href="/favoritos"
                  title="Favoritos"
                >
                  <span className="material-symbols-outlined text-[22px]">favorite</span>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{favoritesCount}</span>
                  )}
                </Link>
                <Link
                  className="w-9 h-9 flex items-center justify-center hover:bg-[#f0f4f2] rounded-full text-[#111813] relative transition-colors"
                  href="/meus-pedidos"
                  title="Meus Pedidos"
                >
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                </Link>
                <Link
                  className="w-9 h-9 flex items-center justify-center hover:bg-[#f0f4f2] rounded-full text-[#111813] relative transition-colors"
                  href="/mensagens"
                  title="Mensagens"
                >
                  <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Link>
                <div className="w-px h-5 bg-[#dbe6df] mx-1 hidden lg:block" />
                <Link
                  className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-transparent hover:ring-primary/30 transition-all"
                  href="/perfil"
                  title="Meu Perfil"
                >
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </Link>
                <button
                  className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#61896f] hover:text-red-500 transition-colors ml-1"
                  type="button"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sair
                </button>
              </div>
            </>
          ) : (
            /* Botões de login/cadastro quando não logado */
            <div className="flex items-center gap-2">
              <Link
                className="hidden sm:inline-flex items-center justify-center px-4 h-10 rounded-lg text-sm font-bold text-[#111813] bg-[#f0f4f2] hover:bg-[#e2e9e5] transition-colors"
                href="/entrar"
              >
                Entrar
              </Link>
              <Link
                className="hidden sm:inline-flex items-center justify-center px-4 h-10 rounded-lg text-sm font-bold text-[#111813] bg-primary hover:bg-primary/90 transition-colors"
                href="/cadastro"
              >
                Criar conta
              </Link>
              <Link
                className="sm:hidden w-10 h-10 rounded-full bg-[#f0f4f2] hover:bg-[#e2e9e5] flex items-center justify-center text-[#111813] transition-colors"
                href="/entrar"
              >
                <span className="material-symbols-outlined">person</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <MegaMenu />
    </header>
  );
}
