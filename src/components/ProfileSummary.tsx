"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export function ProfileSummary() {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-6 text-sm text-[#61896f]">
        Você ainda não está autenticado.
        <Link className="ml-2 font-semibold text-primary" href="/entrar">
          Entrar
        </Link>
      </div>
    );
  }

  const displayName = profile?.full_name || profile?.username || user.email?.split('@')[0] || 'Usuário';

  return (
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-full bg-primary/20 text-[#111813] font-bold flex items-center justify-center">
        {displayName.slice(0, 1).toUpperCase()}
      </div>
      <div>
        <p className="text-lg font-bold">{displayName}</p>
        <p className="text-sm text-[#61896f]">{user.email}</p>
      </div>
    </div>
  );
}
