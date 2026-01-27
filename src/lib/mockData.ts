export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  brand: string;
  size: string;
  condition: string;
  image: string;
  seller: string;
  category: string;
  subcategory: string;
  badge?: string;
};

export type Order = {
  id: string;
  productId: string;
  status: "Em processamento" | "Enviado" | "Entregue";
  createdAt: string;
};

export const products: Product[] = [
  {
    id: "p1",
    title: "Casaco vintage",
    price: 45.0,
    currency: "EUR",
    brand: "Levis",
    size: "M",
    condition: "Excelente",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3HdGGVkEX23orQ6o6IiJgeGY0SxWhv79JeUfTJTHe2Yslt4xCKLwTAbchgXFs66VIFQtfZxjPEv2oVqPuyJZAMxcUpoHAtQhPddpVEZZKoC29JJS42hxr3SxnDwMDYVbwOi_Ooq30MJTxMZlF67-JTfsSUf4NQER8J5X_5GcuIoAfOYZReBI9LEsAaCPKNJZzcyB-BLsDdUqYMw3xUYwLcix6xE8lYEdLHyoFsIO9cTZzqIe-ZjWbPTHTNu1rRZsIl3J-NAV8s_A",
    seller: "alexa_styles",
    category: "moda",
    subcategory: "roupas",
    badge: "Novo",
  },
  {
    id: "p2",
    title: "Mala de couro",
    price: 120.0,
    currency: "EUR",
    brand: "Gucci Vintage",
    size: "U",
    condition: "Bom",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABnva2RnRw7vvw_aHhRQen2A_PcrdzK3Ep3AJ0mnocUtwvuP_tIbvZdmN5nK5avCTm5gDbOXhoZbl0Q-tfMp7pVYsM5ieIMrAkKNwO9nXvJh-H3TGhWhXrqwO13VjJbkuZyuNOfv7wXwY76Y7Uxxa4PhZMsXRoPwn94yYRmm41AqpjDEugvpnWEThjRKdHGVTPtgem2NAXK5NY84SSH0yL7QsHL3j4iDM0adPCYN4_F_j_CJ_VrL2z-ru2otYNrDDNY4zdAuj7YA8",
    seller: "vntg_collector",
    category: "moda",
    subcategory: "acessorios",
  },
  {
    id: "p3",
    title: "Tênis de corrida",
    price: 89.99,
    currency: "EUR",
    brand: "Nike",
    size: "42",
    condition: "Novo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkK9duroBBdrmYT4W1wKbThQ9vwZ1a7LeaLBWYg6LUcKYTLruEhOQP5iJgmvR42DLoGunollvZRXlaBFT7Dvf7iISe4whbSI_azk0bppsaBAuc3XqquiqvO-Rh3ZUrmhUN5jHfVdmf3Sq7aZUE2oEH55auhjRke8bEo7Kz9exyHA8mk16to2tuZv2Dvrl-LTE5aVK6SQ7FegTXaH4wTHfhXbWJ7AaesLRovCl_9Xhqxn4RicAwFUmtuDg4jRWBceMq80USkBAmDbU",
    seller: "kicks_hub",
    category: "moda",
    subcategory: "calcados",
  },
  {
    id: "p4",
    title: "T-shirt preta",
    price: 25.0,
    currency: "EUR",
    brand: "Everlane",
    size: "S",
    condition: "Muito bom",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh_DVVi6W_asDXhaTy4QCXmH8tygN4FEKq5nc2O0Fkm2pr2SZIwSZsWI0cLs3yy4mqFbJ8zncFFgbDbyATG2weOOduf1VtLQALncmP-jKEHInk1aXO4MvWnbgcS5Hhxsq0RrjO1SWM9qlYn2Zenhjyo46fZf81wHqeDra7QwrmM40fFZRzilxTxxeqmsXSWV-Q4tdLgqDZu9DG0_v5kAnKvTk_PohNcTj3U4oxuFfPZJZKN2r-5-cXjP4kQsk36ivGur1vvnXJzUg",
    seller: "minimal_closet",
    category: "moda",
    subcategory: "roupas",
  },
  {
    id: "p5",
    title: "Blazer azul",
    price: 65.0,
    currency: "EUR",
    brand: "Zara",
    size: "M",
    condition: "Excelente",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBda8ical1l8kRlKA91gD3lj9Sm0Ft407YkciFBpEwoISdNB0TgAx3XCNFB6rommzw7UzpHowT1ElQmS0QlWn5n04hUNVlOrtxkPzmJfM-jKVKX0TkV_h31cUO-QEF2VsFLgWcN8cK8qanUs4y1Txh5R-E7pbacTK-0ut-0nOFVpSUAcq-LNAugpsSIW_kcOLUDX9kgZ_bofzuePyi7yGaCmCfZKzA-jCgRs-rkRezbE2WNxKVazJyJIjKwzfFkluOJHmYHiuW8m1I",
    seller: "gent_wear",
    category: "moda",
    subcategory: "roupas",
  },
  {
    id: "p6",
    title: "Geladeira inox 400L",
    price: 350.0,
    currency: "EUR",
    brand: "Brastemp",
    size: "400L",
    condition: "Bom",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    seller: "casa_pratica",
    category: "casa",
    subcategory: "eletrodomesticos",
  },
  {
    id: "p7",
    title: "Smart TV 55\"",
    price: 420.0,
    currency: "EUR",
    brand: "Samsung",
    size: "55\"",
    condition: "Muito bom",
    image:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1200&auto=format&fit=crop",
    seller: "eletronicos_eco",
    category: "eletronicos",
    subcategory: "tvs",
  },
  {
    id: "p8",
    title: "Notebook ultrafino 14\"",
    price: 620.0,
    currency: "EUR",
    brand: "Lenovo",
    size: "14\"",
    condition: "Excelente",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    seller: "tech_house",
    category: "eletronicos",
    subcategory: "notebooks",
  },
  {
    id: "p9",
    title: "Sofá 3 lugares",
    price: 250.0,
    currency: "EUR",
    brand: "TokStok",
    size: "3L",
    condition: "Bom",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
    seller: "decor_hub",
    category: "casa",
    subcategory: "moveis",
  },
  {
    id: "p10",
    title: "Bicicleta urbana",
    price: 180.0,
    currency: "EUR",
    brand: "Caloi",
    size: "M",
    condition: "Bom",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
    seller: "sport_lab",
    category: "esporte",
    subcategory: "ciclismo",
  },
  {
    id: "p11",
    title: "Kit livros clássicos",
    price: 60.0,
    currency: "EUR",
    brand: "Coleção",
    size: "Único",
    condition: "Muito bom",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    seller: "livraria_sol",
    category: "livros",
    subcategory: "colecoes",
  },
  {
    id: "p12",
    title: "Peças automotivas (kit)",
    price: 90.0,
    currency: "EUR",
    brand: "Bosch",
    size: "Kit",
    condition: "Novo",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop",
    seller: "auto_parts",
    category: "automotivo",
    subcategory: "pecas",
  },
];
