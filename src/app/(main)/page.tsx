import Link from "next/link";
import Script from "next/script";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata = {
  title: "Página Inicial do Marketplace",
  description:
    "Transforme qualquer coisa parada em dinheiro. Junte-se a mais de 50M de pessoas que vendem itens de todas as categorias.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Página Inicial do Marketplace",
    description:
      "Transforme qualquer coisa parada em dinheiro. Junte-se a mais de 50M de pessoas que vendem itens de todas as categorias.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Página Inicial do Marketplace",
    description:
      "Transforme qualquer coisa parada em dinheiro. Junte-se a mais de 50M de pessoas que vendem itens de todas as categorias.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EcoMarket",
  description: "O mercado favorito para comprar e vender de tudo.",
  url: "https://example.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://example.com/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-[1280px] mx-auto px-4 lg:px-10 py-6 space-y-8">
<section className="relative overflow-hidden rounded-xl bg-[#102216] text-white min-h-[350px] flex items-center">
<div className="absolute inset-0 z-0 opacity-60 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWkzxrfyPir_saIgv0a0TQovCZuYraYNJXrFSsIVZyZBDcKmeXCqPJo3UBOKtxteVcWvpr0E8DKqLAxn7F6mS1sATZFsVdNyx76LfJYRv7QLn5t6PFXkFqlfemrop6V7PGuCCTjXSOWIlSBEFINj1bEprt6y4sGuHcXzkNa44n73BUI_DjSabICfow338UFRV3_V9JadjXpS2O8AxrjPjuA-ZnogAFhW_nYhvJFcpJg_2zGGTEZ3FG18wg3ladeBusJ7HBWRDxdKo')" }}></div>
<div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
<div className="relative z-20 px-8 lg:px-16 py-12 max-w-2xl">
<h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4">Transforme tudo o que não usa em dinheiro.</h1>
<p className="text-lg lg:text-xl text-gray-200 mb-8 font-medium">Junte-se a mais de 50M de pessoas que vendem itens de todas as categorias. É fácil, rápido e gratuito.</p>
<Link className="bg-primary text-[#111813] px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg" href="/criar-anuncio">Vender agora</Link>
</div>
</section>
<section className="flex flex-col gap-4">
<div className="flex items-center justify-between">
<h2 className="text-xl font-bold">Feed de Início</h2>
<Link className="text-primary font-bold text-sm hover:underline" href="/buscar">Ver tudo</Link>
</div>
<div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
<Link className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#dbe6df] whitespace-nowrap text-sm" href="/criar-anuncio">
<span>Tamanho</span>
<span className="material-symbols-outlined text-lg">expand_more</span>
</Link>
<Link className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#dbe6df] whitespace-nowrap text-sm" href="/buscar">
<span>Marca</span>
<span className="material-symbols-outlined text-lg">expand_more</span>
</Link>
<Link className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#dbe6df] whitespace-nowrap text-sm" href="/criar-anuncio">
<span>Preço</span>
<span className="material-symbols-outlined text-lg">expand_more</span>
</Link>
<button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#dbe6df] whitespace-nowrap text-sm">
<span>Estado</span>
<span className="material-symbols-outlined text-lg">expand_more</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#dbe6df] whitespace-nowrap text-sm">
<span>Cor</span>
<span className="material-symbols-outlined text-lg">expand_more</span>
</button>
<div className="h-8 w-px bg-gray-200 mx-2"></div>
<Link className="text-sm font-bold text-gray-500 hover:text-black transition-colors" href="/buscar">Limpar tudo</Link>
</div>
</section>
<ProductGrid limit={10} />
<div className="flex justify-center py-10">
<Link className="border-2 border-primary text-[#111813] px-8 py-2 rounded-lg font-bold hover:bg-primary/10 transition-colors" href="/buscar">Carregar mais itens</Link>
</div>
</main>
<footer className="bg-white border-t border-gray-100 py-12">
<div className="max-w-[1280px] mx-auto px-4 lg:px-10">
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
<div className="col-span-2 lg:col-span-1">
<div className="flex items-center gap-2 mb-6">
<div className="text-primary size-6">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
</svg>
</div>
<h2 className="text-[#111813] text-lg font-bold">EcoMarket</h2>
</div>
<p className="text-sm text-gray-500">O mercado favorito para comprar e vender de tudo.</p>
</div>
<div>
<h3 className="font-bold mb-4">Comprar</h3>
<ul className="space-y-2 text-sm text-gray-500">
<li><Link className="hover:text-primary" href="/buscar?categoria=mulher">Mulher</Link></li>
<li><Link className="hover:text-primary" href="/buscar?categoria=homem">Homem</Link></li>
<li><Link className="hover:text-primary" href="/buscar?categoria=criancas">Crianças</Link></li>
<li><Link className="hover:text-primary" href="/buscar?categoria=casa">Casa</Link></li>
</ul>
</div>
<div>
<h3 className="font-bold mb-4">Vender</h3>
<ul className="space-y-2 text-sm text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Como funciona</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Guia do vendedor</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Contas profissionais</Link></li>
</ul>
</div>
<div>
<h3 className="font-bold mb-4">Suporte</h3>
<ul className="space-y-2 text-sm text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Centro de ajuda</Link></li>
<li><Link className="hover:text-primary" href="/central-de-seguranca-e-denuncias">Segurança</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Política de cookies</Link></li>
</ul>
</div>
<div>
<h3 className="font-bold mb-4">Comunidade</h3>
<ul className="space-y-2 text-sm text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Fórum</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Carreiras</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Imprensa</Link></li>
</ul>
</div>
</div>
<div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
<p>© 2024 EcoMarket Inc. Todos os direitos reservados.</p>
<div className="flex gap-6">
<Link className="hover:text-primary" href="/central-de-ajuda">Termos de Serviço</Link>
<Link className="hover:text-primary" href="/central-de-ajuda">Privacidade</Link>
<Link className="hover:text-primary" href="/central-de-seguranca-e-denuncias">Segurança e Confiança</Link>
</div>
</div>
</div>
</footer>
<Link className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-[#111813] rounded-full shadow-lg flex items-center justify-center z-40" href="/criar-anuncio">
<span className="material-symbols-outlined text-3xl">add</span>
</Link>
    </>
  );
}
