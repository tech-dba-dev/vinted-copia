"use client";

import { useRouter } from "next/navigation";
import { useMarketplace } from "@/components/MarketplaceProvider";

export function LoginForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { login } = useMarketplace();

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") ?? "").toString();
        const name = (formData.get("name") ?? "Usuário").toString();
        login({ name, email });
        router.push("/perfil");
      }}
    >
      {children}
    </form>
  );
}

export function RegisterForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { login } = useMarketplace();

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") ?? "").toString();
        const name = (formData.get("name") ?? "Usuário").toString();
        login({ name, email });
        router.push("/perfil");
      }}
    >
      {children}
    </form>
  );
}
