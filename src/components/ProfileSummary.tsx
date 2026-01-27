"use client";

import Link from "next/link";
import { useMarketplace } from "@/components/MarketplaceProvider";

export function ProfileSummary() {
  const { user } = useMarketplace();

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

  return (
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-full bg-primary/20 text-[#111813] font-bold flex items-center justify-center">
        {user.name.slice(0, 1).toUpperCase()}
      </div>
      <div>
        <p className="text-lg font-bold">{user.name}</p>
        <p className="text-sm text-[#61896f]">{user.email}</p>
      </div>
    </div>
  );
}
