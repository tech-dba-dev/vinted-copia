"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

export type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Buscar perfil do usuário
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }

    return data;
  }, []);

  // Ref para acessar o user atual sem causar re-render do useEffect
  const userRef = useRef<User | null>(null);
  userRef.current = user;

  // Inicializar autenticação (executa apenas UMA vez)
  useEffect(() => {
    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('[AuthProvider] Auth event:', event, 'has session:', !!newSession);

        // Só limpar estado no logout EXPLÍCITO
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setSession(null);
          setIsLoading(false);
          return;
        }

        // Para qualquer evento com sessão válida, atualizar estado
        if (newSession?.user) {
          // Se o user ID é o mesmo, só atualizar a session (não recriar user/profile)
          // Isso evita re-renders desnecessários no TOKEN_REFRESHED
          if (userRef.current?.id === newSession.user.id) {
            setSession(newSession);
          } else {
            // Novo user (login ou troca de conta)
            const userProfile = await fetchProfile(newSession.user.id);
            setUser(newSession.user);
            setProfile(userProfile);
            setSession(newSession);
          }
        }

        setIsLoading(false);
      }
    );

    // Verificar sessão quando a página volta a ter foco
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('[AuthProvider] Page became visible, checking session...');
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (!currentSession && user) {
          console.log('[AuthProvider] Session expired, logging out');
          setUser(null);
          setProfile(null);
          setSession(null);
        } else if (currentSession && !user) {
          console.log('[AuthProvider] Session restored');
          const userProfile = await fetchProfile(currentSession.user.id);
          setUser(currentSession.user);
          setProfile(userProfile);
          setSession(currentSession);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Verificar sessão periodicamente (a cada 30 segundos)
    const intervalId = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();

      if (!currentSession && user) {
        console.log('[AuthProvider] Session expired during periodic check');
        setUser(null);
        setProfile(null);
        setSession(null);
      }
    }, 30000); // 30 segundos

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [fetchProfile, user]);

  // Login
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: translateError(error.message) };
      }

      return {};
    } catch {
      return { error: "Erro ao fazer login. Tente novamente." };
    }
  };

  // Cadastro
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: email.split("@")[0],
          },
        },
      });

      if (error) {
        return { error: translateError(error.message) };
      }

      // Se o usuário precisa confirmar email
      if (data.user && !data.session) {
        return { needsConfirmation: true };
      }

      return {};
    } catch {
      return { error: "Erro ao criar conta. Tente novamente." };
    }
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  // Recuperar senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });

      if (error) {
        return { error: translateError(error.message) };
      }

      return {};
    } catch {
      return { error: "Erro ao enviar email. Tente novamente." };
    }
  };

  // Atualizar perfil
  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    }
  };

  const value: AuthContextValue = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

// Traduzir erros do Supabase para português
function translateError(message: string): string {
  const translations: Record<string, string> = {
    "Invalid login credentials": "Email ou senha incorretos",
    "Email not confirmed": "Por favor, confirme seu email antes de fazer login",
    "User already registered": "Este email já está cadastrado",
    "Password should be at least 6 characters": "A senha deve ter pelo menos 6 caracteres",
    "Unable to validate email address: invalid format": "Formato de email inválido",
    "Email rate limit exceeded": "Muitas tentativas. Aguarde alguns minutos",
    "For security purposes, you can only request this once every 60 seconds": "Aguarde 60 segundos antes de tentar novamente",
  };

  return translations[message] || message;
}
