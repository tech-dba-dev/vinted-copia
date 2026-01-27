import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";

export const metadata = {
  title: "Avaliações e Feedback do Usuário - Marketplace",
  description: "Confira a reputação e o feedback da comunidade sobre este membro desde 2022.",
  alternates: {
    canonical: "/avaliacoes",
  },
  openGraph: {
    title: "Avaliações e Feedback do Usuário - Marketplace",
    description: "Confira a reputação e o feedback da comunidade sobre este membro desde 2022.",
    url: "/avaliacoes",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Avaliações e Feedback do Usuário - Marketplace",
    description: "Confira a reputação e o feedback da comunidade sobre este membro desde 2022.",
  },
};

export default function Page() {
  return (
    <>
      {/*TopNavBar*/}
<main className="max-w-[960px] mx-auto py-8 px-4">
{/*Breadcrumbs*/}
<nav className="flex flex-wrap gap-2 mb-6">
<Link className="text-[#61896f] hover:text-primary text-sm font-medium transition-colors" href="/">Início</Link>
<span className="text-[#61896f] text-sm">/</span>
<Link className="text-[#61896f] hover:text-primary text-sm font-medium transition-colors" href="/perfil">Perfil</Link>
<span className="text-[#61896f] text-sm">/</span>
<span className="text-[#111813] text-sm font-semibold">Avaliações de Maria Silva</span>
</nav>
{/*PageHeading*/}
<div className="flex flex-col gap-2 mb-8">
<h1 className="text-[#111813] text-4xl font-black leading-tight tracking-tight">Avaliações de Maria Silva</h1>
<p className="text-[#61896f] text-lg font-normal">Confira a reputação e o feedback da comunidade sobre este membro desde 2022.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/*Sidebar / Summary Section*/}
<div className="lg:col-span-4 flex flex-col gap-6">
{/*RatingSummary*/}
<div className="bg-white p-6 rounded-xl border border-[#e0e7e2] shadow-sm">
<div className="flex flex-col gap-4">
<div className="flex items-baseline gap-2">
<p className="text-[#111813] text-5xl font-black leading-tight">4.8</p>
<p className="text-[#61896f] text-lg font-medium">/ 5.0</p>
</div>
<div className="flex gap-1 text-primary">
<span className="material-symbols-outlined fill-icon">star</span>
<span className="material-symbols-outlined fill-icon">star</span>
<span className="material-symbols-outlined fill-icon">star</span>
<span className="material-symbols-outlined fill-icon">star</span>
<span className="material-symbols-outlined">star_half</span>
</div>
<p className="text-[#111813] text-sm font-medium">152 avaliações totais</p>
<div className="mt-4 grid grid-cols-[20px_1fr_40px] items-center gap-y-3">
<p className="text-sm font-medium">5</p>
<div className="flex h-2.5 overflow-hidden rounded-full bg-[#dbe6df] ">
<div className="rounded-full bg-primary" style={{ width: "80%" }}></div>
</div>
<p className="text-[#61896f] text-xs font-bold text-right">80%</p>
<p className="text-sm font-medium">4</p>
<div className="flex h-2.5 overflow-hidden rounded-full bg-[#dbe6df] ">
<div className="rounded-full bg-primary" style={{ width: "15%" }}></div>
</div>
<p className="text-[#61896f] text-xs font-bold text-right">15%</p>
<p className="text-sm font-medium">3</p>
<div className="flex h-2.5 overflow-hidden rounded-full bg-[#dbe6df] ">
<div className="rounded-full bg-primary" style={{ width: "2%" }}></div>
</div>
<p className="text-[#61896f] text-xs font-bold text-right">2%</p>
<p className="text-sm font-medium">2</p>
<div className="flex h-2.5 overflow-hidden rounded-full bg-[#dbe6df] ">
<div className="rounded-full bg-primary" style={{ width: "1%" }}></div>
</div>
<p className="text-[#61896f] text-xs font-bold text-right">1%</p>
<p className="text-sm font-medium">1</p>
<div className="flex h-2.5 overflow-hidden rounded-full bg-[#dbe6df] ">
<div className="rounded-full bg-primary" style={{ width: "2%" }}></div>
</div>
<p className="text-[#61896f] text-xs font-bold text-right">2%</p>
</div>
</div>
</div>
<div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
<h3 className="font-bold mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">verified_user</span>
                        Vendedora Verificada
                    </h3>
<p className="text-sm text-[#4d6a56] ">Maria Silva tem 98% de entregas no prazo e responde em média em 2 horas.</p>
</div>
</div>
{/*Content Section / Review List*/}
<div className="lg:col-span-8 flex flex-col gap-4">
{/*Chips / Filters*/}
<div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
<Link className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-background-dark font-bold px-6 transition-all" href="/avaliacoes">
                        Todas
                    </Link>
<Link className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-[#e0e7e2] text-[#111813] font-medium px-6 hover:border-primary transition-all" href="/avaliacoes">
                        De compradores
                    </Link>
<button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-[#e0e7e2] text-[#111813] font-medium px-6 hover:border-primary transition-all">
                        De vendedores
                    </button>
</div>
{/*Review Feed*/}
<div className="flex flex-col gap-4">
{/*Review Card 1*/}
<div className="bg-white p-6 rounded-xl border border-[#e0e7e2] shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-3">
<div className="size-12 rounded-full bg-cover bg-center" data-alt="Avatar do usuário Ricardo Santos" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuCEFrZDZij6lAqyDShSp7Za5KfEcsWD0LblcV0cJVTgQ4iGxws06pEjMNZUhgKPIKSGOIFBKiJj0fZVrnYlpfhdA7cb-daT6k_O4dHkUR5iE8nLsTFLP46PMrC_l4s3DKBaP_-GNsJdItkRODJuCwCpvN9hpRRzprw1TbC9hevr_13-JfXgO15MmIyPAOZiaGKNZXFANcEMvX5_hW72AYmwE4ihDCRUSpnmZFQ1WlEkJj5IorJxyM4aS228gq0ZKnNShn3ttPBybzg\")" }}></div>
<div>
<h4 className="font-bold text-[#111813] ">Ricardo Santos</h4>
<p className="text-xs text-[#61896f] uppercase tracking-wider font-bold">Comprador</p>
</div>
</div>
<span className="text-xs text-[#61896f] font-medium italic">há 2 dias</span>
</div>
<div className="flex gap-0.5 text-primary mb-3">
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
</div>
<p className="text-[#111813] leading-relaxed mb-4">
                            "A jaqueta chegou em perfeito estado, exatamente como nas fotos. A Maria foi super atenciosa e o envio foi muito rápido. Com certeza comprarei novamente!"
                        </p>
<div className="flex items-center gap-2 py-2 px-3 bg-background-light rounded-lg text-xs font-medium text-[#61896f]">
<span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Item: Jaqueta Jeans Vintage Levis
                        </div>
</div>
{/*Review Card 2*/}
<div className="bg-white p-6 rounded-xl border border-[#e0e7e2] shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-3">
<div className="size-12 rounded-full bg-cover bg-center" data-alt="Avatar da usuária Ana Oliveira" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuD34t0YhAvLzdoefNwSMCpWRkqZ0CMlUbLFJWF5tM7h0Cw13BpBj_ljVBtBTQ0BSMad9fG6i-DMYn0DI3uM5oeLbAt2-kL8yiyu-sKjG1BouoSNFDaEYTcBGVJSPLCdlOyDoQNRrcFXnzGIrsW8lSjQXVE-3HIHc2bOx8j8TOd5dcHnDo1cvscKJeZz0cONjkwYGflJuAPPidWOcU7XlmKHNW9QjOLfu3rcn04WAYyfyEp2d61DQo3VZ9xSFeaknxQqOu1v8Z_K4Ws\")" }}></div>
<div>
<h4 className="font-bold text-[#111813] ">Ana Oliveira</h4>
<p className="text-xs text-[#61896f] uppercase tracking-wider font-bold">Vendedora</p>
</div>
</div>
<span className="text-xs text-[#61896f] font-medium italic">há 1 semana</span>
</div>
<div className="flex gap-0.5 text-primary mb-3">
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg">star</span>
</div>
<p className="text-[#111813] leading-relaxed mb-4">
                            "Maria é uma ótima compradora. Pagamento rápido e comunicação excelente. Recomendo muito para toda a comunidade!"
                        </p>
