import Link from "next/link";
import { FavoritesGrid } from "@/components/FavoritesGrid";

export const metadata = {
  title: "Meus Favoritos - MarketFlow",
  description: "Veja e gerencie sua lista de itens favoritos no MarketFlow.",
  alternates: {
    canonical: "/favoritos",
  },
  openGraph: {
    title: "Meus Favoritos - MarketFlow",
    description: "Veja e gerencie sua lista de itens favoritos no MarketFlow.",
    url: "/favoritos",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Favoritos - MarketFlow",
    description: "Veja e gerencie sua lista de itens favoritos no MarketFlow.",
  },
};

export default function Page() {
  return (
    <>
      <div className="layout-container flex h-full grow flex-col">
<main className="flex-1 overflow-y-auto">
<div className="max-w-[1200px] mx-auto px-6 py-8">
<div className="flex flex-wrap items-end justify-between gap-4 mb-6">
<div className="flex flex-col gap-1">
<h1 className="text-[#111813] text-4xl font-black leading-tight tracking-[-0.033em]">Meus Favoritos</h1>
<p className="text-[#61896f] text-sm font-medium">Acompanhe todos os itens que você amou no marketplace.</p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#dbe6df] rounded-lg text-sm font-bold shadow-sm hover:bg-[#f0f4f2] transition-colors">
<span className="material-symbols-outlined text-[18px]">share</span>
<span>Compartilhar lista</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-[#102216] rounded-lg text-sm font-bold shadow-sm hover:brightness-105 transition-all">
<span className="material-symbols-outlined text-[18px]">add</span>
<span>Criar Coleção</span>
</button>
</div>
</div>
<div className="mb-4">
<div className="flex border-b border-[#dbe6df] gap-8">
<Link className="flex items-center gap-2 border-b-[3px] border-primary text-[#111813] pb-3 pt-4" href="/favoritos">
<span className="text-sm font-bold">Itens</span>
</Link>
<Link className="flex items-center gap-2 border-b-[3px] border-transparent text-[#61896f] pb-3 pt-4 hover:text-[#111813] transition-colors" href="/favoritos">
<span className="text-sm font-bold">Vendedores</span>
</Link>
<Link className="flex items-center border-b-[3px] border-transparent text-[#61896f] pb-3 pt-4 hover:text-[#111813] transition-colors" href="/favoritos">
<span className="text-sm font-bold">Coleções</span>
</Link>
</div>
</div>
<div className="flex items-center gap-3 py-4 overflow-x-auto no-scrollbar">
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-5 text-[#102216] text-sm font-semibold">
                        Todos os itens
                    </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f4f2] px-5 hover:bg-[#e2e8e5] transition-colors">
<p className="text-[#111813] text-sm font-medium">Roupas</p>
<span className="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f4f2] px-5 hover:bg-[#e2e8e5] transition-colors">
<p className="text-[#111813] text-sm font-medium">Acessórios</p>
<span className="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f4f2] px-5 hover:bg-[#e2e8e5] transition-colors">
<p className="text-[#111813] text-sm font-medium">Preço</p>
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
<div className="h-6 w-px bg-[#dbe6df] mx-2"></div>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-[#dbe6df] px-4 hover:bg-[#f0f4f2] transition-colors">
<span className="material-symbols-outlined text-[18px]">sort</span>
<p className="text-[#111813] text-sm font-medium">Ordenar: Recentes</p>
</button>
</div>
<FavoritesGrid />
</div>
</main>
</div>
    </>
  );
}
