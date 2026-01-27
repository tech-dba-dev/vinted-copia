"use client";

import { useMarketplace } from "@/components/MarketplaceProvider";

export function OrdersList() {
  const { orders, products } = useMarketplace();

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbe6df] p-8 text-center text-sm text-[#61896f]">
        Ainda não existem pedidos. Quando comprar um item, ele aparece aqui.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const product = products.find((item) => item.id === order.productId);
        if (!product) {
          return null;
        }
        return (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-[#e5e7eb] p-4 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="size-32 shrink-0 rounded-lg bg-center bg-cover border border-[#e5e7eb] "
                style={{ backgroundImage: `url("${product.image}")` }}
              ></div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-[#111813] mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[#61896f] mb-2">
                      Pedido #{order.id.slice(-6)} · {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary uppercase tracking-wide">
                      {order.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#111813] ">
                      {product.price.toFixed(2).replace(".", ",")} {product.currency === "EUR" ? "€" : product.currency}
                    </p>
                    <p className="text-xs text-[#61896f]">Incl. taxas</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 text-xs font-bold uppercase bg-background-light rounded hover:bg-gray-200 transition-all" type="button">
                    Rastrear pedido
                  </button>
                  <button className="px-4 py-2 text-xs font-bold uppercase border border-[#e5e7eb] rounded hover:bg-background-light transition-all" type="button">
                    Mensagem ao vendedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
