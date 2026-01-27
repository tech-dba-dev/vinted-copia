import Link from "next/link";
import { BuscarHero } from "@/components/BuscarHero";
import { BuscarResults } from "@/components/BuscarResults";

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
<div className="flex flex-col gap-6">
<div className="flex items-center justify-between">
<h3 className="text-lg font-bold">Filtros</h3>
<button className="text-xs font-semibold text-primary hover:underline" type="button">Limpar tudo</button>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Categoria</p>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
<input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Sapatos de Mulher</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Sapatilhas</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Botas</span>
</label>
</div>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Preço</p>
<div className="flex items-center gap-2">
<input className="w-full p-2 bg-white border border-[#f0f4f2] rounded-lg text-sm" placeholder="Mín" type="number"/>
<span className="text-gray-400">-</span>
<input className="w-full p-2 bg-white border border-[#f0f4f2] rounded-lg text-sm" placeholder="Máx" type="number"/>
</div>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Tamanho</p>
<div className="grid grid-cols-3 gap-2">
<button className="p-2 border border-primary bg-primary/10 text-xs font-bold rounded-lg">38</button>
<button className="p-2 border border-[#f0f4f2] text-xs rounded-lg hover:border-primary">39</button>
<button className="p-2 border border-[#f0f4f2] text-xs rounded-lg hover:border-primary">40</button>
<button className="p-2 border border-[#f0f4f2] text-xs rounded-lg hover:border-primary">41</button>
<button className="p-2 border border-[#f0f4f2] text-xs rounded-lg hover:border-primary">42</button>
</div>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Marca</p>
<div className="relative">
<span className="material-symbols-outlined absolute left-2 top-2 text-xs text-gray-400">search</span>
<input className="w-full pl-8 p-2 bg-white border border-[#f0f4f2] rounded-lg text-xs mb-2" placeholder="Pesquisar marcas" type="text"/>
</div>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Nike</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Adidas</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Zara</span>
</label>
</div>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Condição</p>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Novo com etiquetas</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Muito bom</span>
</label>
<label className="flex items-center gap-2 text-sm cursor-pointer">
<input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
<span>Bom</span>
</label>
</div>
</div>
<div className="flex flex-col gap-3">
<p className="text-sm font-bold uppercase tracking-wider text-[#61896f]">Cor</p>
<div className="flex flex-wrap gap-2">
<div className="size-6 rounded-full bg-white border border-gray-300 cursor-pointer hover:scale-110 transition-transform ring-2 ring-primary"></div>
<div className="size-6 rounded-full bg-black cursor-pointer hover:scale-110 transition-transform"></div>
<div className="size-6 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition-transform"></div>
<div className="size-6 rounded-full bg-blue-500 cursor-pointer hover:scale-110 transition-transform"></div>
<div className="size-6 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition-transform"></div>
<div className="size-6 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform"></div>
</div>
</div>
<button className="w-full mt-4 py-3 bg-[#111813] text-white font-bold rounded-lg hover:opacity-90 transition-opacity" type="button">
                Aplicar filtros
            </button>
</div>
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