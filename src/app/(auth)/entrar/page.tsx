import Link from "next/link";
import { LoginForm } from "@/components/AuthForms";
import { InlineImage } from "@/components/InlineImage";

export const metadata = {
  title: "Entrar - Marketplace",
  description: "Acesse sua conta para comprar, vender e acompanhar seus pedidos.",
  alternates: {
    canonical: "/entrar",
  },
  openGraph: {
    title: "Entrar - Marketplace",
    description: "Acesse sua conta para comprar, vender e acompanhar seus pedidos.",
    url: "/entrar",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Entrar - Marketplace",
    description: "Acesse sua conta para comprar, vender e acompanhar seus pedidos.",
  },
};

export default function Page() {
  return (
    <>
      {/*Top Navigation Bar*/}
{/*Main Content Container*/}
<main className="flex-1 flex items-center justify-center p-6">
<div className="w-full max-w-[480px] bg-white shadow-sm rounded-xl p-8 md:p-10 border border-[#dbe6df] ">
{/*Back to Home Button*/}
<div className="mb-6">
<Link href="/" className="inline-flex items-center gap-2 text-[#61896f] hover:text-primary transition-colors text-sm font-medium">
<span className="material-symbols-outlined text-lg">arrow_back</span>
Voltar ao início
</Link>
</div>
{/*Headline Text*/}
<div className="mb-8">
<h1 className="text-[#111813] tracking-tight text-[32px] font-bold leading-tight text-center">Entrar</h1>
<p className="text-[#61896f] text-center text-sm mt-2">Bem-vindo de volta ao seu marketplace favorito</p>
</div>
{/*Login Form*/}
<LoginForm
  submitLabel="Entrar"
  submitClassName="w-full bg-primary text-[#111813] py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm"
>
{/*E-mail Field*/}
<div className="flex flex-col gap-2">
<label className="text-[#111813] text-base font-medium leading-normal">E-mail</label>
<input className="form-input flex w-full rounded-xl text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] px-4 text-base font-normal" placeholder="seu@email.com" name="email" type="email" required/>
</div>
{/*Password Field*/}
<div className="flex flex-col gap-2">
<label className="text-[#111813] text-base font-medium leading-normal">Senha</label>
<div className="relative flex items-stretch">
<input className="form-input flex w-full rounded-xl text-[#111813] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#dbe6df] bg-white h-14 placeholder:text-[#61896f] px-4 pr-12 text-base font-normal" placeholder="Sua senha" type="password" name="password" required/>
<button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#61896f] hover:text-primary" type="button">
<span className="material-symbols-outlined">visibility</span>
</button>
</div>
</div>
{/*Forgot Password*/}
<div className="text-right">
<Link className="text-[#61896f] text-sm font-normal leading-normal hover:underline" href="/recuperar-senha">Esqueci minha senha</Link>
</div>
</LoginForm>
{/*Social Login Divider*/}
<div className="relative flex py-8 items-center">
<div className="flex-grow border-t border-[#dbe6df] "></div>
<span className="flex-shrink mx-4 text-[#61896f] text-sm font-medium">ou entre com</span>
<div className="flex-grow border-t border-[#dbe6df] "></div>
</div>
{/*Social Login Buttons*/}
<div className="grid grid-cols-1 gap-3">
<button className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-[#dbe6df] bg-white text-[#111813] font-medium hover:bg-background-light transition-colors">
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJj3ZfX--bmO7qKIH6reNmfwHuNiNwZySBNsMMqIVDpvajh1FgIwiUDmvnwDLcvsaE0-4vUMFZdqHPahV8nxykw4c1mNnxM5o-cX3csbCrNGlW-XhdvyI1RmQ6dWew_2jM6lfLvA_U94hDqfVj_m4mKc-0qtTCFRIpEqzmbZ4fZvnIBYcxRRDqwZbOF0IeUxSzjiaq15JmFCq28mwH18L83xIcjpwUan4sYRkKE19RNLnLMI_XAxFXYXGdjbYxLKID3UXjwgzYGV8" alt="" className="w-5 h-5" data-alt="Google colorful logo icon" />
<span>Continuar com Google</span>
</button>
<button className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-[#dbe6df] bg-white text-[#111813] font-medium hover:bg-background-light transition-colors">
<span className="material-symbols-outlined text-[#1877F2]">social_leaderboard</span>
<span>Continuar com Facebook</span>
</button>
<button className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-[#dbe6df] bg-white text-[#111813] font-medium hover:bg-background-light transition-colors">
<span className="material-symbols-outlined">ios</span>
<span>Continuar com Apple</span>
</button>
</div>
{/*Footer Link*/}
<div className="mt-10 text-center">
<p className="text-[#111813] text-sm">
                    Não tem uma conta? 
                    <Link className="text-primary font-bold hover:underline ml-1" href="/cadastro">Cadastre-se</Link>
</p>
</div>
</div>
</main>
{/*Simple Footer for legal*/}
<footer className="py-6 px-10 text-center text-[#61896f] text-xs">
<div className="flex justify-center gap-4 mb-2">
<Link className="hover:text-primary" href="/central-de-ajuda">Termos de Uso</Link>
<Link className="hover:text-primary" href="/central-de-ajuda">Privacidade</Link>
<Link className="hover:text-primary" href="/central-de-ajuda">Cookies</Link>
</div>
<p>© 2024 Marketplace C2C. Todos os direitos reservados.</p>
</footer>
    </>
  );
}
