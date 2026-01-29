import Link from "next/link";
import { ResetPasswordForm } from "@/components/AuthForms";

export const metadata = {
  title: "Recuperar Senha - Marketplace C2C",
  description: "Insira o seu e-mail e enviaremos um link para você criar uma nova senha.",
  alternates: {
    canonical: "/recuperar-senha",
  },
  openGraph: {
    title: "Recuperar Senha - Marketplace C2C",
    description: "Insira o seu e-mail e enviaremos um link para você criar uma nova senha.",
    url: "/recuperar-senha",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Recuperar Senha - Marketplace C2C",
    description: "Insira o seu e-mail e enviaremos um link para você criar uma nova senha.",
  },
};

export default function Page() {
  return (
    <>
      <div className="layout-container flex h-full grow flex-col">
        {/*Main Content Area*/}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-[480px] bg-white p-8 rounded-xl shadow-sm border border-[#dbe6df]">
            {/*Headline Section*/}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <span className="material-symbols-outlined text-primary text-4xl">lock_reset</span>
              </div>
              <h1 className="text-[#111813] tracking-tight text-[32px] font-bold leading-tight text-center">
                Recuperar senha
              </h1>
              <p className="text-[#4f735a] text-base font-normal leading-relaxed text-center mt-3">
                Insira o seu e-mail e enviaremos um link para você criar uma nova senha.
              </p>
            </div>

            {/*Form Section*/}
            <ResetPasswordForm />

            {/*Return Link*/}
            <div className="mt-6 text-center">
              <Link
                className="inline-flex items-center justify-center gap-2 text-[#4f735a] text-sm font-semibold hover:text-[#111813] transition-colors py-2"
                href="/entrar"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Voltar para o login
              </Link>
            </div>
          </div>

          {/*Footer Decorative/Info*/}
          <div className="mt-8 text-center">
            <p className="text-[#61896f] text-sm">
              Ainda não tem conta?{" "}
              <Link className="text-primary font-bold hover:underline" href="/cadastro">
                Cadastre-se
              </Link>
            </p>
          </div>
        </main>

        {/*Minimal Footer*/}
        <footer className="py-6 border-t border-[#dbe6df] bg-white px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#61896f] text-xs">
              © 2024 Marketplace C2C Brasil. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link className="text-[#61896f] text-xs hover:text-[#111813]" href="/central-de-ajuda">
                Privacidade
              </Link>
              <Link className="text-[#61896f] text-xs hover:text-[#111813]" href="/central-de-ajuda">
                Termos de uso
              </Link>
              <Link className="text-[#61896f] text-xs hover:text-[#111813]" href="/central-de-ajuda">
                Ajuda
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
