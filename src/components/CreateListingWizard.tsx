"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { uploadProductImages } from "@/lib/storage";
import { createProduct, getRootCategories, getSubcategories } from "@/lib/products";
import type { Category } from "@/types/database";

const STEP_LABELS = ["Fotos", "Detalhes", "Atributos", "Preço"];

type ImageItem = {
  id: string;
  url: string;
  file?: File;
};

export function CreateListingWizard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState(0);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  // Categorias hardcoded temporárias (até popular o banco)
  const tempCategories = [
    { id: "mulher", name: "Mulher", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "homem", name: "Homem", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "crianca", name: "Criança", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "casa", name: "Casa", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "entretenimento", name: "Entretenimento", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "hobbies", name: "Hobbies", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
    { id: "esportes", name: "Esportes", created_at: new Date().toISOString(), parent_id: null, attribute_group_id: null },
  ];

  const tempSubcategories: Record<string, Category[]> = {
    mulher: [
      { id: "roupa", name: "Roupa", created_at: new Date().toISOString(), parent_id: "mulher", attribute_group_id: null },
      { id: "calcado", name: "Calçado", created_at: new Date().toISOString(), parent_id: "mulher", attribute_group_id: null },
      { id: "bolsas", name: "Bolsas", created_at: new Date().toISOString(), parent_id: "mulher", attribute_group_id: null },
      { id: "acessorios", name: "Acessórios", created_at: new Date().toISOString(), parent_id: "mulher", attribute_group_id: null },
      { id: "beleza", name: "Beleza", created_at: new Date().toISOString(), parent_id: "mulher", attribute_group_id: null },
    ],
    homem: [
      { id: "roupa-homem", name: "Roupa", created_at: new Date().toISOString(), parent_id: "homem", attribute_group_id: null },
      { id: "calcado-homem", name: "Calçado", created_at: new Date().toISOString(), parent_id: "homem", attribute_group_id: null },
      { id: "bolsas-homem", name: "Bolsas", created_at: new Date().toISOString(), parent_id: "homem", attribute_group_id: null },
      { id: "acessorios-homem", name: "Acessórios", created_at: new Date().toISOString(), parent_id: "homem", attribute_group_id: null },
    ],
    crianca: [
      { id: "meninas", name: "Meninas", created_at: new Date().toISOString(), parent_id: "crianca", attribute_group_id: null },
      { id: "meninos", name: "Meninos", created_at: new Date().toISOString(), parent_id: "crianca", attribute_group_id: null },
      { id: "bebes", name: "Bebês", created_at: new Date().toISOString(), parent_id: "crianca", attribute_group_id: null },
      { id: "calcados-crianca", name: "Calçados", created_at: new Date().toISOString(), parent_id: "crianca", attribute_group_id: null },
    ],
    casa: [
      { id: "decoracao", name: "Decoração", created_at: new Date().toISOString(), parent_id: "casa", attribute_group_id: null },
      { id: "cozinha", name: "Cozinha", created_at: new Date().toISOString(), parent_id: "casa", attribute_group_id: null },
      { id: "cama-banho", name: "Cama e Banho", created_at: new Date().toISOString(), parent_id: "casa", attribute_group_id: null },
      { id: "moveis", name: "Móveis", created_at: new Date().toISOString(), parent_id: "casa", attribute_group_id: null },
    ],
    entretenimento: [
      { id: "livros", name: "Livros", created_at: new Date().toISOString(), parent_id: "entretenimento", attribute_group_id: null },
      { id: "filmes", name: "Filmes e Séries", created_at: new Date().toISOString(), parent_id: "entretenimento", attribute_group_id: null },
      { id: "musica", name: "Música", created_at: new Date().toISOString(), parent_id: "entretenimento", attribute_group_id: null },
      { id: "games", name: "Games", created_at: new Date().toISOString(), parent_id: "entretenimento", attribute_group_id: null },
    ],
    hobbies: [
      { id: "instrumentos", name: "Instrumentos", created_at: new Date().toISOString(), parent_id: "hobbies", attribute_group_id: null },
      { id: "arte", name: "Arte", created_at: new Date().toISOString(), parent_id: "hobbies", attribute_group_id: null },
      { id: "artesanato", name: "Artesanato", created_at: new Date().toISOString(), parent_id: "hobbies", attribute_group_id: null },
      { id: "jardinagem", name: "Jardinagem", created_at: new Date().toISOString(), parent_id: "hobbies", attribute_group_id: null },
    ],
    esportes: [
      { id: "fitness", name: "Fitness", created_at: new Date().toISOString(), parent_id: "esportes", attribute_group_id: null },
      { id: "futebol", name: "Futebol", created_at: new Date().toISOString(), parent_id: "esportes", attribute_group_id: null },
      { id: "natacao", name: "Natação", created_at: new Date().toISOString(), parent_id: "esportes", attribute_group_id: null },
      { id: "ciclismo", name: "Ciclismo", created_at: new Date().toISOString(), parent_id: "esportes", attribute_group_id: null },
    ],
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/entrar");
    }
  }, [authLoading, isAuthenticated, router]);

  // Carregar categorias principais
  useEffect(() => {
    async function loadCategories() {
      const cats = await getRootCategories();
      // Se não houver categorias no banco, usar as temporárias
      if (cats.length === 0) {
        console.log("[CreateListingWizard] Banco vazio, usando categorias hardcoded");
        setCategories(tempCategories);
      } else {
        console.log("[CreateListingWizard] Categorias carregadas do banco:", cats.length);
        setCategories(cats);
      }
    }
    loadCategories();
  }, []);

  // Carregar subcategorias quando categoria muda
  useEffect(() => {
    async function loadSubcategories() {
      if (categoryId) {
        const subs = await getSubcategories(categoryId);
        // Se não houver subcategorias no banco, usar as temporárias
        if (subs.length === 0 && tempSubcategories[categoryId]) {
          console.log("[CreateListingWizard] Usando subcategorias hardcoded para:", categoryId);
          setSubcategories(tempSubcategories[categoryId]);
        } else {
          console.log("[CreateListingWizard] Subcategorias carregadas do banco:", subs.length);
          setSubcategories(subs);
        }
        setSubcategoryId("");
      } else {
        setSubcategories([]);
      }
    }
    loadSubcategories();
  }, [categoryId]);

  const progress = useMemo(() => ((step + 1) / STEP_LABELS.length) * 100, [step]);

  const canProceed = useMemo(() => {
    if (step === 0) {
      return images.length > 0;
    }
    if (step === 1) {
      return title.trim().length > 2 && description.trim().length > 10;
    }
    if (step === 2) {
      return (categoryId || subcategoryId) && condition;
    }
    if (step === 3) {
      return price.trim().length > 0 && parseFloat(price.replace(",", ".")) > 0;
    }
    return true;
  }, [step, images.length, title, description, categoryId, subcategoryId, condition, price]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, Math.max(0, 20 - images.length))
      .map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        url: URL.createObjectURL(file),
        file,
      }));

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id);
      if (image?.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (!user || !canProceed || isSubmitting) return;

    console.log('[CreateListingWizard] Iniciando publicação com user.id:', user.id);

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload das imagens
      const filesToUpload = images
        .filter((img) => img.file)
        .map((img) => img.file as File);

      let imageUrls: string[] = [];

      if (filesToUpload.length > 0) {
        console.log('[CreateListingWizard] Fazendo upload de', filesToUpload.length, 'imagens');
        imageUrls = await uploadProductImages(filesToUpload, user.id);

        if (imageUrls.length === 0) {
          throw new Error("Falha ao fazer upload das imagens");
        }
        console.log('[CreateListingWizard] Upload concluído:', imageUrls.length, 'imagens');
      }

      // 2. Criar o produto
      const priceNumber = parseFloat(price.replace(",", "."));
      const finalCategoryId = subcategoryId || categoryId;

      if (!finalCategoryId) {
        throw new Error("Selecione uma categoria");
      }

      console.log('[CreateListingWizard] Criando produto...');
      const product = await createProduct(user.id, {
        title,
        description,
        price: priceNumber,
        category_id: finalCategoryId,
        images: imageUrls,
        dynamic_attributes: {
          size,
          brand,
          condition,
        },
      });

      if (!product) {
        throw new Error("Falha ao criar o anúncio");
      }

      setSuccess(true);

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push(`/produto?id=${product.id}`);
      }, 2000);

    } catch (err) {
      console.error("Erro ao publicar:", err);
      setError(err instanceof Error ? err.message : "Erro ao publicar anúncio");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <main className="max-w-[960px] mx-auto px-4 py-10">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="max-w-[960px] mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Vender um item</h1>
          <span className="text-sm font-medium text-[#61896f]">Etapa {step + 1} de 4</span>
        </div>
        <div className="flex gap-2 h-2 rounded-full bg-[#dbe6df] overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-xs font-semibold text-[#61896f] uppercase tracking-wider">
          {STEP_LABELS.map((label, index) => (
            <span key={label} className={index === step ? "text-primary" : undefined}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div className="p-8">
          {/* Step 0: Fotos */}
          {step === 0 && (
            <>
              <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-xl font-bold">Adicione até 20 fotos</h2>
                <p className="text-[#61896f] text-sm">
                  Fotos nítidas e claras ajudam os compradores a encontrar seu item.
                  A primeira foto será a capa.
                </p>
              </div>
              <div
                className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#dbe6df] px-6 py-16 bg-background-light hover:border-primary transition-colors cursor-pointer group"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleFiles(event.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-lg font-bold">Arraste e solte suas fotos aqui</p>
                  <p className="text-sm text-[#61896f]">Suporta JPG, PNG, WebP até 5MB cada</p>
                </div>
                <button
                  className="flex items-center justify-center h-11 px-8 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:brightness-105 transition-all"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Selecionar do dispositivo
                </button>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                />
              </div>
              {images.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-[#61896f] uppercase tracking-wider mb-4">
                    Fotos selecionadas ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-lg bg-center bg-cover group border-2 border-transparent hover:border-primary transition-colors"
                        style={{ backgroundImage: `url("${image.url}")` }}
                      >
                        {index === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[#102216] text-[10px] font-bold rounded uppercase">
                            Capa
                          </div>
                        )}
                        <button
                          className="absolute top-2 right-2 size-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            removeImage(image.id);
                          }}
                        >
                          <span className="material-symbols-outlined text-sm text-red-500">delete</span>
                        </button>
                      </div>
                    ))}
                    {images.length < 20 && (
                      <button
                        className="aspect-square rounded-lg border-2 border-dashed border-[#dbe6df] flex items-center justify-center text-[#61896f] hover:border-primary hover:text-primary transition-all"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 1: Detalhes */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Detalhes do item</h2>
                <p className="text-sm text-[#61896f]">
                  Conte a história do item e destaque o que torna ele único.
                </p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Título do anúncio</span>
                <input
                  className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Ex: Jaqueta jeans vintage 90s"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Descrição</span>
                <textarea
                  className="min-h-[140px] rounded-lg border border-[#dbe6df] px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Descreva estado, medidas, detalhes e motivos da venda."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>
            </div>
          )}

          {/* Step 2: Atributos */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Atributos</h2>
                <p className="text-sm text-[#61896f]">Defina a categoria e características principais.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Categoria</span>
                  <select
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
                {subcategories.length > 0 && (
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Subcategoria</span>
                    <select
                      className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      value={subcategoryId}
                      onChange={(event) => setSubcategoryId(event.target.value)}
                    >
                      <option value="">Selecione (opcional)</option>
                      {subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Tamanho (opcional)</span>
                  <input
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Ex: M, 42, Único"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Marca (opcional)</span>
                  <input
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Ex: Zara, Nike"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-semibold">Condição</span>
                  <select
                    className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    value={condition}
                    onChange={(event) => setCondition(event.target.value)}
                  >
                    <option value="">Selecione a condição</option>
                    <option value="novo">Novo com etiqueta</option>
                    <option value="muito-bom">Muito bom</option>
                    <option value="bom">Bom</option>
                    <option value="satisfatorio">Satisfatório</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Preço */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Preço e publicação</h2>
                <p className="text-sm text-[#61896f]">Defina o valor final do seu anúncio.</p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Preço (R$)</span>
                <input
                  className="h-12 rounded-lg border border-[#dbe6df] px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Ex: 45,00"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  type="text"
                  inputMode="decimal"
                />
              </label>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-[#102216]">
                  Anúncio publicado com sucesso! Redirecionando...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer com botões */}
        <div className="px-8 py-5 bg-[#f9fafb] border-t border-[#e5e7eb] flex items-center justify-between">
          <button
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#61896f] hover:text-[#111813] transition-colors disabled:opacity-50"
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            disabled={step === 0 || isSubmitting}
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Voltar
          </button>
          {step < 3 ? (
            <button
              className="flex items-center gap-2 px-8 py-2.5 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
              disabled={!canProceed}
            >
              Próxima etapa
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-8 py-2.5 bg-primary text-[#102216] text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting || success}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">
                    <span className="material-symbols-outlined text-lg">progress_activity</span>
                  </span>
                  Publicando...
                </>
              ) : (
                <>
                  Publicar anúncio
                  <span className="material-symbols-outlined text-lg">campaign</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Dica */}
      <div className="fixed bottom-8 right-8 max-w-xs hidden lg:block">
        <div className="bg-primary text-[#102216] p-4 rounded-xl shadow-xl flex gap-4 items-start">
          <span className="material-symbols-outlined mt-0.5">lightbulb</span>
          <div>
            <p className="font-bold text-sm">Dica Pro</p>
            <p className="text-xs leading-relaxed opacity-90">
              Fotos com boa iluminação natural vendem até 3x mais rápido!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
