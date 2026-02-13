import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh da sessão — mantém cookies sincronizados entre client e server
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    // Apenas rotas que dependem de autenticação
    '/mensagens/:path*',
    '/favoritos/:path*',
    '/perfil/:path*',
    '/criar-anuncio/:path*',
    '/meus-pedidos/:path*',
    '/produto/:path*',
    '/entrar',
    '/cadastro',
    // Página principal (carrega favoritos do user)
    '/',
  ],
}
