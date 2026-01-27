import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";

export const metadata = {
  title: "Central de Ajuda e FAQ - Marketplace C2C",
  description: "Encontre respostas rápidas no FAQ e suporte do marketplace.",
  alternates: {
    canonical: "/central-de-ajuda",
  },
  openGraph: {
    title: "Central de Ajuda e FAQ - Marketplace C2C",
    description: "Encontre respostas rápidas no FAQ e suporte do marketplace.",
    url: "/central-de-ajuda",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Central de Ajuda e FAQ - Marketplace C2C",
    description: "Encontre respostas rápidas no FAQ e suporte do marketplace.",
  },
};

export default function Page() {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
{/*Top Navigation Bar*/}
<div className="w-full flex justify-center bg-white border-b border-solid border-[#f0f4f2] ">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
</div>
</div>
{/*Hero Search Section*/}
<div className="w-full flex justify-center py-12 bg-white ">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
<h1 className="text-[#111813] tracking-light text-[36px] md:text-[42px] font-bold leading-tight text-center pb-6">Como podemos ajudar?</h1>
<div className="w-full max-w-2xl mx-auto">
<label className="flex flex-col min-w-40 h-14 w-full">
<div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm border border-gray-100 ">
<div className="text-[#61896f] flex border-none bg-[#f0f4f2] items-center justify-center pl-5 rounded-l-xl border-r-0">
<span className="material-symbols-outlined">search</span>
</div>
<input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-[#f0f4f2] h-full placeholder:text-[#61896f] px-4 pl-2 text-lg font-normal leading-normal" placeholder="Pesquise por uma dúvida ou palavra-chave" defaultValue=""/>
</div>
</label>
<p className="text-center text-sm text-[#61896f] mt-4">Sugestões: Pagamentos, Devoluções, Cadastro de Venda</p>
</div>
</div>
</div>
{/*Category Grid*/}
<div className="w-full flex justify-center py-10">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
<h2 className="text-[#111813] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">Explore por categorias</h2>
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
{/*Sales*/}
<div className="flex flex-1 gap-3 rounded-xl border border-[#dbe6df] bg-white p-5 flex-col hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
<div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">sell</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="text-[#111813] text-base font-bold leading-tight">Vendas</h3>
<p className="text-[#61896f] text-xs font-normal leading-normal">Dicas para vender mais rápido</p>
</div>
</div>
{/*Shopping*/}
<div className="flex flex-1 gap-3 rounded-xl border border-[#dbe6df] bg-white p-5 flex-col hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
<div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">shopping_bag</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="text-[#111813] text-base font-bold leading-tight">Compras</h3>
<p className="text-[#61896f] text-xs font-normal leading-normal">Como comprar com segurança</p>
</div>
</div>
{/*Payments*/}
<div className="flex flex-1 gap-3 rounded-xl border border-[#dbe6df] bg-white p-5 flex-col hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
<div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">payments</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="text-[#111813] text-base font-bold leading-tight">Pagamentos</h3>
<p className="text-[#61896f] text-xs font-normal leading-normal">Métodos, prazos e taxas</p>
</div>
</div>
{/*Shipping*/}
<div className="flex flex-1 gap-3 rounded-xl border border-[#dbe6df] bg-white p-5 flex-col hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
<div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">local_shipping</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="text-[#111813] text-base font-bold leading-tight">Envios</h3>
<p className="text-[#61896f] text-xs font-normal leading-normal">Etiquetas e rastreio</p>
</div>
</div>
{/*Account*/}
<div className="flex flex-1 gap-3 rounded-xl border border-[#dbe6df] bg-white p-5 flex-col hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
<div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">manage_accounts</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="text-[#111813] text-base font-bold leading-tight">Minha Conta</h3>
<p className="text-[#61896f] text-xs font-normal leading-normal">Dados e segurança</p>
</div>
</div>
</div>
</div>
</div>
{/*FAQ Section*/}
<div className="w-full flex justify-center py-10 bg-white ">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
<div className="flex items-center justify-between pb-6">
<h2 className="text-[#111813] text-[22px] font-bold leading-tight tracking-[-0.015em]">Perguntas Frequentes</h2>
<Link className="text-primary font-bold text-sm hover:underline" href="/buscar">Ver todas</Link>
</div>
<div className="flex flex-col gap-3">
{/*FAQ Item 1*/}
<details className="group bg-white rounded-xl border border-[#dbe6df] overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none focus:outline-none">
<span className="text-base font-bold text-[#111813] ">Como funciona o frete na plataforma?</span>
<span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-5 pb-5 text-[#61896f] text-sm leading-relaxed">
<p>O frete é calculado automaticamente com base no peso do produto e CEP de origem/destino. Oferecemos etiquetas pré-pagas que o vendedor deve imprimir e colar no pacote. Após a postagem, o comprador recebe o código de rastreamento automaticamente.</p>
</div>
</details>
{/*FAQ Item 2*/}
<details className="group bg-white rounded-xl border border-[#dbe6df] overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none focus:outline-none">
<span className="text-base font-bold text-[#111813] ">Quando receberei o pagamento da minha venda?</span>
<span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-5 pb-5 text-[#61896f] text-sm leading-relaxed">
<p>O pagamento fica retido de forma segura pela plataforma. O valor é liberado para o seu saldo 2 dias após o comprador confirmar o recebimento do produto ou em até 5 dias após a entrega confirmada pela transportadora, caso não haja contestação.</p>
</div>
</details>
{/*FAQ Item 3*/}
<details className="group bg-white rounded-xl border border-[#dbe6df] overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none focus:outline-none">
<span className="text-base font-bold text-[#111813] ">O que é a Proteção ao Comprador?</span>
<span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-5 pb-5 text-[#61896f] text-sm leading-relaxed">
<p>A Proteção ao Comprador garante que seu dinheiro seja devolvido se o item não chegar, se chegar danificado ou se for significativamente diferente da descrição. Uma pequena taxa é aplicada a cada compra para cobrir esse serviço e o suporte 24/7.</p>
</div>
</details>
{/*FAQ Item 4*/}
<details className="group bg-white rounded-xl border border-[#dbe6df] overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none focus:outline-none">
<span className="text-base font-bold text-[#111813] ">Como cancelar uma compra ou venda?</span>
<span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-5 pb-5 text-[#61896f] text-sm leading-relaxed">
<p>O cancelamento pode ser feito diretamente nos detalhes do pedido enquanto o produto ainda não foi enviado. Se o produto já estiver em trânsito, será necessário aguardar a entrega e iniciar um processo de devolução.</p>
</div>
</details>
</div>
</div>
</div>
{/*Support CTA Footer Section*/}
<div className="w-full flex justify-center py-16">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
<div className="bg-primary/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20">
<div className="text-center md:text-left">
<h2 className="text-[#111813] text-2xl md:text-3xl font-bold leading-tight mb-2">Ainda precisa de ajuda?</h2>
<p className="text-[#61896f] text-base md:text-lg">Nossa equipe de suporte está pronta para te atender agora.</p>
</div>
<button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-[#111813] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30">
<span className="material-symbols-outlined mr-2">support_agent</span>
<span className="truncate">Falar com o Suporte</span>
</button>
</div>
</div>
</div>
{/*Footer*/}
<footer className="w-full flex justify-center py-10 border-t border-[#f0f4f2] bg-white ">
<div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 px-4">
<div className="flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-2 text-[#61896f]">
<span className="material-symbols-outlined text-xl">copyright</span>
<span className="text-sm">2024 Marketplace C2C. Todos os direitos reservados.</span>
</div>
<div className="flex gap-6">
<Link className="text-sm text-[#61896f] hover:text-primary" href="/central-de-ajuda">Termos de Uso</Link>
<Link className="text-sm text-[#61896f] hover:text-primary" href="/central-de-ajuda">Privacidade</Link>
<Link className="text-sm text-[#61896f] hover:text-primary" href="/central-de-ajuda">Cookies</Link>
</div>
</div>
</div>
</footer>
</div>
</div>
    </>
  );
}
