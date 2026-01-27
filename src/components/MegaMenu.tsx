"use client";

import { useState, useRef, useEffect } from "react";

// Ícones SVG inline
const icons = {
  grid: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  dress: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 8v12a2 2 0 002 2h14a2 2 0 002-2V8l-3-6H6z" />
      <path d="M3 8h18" />
      <path d="M12 12v6" />
    </svg>
  ),
  shoe: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15l3-3 2 1 4-3 7 3v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
      <path d="M4 15V9a2 2 0 012-2h1l2 3" />
    </svg>
  ),
  bag: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  sparkle: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
    </svg>
  ),
  lipstick: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3h6v4l-1 1v4H10v-4L9 7V3z" />
      <rect x="8" y="12" width="8" height="9" rx="1" />
    </svg>
  ),
  chevron: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
};

// Estrutura de dados com subcategorias e items
const menuData: Record<
  string,
  {
    title: string;
    subcategories: {
      name: string;
      icon: keyof typeof icons;
      items: string[];
    }[];
  }
> = {
  mulher: {
    title: "Mulher",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Roupa", icon: "dress", items: ["Tudo", "Vestidos", "Blusas e Camisas", "Calças e Leggings", "Saias", "Jaquetas e Casacos", "Moletons e Sweaters", "Conjuntos", "Macacões", "Lingerie", "Vestuário de Banho", "Roupas Fitness"] },
      { name: "Calçado", icon: "shoe", items: ["Tudo", "Tênis", "Saltos", "Botas", "Sandálias", "Sapatilhas", "Chinelos", "Mocassins"] },
      { name: "Bolsas", icon: "bag", items: ["Tudo", "Bolsas de Mão", "Bolsas de Ombro", "Mochilas", "Carteiras", "Clutches", "Bolsas de Praia"] },
      { name: "Acessórios", icon: "sparkle", items: ["Tudo", "Bijuterias", "Relógios", "Óculos de Sol", "Cintos", "Lenços e Cachecóis", "Chapéus", "Luvas"] },
      { name: "Beleza", icon: "lipstick", items: ["Tudo", "Maquiagem", "Cuidados com a Pele", "Perfumes", "Cabelo", "Unhas"] },
    ],
  },
  homem: {
    title: "Homem",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Roupa", icon: "dress", items: ["Tudo", "Camisetas", "Camisas", "Calças", "Bermudas", "Jaquetas e Casacos", "Moletons", "Ternos e Blazers", "Cuecas", "Vestuário de Banho", "Roupas Fitness"] },
      { name: "Calçado", icon: "shoe", items: ["Tudo", "Tênis", "Sapatos Sociais", "Botas", "Chinelos", "Mocassins", "Sandálias"] },
      { name: "Bolsas", icon: "bag", items: ["Tudo", "Mochilas", "Pastas", "Carteiras", "Pochetes", "Malas de Viagem"] },
      { name: "Acessórios", icon: "sparkle", items: ["Tudo", "Relógios", "Óculos de Sol", "Cintos", "Gravatas", "Bonés e Chapéus", "Luvas"] },
      { name: "Beleza", icon: "lipstick", items: ["Tudo", "Perfumes", "Cuidados com a Barba", "Cuidados com a Pele", "Cabelo"] },
    ],
  },
  crianca: {
    title: "Criança",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Meninas", icon: "dress", items: ["Tudo", "Vestidos", "Blusas", "Calças", "Saias", "Casacos", "Conjuntos", "Pijamas"] },
      { name: "Meninos", icon: "dress", items: ["Tudo", "Camisetas", "Camisas", "Calças", "Bermudas", "Casacos", "Conjuntos", "Pijamas"] },
      { name: "Bebês", icon: "sparkle", items: ["Tudo", "Bodies", "Macacões", "Conjuntos", "Sapatinhos", "Acessórios", "Enxoval"] },
      { name: "Calçados", icon: "shoe", items: ["Tudo", "Tênis", "Sandálias", "Botas", "Sapatilhas", "Chinelos"] },
      { name: "Acessórios", icon: "bag", items: ["Tudo", "Mochilas", "Bonés", "Óculos", "Relógios", "Bijuterias"] },
    ],
  },
  casa: {
    title: "Casa",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Decoração", icon: "sparkle", items: ["Tudo", "Quadros", "Vasos", "Velas", "Almofadas", "Tapetes", "Espelhos", "Esculturas"] },
      { name: "Cozinha", icon: "grid", items: ["Tudo", "Utensílios", "Louças", "Panelas", "Eletrodomésticos", "Copos e Taças", "Talheres"] },
      { name: "Cama e Banho", icon: "dress", items: ["Tudo", "Lençóis", "Toalhas", "Edredons", "Travesseiros", "Cortinas", "Tapetes de Banho"] },
      { name: "Móveis", icon: "bag", items: ["Tudo", "Mesas", "Cadeiras", "Estantes", "Cômodas", "Sofás", "Camas"] },
    ],
  },
  entretenimento: {
    title: "Entretenimento",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Livros", icon: "grid", items: ["Tudo", "Ficção", "Não-ficção", "Infantil", "Didáticos", "HQs e Mangás", "Romance", "Suspense"] },
      { name: "Filmes e Séries", icon: "sparkle", items: ["Tudo", "DVDs", "Blu-rays", "Box Sets", "Coleções", "Edições Especiais"] },
      { name: "Música", icon: "sparkle", items: ["Tudo", "CDs", "Vinis", "K-Pop", "Edições Limitadas", "Coleções"] },
      { name: "Games", icon: "grid", items: ["Tudo", "PlayStation", "Xbox", "Nintendo", "PC", "Consoles", "Acessórios"] },
      { name: "Colecionáveis", icon: "sparkle", items: ["Tudo", "Action Figures", "Funko Pop", "Cards", "Antiguidades", "Memorabilia"] },
    ],
  },
  hobbies: {
    title: "Hobbies",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Instrumentos", icon: "sparkle", items: ["Tudo", "Violões", "Guitarras", "Teclados", "Percussão", "Sopro", "Cordas", "Acessórios"] },
      { name: "Arte", icon: "lipstick", items: ["Tudo", "Tintas", "Pincéis", "Telas", "Lápis e Canetas", "Papéis", "Kits de Arte"] },
      { name: "Artesanato", icon: "sparkle", items: ["Tudo", "Tecidos", "Linhas e Lãs", "Miçangas", "Ferramentas", "Kits DIY"] },
      { name: "Jardinagem", icon: "grid", items: ["Tudo", "Ferramentas", "Vasos", "Sementes", "Substratos", "Decoração de Jardim"] },
      { name: "Fotografia", icon: "grid", items: ["Tudo", "Câmeras", "Lentes", "Tripés", "Iluminação", "Acessórios"] },
    ],
  },
  esportes: {
    title: "Esportes",
    subcategories: [
      { name: "Tudo", icon: "grid", items: [] },
      { name: "Fitness", icon: "dress", items: ["Tudo", "Roupas Fitness", "Tênis", "Equipamentos", "Acessórios", "Suplementos"] },
      { name: "Futebol", icon: "grid", items: ["Tudo", "Camisas", "Chuteiras", "Bolas", "Caneleiras", "Acessórios"] },
      { name: "Natação", icon: "grid", items: ["Tudo", "Maiôs", "Sungas", "Óculos", "Toucas", "Acessórios"] },
      { name: "Ciclismo", icon: "grid", items: ["Tudo", "Bicicletas", "Capacetes", "Roupas", "Acessórios", "Peças"] },
      { name: "Tênis", icon: "grid", items: ["Tudo", "Raquetes", "Bolas", "Calçados", "Roupas", "Acessórios"] },
    ],
  },
};

