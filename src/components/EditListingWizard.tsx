"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { getRootCategories, getSubcategories, updateProduct } from "@/lib/products";
import type { Category } from "@/types/database";

export function EditListingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { profile, isAuthenticated, isLoading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("Bom");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Carregar dados do produto
  useEffect(() => {
    if (!productId) {
      router.push("/perfil");
      return;
    }

    async function loadProduct() {
      if (!productId) return;

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error;

        if (!data || data.seller_id !== profile?.id) {
          alert("Você não tem permissão para editar este anúncio");
          router.push("/perfil");
          return;
        }

        const attrs = (data.dynamic_attributes || {}) as Record<string, unknown>;

        setTitle(data.title);
        setDescription(data.description || "");
        setCategoryId(data.category_id || "");
        setPrice(data.price.toString());
        setBrand((attrs.brand as string) || "");
        setSize((attrs.size as string) || "");
        setCondition((attrs.condition as string) || "Bom");
        setImages(data.images || []);

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        alert("Erro ao carregar produto");
        router.push("/perfil");
      }
    }

    if (profile?.id) {
      loadProduct();
    }
  }, [productId, profile?.id, router]);

  // Carregar categorias
  useEffect(() => {
    async function loadCategories() {
      const cats = await getRootCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // Carregar subcategorias
  useEffect(() => {
    async function loadSubcategories() {
      if (categoryId) {
        const subs = await getSubcategories(categoryId);
        setSubcategories(subs);
      } else {
        setSubcategories([]);
      }
    }
    loadSubcategories();
  }, [categoryId]);

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/entrar");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length + newImages.length > 5) {
      alert("Máximo de 5 imagens permitidas");
      return;
    }
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const newImgs = [...images];
    newImgs.splice(index, 1);
    setImages(newImgs);
  };

  const handleRemoveNewImage = (index: number) => {
    const newImgs = [...newImages];
    newImgs.splice(index, 1);
    setNewImages(newImgs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id || !productId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let finalImages = [...images];

      // Upload de novas imagens se houver
      if (newImages.length > 0) {
        for (const file of newImages) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${profile.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("products")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("products")
            .getPublicUrl(filePath);

          finalImages.push(urlData.publicUrl);
        }
      }

      const productData = {
        title,
        description,
        price: parseFloat(price),
        category_id: subcategoryId || categoryId,
        images: finalImages,
        dynamic_attributes: {
          brand,
          size,
          condition,
        },
      };

      const result = await updateProduct(productId, profile.id, productData);

      if (!result) {
        throw new Error("Erro ao atualizar produto");
      }

      alert("Anúncio atualizado com sucesso!");
      router.push("/perfil");
    } catch (err) {
      console.error("Erro ao atualizar anúncio:", err);
      setError("Erro ao atualizar anúncio. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full py-8 px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#111813]">Editar Anúncio</h1>
        <p className="text-[#61896f] mt-2">Atualize as informações do seu produto</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Imagens */}
        <div className="bg-white rounded-xl p-6 border border-[#dbe6df]">
          <h2 className="text-xl font-bold mb-4">Fotos do produto</h2>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#dbe6df]">
                <img src={img} alt={`Imagem ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
            {newImages.map((file, idx) => (
              <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary">
                <img src={URL.createObjectURL(file)} alt={`Nova imagem ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>

          {(images.length + newImages.length) < 5 && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-[#dbe6df] rounded-lg hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">add_photo_alternate</span>
                <span>Adicionar mais fotos ({images.length + newImages.length}/5)</span>
              </button>
            </>
          )}
        </div>

        {/* Categoria */}
        <div className="bg-white rounded-xl p-6 border border-[#dbe6df]">
          <h2 className="text-xl font-bold mb-4">Categoria</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Categoria Principal *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Subcategoria</label>
                <select
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione...</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Detalhes */}
        <div className="bg-white rounded-xl p-6 border border-[#dbe6df] space-y-4">
          <h2 className="text-xl font-bold">Detalhes do produto</h2>

          <div>
            <label className="block text-sm font-semibold mb-2">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Ex: Vestido floral de verão"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              placeholder="Descreva o produto..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Marca</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Ex: Zara"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tamanho</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Ex: M, 38"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Condição *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="Novo">Novo</option>
                <option value="Muito Bom">Muito Bom</option>
                <option value="Bom">Bom</option>
                <option value="Razoável">Razoável</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Preço (€) *</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/perfil")}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 bg-primary text-[#111813] rounded-lg font-bold hover:brightness-105 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </main>
  );
}
