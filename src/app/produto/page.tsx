import Link from "next/link";
import Script from "next/script";
import { InlineImage } from "@/components/InlineImage";
import { PurchaseButton } from "@/components/PurchaseButton";

export const metadata = {
  title: "Detalhes do Produto | Marketplace C2C",
  description: "Detalhes do produto, preço, condição, vendedor e opções de compra.",
  alternates: {
    canonical: "/produto",
  },
  openGraph: {
    title: "Detalhes do Produto | Marketplace C2C",
    description: "Detalhes do produto, preço, condição, vendedor e opções de compra.",
    url: "/produto",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Detalhes do Produto | Marketplace C2C",
    description: "Detalhes do produto, preço, condição, vendedor e opções de compra.",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Corta-vento Vintage Nike",
  description:
    "Corta-vento autêntico Vintage dos anos 90 em excelente estado. Apresenta o clássico corte oversized, blocos de cores vibrantes em verde-água, roxo e preto. Fecho frontal completo com o puxador original da marca.",
  image: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCvxo3_P-MPZhZIcmW4ppDzBDZYxq_YL_7dq8BGSlSJeqiQUUaslyy_Teed5WF97l6DYNYEvawhFaXCmPDr5LXubJi6Itd32OFOICGgKDzwT4VQxTHUZEP2JFgpojMNziy6HkURy4SKWAwpQTfzsb7ynHhbq3yd9jy7iU0kUCkQ6ovNa4wOhbLzoDUewYk4u-iHNW1QnHNHJ4mqog-1bcs2etUi5QncjhLXk0cAhLRTK5mZaWzT4nqMhCtIAOROTx5TcCaG3h_ays4",
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "45.00",
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <main className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6">
<nav className="flex items-center gap-2 mb-6 text-sm text-gray-500 ">
<Link className="hover:underline" href="/">Início</Link>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<Link className="hover:underline" href="/buscar?categoria=homem">Roupa de Homem</Link>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<Link className="hover:underline" href="/buscar">Casacos</Link>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-[#111813] font-medium">Corta-vento Vintage Nike</span>
</nav>
<div className="flex flex-col lg:flex-row gap-8">
<div className="flex-1 space-y-4">
<div className="grid grid-cols-2 gap-2">
<div className="col-span-2 aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden group relative">
<div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 hover:scale-105" data-alt="Vista principal do casaco corta-vento vintage" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvxo3_P-MPZhZIcmW4ppDzBDZYxq_YL_7dq8BGSlSJeqiQUUaslyy_Teed5WF97l6DYNYEvawhFaXCmPDr5LXubJi6Itd32OFOICGgKDzwT4VQxTHUZEP2JFgpojMNziy6HkURy4SKWAwpQTfzsb7ynHhbq3yd9jy7iU0kUCkQ6ovNa4wOhbLzoDUewYk4u-iHNW1QnHNHJ4mqog-1bcs2etUi5QncjhLXk0cAhLRTK5mZaWzT4nqMhCtIAOROTx5TcCaG3h_ays4')" }}></div>
<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors">
<span className="material-symbols-outlined">zoom_in</span>
</div>
</div>
<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
<div className="w-full h-full bg-center bg-cover" data-alt="Detalhe do logotipo bordado" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUOvW8zS-2XSZ-QpAw09qLlUpKly10msVvsLrO_ZwMKoA7cxSa-FyK00F7m20aCInurKVKQmOh6mfcw8033vlXhMAij2haDokQlEbiSgQh9sRQh27mgd4ABxfMEmbhBkmZpQVar1GXjwfEjZmDP8sEaqRC0BnCr5zxtt7stjQCTw-c3RprpqPdk9mgaa_fd_2qWQa1ZCIPAwjdRVERDfpx0N8MfM-r_CTLMB3qHloePtbYpeCZxm_JRr4SEi3iZdBLMkwnCeiY2a0')" }}></div>
</div>
<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
<div className="w-full h-full bg-center bg-cover" data-alt="Vista de trás do casaco vintage" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvfbZ4DBDmzhSrTVCsiBrUiS9GzYS8XZF6cRm12mFrkkk_8xutvdAlp6soGjWDnB6VJ52k9SG9htVV-UJ6YyrSYelqjWbW7u1Wh8aNoXD4FZBqKJkkAmOFz5XTqpTh4fSJv3D3BlJq18O6GXEq3yns59CwEfzNcS2LpnVgMXlbdiacso5SBegmWrBoKqkm8RD08Mh9TiH8D2BTAB0JOOokysEdvdTfRK05UTMINERJivWqRPT2Za8XPwLWVLdBhRd3j9PRXDJ2pb8')" }}></div>
</div>
<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
<div className="w-full h-full bg-center bg-cover" data-alt="Vista detalhada das etiquetas e fechos" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCz_KDs030ZRxJuH7lLxQFaGA5H7_O-Sm8qzaQpyek3ApUAObjG8oQhu3rLebyRiX6V-brjk402CpY4FzJjjtpkrijd6RKQOzsysGPeGF3Nw6aiPwHrLQGqfRHqOpv7odiwtaHxTREzb8uTA4l_9Me-C5Yntd9xDRBTLjaLVPI7RASt_RASEAfVbjZNj05DEbXp1T2tOaPR-CKDnht52qUWW-Rwajh5rlAmYd4PAz5KiZLpOkSX2fUI1BzgiKA0VC-7A4pTOUFGyJI')" }}></div>
</div>
<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
<div className="w-full h-full bg-center bg-cover opacity-50 grayscale" data-alt="Textura do material e detalhes do forro interno" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEMK2kmjmgqnJvaw1e9awvC60I2xHE3hTjoyoZ6MIjafEWigRmXHAyZHcHZT6R8ofM8-HMD6aYkDT-1c8dUAJDDsclHCBQhgd5DHbVIHIjjhZVTG32uvUYbnUcsFvDuT_WEVTClUqgUpoYUDTk9ZnjuLMi8Fgvzo_CDfl0qnbq8W0u9AYBsqfMUaQSwJjdp0n3VN3H6qJ8MeSWcAS631mZKjjvjEZaEbHCsykSfgMxNUrX3CECLMqy0o2kWDvLZWublaEMxFqDi_4')" }}></div>
<span className="absolute text-sm font-bold bg-white/80 px-3 py-1 rounded-full">+4 imagens</span>
</div>
</div>
<section className="mt-12 py-8 border-t border-gray-200 ">
<h3 className="text-xl font-bold mb-4">Descrição</h3>
<div className="prose max-w-none text-gray-600 leading-relaxed">
<p>Corta-vento autêntico Vintage dos anos 90 em excelente estado. Apresenta o clássico corte oversized, blocos de cores vibrantes em verde-água, roxo e preto. Fecho frontal completo com o puxador original da marca.</p>
<ul className="mt-4 list-disc pl-5">
<li>Estado: 9/10 (Desgaste mínimo no elástico dos punhos)</li>
<li>Material: Exterior 100% Nylon, forro em malha</li>
<li>Corte: Relaxado/Oversized</li>
</ul>
</div>
<div className="mt-8 flex flex-wrap gap-2">
<Link className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors" href="/buscar">#vintage</Link>
<Link className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors" href="/buscar">#estilourbano</Link>
<Link className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors" href="/buscar">#anos90</Link>
<Link className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors" href="/buscar">#streetwear</Link>
<Link className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors" href="/buscar">#cortavento</Link>
</div>
</section>
</div>
<aside className="w-full lg:w-[380px]">
<div className="sticky top-24 space-y-4">
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="text-3xl font-bold tracking-tight text-[#111813] ">45,00 €</h2>
<p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
                                    Taxa de proteção do comprador: 2,35 €
                                </p>
</div>
<Link className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors" href="/buscar">
<span className="material-symbols-outlined">favorite</span>
<span>124</span>
</Link>
</div>
<div className="space-y-3 py-4 border-y border-gray-100 ">
<div className="flex justify-between text-sm">
<span className="text-gray-500 ">Marca</span>
<Link className="font-semibold text-primary underline decoration-primary/30 underline-offset-4" href="/buscar">Nike</Link>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-500 ">Tamanho</span>
<span className="font-semibold">L / 42 / 14</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-500 ">Estado</span>
<span className="font-semibold">Muito bom</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-500 ">Cor</span>
<div className="flex items-center gap-1">
<span className="w-3 h-3 rounded-full bg-teal-500"></span>
<span className="w-3 h-3 rounded-full bg-purple-500"></span>
<span className="font-semibold ml-1">Multicor</span>
</div>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-500 ">Localização</span>
<span className="font-semibold">Berlim, Alemanha</span>
</div>
</div>
<div className="mt-6 space-y-3">
<PurchaseButton className="w-full h-12 bg-primary text-black font-bold rounded-lg hover:brightness-105 transition-all shadow-md active:scale-95 flex items-center justify-center" label="Comprar agora" />
<Link className="w-full h-12 border-2 border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/10 transition-all" href="/mensagens">
                                Fazer oferta
                            </Link>
<Link className="w-full h-12 flex items-center justify-center gap-2 text-[#111813] font-bold rounded-lg hover:bg-gray-100 transition-all" href="/mensagens">
<span className="material-symbols-outlined">chat</span>
                                Enviar mensagem
                            </Link>
</div>
</div>
<div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
<h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Sobre o vendedor</h4>
<div className="flex items-center gap-4 mb-4">
<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEtwL_cMBdMo9PcnFQTNxfcCC4DPk676KT3ciByMivmVpJrbQSN7ty4zG522TOBsok7X5DGUIYuMusOy6SEptMKkCkN_MwPcpRssclUL8yxaWtTlwfcNTceelBFMOznEVnipmWE64JYy5iu6_NT5MbcR9YLIo6hwxuJ23tST06uvMeh2gslv89MalSf2j-L6Ow9kK5f6Lmhr2Yr9xw99OJRU50wUteEVx0XrVnNd6b2V5tfBZ_4yBeZWdBeOUJAocJ-yQ6KTeTKPc" alt="" className="w-full h-full object-cover" data-alt="Seller profile photo" />
</div>
<div>
<h4 className="font-bold">vintage_kicks_de</h4>
<div className="flex items-center gap-1 text-sm text-yellow-500">
<span className="material-symbols-outlined text-[16px] fill-current">star</span>
<span className="material-symbols-outlined text-[16px] fill-current">star</span>
<span className="material-symbols-outlined text-[16px] fill-current">star</span>
<span className="material-symbols-outlined text-[16px] fill-current">star</span>
<span className="material-symbols-outlined text-[16px] fill-current">star</span>
<span className="text-gray-500 ml-1 font-medium">(428 avaliações)</span>
</div>
</div>
</div>
<div className="text-sm text-gray-500 space-y-1 pl-16">
<p className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">location_on</span>
                                Berlim, DE
                            </p>
<p className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                                Ativo há: 2 horas
                            </p>
</div>
<Link className="w-full mt-4 py-2 rounded-lg bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors" href="/perfil">Ver perfil</Link>
</div>
<div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3 items-start">
<span className="material-symbols-outlined text-primary">security</span>
<div>
<p className="text-xs font-bold uppercase tracking-wider text-primary">Compra Segura</p>
<p className="text-xs text-gray-600 mt-1">Recebe o teu artigo ou o teu dinheiro de volta se não estiver conforme a descrição. Suporte 24/7.</p>
</div>
</div>
</div>
</aside>
</div>
<section className="mt-20">
<div className="flex justify-between items-end mb-8">
<div>
<h3 className="text-2xl font-bold">Também poderás gostar de</h3>
<p className="text-gray-500 ">Recomendado com base no teu interesse em artigos vintage</p>
</div>
<Link className="text-primary font-bold hover:underline flex items-center gap-1" href="/buscar">
                    Ver tudo
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
<div className="group cursor-pointer">
<Link href="/produto" className="contents">
<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSBnEXOcmXSTPee3znzC5S7hJnkVklErRs-7LUk7S9WqBEB5VGxbvdSEJqVQM_1GgtZGqFYeKrbpjLwjBcmKM5hPuktNMy53iSDLVaxwR0QJnciCu3x9rT-p2tv54qcIOnvDXIjiIl31pAN1Fp0c0L8LWKB5ZtQINxugThq0bljRYU6xqzcZ0199iW9snpoRQIf10JWJX9O_a8b8_OuUdWp6nNDgfXDLjE4GfYltsN_0NAGHKtDAtW_9nkCVOvXf1XC8M91Z6dHog" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Vintage blue nike hoodie" />
<span className="absolute top-3 right-3"><span className="material-symbols-outlined text-sm">favorite</span></span>
</div>
<p className="font-bold">22,00 €</p>
<p className="text-sm text-gray-500 truncate">Hoodie Vintage Azul</p>
<p className="text-xs text-gray-400">M / Nike</p>
</Link>
</div>
<div className="group cursor-pointer">
<Link href="/produto" className="contents">
<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxhB1PAjLxzr1MSitAhiywNoZ6wbPecNQ9zPC1vR8FmMJysB7aEUTFAuxhkFVkuAPXoy-oXlEXR-HNQkvZ4XBSAi2DagYJQX-r4HhoLrIQcV4vYx2zUZcE7hCe4Lo1zSeorK-QTsb_CJWac3Vkm30J4MfhH2JErkFfZJZ_YPESqjaea0CF3UTzSqdRN3_ea1it8AFHjZX0IjlA4-HTXUg5G-l2J4QCpxLBGC0bSlKkfG38QJM6quENSmPIsefLM2-dufU8cD_k4HA" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Retro nike sweatpants black" />
<span className="absolute top-3 right-3"><span className="material-symbols-outlined text-sm">favorite</span></span>
</div>
<p className="font-bold">35,00 €</p>
<p className="text-sm text-gray-500 truncate">Calças de Treino Retro</p>
<p className="text-xs text-gray-400">L / Nike</p>
</Link>
</div>
<div className="group cursor-pointer">
<Link href="/produto" className="contents">
<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx-TD9pp4USEKauDVn2UGOU3kWyZ9IsOIOlwPXJQidAQFFJqmSL1hUHtmXrlhnY1y_dK5-aC1BlJ7L18s0BGW5FQcfipGfyZFCy32Y-X9ipGXI-cSOX0OTGHNirblusprxmBIdf7AkNxfyUy7zyMaPak0utyZzgKAdw7CmfefkVJtepBvkJkgxc7Os8L3_Ygu4iGGyKdAwDm2oP25e2vPhAH1JP0G0pb1k276Rdaota9XymWz0X5aRPaHWKs4Hn8ok4dSj_P78xkc" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Nike air max sneakers" />
<span className="absolute top-3 right-3"><span className="material-symbols-outlined text-sm">favorite</span></span>
</div>
<p className="font-bold">60,00 €</p>
<p className="text-sm text-gray-500 truncate">Air Max 97 Retro</p>
<p className="text-xs text-gray-400">42 / Nike</p>
</Link>
</div>
<div className="group cursor-pointer">
<Link href="/produto" className="contents">
<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRU38yifTbU1Aan-_oGkV0crQyE4fDx53CwMa3xst1z836Te1tOmeIEMH79HQ7OKLxNeORVHgnbwtId_fiDgszjrx7MMX8q3AVJ8Gs6bWYEUg-tid2SX2QVC72CkmhULTcxRAbLLMptFXi4DcbZXPhzPg7NFesFNjzrRtmzLNtSIDeQfAmjl-GVzfTc1UZRqh26pqtxdXzEIOKzzXqjh0huOMOMnciovWsxqz2G6RaKDuXU0GsERcTcq07o81iJukXD-5LJpSmsRk" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Rare nike corduroy cap" />
<span className="absolute top-3 right-3"><span className="material-symbols-outlined text-sm">favorite</span></span>
</div>
<p className="font-bold">18,00 €</p>
<p className="text-sm text-gray-500 truncate">Boné de Veludo Raro</p>
<p className="text-xs text-gray-400">O/S / Nike</p>
</Link>
</div>
<div className="group cursor-pointer hidden lg:block">
<Link href="/produto" className="contents">
<div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK2K-dA02TImkxiwXnfcpRviVcwVnItVqD99lQhsCphUdqv0VkUTiBqIegYiHDcXboOUdhHcAPoiZFep5ksLvkpi2VE62E5x6y1RDl7Mu9xcGKwzxaWtdFRjhefDmTXOrrmLgEehFiwM4JOuhDbGuygJhuf1NOQxFRiZVClqiQvk-yC0ep71rnel94oXb-4gzSowo7FlTwAjkDwYQMejxqIpj5mm0IMyNJpivRuxw0Vov8ucv4NFWajAYMGCjL4TGW21v3WvqawOQ" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="White nike vintage sweatshirt" />
<span className="absolute top-3 right-3"><span className="material-symbols-outlined text-sm">favorite</span></span>
</div>
<p className="font-bold">28,00 €</p>
<p className="text-sm text-gray-500 truncate">Sweatshirt Branca Vintage</p>
<p className="text-xs text-gray-400">XL / Nike</p>
</Link>
</div>
</div>
</section>
</main>
<footer className="mt-20 border-t border-gray-200 bg-white py-12">
<div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
<div className="col-span-2 md:col-span-1">
<div className="flex items-center gap-2 text-primary mb-4">
<div className="size-5">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
</svg>
</div>
<h2 className="text-lg font-bold">VINTED</h2>
</div>
<p className="text-sm text-gray-500">A maior comunidade mundial de compra e venda entre pessoas.</p>
</div>
<div>
<h5 className="font-bold mb-4">Vinted</h5>
<ul className="text-sm space-y-2 text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Sobre nós</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Carreiras</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Sustentabilidade</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Imprensa</Link></li>
</ul>
</div>
<div>
<h5 className="font-bold mb-4">Descobrir</h5>
<ul className="text-sm space-y-2 text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Como funciona</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Aplicações móveis</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Centro de Ajuda</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Infoboard</Link></li>
</ul>
</div>
<div>
<h5 className="font-bold mb-4">Privacidade</h5>
<ul className="text-sm space-y-2 text-gray-500">
<li><Link className="hover:text-primary" href="/central-de-ajuda">Política de Privacidade</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Política de Cookies</Link></li>
<li><Link className="hover:text-primary" href="/central-de-ajuda">Termos e Condições</Link></li>
</ul>
</div>
</div>
</footer>
    </>
  );
}
