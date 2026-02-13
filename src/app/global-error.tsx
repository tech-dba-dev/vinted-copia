"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Algo deu errado
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.625rem 1.5rem",
                backgroundColor: "#09B1BA",
                color: "black",
                fontWeight: "bold",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
