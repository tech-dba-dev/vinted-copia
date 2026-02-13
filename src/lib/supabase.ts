import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client: usa cookies para sincronizar sessão entre client e server
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

// Tipos de autenticação
export type AuthError = {
  message: string
  status?: number
}

export type SignUpData = {
  email: string
  password: string
  fullName?: string
  username?: string
}

export type SignInData = {
  email: string
  password: string
}

// Funções de autenticação
export async function signUp({ email, password, fullName, username }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username || email.split('@')[0],
      },
    },
  })

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }

  return data
}

export async function signIn({ email, password }: SignInData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }
}

// Login com OAuth (Google, Facebook, etc.)
export async function signInWithProvider(provider: 'google' | 'facebook' | 'apple') {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }
}

// Obter sessão atual
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    throw { message: error.message, status: error.status } as AuthError
  }

  return session
}

// Obter perfil do usuário
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw { message: error.message } as AuthError
  }

  return data
}

// Atualizar perfil
export async function updateProfile(userId: string, updates: {
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw { message: error.message } as AuthError
  }

  return data
}
