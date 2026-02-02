"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProfileByUsername, getSellerProducts } from "@/lib/profiles";
import { ReviewsList } from "@/components/ReviewsList";
import { ProductCard } from "@/components/ProductCard";
import type { Profile, Product } from "@/types/database";
import { useAuth } from "@/components/AuthProvider";

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const username = params.username as string;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "reviews">("products");

  useEffect(() => {
    async function loadProfile() {
      if (!username) {
        router.push("/");
        return;
      }

      setIsLoading(true);

      const profileData = await getProfileByUsername(username);

      if (!profileData) {
        router.push("/");
        return;
      }

      // Se for o próprio usuário, redirecionar para /perfil
      if (user && profileData.id === user.id) {
        router.push("/perfil");
        return;
      }

      setProfile(profileData);

      // Carregar produtos do vendedor
      const productsData = await getSellerProducts(profileData.id);
      setProducts(productsData);

      setIsLoading(false);
    }

    loadProfile();
  }, [username, user, router]);

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 lg:px-10 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const avatarUrl = profile.avatar_url;
  const fullName = profile.full_name || profile.username;
  const bio = profile.bio || "Este usuário ainda não adicionou uma biografia.";
  const rating = profile.rating || 0;
  const reviewsCount = profile.reviews_count || 0;
  const location = profile.location || null;

  return (
    <main className="max-w-[1200px] mx-auto px-4 lg:px-10 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link className="hover:underline" href="/">
          Início
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link className="hover:underline" href="/buscar">
          Perfis
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#111813] font-medium">{profile.username}</span>
      </nav>

      {/* Header do Perfil */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold border-4 border-gray-100">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
            <p className="text-gray-600 text-sm mb-3">@{profile.username}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-400 fill-current text-[20px]">
                  star
                </span>
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({reviewsCount} avaliações)</span>
              </div>

              {/* Localização */}
              {location && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>{location}</span>
                </div>
              )}

              {/* Produtos */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>{products.length} produtos</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{bio}</p>
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:brightness-105 transition-all shadow-md whitespace-nowrap">
              Seguir
            </button>
            <Link
              href="/mensagens"
              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-center whitespace-nowrap"
            >
              Enviar mensagem
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-4 px-2 font-bold transition-colors ${
            activeTab === "products"
              ? "text-[#111813] border-b-2 border-primary"
              : "text-gray-500 hover:text-[#111813]"
          }`}
        >
          Produtos ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 px-2 font-bold transition-colors ${
            activeTab === "reviews"
              ? "text-[#111813] border-b-2 border-primary"
              : "text-gray-500 hover:text-[#111813]"
          }`}
        >
          Avaliações ({reviewsCount})
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === "products" && (
        <div>
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">
                inventory_2
              </span>
              <p className="text-gray-500 text-sm">
                Este vendedor ainda não tem produtos disponíveis.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                // Transformar para o formato esperado pelo ProductCard
                const transformedProduct = {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.images?.[0] || "",
                  brand:
                    (product.dynamic_attributes as Record<string, unknown>)?.brand ||
                    "Sem marca",
                  size:
                    (product.dynamic_attributes as Record<string, unknown>)?.size ||
                    "Único",
                  condition:
                    (product.dynamic_attributes as Record<string, unknown>)?.condition ||
                    "Bom",
                  seller: profile.username,
                  category: "",
                  subcategory: "",
                  description: product.description || "",
                  currency: "EUR",
                };

                return (
                  <ProductCard
                    key={product.id}
                    // @ts-ignore
                    product={transformedProduct}
                    variant="search"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && <ReviewsList userId={profile.id} />}
    </main>
  );
}