<div className="flex items-center gap-2 py-2 px-3 bg-background-light rounded-lg text-xs font-medium text-[#61896f]">
<span className="material-symbols-outlined text-sm">sell</span>
                            Item: Vestido Floral Midi
                        </div>
</div>
{/*Review Card 3*/}
<div className="bg-white p-6 rounded-xl border border-[#e0e7e2] shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-3">
<div className="size-12 rounded-full bg-cover bg-center" data-alt="Avatar do usuário Pedro Mendes" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAFL0dQclECabVavbaL_ht3xCi7PMv0Hx6otdV4MimFZMTlh89GD1rmCLE5prJsPC-O_dUxOzHzo5_sb0w0BFWfGSuj2sPeFFyMVkHq1KobHbXGJCYNLmibVUX8Usb5z3mrmRzrQjjB6P10-98dXNF0Nt5X4pxjkAMW4gBXPxqvFFtDXhYZ7UILkTsYOLyjJuzs79wbq-B5JvYK5KYbafLAe-vPH_r3SWSTLZE86u6ufwqeu_1xotj8z01EVcPHCQk4xGeXJnORZmU\")" }}></div>
<div>
<h4 className="font-bold text-[#111813] ">Pedro Mendes</h4>
<p className="text-xs text-[#61896f] uppercase tracking-wider font-bold">Comprador</p>
</div>
</div>
<span className="text-xs text-[#61896f] font-medium italic">há 2 semanas</span>
</div>
<div className="flex gap-0.5 text-primary mb-3">
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
<span className="material-symbols-outlined text-lg fill-icon">star</span>
</div>
<p className="text-[#111813] leading-relaxed mb-4">
                            "O item está novinho, conforme o anúncio. Muito bem embalado. Maria foi super gentil nas mensagens."
                        </p>
<div className="flex items-center gap-2 py-2 px-3 bg-background-light rounded-lg text-xs font-medium text-[#61896f]">
<span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Item: Tênis Runner Pro 42
                        </div>
</div>
{/*Pagination / More*/}
<button className="mt-4 flex items-center justify-center gap-2 py-4 text-primary font-bold hover:underline transition-all">
<span className="material-symbols-outlined">add_circle</span>
                        Carregar mais avaliações
                    </button>
</div>
</div>
</div>
</main>
<footer className="mt-12 py-10 border-t border-[#e0e7e2] bg-white ">
<div className="max-w-[1200px] mx-auto px-4 text-center">
<div className="flex justify-center gap-4 mb-4">
<div className="size-6 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-sm">verified</span>
</div>
<p className="text-[#61896f] text-sm">A confiança é a nossa prioridade. Todas as avaliações são de transações reais.</p>
</div>
<p className="text-[#61896f] text-xs">© 2024 EcoMarket Marketplace. Todos os direitos reservados.</p>
</div>
</footer>
    </>
  );
}
