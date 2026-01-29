import Link from "next/link";
import { ImageBlock } from "@/components/ImageBlock";

export const metadata = {
  title: "Meus Pedidos e Rastreamento | Marketplace",
  description: "Acompanhe seus pedidos, status de envio e opções de rastreio no Marketplace.",
  alternates: {
    canonical: "/meus-pedidos",
  },
  openGraph: {
    title: "Meus Pedidos e Rastreamento | Marketplace",
    description: "Acompanhe seus pedidos, status de envio e opções de rastreio no Marketplace.",
    url: "/meus-pedidos",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Pedidos e Rastreamento | Marketplace",
    description: "Acompanhe seus pedidos, status de envio e opções de rastreio no Marketplace.",
  },
};

export default function MeusPedidosPage() {
  return (
    <>
            <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-10 lg:px-40">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-1">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111813] ">
              Meus Pedidos
            </h1>
            <p className="text-base font-medium text-[#61896f] ">
              3 Envios Ativos
            </p>
          </div>
          <div className="flex gap-2">
            <Link className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-black transition-all hover:brightness-95" href="/mensagens">
              <span className="material-symbols-outlined text-lg">
                add_shopping_cart
              </span>
              Ver Itens
            </Link>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex gap-8 border-b border-[#dbe6df] px-4 ">
            <Link
              className="flex flex-col items-center justify-center border-b-[3px] border-primary pb-[13px] pt-4 text-[#111813] "
              href="/meus-pedidos"
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Compras
              </p>
            </Link>
            <Link
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent pb-[13px] pt-4 text-[#61896f] transition-all hover:text-[#111813] "
              href="/meus-pedidos"
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Vendas
              </p>
            </Link>
          </div>
        </div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="flex h-12 w-full flex-col">
              <span className="flex h-full w-full flex-1 items-stretch rounded-lg border border-[#e5e7eb] bg-white shadow-sm ">
                <span className="flex items-center justify-center pl-4 text-[#61896f]">
                  <span className="material-symbols-outlined">search</span>
                </span>
                <input
                  className="form-input h-full w-full min-w-0 flex-1 border-none bg-transparent px-4 pl-2 text-base placeholder:text-[#61896f] focus:outline-0 focus:ring-0"
                  placeholder="Buscar pedidos por nome ou ID"
                  defaultValue=""
                />
              </span>
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#e5e7eb] bg-white px-4 shadow-sm " href="/meus-pedidos">
              <p className="text-sm font-medium text-[#111813] ">
                Status
              </p>
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </Link>
            <Link className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#e5e7eb] bg-white px-4 shadow-sm " href="/meus-pedidos">
              <p className="text-sm font-medium text-[#111813] ">
                Pendente
              </p>
              <span className="material-symbols-outlined text-lg text-primary">
                circle
              </span>
            </Link>
            <Link className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#e5e7eb] bg-white px-4 shadow-sm " href="/meus-pedidos">
              <p className="text-sm font-medium text-[#111813] ">
                Enviado
              </p>
              <span className="material-symbols-outlined text-lg text-blue-500">
                local_shipping
              </span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm ">
            <div className="flex flex-col gap-6 md:flex-row">
              <ImageBlock
                alt="Vintage denim jacket product thumbnail"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_fgtx5-CwrjWjLoO1e3lz7sdPqsGa4CaQqtWiWg53A2UgvhNjyWXPXxUn9RC17SgoFSVIgbVyPBUzccoYOVw3EWLZucpOjBa2-Q2Sf1DRTDLxJIM2HiWlkR6GhS7iPE7wdycqCo5OjTstxZPSDi8fActwd3XKgpANGRgQoq4JQTNovewBpFB6XskV_9V3LRK9EoqDS_4FWn_Z5GKsvr655-MNjF20OEyS9iVAIUT7vJ4FBXqtRmMYGu6FV4ey36eTArEJjKL0feo"
                className="size-32 shrink-0 rounded-lg border border-[#e5e7eb] "
                sizes="128px"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-[#111813] ">
                      Jaqueta Jeans Vintage Oversized 90s
                    </h3>
                    <p className="mb-2 text-sm text-[#61896f]">
                      Pedido #V-782910  14 de Dez, 2023
                    </p>
                    <div className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-primary">
                      Entregue
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#111813] ">
                      R$ 45,00
                    </p>
                    <p className="text-xs text-[#61896f]">Incl. frete e taxas</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link className="rounded bg-background-light px-4 py-2 text-xs font-bold uppercase transition-all hover:bg-gray-200 " href="/meus-pedidos">
                    Rastrear Pedido
                  </Link>
                  <Link className="rounded border border-[#e5e7eb] px-4 py-2 text-xs font-bold uppercase transition-all hover:bg-background-light " href="/mensagens">
                    Mensagem ao Vendedor
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border-2 border-primary bg-white p-4 shadow-md ">
            <div className="mb-6 flex flex-col gap-6 md:flex-row">
              <ImageBlock
                alt="Mechanical keyboard custom build thumbnail"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmSUb2NGS2rvLka4lWdyyxtxf2QqQ3TIXvGBX0mMtZ0APHpMp4r8VJC790ZAG-mHjOzNB_7xhSbxL8OF9h3F6_mHamYtfiIvgTK89E5swXJLSsw0ClAc55KM_RjCtAuMasPj5D0hFqtMGdcRnK6-3O3mqKksusRW9wb12b601hAHcfH3ZJkE5vfPd-1fB_q_Xt7BBnhpHFXuNNpsRiiEZtD0ef-29HAUkoPEDo4ZB6UH010NqFiq0mCGxYtWs6EkqD1st5UOmdvCY"
                className="size-32 shrink-0 rounded-lg border border-[#e5e7eb] "
                sizes="128px"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-[#111813] ">
                      Teclado Mecƒnico Custom - Blue Switches
                    </h3>
                    <p className="mb-2 text-sm text-[#61896f]">
                      Pedido #V-782924  16 de Dez, 2023
                    </p>
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-blue-600 ">
                      Enviado
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#111813] ">
                      R$ 120,00
                    </p>
                    <p className="text-xs text-[#61896f]">Incl. frete e taxas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#e5e7eb] px-2 pt-6 ">
              <div className="relative mb-8 flex justify-between">
                <div className="absolute left-0 top-4 -z-0 h-0.5 w-full bg-gray-200 " />
                <div className="absolute left-0 top-4 -z-0 h-0.5 w-2/3 bg-primary" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary">
                    <span className="material-symbols-outlined text-sm font-bold">
                      check
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold ">
                      Pedido Realizado
                    </p>
                    <p className="text-[10px] text-[#61896f]">16 Dez, 09:30</p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary">
                    <span className="material-symbols-outlined text-sm font-bold">
                      check
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold ">Postado</p>
                    <p className="text-[10px] text-[#61896f]">17 Dez, 14:15</p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex size-8 animate-pulse items-center justify-center rounded-full bg-primary">
                    <span className="material-symbols-outlined text-sm font-bold">
                      local_shipping
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold ">
                      Em Trƒnsito
                    </p>
                    <p className="text-[10px] text-[#61896f]">18 Dez, 08:45</p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                  <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 ">
                    <span className="material-symbols-outlined text-sm font-bold">
                      home
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold ">Entregue</p>
                    <p className="text-[10px] text-[#61896f]">
                      PrevisÆo 20 Dez
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm ">
            <div className="flex flex-col gap-6 md:flex-row">
              <ImageBlock
                alt="Analog film camera polaroid product thumbnail"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn1VlNxWt446_C9YXRnIDFKto8usJ0dIq579UZxIUDEd3SVfkuaYv9arXqjn-Ehr5HkJyPscgPsh3lpjfI1LSqOcRzyn-piVwFtPdsE63F67-9CJ-a_ez6oC3gvUNrght63wOjCyYsV6IFwbTMfCUyUlVJ0BWDBVw5tf4UJ32Baz2kXhh8yLiLjj2Hy0IwiNXunkbLEV5MFK9KTSPv4d5gCfCrEJq5nOUnrPetqM89reFX25O5am_Nx0J1TC0132l22UXavqNMnY8"
                className="size-32 shrink-0 rounded-lg border border-[#e5e7eb] "
                sizes="128px"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-[#111813] ">
                      Cƒmera Polaroid OneStep+ i-Type
                    </h3>
                    <p className="mb-2 text-sm text-[#61896f]">
                      Pedido #V-783002  18 de Dez, 2023
                    </p>
                    <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-600 ">
                      Pagamento Pendente
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#111813] ">
                      R$ 89,99
                    </p>
                    <p className="text-xs text-[#61896f]">Incl. frete e taxas</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase text-black transition-all hover:brightness-95" href="/meus-pedidos">
                    Completar Pagamento
                  </Link>
                  <Link className="rounded border border-red-200 px-4 py-2 text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-50 " href="/meus-pedidos">
                    Cancelar Pedido
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-bold transition-all hover:bg-gray-50 " href="/meus-pedidos">
            Ver Pedidos Antigos
            <span className="material-symbols-outlined text-lg">history</span>
          </Link>
        </div>
      </main>
      <footer className="mt-20 border-t border-[#e5e7eb] bg-white py-10 ">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <p className="mb-2 text-sm text-[#61896f]">
            ¸ 2024 Marketplace Inc. Transa‡äes seguras e Prote‡Æo ao Comprador.
          </p>
          <div className="flex justify-center gap-6">
            <Link className="text-xs font-medium text-[#61896f] hover:text-primary" href="/central-de-ajuda">Central de Ajuda</Link>
            <Link className="text-xs font-medium text-[#61896f] hover:text-primary" href="/central-de-ajuda">Termos de Servi‡o</Link>
            <Link className="text-xs font-medium text-[#61896f] hover:text-primary" href="/central-de-ajuda">Pol¡tica de Privacidade</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
