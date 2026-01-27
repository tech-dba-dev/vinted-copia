import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";

export const metadata = {
  title: "Central de Segurança e Denúncias - Marketplace",
  description: "Denuncie itens suspeitos e ajude a manter a comunidade segura.",
  alternates: {
    canonical: "/central-de-seguranca-e-denuncias",
  },
  openGraph: {
    title: "Central de Segurança e Denúncias - Marketplace",
    description: "Denuncie itens suspeitos e ajude a manter a comunidade segura.",
    url: "/central-de-seguranca-e-denuncias",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Central de Segurança e Denúncias - Marketplace",
    description: "Denuncie itens suspeitos e ajude a manter a comunidade segura.",
  },
};

export default function Page() {
  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
{/*Header/NavBar*/}
<div className="px-4 md:px-40 flex flex-1 justify-center py-0 bg-white border-b border-[#f0f4f2] ">
<div className="layout-content-container flex flex-col max-w-[960px] flex-1">
</div>
</div>
{/*Content Area*/}
<div className="px-4 md:px-40 flex flex-1 justify-center py-8">
<div className="layout-content-container flex flex-col max-w-[800px] flex-1 bg-white rounded-xl shadow-sm border border-[#dbe6df] overflow-hidden">
{/*Breadcrumbs*/}
<div className="flex flex-wrap gap-2 p-6 pb-0">
<Link className="text-[#61896f] text-sm font-medium leading-normal hover:underline" href="/">Início</Link>
<span className="text-[#61896f] text-sm font-medium leading-normal">/</span>
<Link className="text-[#61896f] text-sm font-medium leading-normal hover:underline" href="/central-de-ajuda">Central de Ajuda</Link>
<span className="text-[#61896f] text-sm font-medium leading-normal">/</span>
<span className="text-[#111813] text-sm font-medium leading-normal">Denunciar Item</span>
</div>
{/*Page Heading*/}
<div className="flex flex-wrap justify-between items-start gap-3 p-6">
<div className="flex min-w-72 flex-col gap-2">
<p className="text-[#111813] text-3xl font-black leading-tight tracking-[-0.033em]">Denunciar este item</p>
<p className="text-[#61896f] text-base font-normal leading-normal">Ajude-nos a manter a comunidade segura. Sua denúncia é anônima e será analisada por nossa equipe.</p>
</div>
<Link className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f4f2] text-[#111813] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e2e9e5] transition-colors" href="/central-de-ajuda">
<span className="truncate">Diretrizes da Comunidade</span>
</Link>
</div>
{/*Report Form Content*/}
<div className="p-6 pt-0">
<div className="mb-6">
<h3 className="text-[#111813] text-lg font-bold mb-4">Selecione o motivo da denúncia</h3>
{/*Radio List*/}
<div className="flex flex-col gap-3" style={{ "--radio-dot-svg": "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(19,236,91)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')" }}>
<label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe6df] p-4 cursor-pointer hover:bg-background-light transition-all focus-within:ring-2 focus-within:ring-primary/20">
<input defaultChecked className="h-5 w-5 border-2 border-[#dbe6df] bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-primary transition-all" name="report-reason" type="radio"/>
<div className="flex grow flex-col">
<p className="text-[#111813] text-sm font-bold leading-normal">Spam ou Fraude</p>
<p className="text-[#61896f] text-sm font-normal leading-normal">O item parece um golpe, link externo suspeito ou propaganda enganosa.</p>
</div>
</label>
<label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe6df] p-4 cursor-pointer hover:bg-background-light transition-all focus-within:ring-2 focus-within:ring-primary/20">
<input className="h-5 w-5 border-2 border-[#dbe6df] bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-primary transition-all" name="report-reason" type="radio"/>
<div className="flex grow flex-col">
<p className="text-[#111813] text-sm font-bold leading-normal">Produto falsificado ou réplica</p>
<p className="text-[#61896f] text-sm font-normal leading-normal">O produto não é original ou infringe direitos de propriedade intelectual.</p>
</div>
</label>
<label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe6df] p-4 cursor-pointer hover:bg-background-light transition-all focus-within:ring-2 focus-within:ring-primary/20">
<input className="h-5 w-5 border-2 border-[#dbe6df] bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-primary transition-all" name="report-reason" type="radio"/>
<div className="flex grow flex-col">
<p className="text-[#111813] text-sm font-bold leading-normal">Comportamento abusivo ou impróprio</p>
<p className="text-[#61896f] text-sm font-normal leading-normal">Vendedor usando linguagem ofensiva, assediadora ou conteúdo explícito.</p>
</div>
</label>
<label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe6df] p-4 cursor-pointer hover:bg-background-light transition-all focus-within:ring-2 focus-within:ring-primary/20">
<input className="h-5 w-5 border-2 border-[#dbe6df] bg-transparent text-transparent checked:border-primary checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-primary transition-all" name="report-reason" type="radio"/>
<div className="flex grow flex-col">
<p className="text-[#111813] text-sm font-bold leading-normal">Informação incorreta ou enganosa</p>
<p className="text-[#61896f] text-sm font-normal leading-normal">O item está na categoria errada ou as fotos não correspondem ao estado real.</p>
</div>
</label>
</div>
</div>
{/*Additional Details*/}
<div className="mb-8">
<label className="flex flex-col w-full">
<p className="text-[#111813] text-base font-bold leading-normal pb-2">Detalhes adicionais (opcional)</p>
<textarea className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111813] focus:outline-0 focus:ring-1 focus:ring-primary border border-[#dbe6df] bg-white focus:border-primary min-h-36 placeholder:text-[#61896f] p-4 text-base font-normal leading-normal transition-all" placeholder="Forneça mais informações que nos ajudem a entender o problema..."></textarea>
</label>
<p className="text-[#61896f] text-xs mt-2 italic flex items-center gap-1">
<span className="material-symbols-outlined text-sm">info</span>
                                Sua mensagem será processada seguindo nossa política de privacidade.
                            </p>
</div>
{/*Footer Actions*/}
<div className="flex items-center justify-end gap-3 pt-6 border-t border-[#f0f4f2] ">
<button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white border border-[#dbe6df] text-[#111813] text-base font-bold transition-all hover:bg-gray-50 ">
<span className="truncate">Cancelar</span>
</button>
<button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-[#111813] text-base font-extrabold shadow-sm hover:opacity-90 transition-all active:scale-95">
<span className="truncate">Enviar denúncia</span>
</button>
</div>
</div>
</div>
</div>
{/*Toast / Success Message Simulation (Static UI)*/}
<div className="fixed bottom-8 right-8 max-w-sm hidden"> {/*Removed 'hidden' for demonstration of what success looks like*/}
<div className="bg-white border-l-4 border-primary rounded-lg shadow-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-5">
<span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-1" data-icon="check_circle">check_circle</span>
<div>
<p className="text-sm font-bold text-[#111813] ">Denúncia recebida</p>
<p className="text-xs text-[#61896f] ">Obrigado por ajudar a manter nossa comunidade segura. Analisaremos o caso em breve.</p>
</div>
<button className="text-[#61896f] hover:text-[#111813]">
<span className="material-symbols-outlined text-sm">close</span>
</button>
</div>
</div>
{/*Bottom Disclaimer*/}
<footer className="px-4 md:px-40 py-8 flex justify-center">
<div className="max-w-[960px] w-full text-center">
<p className="text-[#61896f] text-sm">© 2023 Marketplace Seguro. Todos os direitos reservados. Denúncias falsas estão sujeitas a penalidades na plataforma.</p>
</div>
</footer>
</div>
</div>
    </>
  );
}
