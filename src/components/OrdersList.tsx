"use client";

import { useMarketplace, mapOrderStatus, getStatusColor } from "@/components/MarketplaceProvider";

export function OrdersList() {
  const { buyerOrders } = useMarketplace();

  if (buyerOrders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        Ainda não existem pedidos. Quando comprar um item, ele aparece aqui.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {buyerOrders.map((order) => {
        const image = order.product?.images?.[0] || "";
        const title = order.product?.title || "Produto";
        const statusText = mapOrderStatus(order.status);
        const statusColor = getStatusColor(order.status);

        return (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-[#e5e7eb] p-4 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6">
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
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-[#111813] mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-[#61896f] mb-2">
                      Pedido #{order.id.slice(-6)} · {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </p>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${statusColor}`}>
                      {statusText}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#111813]">
                      {Number(order.amount).toFixed(2).replace(".", ",")} &euro;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
