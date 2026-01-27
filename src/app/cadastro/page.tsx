import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";
import { RegisterForm } from "@/components/AuthForms";

export const metadata = {
  title: "Página de Cadastro - Marketplace de Moda Circular",
  description: "Crie sua conta no marketplace e comece a vender qualquer item lícito.",
  alternates: {
    canonical: "/cadastro",
  },
  openGraph: {
    title: "Página de Cadastro - Marketplace de Moda Circular",
    description: "Crie sua conta no marketplace e comece a vender qualquer item lícito.",
    url: "/cadastro",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Página de Cadastro - Marketplace de Moda Circular",
    description: "Crie sua conta no marketplace e comece a vender qualquer item lícito.",
  },
};

export default function Page() {
  return (
    <>
      {/*Top Navigation Bar*/}
<main className="flex flex-1 flex-col md:flex-row h-full">
{/*Left Visual Side (Image/Banner) - Hidden on small mobile if desired, but here shown as responsive*/}
<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/10 items-center justify-center p-12">
<div className="absolute inset-0 z-0">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAExnbiVtpEAqNkdmXRi8UCMYP_cCPS57UIDyNgNgQ-F9-el2FPpaPAear11JIox8gdgwAjnmUI_jDiL1Gmss_pIRXkF1icQ_k_Cj87V6c8s9dvIlTIKTbFe97Xf3ARv7R1tH_B5n-Hryka_2FTlgAwBMC_toVZ1o9BAUSWeeoba5BrYy2VbNCFEud9Dr5UJsZvCpAVAnLvwxwLZ9XwAbqjbI_P1xNcuZecRRD9W1N2gqiaM5nwX76SbsbeI7QFB_onERphFX3yOI4" alt="Marketplace de itens" className="w-full h-full object-cover opacity-80 mix-blend-multiply" data-alt="Itens diversos para vender e comprar" />
<div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
</div>
<div className="relative z-10 max-w-md text-white">
<h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Dê uma nova vida aos itens que estão parados.</h2>
<p className="text-xl font-medium drop-shadow-md">Transforme itens parados em um ciclo sustentável e encontre oportunidades únicas.</p>
<div className="mt-8 flex gap-4">
<div className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex items-center gap-3 border border-white/30">
<span className="material-symbols-outlined text-primary">eco</span>
<span className="text-sm font-semibold text-white">100% Circular</span>
</div>
<div className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex items-center gap-3 border border-white/30">
<span className="material-symbols-outlined text-primary">group</span>
<span className="text-sm font-semibold text-white">+50k Membros</span>
</div>
</div>
</div>
</div>
{/*Right Side (Registration Form)*/}
<div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 bg-white ">
<div className="w-full max-w-[480px]">
{/*Headline & Subtext*/}
<div className="mb-8 text-center lg:text-left">
<h1 className="text-[#111813] tracking-light text-[32px] font-bold leading-tight pb-2">Criar conta</h1>
<p className="text-[#61896f] text-base font-normal leading-normal">Junte-se à maior comunidade de compra e venda de itens.</p>
</div>
{/*Registration Form*/}
<RegisterForm>
{/*Name Field*/}
<div className="flex flex-col gap-2">
<label className="flex flex-col w-full">
<p className="text-[#111813] text-sm font-medium leading-normal pb-2">Nome completo</p>
<input className="form-input flex w-full rounded-lg text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] p-[15px] text-base font-normal transition-all" placeholder="Como você quer ser chamado?" required type="text"/>
</label>
</div>
{/*Email Field*/}
<div className="flex flex-col gap-2">
<label className="flex flex-col w-full">
<p className="text-[#111813] text-sm font-medium leading-normal pb-2">E-mail</p>
<input className="form-input flex w-full rounded-lg text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] p-[15px] text-base font-normal transition-all" name="email" placeholder="seu@email.com" required />
</label>
</div>
{/*Password Field*/}
<div className="flex flex-col gap-2">
<label className="flex flex-col w-full relative">
<p className="text-[#111813] text-sm font-medium leading-normal pb-2">Senha</p>
<div className="relative">
<input className="form-input flex w-full rounded-lg text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] p-[15px] text-base font-normal transition-all pr-12" placeholder="Mínimo 8 caracteres" required type="password"/>
<button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center" type="button">
<span className="material-symbols-outlined text-xl">visibility</span>
</button>
</div>
</label>
</div>
{/*Terms Checkbox*/}
<div className="flex items-start gap-3 py-2">
<div className="flex items-center h-5">
<input className="w-5 h-5 rounded border-[#dbe6df] text-primary focus:ring-primary cursor-pointer" id="terms" required type="checkbox"/>
</div>
<label className="text-sm text-[#111813] leading-tight" htmlFor="terms">
                            Li e aceito os <Link className="text-primary font-semibold hover:underline" href="/central-de-ajuda">Termos e Condições</Link> e a <Link className="text-primary font-semibold hover:underline" href="/central-de-ajuda">Política de Privacidade</Link>.
                        </label>
</div>
{/*Submit Button*/}
<button className="flex w-full items-center justify-center rounded-lg h-14 px-6 bg-primary text-[#111813] text-base font-bold leading-normal tracking-[0.015em] hover:brightness-105 shadow-lg shadow-primary/20 transition-all mt-4" type="submit">
<span className="truncate">Cadastrar</span>
</button>
</RegisterForm>
{/*Redirect to Login*/}
<div className="mt-8 text-center">
<p className="text-sm text-[#61896f] ">
                        Já tem uma conta? 
                        <Link className="text-[#111813] font-bold hover:text-primary transition-colors ml-1" href="/entrar">Entre</Link>
</p>
</div>
{/*Alternative Social Logins (Optional Enhancement)*/}
<div className="mt-10 flex flex-col items-center gap-6">
<div className="w-full flex items-center gap-4 text-[#dbe6df]">
<div className="h-px flex-1 bg-current"></div>
<span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Ou continue com</span>
<div className="h-px flex-1 bg-current"></div>
</div>
<div className="flex gap-4 w-full">
<button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border border-[#dbe6df] bg-white text-sm font-semibold hover:bg-gray-50 transition-all">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOxls5j9Y3Ou2DNoY8XXYM1NB0fUW0hixom5tEfidLltevL4FkMbvvi1AkDVtjeGUNjbKBmtN17PHokStJjmRyVktkEion4-JXfjCe1Os-aZv0r565jBYQf6r0A1Bc9Gu-7lRhx6Do-E3HxmRweKWfK0NOEA8f7FUKW-utXXdMIVOxfHM0WLOZDidE50haBcLKDNDg-8SgThdEDbh9yF1LEoKILSD6_eaGMSnHup9EdAm-jSL8ZT_73aIpERVCEeFuaRpzjuzIzvc" alt="Google" className="size-5" data-alt="Google Logo" />
                            Google
                        </button>
<button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border border-[#dbe6df] bg-white text-sm font-semibold hover:bg-gray-50 transition-all">
<span className="material-symbols-outlined text-[#1877F2]">social_leaderboard</span>
                            Facebook
                        </button>
</div>
</div>
</div>
</div>
</main>
{/*Simple Footer for Legal Links (Desktop only usually)*/}
<footer className="p-6 text-center text-xs text-[#61896f] bg-white border-t border-[#dbe6df] ">
<div className="max-w-[960px] mx-auto flex flex-wrap justify-center gap-6">
<span>© 2024 Marketplace Circular. Todos os direitos reservados.</span>
<div className="flex gap-4">
<Link className="hover:text-primary transition-colors" href="/central-de-ajuda">Ajuda</Link>
<Link className="hover:text-primary transition-colors" href="/central-de-ajuda">Privacidade</Link>
<Link className="hover:text-primary transition-colors" href="/central-de-ajuda">Termos</Link>
</div>
</div>
</footer>
    </>
  );
}
