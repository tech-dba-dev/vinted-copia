import Link from "next/link";
import { InlineImage } from "@/components/InlineImage";

export const metadata = {
  title: "Mensagens e Chat do Usuário",
  description: "Converse com compradores e vendedores no chat do marketplace.",
  alternates: {
    canonical: "/mensagens",
  },
  openGraph: {
    title: "Mensagens e Chat do Usuário",
    description: "Converse com compradores e vendedores no chat do marketplace.",
    url: "/mensagens",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mensagens e Chat do Usuário",
    description: "Converse com compradores e vendedores no chat do marketplace.",
  },
};

export default function Page() {
  return (
    <>
      <div className="w-full bg-white border-b border-[#f0f4f2] ">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2">
<div className="size-8 text-primary">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
<path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
</svg>
</div>
<h2 className="text-[#111813] text-xl font-bold tracking-tight">Marketplace</h2>
</div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-[#111813] text-sm font-semibold hover:text-primary transition-colors" href="/buscar">Comprar</Link>
<Link className="text-[#111813] text-sm font-semibold hover:text-primary transition-colors" href="/criar-anuncio">Vender</Link>
<Link className="text-[#111813] text-sm font-semibold hover:text-primary transition-colors" href="/central-de-ajuda">Sobre</Link>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden sm:block">
<label className="flex items-center min-w-[200px] h-9">
<div className="flex w-full items-stretch rounded-lg bg-[#f0f4f2] h-full">
<div className="text-[#61896f] flex items-center justify-center pl-3">
<span className="material-symbols-outlined !text-[20px]">search</span>
</div>
<input className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-[#61896f] px-2" placeholder="Pesquisar no marketplace"/>
</div>
</label>
</div>
<div className="flex gap-1">
<Link className="p-2 rounded-lg bg-[#f0f4f2] text-[#111813] hover:bg-primary/20 transition-all" href="/meus-pedidos">
<span className="material-symbols-outlined !text-[20px]">notifications</span>
</Link>
<Link className="p-2 rounded-lg bg-[#f0f4f2] text-[#111813] hover:bg-primary/20 transition-all" href="/favoritos">
<span className="material-symbols-outlined !text-[20px]">favorite</span>
</Link>
<button className="p-2 rounded-lg bg-[#f0f4f2] text-primary border border-primary/20">
<span className="material-symbols-outlined !text-[20px]">mail</span>
</button>
</div>
<div className="h-8 w-px bg-[#f0f4f2] mx-1"></div>
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#f0f4f2] " data-alt="User profile avatar" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAEaQqpKRpayfnusIYKwZM6eY0SU6jjEqkDzPDsdXCrTufGZV8kdRAc0KCkuwwvtDPUIG3P8lioXPC85a6avmjscBB_rJDFFyxgklzQfD1avWCQZafM6mpVgfjn4gU8PTkvl1XG6wZ29kOyjWrr1SlNSa_5qkKJqyJNhewVZMd50DpxRMc9fABGH1VltKwVY0yKTdjb-BsHueidfndTIu54kyfdzXtXadiCP65FfxyWBsoISU5xmbr3Y425RCS1OAy_3MzGM_ZRLC8\")" }}></div>
</div>
</div>
</div>
<main className="flex-1 max-w-[1280px] mx-auto w-full px-4 lg:px-10 py-6 overflow-hidden">
<div className="flex h-full bg-white rounded-xl border border-[#f0f4f2] shadow-sm overflow-hidden chat-container">
<aside className="w-full md:w-[350px] lg:w-[400px] border-r border-[#f0f4f2] flex flex-col">
<div className="p-4 border-b border-[#f0f4f2] ">
<h1 className="text-lg font-bold mb-4">Mensagens</h1>
<div className="flex flex-col gap-2">
<label className="flex flex-col h-10 w-full">
<div className="flex w-full flex-1 items-stretch rounded-lg bg-[#f0f4f2] h-full">
<div className="text-[#61896f] flex items-center justify-center pl-4">
<span className="material-symbols-outlined !text-[20px]">search</span>
</div>
<input className="form-input flex w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-[#61896f] pl-2" placeholder="Pesquisar em conversas"/>
</div>
</label>
</div>
</div>
<div className="flex items-center gap-1 p-2 overflow-x-auto no-scrollbar border-b border-[#f0f4f2] ">
<button className="px-4 py-1.5 rounded-full bg-primary/20 text-[#111813] text-xs font-semibold whitespace-nowrap">Todas</button>
<button className="px-4 py-1.5 rounded-full hover:bg-[#f0f4f2] text-[#61896f] text-xs font-semibold whitespace-nowrap">Comprando</button>
<button className="px-4 py-1.5 rounded-full hover:bg-[#f0f4f2] text-[#61896f] text-xs font-semibold whitespace-nowrap">Vendendo</button>
<button className="px-4 py-1.5 rounded-full hover:bg-[#f0f4f2] text-[#61896f] text-xs font-semibold whitespace-nowrap">Sistema</button>
</div>
<div className="flex-1 overflow-y-auto">
<div className="flex items-center gap-4 bg-[#f0f4f2] px-4 min-h-[80px] py-3 cursor-pointer border-l-4 border-primary">
<div className="relative shrink-0">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14" data-alt="Product thumbnail vintage camera" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuCS2xQDf0XdEeqKzQVcp1-3X2BmJJMWJSvlYdJSSOXk1JH33vYpGITssN5t-jroOWzXgP7oEdVV9YGeYnUr3leJOnvjT1_QnZKJ1SOr2n01MK5e8cbgpPY2UFp3h7-14UzJnUgbzv-CWz6CdmVm_ZOM7yl3VOItx0THucfp96lx-OIXdBC7RAjbbHg9j_PhHz7ZHatkojMX0MHIWflRccT9WjCfHwV0ZGxenwnA9vFQ43kxDbGiu_uKl9FA9ZyIoQbHmmc_CenusmU\")" }}></div>
<div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6" data-alt="User avatar 1" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAqK-7fpGNCDFZCnQqbDKE-JCR-R2aH_nagcSyhxPV5tCNFBOoD3pnyHzkjh3oaPEWNBJJQCI4GuA3ZUSXSzOpo8EKO2QiA4eY18Ksq9sje6Mygz1jCfoHdgzGNgusgPiKiE2wFrgweAHRRwaAKhqc9oQynilSNH7UxndxcqV1jGecEAbfZ3pxEL0hxdEpuCxeRPZnXkORx5EY5gqdUqjgpiTpaz0bfhWZ2qFz1YG6abSfoFRlVGwUJ9IAdTHzBp_ZZL53E_00EjN4\")" }}></div>
</div>
</div>
<div className="flex flex-col justify-center flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-0.5">
<p className="text-[#111813] text-sm font-bold truncate">Alex Rivard</p>
<p className="text-[#61896f] text-[11px] font-normal shrink-0">10:30</p>
</div>
<p className="text-[#111813] text-xs font-medium line-clamp-1">Este item ainda está disponível para venda?</p>
<p className="text-[#61896f] text-[11px] mt-0.5 truncate">Câmera Vintage Canon AE-1...</p>
</div>
</div>
<div className="flex items-center gap-4 hover:bg-[#f6f8f6] px-4 min-h-[80px] py-3 cursor-pointer transition-colors border-b border-[#f0f4f2]/50 ">
<div className="relative shrink-0">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14" data-alt="Product thumbnail designer bag" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDF__ot_9K2ptX9rN-77cin38ziALGLGW2PtThhSq7pLiX5D2q3SufuRicst-S68Fz76BQxqn6Q9zw75pBzWJLFJF2egLy5pmSJ5_0cgVxbceW__nstazA2cT4TibAkEzEJ4I1UZOF3ti9SWzNrQ2ccTVleRNQOc0czSfhl7WeOdDbg3uMXp0xcUlTIuPXLY-ff2aNVr6Ew6IWgTY9qpbGkptPUnU80w1I3DtD2A5RykAsmc0DmaS1qqax8fIPNDge0Tkj4ozZuffs\")" }}></div>
<div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6" data-alt="User avatar 2" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDAXiPiPRAOwZ97qc2z-ZaX6u4bIH12u6ccme7CMViDY6XOyeCMssbKofVXAQ2VC1d-joFO3GA1dZ0_k2TubcN8on1Jnl9miOYYYEwob64shBHBbiuwtJJ8KGCUnwI2bNK0N-Bcw6zr9_4MJDFOvMUgHTekdpkuU7GDUBHhpTHxzJYVsY-NwjnZT8y03GH9W_unzzMkwMoTToum6bz5Z3hvUIJZnUq3OJ-W1vuxUB5wdBnQD72SdF0cpC62K53OrquVli4WxDQPMys\")" }}></div>
</div>
</div>
<div className="flex flex-col justify-center flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-0.5">
<p className="text-[#111813] text-sm font-bold truncate">Sarah Mitchell</p>
<p className="text-[#61896f] text-[11px] font-normal shrink-0">Ontem</p>
</div>
<div className="flex justify-between items-center">
<p className="text-[#61896f] text-xs line-clamp-1">Posso oferecer R$ 45 por esta bolsa.</p>
<div className="size-2 rounded-full bg-primary shrink-0 ml-2"></div>
</div>
<p className="text-[#61896f] text-[11px] mt-0.5 truncate">Bolsa de Couro</p>
</div>
</div>
<div className="flex items-center gap-4 hover:bg-[#f6f8f6] px-4 min-h-[80px] py-3 cursor-pointer transition-colors border-b border-[#f0f4f2]/50 ">
<div className="relative shrink-0">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14" data-alt="Product thumbnail denim jacket" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuBrRAL8nVNR46NpbpG6EzcrVsy6xAAoa5yEAEu5o5jnnp2S5ZyquFU8KfDJLm5wrMiBwRbu7q68kNewghPunXPRFKiOQ-kbNS00NLIZmkbpqiEaoG_9sFYSnlYy5GoEwKNjh3FQT6eKvWJWphIld3PPKR_G-lLo__ejB_Nrlf3Xnj19ELE3J2iHGh_gJb_WfDgvr2S5ePM2EDLXwKumba78azJnYvVG_hVhuHysU9dLQntOZfumj2vfXlwVGX4F3IJRCP0Ik4eoopw\")" }}></div>
<div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6" data-alt="User avatar 3" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDfU1UsecXQEVYZaYmd5ojktiiS48YZyXa6jLG8z_2EgpISvhxYXwsXv12ofT-4WfK3b1_IGKOG1iYsBPypwQ4frPeFqdQi-R9MtGjw2m7oEX2tEhHAJIPn3rpRtRZPQtA3cNOvInY4FsTHnF_BD7pIBf5M4YXnoqgJdmx1x0VVmTydvvqmVLppw3qQA_ud3jyQ9j2pO3HDCbpcfwgkk1xbBAxfqwgK-eH3S5CkK9hSI9WtOeYa6KWeLpOBq-tosEJF3UKaJ-vRIM4\")" }}></div>
</div>
</div>
<div className="flex flex-col justify-center flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-0.5">
<p className="text-[#111813] text-sm font-bold truncate">John Doe</p>
<p className="text-[#61896f] text-[11px] font-normal shrink-0">12 Ago</p>
</div>
<p className="text-[#61896f] text-xs line-clamp-1">Obrigado! Recebi hoje.</p>
<p className="text-[#61896f] text-[11px] mt-0.5 truncate">Jaqueta Jeans Oversized</p>
</div>
</div>
<div className="flex items-center gap-4 hover:bg-[#f6f8f6] px-4 min-h-[80px] py-3 cursor-pointer transition-colors border-b border-[#f0f4f2]/50 ">
<div className="relative shrink-0">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 grayscale" data-alt="Product thumbnail sneakers" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAVmrRx0MFRTtNlj7NEs1NL-vowWAmug1H17jwQ7VbRYpEf975F9XjQuKO1koMHDRponuIzwPK31OO78Rr2ZQdSC1n8-VRkzBFgY1OkHA508DfnyS15IqRA9kIjBZJS2q3PWywtPQ0e76s91tJxxYWcuImbgIH-pTRIzlkn5YCxUVZ0g0Mv0lb546oZsxcP4ofT-EnKtyZ5cWdaoRzgBBEC4HF1A_Kfgn3v_tsTuW6xc-N8O3GM4BRZqD7FKLNb_TnNZZrYUmGuW8s\")" }}></div>
<div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-6" data-alt="User avatar 4" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAEh4BmmbgS5r5Gc8TDiiOz5IJsEoF6_MZ0kPET-gm0K-8R0EE--Z37U-kxWrwjleEaNGH9d2IEN0r4bvj0BM1u3bqHAieRcbn7t5JIbqpwPRzoBKhxF6yKVzRH2Ds0svnL83AHZZ1Jmc4_FcCv5TBnVYsJ3zIg_Hj4wGqSO1dkL0EzLNqqsOoaSzeOF3WKVjQnu_xt1LJo9lNoceimgGzDHXWEUzpJCYAP3RVJjzgQsTAgMh49VBZbCl7VQ8hEaPB8issD3UKiTlY\")" }}></div>
</div>
</div>
<div className="flex flex-col justify-center flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-0.5">
<p className="text-[#111813] text-sm font-bold truncate">Sistema</p>
<p className="text-[#61896f] text-[11px] font-normal shrink-0">10 Ago</p>
</div>
<p className="text-[#61896f] text-xs line-clamp-1">Seu pedido foi entregue.</p>
<p className="text-red-500 text-[11px] mt-0.5 truncate">Vendido: Nike Air Force 1</p>
</div>
</div>
</div>
</aside>
<section className="flex-1 flex flex-col bg-[#fdfdfd] relative">
<div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
<div className="flex justify-center">
<span className="px-3 py-1 rounded-full bg-[#f0f4f2] text-[10px] text-[#61896f] font-bold uppercase tracking-wider">Hoje</span>
</div>
<div className="flex gap-3 max-w-[80%]">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" data-alt="Sender avatar" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAG_uHBtfHM8go1OGY8zVK_eWy6pKYKI-zIi-WklDhilq4-2NHxBY1jI9MP9ypkdzFDxy-HRUUF04wPLCyXlrjIWlW5XVFrRRCRT37jL0ZopbnL6mcjXJqN4BhOquxCHWogkGZkwDc9M12KKk_pgI_iSq95utxXTosa5OYaYz83he6mxaBOuJkwoM6kRHlhkFbm7tMIDBvkuCj7sqS8PGBlaYvcGFLKSo0FEuiQSJjb0yBbsjGMttHHGHYCoocrDrG-5nF8NWvaAZw\")" }}></div>
<div>
<p className="text-[10px] text-[#61896f] mb-1 ml-1 font-bold">Comprador</p>
<div className="bg-[#f0f4f2] p-3 rounded-xl rounded-tl-none">
<p className="text-sm text-[#111813] leading-relaxed">Olá! Estou muito interessado nesta câmera. A lente está limpa e sem fungos? Além disso, o fotômetro ainda funciona?</p>
</div>
<p className="text-[10px] text-[#61896f] mt-1 ml-1">10:30</p>
</div>
</div>
<div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" data-alt="My avatar" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuCAwKEyCA_KqWPK9poE8XsDO0ANoW9hm-vPibvol1V7XKD-oW-Z3oWk6BZdUBfVWKi1ayAnGCqt8vKsoGG4bP72ZYrUEzaB6hlx_VXCbx0LYOingsj-0ahMFQaq4PXm-PoJoWq_Ddg90wFt9zjQYLhusNJcqt3oP1webnTvpEdDYN3Bu1ac00S5ucTKChvA6D9UZoW0qEqTCGwGdsSdZY0BGc9pZ0eAiJdJto1VmELkY3E79Mtz0vZWnFqBZCnfXYfY-nw69wgLEyI\")" }}></div>
<div className="flex flex-col items-end">
<p className="text-[10px] text-[#61896f] mb-1 mr-1 font-bold">Vendedor</p>
<div className="bg-primary/20 p-3 rounded-xl rounded-tr-none border border-primary/20">
<p className="text-sm text-[#111813] leading-relaxed">Olá! Sim, a lente está em excelente estado, completamente limpa. O fotômetro foi testado na semana passada com uma bateria nova e funciona perfeitamente!</p>
</div>
<div className="flex items-center gap-1 mt-1 mr-1">
<p className="text-[10px] text-[#61896f]">10:32</p>
<span className="material-symbols-outlined !text-[14px] text-primary">done_all</span>
</div>
</div>
</div>
<div className="flex flex-col items-center gap-2 py-2">
<div className="h-px w-full max-w-[200px] bg-[#f0f4f2] "></div>
<p className="text-[11px] text-[#61896f] font-medium italic">Alex está digitando...</p>
</div>
<div className="flex gap-3 max-w-[80%]">
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mt-1" data-alt="Sender avatar" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuCyNa1DmcgZXpRcKJAOspmxRJRy4Gmm7ioWskT9WrztRRNTm1JaixEQMMWKhL4YAepwntC_FbJalAm4FjuRnuKSw4EbdVgaRyl05Fq0OJyP__UD7faYd41gglt5JRBYB5xIacbQOp-8WpYHRMhX7xFPNQA29a8n3mnpUePLpaTlofsS2qPpfqOkeXSePqC-42cPZGNY7VVO0jvbdmAyzRwsTquu-8M0xYt2AnymaLLl8SymDes9I-vK_z4-nv4FEbj9OuHo2t5jnqw\")" }}></div>
<div>
<div className="bg-[#f0f4f2] p-3 rounded-xl rounded-tl-none">
<p className="text-sm text-[#111813] leading-relaxed">Isso soa ótimo! Você estaria disposto a enviar hoje se eu comprar agora?</p>
</div>
<p className="text-[10px] text-[#61896f] mt-1 ml-1">10:35</p>
</div>
</div>
</div>
<footer className="p-4 bg-white border-t border-[#f0f4f2] ">
<div className="flex items-center gap-3">
<button className="p-2 text-[#61896f] hover:text-[#111813] transition-colors">
<span className="material-symbols-outlined">add_circle</span>
</button>
<div className="flex-1 relative">
<textarea className="w-full bg-[#f0f4f2] border-none rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary/50 resize-none max-h-32 placeholder:text-[#61896f]" placeholder="Escreva uma mensagem..." rows="1"></textarea>
</div>
<button className="p-2 text-[#61896f] hover:text-[#111813] transition-colors">
<span className="material-symbols-outlined">sentiment_satisfied</span>
</button>
<button className="bg-primary text-[#111813] size-10 flex items-center justify-center rounded-xl shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
<span className="material-symbols-outlined !text-[20px] font-bold">send</span>
</button>
</div>
<div className="flex gap-4 mt-2 ml-10">
<button className="text-[11px] font-bold text-[#61896f] hover:text-primary transition-colors flex items-center gap-1">
<span className="material-symbols-outlined !text-[14px]">image</span>
                            Adicionar Foto
                        </button>
<button className="text-[11px] font-bold text-[#61896f] hover:text-primary transition-colors flex items-center gap-1">
<span className="material-symbols-outlined !text-[14px]">sell</span>
                            Enviar Oferta
                        </button>
</div>
</footer>
</section>
</div>
</main>
    </>
  );
}
