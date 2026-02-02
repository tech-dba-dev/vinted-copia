import Link from "next/link";
import { BuscarHero } from "@/components/BuscarHero";
import { BuscarResults } from "@/components/BuscarResults";
import { SearchFilters } from "@/components/SearchFilters";

type PageProps = {
  searchParams?: {
    categoria?: string;
  };
};

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resultados de Busca e Filtros | VintedClone",
  description: "Resultados de busca com filtros por preço, tamanho, marca e condição.",
  alternates: {
    canonical: "/buscar",
  },
  openGraph: {
    title: "Resultados de Busca e Filtros | VintedClone",
    description: "Resultados de busca com filtros por preço, tamanho, marca e condição.",
    url: "/buscar",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resultados de Busca e Filtros | VintedClone",
    description: "Resultados de busca com filtros por preço, tamanho, marca e condição.",
  },
};

export default function Page({ searchParams }: PageProps) {
  return (
    <>
      <main className="max-w-[1440px] mx-auto flex gap-8 px-4 md:px-10 py-6">
<aside className="w-64 shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
<SearchFilters />
</aside>
<div className="flex-1 flex flex-col gap-4">
<BuscarHero />
<div className="flex flex-wrap gap-2 py-2">
<div className="flex items-center gap-1 px-3 py-1.5 bg-primary/20 text-[#111813] rounded-full text-xs font-semibold">
                Tamanho: 38
                <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-500">close</span>
</div>
<div className="flex items-center gap-1 px-3 py-1.5 bg-primary/20 text-[#111813] rounded-full text-xs font-semibold">
                Marca: Nike
                <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-500">close</span>
</div>
<div className="flex items-center gap-1 px-3 py-1.5 bg-primary/20 text-[#111813] rounded-full text-xs font-semibold">
                Condição: Novo
                <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-500">close</span>
</div>
<button className="text-xs font-bold text-[#61896f] hover:text-primary px-2" type="button">Limpar tudo</button>
</div>
<BuscarResults />
<div className="flex justify-center items-center gap-2 py-10 mt-4">
<button className="flex items-center justify-center size-10 rounded-lg border border-[#f0f4f2] hover:bg-primary transition-colors disabled:opacity-50" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="size-10 rounded-lg bg-primary text-[#111813] font-bold">1</button>
<button className="size-10 rounded-lg border border-[#f0f4f2] hover:bg-primary/20 transition-colors">2</button>
<button className="size-10 rounded-lg border border-[#f0f4f2] hover:bg-primary/20 transition-colors">3</button>
<span className="px-2">...</span>
<button className="size-10 rounded-lg border border-[#f0f4f2] hover:bg-primary/20 transition-colors">42</button>
<button className="flex items-center justify-center size-10 rounded-lg border border-[#f0f4f2] hover:bg-primary transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</main>
<Link className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center justify-center size-14 bg-primary text-[#111813] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40" href="/mensagens">
<span className="material-symbols-outlined text-[28px]">chat_bubble</span>
<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">3</span>
</Link>
    </>
  );
}