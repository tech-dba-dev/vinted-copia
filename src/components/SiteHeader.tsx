"use client";

import Link from "next/link";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { MegaMenu } from "@/components/MegaMenu";

export function SiteHeader() {
  const { favorites, user, logout } = useMarketplace();
  const favoritesCount = favorites.length;
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
        <div className="flex-1 max-w-xl">
          <label className="relative flex items-center w-full h-10">
            <div className="absolute left-3 text-[#61896f] ">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              className="w-full h-full rounded-lg text-[#111813] border-none bg-[#f0f4f2] focus:ring-2 focus:ring-primary/50 placeholder:text-[#61896f] pl-10 pr-4 text-sm"
              placeholder="Pesquisar itens, marcas ou utilizadores"
              defaultValue=""
            />
          </label>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <Link
            className="hidden sm:flex bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-colors"
            href="/criar-anuncio"
          >
            Anunciar agora
          </Link>
          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              className="p-2 hover:bg-[#f0f4f2] rounded-lg text-[#111813] relative group"
              href="/favoritos"
              title="Favoritos"
            >
              <span className="material-symbols-outlined">favorite</span>
              {favoritesCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#111813] text-[10px] font-bold text-white">{favoritesCount}</span>
              ) : null}
            </Link>
            <Link
              className="p-2 hover:bg-[#f0f4f2] rounded-lg text-[#111813] relative"
              href="/meus-pedidos"
              title="Notificações"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white "></span>
            </Link>
            <Link
              className="p-2 hover:bg-[#f0f4f2] rounded-lg text-[#111813] "
              href="/mensagens"
              title="Mensagens"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                className="w-8 h-8 rounded-full bg-cover bg-center border border-gray-200 flex items-center justify-center text-xs font-bold text-[#111813] bg-primary/60"
                href="/perfil"
              >
                {user.name.slice(0, 1).toUpperCase()}
              </Link>
              <button
                className="hidden lg:block text-xs font-semibold text-[#61896f] hover:text-primary"
                type="button"
                onClick={logout}
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                className="hidden sm:inline-flex items-center justify-center px-3 h-8 rounded-lg text-xs font-bold text-[#111813] bg-[#f0f4f2] hover:bg-[#e2e9e5] transition-colors"
                href="/entrar"
              >
                Entrar
              </Link>
              <Link
                className="hidden sm:inline-flex items-center justify-center px-3 h-8 rounded-lg text-xs font-bold text-[#111813] bg-primary hover:bg-primary/90 transition-colors"
                href="/cadastro"
              >
                Criar conta
              </Link>
              <Link
                className="sm:hidden w-8 h-8 rounded-full bg-cover bg-center border border-gray-200 flex items-center justify-center text-xs font-bold text-[#111813] bg-primary/60"
                href="/entrar"
              >
                Entrar
              </Link>
            </div>
          )}
        </div>
      </div>
      <MegaMenu />
    </header>
  );
}
