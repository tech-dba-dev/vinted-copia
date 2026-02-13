"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro na aplicação:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-red-500 !text-[32px]">
            error
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">Algo deu errado</h2>
        <p className="text-gray-500 mb-6">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:brightness-105 transition-all"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-all"
          >
            Ir para início
          </a>
        </div>
      </div>
    </main>
  );
}
