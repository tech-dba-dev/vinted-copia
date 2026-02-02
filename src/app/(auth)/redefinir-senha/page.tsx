"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePassword } from "@/lib/supabase";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/entrar");
      }, 3000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "Erro ao atualizar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="layout-container flex h-full grow flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-white p-8 rounded-xl shadow-sm border border-[#dbe6df]">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">lock</span>
            </div>
            <h1 className="text-[#111813] tracking-tight text-[32px] font-bold leading-tight text-center">
              Nova senha
            </h1>
            <p className="text-[#4f735a] text-base font-normal leading-relaxed text-center mt-3">
              Digite sua nova senha abaixo
            </p>
          </div>

          {success ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
                Senha atualizada com sucesso! Redirecionando para o login...
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nova senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Repita a senha"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Atualizando..." : "Atualizar senha"}
              </button>
            </form>
          )}

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
      </main>

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
  );
}
