"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/components/MarketplaceProvider";

export function PurchaseButton({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  const searchParams = useSearchParams();
  const { addOrder } = useMarketplace();
  const productId = searchParams.get("id") ?? "p1";

  return (
    <Link
      className={className}
      href="/meus-pedidos"
      onClick={() => addOrder(productId)}
    >
      {label}
    </Link>
  );
}
