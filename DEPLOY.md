# 🚀 Deploy na Vercel

## Passo 1: Acessar a Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta do GitHub

## Passo 2: Importar Projeto

1. Clique em **"Add New Project"**
2. Selecione o repositório: **tech-dba-dev/vinted-copia**
3. Configure o branch: **mateusdev**

## Passo 3: Configurar Variáveis de Ambiente

Na seção **Environment Variables**, adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://jlhofmaupisnwylbjfkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsaG9mbWF1cGlzbnd5bGJqZmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzY3MjUsImV4cCI6MjA4NTA1MjcyNX0.OybS0760afKTwEimTQIHGYJBzzUuRbY00KlrIpWnt9Q
```

**Como adicionar:**
- Nome da variável: `NEXT_PUBLIC_SUPABASE_URL`
- Valor: `https://jlhofmaupisnwylbjfkk.supabase.co`
- Clique em "Add"

- Nome da variável: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Valor: (cole a chave anon acima)
- Clique em "Add"

## Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build terminar (geralmente 2-3 minutos)
3. Quando terminar, clique no botão **"Visit"** para ver seu site online!

## Passo 5: Configurar Domínio (Opcional)

Você pode adicionar um domínio personalizado em:
**Settings → Domains**

## 🔄 Atualizações Futuras

Para atualizar o site no futuro:

1. Faça alterações no código
2. Commit e push para o branch `mateusdev`
3. A Vercel automaticamente fará novo deploy!

```bash
git add .
git commit -m "sua mensagem"
git push origin mateusdev
```

## 🌐 Compartilhar com Amigos

Após o deploy, você receberá uma URL como:
- `https://vinted-copia-[seu-usuario].vercel.app`

Compartilhe essa URL com seus amigos para testar o site!

## ⚠️ Importante: Configurar Domínio no Supabase

Após fazer deploy, você precisa adicionar o domínio da Vercel no Supabase:

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication → URL Configuration**
4. Adicione a URL da Vercel em:
   - **Site URL**: `https://vinted-copia-[seu-usuario].vercel.app`
   - **Redirect URLs**: `https://vinted-copia-[seu-usuario].vercel.app/**`

Isso permitirá que o login funcione corretamente na versão em produção!

## 🐛 Problemas Comuns

### Build falha
- Verifique se as variáveis de ambiente foram adicionadas corretamente
- Verifique se o código está sem erros de TypeScript

### Login não funciona
- Certifique-se de adicionar a URL no Supabase (passo acima)
- Verifique as variáveis de ambiente

### Imagens não carregam
- Configure os domínios permitidos em `next.config.js` se necessário
