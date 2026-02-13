"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace, mapOrderStatus, getStatusColor } from "@/components/MarketplaceProvider";
import { useAuth } from "@/components/AuthProvider";
import { getOrCreateConversation } from "@/lib/messages";
import type { OrderWithDetails } from "@/lib/orders";

type Tab = "compras" | "vendas";

function OrderCard({
  order,
  tab,
  onUpdateStatus,
  onCancel,
  onMessage,
}: {
  order: OrderWithDetails;
  tab: Tab;
  onUpdateStatus?: (orderId: string, status: 'shipped' | 'delivered') => void;
  onCancel?: (orderId: string, productId: string) => void;
  onMessage: (sellerId: string, productId: string) => void;
}) {
  const image = order.product?.images?.[0] || "";
  const title = order.product?.title || "Produto";
  const statusText = mapOrderStatus(order.status);
  const statusColor = getStatusColor(order.status);
  const otherUser = tab === "compras" ? order.seller : order.buyer;

  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row">
        {image ? (
          <div
            className="size-32 shrink-0 rounded-lg bg-center bg-cover border border-[#e5e7eb]"
            style={{ backgroundImage: `url("${image}")` }}
          />
        ) : (
          <div className="size-32 shrink-0 rounded-lg border border-[#e5e7eb] bg-gray-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-400 text-3xl">image</span>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-lg font-bold text-[#111813]">
                {title}
              </h3>
              <p className="mb-1 text-sm text-[#61896f]">
                Pedido #{order.id.slice(-6)} · {new Date(order.created_at).toLocaleDateString("pt-BR")}
              </p>
              {otherUser && (
                <p className="mb-2 text-xs text-[#61896f]">
                  {tab === "compras" ? "Vendedor" : "Comprador"}:{" "}
                  <span className="font-semibold">{otherUser.username || otherUser.full_name}</span>
                </p>
              )}
              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${statusColor}`}>
                {statusText}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#111813]">
                {Number(order.amount).toFixed(2).replace(".", ",")} &euro;
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {/* Botões de ação do vendedor */}
            {tab === "vendas" && order.status === "pending" && onUpdateStatus && (
              <button
                className="rounded bg-blue-500 px-4 py-2 text-xs font-bold uppercase text-white transition-all hover:bg-blue-600"
                type="button"
                onClick={() => onUpdateStatus(order.id, "shipped")}
              >
                Marcar como Enviado
              </button>
            )}
            {tab === "vendas" && order.status === "shipped" && onUpdateStatus && (
              <button
                className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase text-black transition-all hover:brightness-95"
                type="button"
                onClick={() => onUpdateStatus(order.id, "delivered")}
              >
                Marcar como Entregue
              </button>
            )}
            {/* Botão cancelar (comprador, só pending) */}
            {tab === "compras" && order.status === "pending" && onCancel && (
              <button
                className="rounded border border-red-200 px-4 py-2 text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-50"
                type="button"
                onClick={() => onCancel(order.id, order.product_id)}
              >
                Cancelar Pedido
              </button>
            )}
            {/* Botão mensagem */}
            <button
              className="rounded border border-[#e5e7eb] px-4 py-2 text-xs font-bold uppercase transition-all hover:bg-background-light"
              type="button"
              onClick={() => {
                const otherId = tab === "compras" ? order.seller_id : order.buyer_id;
                onMessage(otherId, order.product_id);
              }}
            >
              {tab === "compras" ? "Mensagem ao Vendedor" : "Mensagem ao Comprador"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeusPedidosPage() {
  const { buyerOrders, sellerOrders, isLoadingOrders, updateOrderStatus, cancelOrder } = useMarketplace();
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("compras");
  const [isProcessing, setIsProcessing] = useState(false);

  const orders = activeTab === "compras" ? buyerOrders : sellerOrders;
  const activeCount = orders.filter(o => o.status !== "delivered" && o.status !== "cancelled").length;

  async function handleUpdateStatus(orderId: string, status: 'shipped' | 'delivered') {
    setIsProcessing(true);
    await updateOrderStatus(orderId, status);
    setIsProcessing(false);
  }

  async function handleCancel(orderId: string, productId: string) {
    if (!confirm("Tem certeza que deseja cancelar este pedido?")) return;
    setIsProcessing(true);
    await cancelOrder(orderId, productId);
    setIsProcessing(false);
  }

  async function handleMessage(otherUserId: string, productId: string) {
    if (!user) {
      router.push("/entrar");
      return;
    }
    const conversation = await getOrCreateConversation(productId, otherUserId, user.id);
    if (conversation) {
      router.push("/mensagens");
    }
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-10 lg:px-40">
        <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center">
          <p className="text-sm text-[#61896f] mb-4">Faça login para ver seus pedidos.</p>
          <Link href="/entrar" className="text-primary font-bold hover:underline">
            Entrar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-10 lg:px-40">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-1">
          <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111813]">
            Meus Pedidos
          </h1>
          <p className="text-base font-medium text-[#61896f]">
            {activeCount} {activeCount === 1 ? "pedido ativo" : "pedidos ativos"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-8 border-b border-[#dbe6df] px-4">
          <button
            type="button"
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all ${
              activeTab === "compras"
                ? "border-primary text-[#111813]"
                : "border-transparent text-[#61896f] hover:text-[#111813]"
            }`}
            onClick={() => setActiveTab("compras")}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Compras ({buyerOrders.length})
            </p>
          </button>
          <button
            type="button"
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all ${
              activeTab === "vendas"
                ? "border-primary text-[#111813]"
                : "border-transparent text-[#61896f] hover:text-[#111813]"
            }`}
            onClick={() => setActiveTab("vendas")}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Vendas ({sellerOrders.length})
            </p>
          </button>
        </div>
      </div>

      {/* Lista de pedidos */}
      {isLoadingOrders ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border border-[#e5e7eb] bg-white p-4">
              <div className="flex gap-6">
                <div className="size-32 shrink-0 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-48" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-6 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
          {activeTab === "compras"
            ? "Ainda sem compras. Quando comprar um item, ele aparece aqui."
            : "Ainda sem vendas. Quando alguém comprar seus produtos, aparece aqui."}
        </div>
      ) : (
        <div className={`space-y-4 ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              tab={activeTab}
              onUpdateStatus={handleUpdateStatus}
              onCancel={handleCancel}
              onMessage={handleMessage}
            />
          ))}
        </div>
      )}
    </main>
  );
}
