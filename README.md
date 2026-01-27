# MarketplaceMoc Frontend

Migração do HTML estático para Next.js (App Router) + React + TypeScript, mantendo conteúdo, seções e fluxos originais.

## Como rodar

```bash
cd web
npm install
npm run dev
```

## Rotas

- `/` Página inicial
- `/meus-pedidos`
- `/central-de-ajuda`
- `/cadastro`
- `/perfil`
- `/favoritos`
- `/criar-anuncio`
- `/entrar`
- `/mensagens`
- `/produto`
- `/buscar`
- `/recuperar-senha`
- `/avaliacoes`
- `/central-de-seguranca-e-denuncias`

## Renderização (SSR/SSG/ISR)

- Todas as páginas são estáticas (SSG padrão do App Router) porque o conteúdo é totalmente estático no HTML original.
- Não há ISR ou SSR dinâmico, pois não existe conteúdo dependente de dados externos.

## SEO implementado

- `metadata` por rota (title, description, canonical, OG, Twitter).
- `sitemap.xml` e `robots.txt` gerados via `src/app/sitemap.ts` e `src/app/robots.ts`.
- JSON-LD:
  - Home: `WebSite` com `SearchAction`.
  - Produto: `Product` com preço e imagem.
- Otimização de imagens com `next/image` e fontes via `next/font`.

## Performance

- Code splitting automático por rota (App Router).
- Imagens com `next/image` via `InlineImage`/`ImageBlock`.
- CSS com Tailwind e classes reaproveitadas onde possível.

## Acessibilidade

- HTML semântico preservado.
- Campos de formulário com `required` e `type` apropriado.
- Ícones com texto e botões navegáveis por teclado.

## Segurança (front)

- Nenhum segredo no client.
- Evitado `dangerouslySetInnerHTML` (usado apenas para JSON-LD).
- Recomenda-se CSP, por exemplo:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' https://lh3.googleusercontent.com data:;
```

## Observações

- Atualize `metadataBase` em `src/app/layout.tsx` e o `baseUrl` em `src/app/sitemap.ts`/`robots.ts` com o domínio real.
- Dependências extras usadas: `@tailwindcss/forms` (estilização de inputs) e `prettier` (formatação).
