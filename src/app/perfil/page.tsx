import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";
import { ProfileSummary } from "@/components/ProfileSummary";

export const metadata = {
  title: "Perfil do Usuário e Itens",
  description: "Perfil do usuário com itens publicados, estatísticas e avaliações.",
  alternates: {
    canonical: "/perfil",
  },
  openGraph: {
    title: "Perfil do Usuário e Itens",
    description: "Perfil do usuário com itens publicados, estatísticas e avaliações.",
    url: "/perfil",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Perfil do Usuário e Itens",
    description: "Perfil do usuário com itens publicados, estatísticas e avaliações.",
  },
};

export default function Page() {
  return (
    <>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<main className="flex-1 max-w-[1200px] mx-auto w-full py-8 px-6">
<ProfileSummary />
<div className="bg-white rounded-xl shadow-sm border border-[#dbe6df] mb-8 overflow-hidden">
<div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
<div className="relative">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-white shadow-md" data-alt="Retrato profissional do usuário com expressão amigável" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuD7Q9lHuHo2_an-78EprXXHb2BiTKHvAJNp1Q0r16fDgrVWuAqToAf0DHWv4m-w1_nIZ3qy3s_yC5edW8jrXhTb_IKpzz-_J-qnil7wH1adlE-3F1qBYk6b0bYQC1YACQfM8omiPsTAKC-9C3xStgnCSXt11Azj1g6QsFJMvkrjNeKsr33ujjQPTMz3WswVGbzkwERhw2kdLGvl3Ao0ol8Nb3mQSpxvRGixXvDGee-WJ_XD-VGsH5KKpkfU_N-jJL_OCFVIWorHqRc\")" }}>
</div>
<div className="absolute bottom-1 right-1 bg-primary text-[#111813] rounded-full p-1 border-2 border-white ">
<span className="material-symbols-outlined text-sm font-bold">verified</span>
</div>
</div>
<div className="flex-1">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Alex Rivera</h1>
<div className="flex items-center gap-2 mt-1">
<span className="material-symbols-outlined text-[#61896f] text-lg">location_on</span>
<p className="text-[#61896f] text-base font-medium">Londres, Reino Unido</p>
<span className="text-[#dbe6df]">•</span>
<p className="text-[#61896f] text-base">Membro desde 2021</p>
</div>
</div>
<button className="flex items-center gap-2 px-6 h-11 bg-[#f0f4f2] text-[#111813] rounded-lg font-bold text-sm hover:bg-[#dbe6df] transition-colors">
<span className="material-symbols-outlined text-lg">edit</span>
                            Editar Perfil
                        </button>
