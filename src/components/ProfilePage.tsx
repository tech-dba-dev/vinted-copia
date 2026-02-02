"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useMarketplace } from "@/components/MarketplaceProvider";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Product as DBProduct } from "@/types/database";
import type { Product as UIProduct } from "@/components/MarketplaceProvider";

export function ProfilePage() {
  const { profile, isAuthenticated, isLoading: authLoading } = useAuth();
  const { products: allProducts } = useMarketplace();
  const [userProducts, setUserProducts] = useState<UIProduct[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: "",
    bio: "",
    location: "",
  });
  const [editProductForm, setEditProductForm] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    size: "",
    condition: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Buscar produtos do usuário
  useEffect(() => {
    async function loadUserProducts() {
      console.log("[DEBUG] ProfilePage useEffect executado");
      console.log("[DEBUG] profile:", profile);
      console.log("[DEBUG] profile?.id:", profile?.id);

      if (!profile?.id) {
        console.log("[DEBUG] Sem profile.id");
        setIsLoadingProducts(false);
        return;
      }

      console.log("[DEBUG] Iniciando query para seller_id:", profile.id);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("seller_id", profile.id)
          .eq("status", "available")
          .order("created_at", { ascending: false });

        console.log("[DEBUG] Query resultado:", { data, error, dataLength: data?.length });

        if (error) {
          console.error("[ProfilePage] Erro ao buscar produtos:", error);
          throw error;
        }

        // Transformar produtos do banco para o formato da UI
        const transformedProducts = (data || []).map((dbProduct) => {
          const attrs = (dbProduct.dynamic_attributes || {}) as Record<string, unknown>;

          return {
            id: dbProduct.id,
            title: dbProduct.title,
            price: dbProduct.price,
            currency: "EUR",
            brand: (attrs.brand as string) || "",
            size: (attrs.size as string) || "",
            condition: (attrs.condition as string) || "Bom",
            image: dbProduct.images?.[0] || "",
            images: dbProduct.images || [],
            seller: profile?.username || profile?.full_name || "Você",
            sellerId: dbProduct.seller_id,
            category: "",
            subcategory: "",
            description: dbProduct.description || "",
          };
        });

        console.log("[DEBUG] Produtos transformados:", transformedProducts);
        console.log("[DEBUG] Chamando setUserProducts com", transformedProducts.length, "produtos");
        setUserProducts(transformedProducts);
      } catch (error) {
        console.error("[ProfilePage] Erro ao buscar produtos:", error);
        setUserProducts([]);
      } finally {
        console.log("[DEBUG] Finalizando loading");
        setIsLoadingProducts(false);
      }
    }

    loadUserProducts();
  }, [profile]);

  // Inicializar form de edição quando profile carregar
  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
      });
      setAvatarPreview(profile.avatar_url || null);
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande. Máximo 2MB.");
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      alert("Arquivo deve ser uma imagem.");
      return;
    }

    setAvatarFile(file);

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    try {
      let avatarUrl = profile.avatar_url;

      // Upload de avatar se houver
      if (avatarFile) {
        setIsUploadingAvatar(true);

        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${profile.id}/${fileName}`;

        // Upload para Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Obter URL pública
        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        avatarUrl = urlData.publicUrl;
        setIsUploadingAvatar(false);
      }

      // Atualizar perfil
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editForm.full_name,
          bio: editForm.bio,
          location: editForm.location,
          avatar_url: avatarUrl,
        })
        .eq("id", profile.id);

      if (error) throw error;

      setIsEditModalOpen(false);
      setAvatarFile(null);
      window.location.reload(); // Recarregar para atualizar os dados
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
      setIsUploadingAvatar(false);
    }
  };

  const handleEditProduct = (productId: string) => {
    // Redirecionar para a página de edição
    window.location.href = `/editar-anuncio?id=${productId}`;
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Tem certeza que deseja deletar este anúncio?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({ status: "deleted" })
        .eq("id", productId)
        .eq("seller_id", profile?.id);

      if (error) throw error;

      // Remover da lista local
      setUserProducts((prev) => prev.filter((p) => p.id !== productId));
      alert("Anúncio deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar anúncio. Tente novamente.");
    }
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !profile?.id) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({
          title: editProductForm.title,
          description: editProductForm.description,
          price: parseFloat(editProductForm.price),
          dynamic_attributes: {
            brand: editProductForm.brand,
            size: editProductForm.size,
            condition: editProductForm.condition,
          },
        })
        .eq("id", selectedProductId)
        .eq("seller_id", profile.id);

      if (error) throw error;

      // Atualizar na lista local
      setUserProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProductId
            ? {
                ...p,
                title: editProductForm.title,
                description: editProductForm.description,
                price: parseFloat(editProductForm.price),
                brand: editProductForm.brand,
                size: editProductForm.size,
                condition: editProductForm.condition,
              }
            : p
        )
      );

      setIsEditProductModalOpen(false);
      setSelectedProductId(null);
      alert("Anúncio atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar anúncio. Tente novamente.");
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return (
      <div className="max-w-[1200px] mx-auto w-full py-16 px-6 text-center">
        <div className="bg-white rounded-xl shadow-sm border border-[#dbe6df] p-12">
          <span className="material-symbols-outlined text-6xl text-[#61896f] mb-4">
            person_off
          </span>
          <h1 className="text-2xl font-bold mb-2">Perfil não encontrado</h1>
          <p className="text-[#61896f] mb-6">
            Você precisa estar logado para ver seu perfil.
          </p>
          <Link
            href="/entrar"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-[#111813] rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Fazer login
          </Link>
        </div>
      </div>
    );
  }

  // Calcular estatísticas
  const soldCount = userProducts.filter(p => p.status === "sold").length;
  const memberSince = profile.created_at
    ? new Date(profile.created_at).getFullYear()
    : new Date().getFullYear();

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full py-8 px-6">
      {/* Card de perfil */}
      <div className="bg-white rounded-xl shadow-sm border border-[#dbe6df] mb-8 overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-[#111813] bg-primary/60 overflow-hidden">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                (profile.full_name || profile.username || "U")
                  .charAt(0)
                  .toUpperCase()
              )}
            </div>
            {/* Badge verificado (placeholder) */}
            <div className="absolute bottom-1 right-1 bg-primary text-[#111813] rounded-full p-1 border-2 border-white">
              <span className="material-symbols-outlined text-sm font-bold">
                verified
              </span>
            </div>
          </div>

          {/* Informações do perfil */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">
                  {profile.full_name || profile.username}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {profile.location && (
                    <>
                      <span className="material-symbols-outlined text-[#61896f] text-lg">
                        location_on
                      </span>
                      <p className="text-[#61896f] text-base font-medium">
                        {profile.location}
                      </p>
                      <span className="text-[#dbe6df]">•</span>
                    </>
                  )}
                  <p className="text-[#61896f] text-base">
                    Membro desde {memberSince}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-6 h-11 bg-[#f0f4f2] text-[#111813] rounded-lg font-bold text-sm hover:bg-[#dbe6df] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                Editar Perfil
              </button>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-[#61896f] mt-4 max-w-2xl">{profile.bio}</p>
            )}

            {/* Estatísticas */}
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4 mt-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#111813]">
                    {profile.rating?.toFixed(1) || "0.0"}
                  </span>
                  <div className="flex gap-0.5 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`material-symbols-outlined text-lg ${
                          star <= Math.round(profile.rating || 0)
                            ? "material-symbols-fill"
                            : ""
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-[#61896f] text-sm">
                    ({profile.reviews_count || 0} avaliações)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#111813]">
                    {profile.followers_count || 0}
                  </p>
                  <p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">
                    Seguidores
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#111813]">
                    {profile.following_count || 0}
                  </p>
                  <p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">
                    Seguindo
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#111813]">
                    {soldCount}
                  </p>
                  <p className="text-[#61896f] text-xs font-semibold uppercase tracking-wider">
                    Vendidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegação */}
        <div className="border-t border-[#dbe6df] px-8">
          <nav className="flex gap-10">
            <Link
              className="flex items-center border-b-4 border-primary text-[#111813] h-16 transition-all"
              href="/perfil"
            >
              <span className="text-sm font-bold uppercase tracking-widest">
                Itens ({userProducts.length})
              </span>
            </Link>
            <Link
              className="flex items-center border-b-4 border-transparent text-[#61896f] hover:text-[#111813] h-16 transition-all"
              href="/avaliacoes"
            >
              <span className="text-sm font-bold uppercase tracking-widest">
                Avaliações
              </span>
            </Link>
            <button className="flex items-center border-b-4 border-transparent text-[#61896f] hover:text-[#111813] h-16 transition-all">
              <span className="text-sm font-bold uppercase tracking-widest">
                Sobre
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Itens Ativos</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 h-9 bg-white border border-[#dbe6df] rounded-lg text-sm font-medium">
              <span className="material-symbols-outlined text-lg">
                filter_list
              </span>
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-4 h-9 bg-white border border-[#dbe6df] rounded-lg text-sm font-medium">
              Ordenar: Recentes
            </button>
          </div>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-xl animate-pulse h-[400px]"
              ></div>
            ))}
          </div>
        ) : userProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="profile"
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
            {/* Card de adicionar novo item */}
            <div className="group cursor-pointer bg-primary/10 border-2 border-dashed border-primary/40 rounded-xl overflow-hidden flex flex-col items-center justify-center min-h-[300px] transition-all hover:bg-primary/20">
              <Link href="/criar-anuncio" className="contents">
                <div className="bg-primary text-[#111813] rounded-full p-4 mb-4">
                  <span className="material-symbols-outlined text-3xl font-bold">
                    add
                  </span>
                </div>
                <p className="text-lg font-bold text-[#111813]">
                  Anunciar um item
                </p>
                <p className="text-[#61896f] text-sm mt-1 px-8 text-center">
                  Venda itens que não usa e ganhe dinheiro
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#dbe6df] p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-[#61896f] mb-4">
              inventory_2
            </span>
            <h3 className="text-xl font-bold mb-2">
              Você ainda não tem itens publicados
            </h3>
            <p className="text-[#61896f] mb-6">
              Comece a vender itens que você não usa mais
            </p>
            <Link
              href="/criar-anuncio"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-[#111813] rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined mr-2">add</span>
              Criar primeiro anúncio
            </Link>
          </div>
        )}
      </div>

      {/* Modal de edição de perfil */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Editar Perfil</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Foto de Perfil
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-2xl font-bold">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {(profile?.full_name || profile?.username || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer font-semibold text-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        upload
                      </span>
                      Escolher Foto
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG ou GIF. Máximo 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Cidade, País"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploadingAvatar}
                  className="flex-1 px-4 py-2 bg-primary text-[#111813] rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingAvatar ? "Enviando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de edição de produto */}
      {isEditProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Editar Anúncio</h2>
              <button
                onClick={() => {
                  setIsEditProductModalOpen(false);
                  setSelectedProductId(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={editProductForm.title}
                  onChange={(e) =>
                    setEditProductForm({ ...editProductForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Vestido floral de verão"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descrição
                </label>
                <textarea
                  value={editProductForm.description}
                  onChange={(e) =>
                    setEditProductForm({ ...editProductForm, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Descreva o produto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Preço (€) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editProductForm.price}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Marca
                  </label>
                  <input
                    type="text"
                    value={editProductForm.brand}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, brand: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: Zara"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tamanho
                  </label>
                  <input
                    type="text"
                    value={editProductForm.size}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, size: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: M, 38, etc"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Condição
                  </label>
                  <select
                    value={editProductForm.condition}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, condition: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Novo">Novo</option>
                    <option value="Muito Bom">Muito Bom</option>
                    <option value="Bom">Bom</option>
                    <option value="Razoável">Razoável</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditProductModalOpen(false);
                    setSelectedProductId(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-[#111813] rounded-lg font-bold hover:bg-primary/90 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
