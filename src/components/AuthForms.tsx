"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

type FormState = {
  isLoading: boolean;
  error: string | null;
  success: string | null;
};

export function LoginForm({
  children,
  hideSubmitButton = false,
  submitLabel = "Entrar",
  submitClassName,
}: {
  children: React.ReactNode;
  hideSubmitButton?: boolean;
  submitLabel?: string;
  submitClassName?: string;
}) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [state, setState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ isLoading: true, error: null, success: null });

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      setState({ isLoading: false, error: "Preencha todos os campos", success: null });
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      setState({ isLoading: false, error, success: null });
    } else {
      router.push("/perfil");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      {children}
      {!hideSubmitButton ? (
        <button
          type="submit"
          disabled={state.isLoading}
          className={
            submitClassName ??
            "w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          }
        >
          {state.isLoading ? "Entrando..." : submitLabel}
        </button>
      ) : null}
    </form>
  );
}

export function RegisterForm({
  children,
  hideSubmitButton = false,
  submitLabel = "Criar conta",
  submitClassName,
}: {
  children: React.ReactNode;
  hideSubmitButton?: boolean;
  submitLabel?: string;
  submitClassName?: string;
}) {
  const router = useRouter();
  const { signUp } = useAuth();
  const [state, setState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ isLoading: true, error: null, success: null });

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    if (!name || !email || !password) {
      setState({ isLoading: false, error: "Preencha todos os campos", success: null });
      return;
    }

    if (password !== confirmPassword) {
      setState({ isLoading: false, error: "As senhas não coincidem", success: null });
      return;
    }

    if (password.length < 6) {
      setState({ isLoading: false, error: "A senha deve ter pelo menos 6 caracteres", success: null });
      return;
    }

    const { error, needsConfirmation } = await signUp(email, password, name);

    if (error) {
      setState({ isLoading: false, error, success: null });
    } else if (needsConfirmation) {
      setState({
        isLoading: false,
        error: null,
        success: "Conta criada! Verifique seu email para confirmar o cadastro.",
      });
    } else {
      router.push("/perfil");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {state.success}
        </div>
      )}
      {children}
      {!hideSubmitButton ? (
        <button
          type="submit"
          disabled={state.isLoading || !!state.success}
          className={
            submitClassName ??
            "w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          }
        >
          {state.isLoading ? "Criando conta..." : submitLabel}
        </button>
      ) : null}
    </form>
  );
}

export function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [state, setState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ isLoading: true, error: null, success: null });

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";

    if (!email) {
      setState({ isLoading: false, error: "Digite seu email", success: null });
      return;
    }

    const { error } = await resetPassword(email);

    if (error) {
      setState({ isLoading: false, error, success: null });
    } else {
      setState({
        isLoading: false,
        error: null,
        success: "Email enviado! Verifique sua caixa de entrada.",
      });
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {state.success}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="seu@email.com"
        />
      </div>
      <button
        type="submit"
        disabled={state.isLoading || !!state.success}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.isLoading ? "Enviando..." : "Enviar email de recuperação"}
      </button>
    </form>
  );
}