</div>
<div className="flex flex-wrap items-center gap-x-12 gap-y-4 mt-6">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="text-2xl font-black text-[#111813] ">4.8</span>
<div className="flex gap-0.5 text-primary">
<span className="material-symbols-outlined material-symbols-fill text-lg">star</span>
<span className="material-symbols-outlined material-symbols-fill text-lg">star</span>
<span className="material-symbols-outlined material-symbols-fill text-lg">star</span>
<span className="material-symbols-outlined material-symbols-fill text-lg">star</span>
<span className="material-symbols-outlined text-lg">star</span>
</div>
<span className="text-[#61896f] text-sm">(124 avaliações)</span>
</div>
</div>
<div className="flex items-center gap-8">
<div className="text-center">
<p className="text-xl font-bold text-[#111813] ">245</p>
<p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">Seguidores</p>
</div>
<div className="text-center">
<p className="text-xl font-bold text-[#111813] ">189</p>
<p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">Seguindo</p>
</div>
<div className="text-center">
<p className="text-xl font-bold text-[#111813] ">42</p>
<p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">Vendidos</p>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-[#dbe6df] px-8">
<nav className="flex gap-10">
<Link className="flex items-center border-b-4 border-primary text-[#111813] h-16 transition-all" href="/perfil">
<span className="text-sm font-bold uppercase tracking-widest">Itens (12)</span>
</Link>
<Link className="flex items-center border-b-4 border-transparent text-[#61896f] hover:text-[#111813] h-16 transition-all" href="/avaliacoes">
<span className="text-sm font-bold uppercase tracking-widest">Avaliações</span>
</Link>
<Link className="flex items-center border-b-4 border-transparent text-[#61896f] hover:text-[#111813] h-16 transition-all" href="/perfil">
<span className="text-sm font-bold uppercase tracking-widest">Sobre</span>
</Link>
</nav>
</div>
</div>
<div className="flex flex-col gap-6">
<div className="flex items-center justify-between">
<h3 className="text-xl font-bold">Itens Ativos</h3>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-4 h-9 bg-white border border-[#dbe6df] rounded-lg text-sm font-medium">
<span className="material-symbols-outlined text-lg">filter_list</span>
                        Filtrar
                    </button>
<button className="flex items-center gap-2 px-4 h-9 bg-white border border-[#dbe6df] rounded-lg text-sm font-medium">
                        Ordenar: Recentes
                    </button>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight shadow-sm z-10">Novo com etiquetas</div>
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOQloS8CvTGi2ursBlmRQxOTpkEoVBwUV6ZhTt_pzMKAsyCIbBFzwOA5KD4LRHyMaPvKtlYNWyaCmSwFdydeZlu1UzKbBhR9CB5OZJDDZjDc0h-6hOIw5OV8nqN-2pVKbwqxC0qNEkxXsd3ot4GGsCrF_u5j5qmv9tJ1qoHlQ6li2BRIhLT24BOFRmcaUHkpHL9iyaQ7LRpcVo1G0LXbR55ssBwoUT9MV9W1RjdAgpAgGLD2eSz-BMANoVejM4OGQ0qD_seeySQSI" alt="Jaqueta de inverno verde oliva moderna" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 245,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Patagonia Better Sweater</p>
<p className="text-[#61896f] text-xs mt-1">G / Patagonia</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlWQkn-BEwDicyzEMtJdB4VN94sOTMuONOA8oXwTqQxlGyondM7PKIg6xi1BW9kZTunOgNOnoFq-7M9ax7VMGK47phvuzDfY6V88Eeb50o7YnOZmrehHdjBT7AL8AEp8L0MHoXtRXVnDMo7LJ-6p1C_zILk9EiDtnm_8ZZ6iYivRNxU08nZ8nNEO_jdEhgW7WFoX3D7Hy29P5pIhH6DBbcNx9ztW0tKlAMCL9mifY_GsVEn5xkkYAyEO4mCgYZPIdmiBk68yur3YE" alt="Calça jeans clássica azul índigo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 150,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Levi's 501 Original</p>
<p className="text-[#61896f] text-xs mt-1">42 / Levi's</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
<span className="bg-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-widest">Reservado</span>
</div>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlnHHOpDl69UyA-NMx6uuiOnxf59iZY2TEy0zADnxgc9rXfzy-myX_qHAGnue8NcdXBmZm_47QYJnQtddnqGMzACDgs3CNxDrBSu5dU-U-tI4ICoyvjmt_25BSVm9ZJUJP9mC1xAbN_VlNCgZp227BUF3kg-MxC4-mf6B0RDus0sgNaNmbu22nDzqlirix6uGxMP6UlYaGF1sqVk0vmcDcjLwP-Dz91zUFPWS3Hb854pBlCmaeHlsoP9oMQB3Mtmast7e4lR946o" alt="Tênis minimalistas de couro branco" className="w-full h-full object-cover" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 420,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Nike Air Force 1 '07</p>
<p className="text-[#61896f] text-xs mt-1">41 / Nike</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmrn2w29Opo6crke14KfUjwAa3REwx8krKW6onRAcdoTTuGvSbBDpxZJ61UaARWeHQUu4dpYDQ4x8UKB2169REDUuptzc49ZZFHHxxKqwIqI6p6HBVCXmA8arnGf23J166EPAIlol8hc8L8JXaihQ6t1V_LqFU4Gz6HVxHGxQKYlySkYZEtCOBUuUS_Bth-TQgb-KxcZj9GczVhtOTivqxht8HrFkIgAdW5wEoY8IdZGeKBwq3ggDbGotFHR8fVE5ZRxukiZqb5y8" alt="Camiseta preta gráfica com estampa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 85,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Camiseta Vintage Oversized</p>
<p className="text-[#61896f] text-xs mt-1">M / Vintage</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Vp5B5AUml6i9ux0Ywvop6HcO4adMBRy2HguJiQvfMgfh4ugpbYGEi1yRpG_6uD8_zUCaldbWBjAHDf9GN8H--5CZ0A3A14k9mkmwWCLbEBsyKkqM7KFm-VVwUqMXdRQJ8IWEqEWeLeHcH0bqe8qkXfxiPKqA8_0rD0LANhQB9yR0y1jfjHKBlKDPIJjjjTv4Aig3hYoh3K7veRNezj3J19eJA4RsdaSCPMYzAyvoHDdDwXXC2J3bpDB3mL2SOIoNBUedUHOv9f4" alt="Shorts chino bege clássico" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 120,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Shorts Chino Clássico</p>
<p className="text-[#61896f] text-xs mt-1">42 / Carhartt</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsvMo0yDQK7JM9oVngsfOcK018aclIGg7HOccO1MJLoOuGMkQ--R34HW3o478h5WEVchdFrXoRB88aAlQsikke3AJXzz2XBrQUZAo4f0MA3_DMWKQGRYT_aR13bT0Z8h1HyOsVSun4ZlNJ69dM4B4DQz1g2NhqYJLPDbRcaxODSxcw3gZvCsnspfMNcTtpRAoANz6K7doPWpBfVEzL0IrSqWFucZ6C_-8i85F9Pw9PIq0--Yz1yu7KtHJrsLz-Y5JvnrnpmQ-TD-0" alt="Gorro de lã azul marinho escuro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 65,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Gorro Fisherman</p>
<p className="text-[#61896f] text-xs mt-1">Tamanho Único / ASOS</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#dbe6df] transition-all hover:shadow-md">
<Link href="/produto" className="contents">
<div className="relative aspect-[3/4] bg-[#f0f4f2] overflow-hidden">
<span className="absolute top-3 right-3"><span className="material-symbols-outlined">favorite</span></span>
<InlineImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGL6LIWUcL9iTJhLKHKqWnXNMB-9LNjYXzFZY9c_iY-jpCmiuGJ7o11JK6KHSIAdKbPjrjMNlTNLJarJdn2S2K5l2Xygp8LkhkeLBPq405KXGAVwK3ejFw4Z_8owbwFZIeml4a8KG-oO6fPpkG2rlFJ6bk9TAZuo4pSvRz77ldb5Jth6ZRBmkn6M9raUkBAZlYfOvIyCcamBIo4qs5L2FhG9q0GB925xgrMFnfS-YP652ytgpckedzl1Kojn9A7D46EuB0GA2kyXU" alt="Moletom cinza liso estilo streetwear" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
<div className="p-3">
<p className="text-lg font-bold text-[#111813] ">R$ 180,00</p>
<p className="text-[#61896f] text-sm truncate mt-0.5">Moletom Heavyweight</p>
<p className="text-[#61896f] text-xs mt-1">G / Uniqlo</p>
</div>
</Link>
</div>
<div className="group cursor-pointer bg-primary/10 border-2 border-dashed border-primary/40 rounded-xl overflow-hidden flex flex-col items-center justify-center min-h-[300px] transition-all hover:bg-primary/20">
<Link href="/criar-anuncio" className="contents">
<div className="bg-primary text-[#111813] rounded-full p-4 mb-4">
<span className="material-symbols-outlined text-3xl font-bold">add</span>
</div>
<p className="text-lg font-bold text-[#111813] ">Anunciar um item</p>
<p className="text-[#61896f] text-sm mt-1 px-8 text-center">Venda itens que não usa e ganhe dinheiro</p>
</Link>
</div>
</div>
</div>
</main>
<footer className="mt-20 border-t border-[#dbe6df] py-12 px-10 bg-white ">
<div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-12">
<div className="flex flex-col gap-4 max-w-xs">
<div className="flex items-center gap-2 text-primary">
<span className="material-symbols-outlined">shopping_bag</span>
<h2 className="text-lg font-bold text-[#111813] ">VintedClone</h2>
</div>
<p className="text-[#61896f] text-sm">A melhor comunidade para comprar e vender de tudo. Anuncie com facilidade e segurança.</p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
<div className="flex flex-col gap-3">
<h4 className="font-bold text-[#111813] ">Comprar</h4>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/buscar?categoria=feminino">Feminino</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/buscar?categoria=masculino">Masculino</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/buscar?categoria=infantil">Infantil</Link>
</div>
<div className="flex flex-col gap-3">
<h4 className="font-bold text-[#111813] ">Comunidade</h4>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-ajuda">Fórum</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-ajuda">Central de Ajuda</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-seguranca-e-denuncias">Segurança</Link>
</div>
<div className="flex flex-col gap-3">
<h4 className="font-bold text-[#111813] ">Legal</h4>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-ajuda">Privacidade</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-ajuda">Termos</Link>
<Link className="text-[#61896f] text-sm hover:text-primary" href="/central-de-ajuda">Cookies</Link>
</div>
</div>
</div>
<div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#dbe6df] text-center text-[#61896f] text-xs">
            © 2024 VintedClone Marketplace. Todos os direitos reservados.
        </div>
</footer>
</div>
    </>
  );
}
