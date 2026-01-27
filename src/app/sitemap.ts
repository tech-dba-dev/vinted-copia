import type { MetadataRoute } from "next";

const baseUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/meus-pedidos",
    "/central-de-ajuda",
    "/cadastro",
    "/perfil",
    "/favoritos",
    "/criar-anuncio",
    "/entrar",
    "/mensagens",
    "/produto",
    "/buscar",
    "/recuperar-senha",
    "/avaliacoes",
    "/central-de-seguranca-e-denuncias",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