export function MegaMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setHoveredSubcategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(key);
    // Define primeira subcategoria com items como padrão
    const firstWithItems = menuData[key].subcategories.find(s => s.items.length > 0);
    if (firstWithItems) setHoveredSubcategory(firstWithItems.name);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setHoveredSubcategory(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div ref={menuRef} className="bg-white border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-1">
          {Object.entries(menuData).map(([key, category]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => handleMenuEnter(key)}
              onMouseLeave={handleMenuLeave}
            >
              <button
                onClick={() => {
                  if (openMenu === key) {
                    setOpenMenu(null);
                    setHoveredSubcategory(null);
                  } else {
                    handleMenuEnter(key);
                  }
                }}
                className={`px-5 py-3.5 text-sm font-medium transition-colors ${
                  openMenu === key
                    ? "text-[#09B1A0] border-b-2 border-[#09B1A0] -mb-[2px]"
                    : "text-gray-700 hover:text-[#09B1A0]"
                }`}
              >
                {category.title}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Dropdown - Fixed position para não causar "pulo" */}
      {openMenu && (
        <div
          className="absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-100 z-[9999]"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleMenuLeave}
        >
          <div className="max-w-7xl mx-auto flex min-h-[320px]">
            {/* Menu lateral esquerdo com ícones */}
            <div className="w-72 border-r border-gray-100 py-5">
              {menuData[openMenu].subcategories.map((subcat) => (
                <a
                  key={subcat.name}
                  href={subcat.name === "Tudo" ? `/buscar?categoria=${openMenu}` : `/buscar?categoria=${openMenu}&sub=${encodeURIComponent(subcat.name.toLowerCase())}`}
                  className={`flex items-center justify-between px-7 py-3.5 transition-all ${
                    hoveredSubcategory === subcat.name
                      ? "bg-gray-50 text-[#09B1A0] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoveredSubcategory(subcat.name)}
                >
                  <span className="flex items-center gap-4">
                    <span className={`transition-colors ${hoveredSubcategory === subcat.name ? "text-[#09B1A0]" : "text-gray-400"}`}>
                      {icons[subcat.icon]}
                    </span>
                    <span className="text-[15px]">{subcat.name}</span>
                  </span>
                  {subcat.items.length > 0 && (
                    <span className={`transition-colors ${hoveredSubcategory === subcat.name ? "text-[#09B1A0]" : "text-gray-300"}`}>
                      {icons.chevron}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Painel de items à direita */}
            <div className="flex-1 py-5 px-10">
              {hoveredSubcategory && menuData[openMenu].subcategories.find(s => s.name === hoveredSubcategory)?.items.length ? (
                <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                  {menuData[openMenu].subcategories
                    .find(s => s.name === hoveredSubcategory)
                    ?.items.map((item, idx) => (
                      <a
                        key={item}
                        href={`/buscar?categoria=${openMenu}&sub=${encodeURIComponent(hoveredSubcategory.toLowerCase())}&item=${encodeURIComponent(item.toLowerCase())}`}
                        className={`py-2.5 transition-colors ${
                          item === "Tudo" 
                            ? "text-[15px] font-semibold text-gray-900 hover:text-[#09B1A0]" 
                            : "text-[15px] text-gray-600 hover:text-[#09B1A0]"
                        }`}
                      >
                        {item}
                      </a>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span className="text-sm">Passe o mouse em uma categoria</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
