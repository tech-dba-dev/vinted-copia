import { supabase } from "./supabase";
import type { Profile, Product } from "@/types/database";

/**
 * Buscar perfil por username
 */
export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }

  return data;
}

/**
 * Buscar produtos de um vendedor
 */
export async function getSellerProducts(sellerId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .eq("status", "available")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar produtos do vendedor:", error);
    return [];
  }

  return data || [];
}

/**
 * Atualizar perfil do usuário
 */
export async function updateProfile(
  userId: string,
  data: Partial<Profile>
): Promise<Profile | null> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar perfil:", error);
    return null;
  }

  return profile;
}
