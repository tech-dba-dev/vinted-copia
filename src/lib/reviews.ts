import { supabase } from "./supabase";
import type { Review, Profile } from "@/types/database";

export type ReviewWithReviewer = Review & {
  reviewer: Profile;
};

/**
 * Buscar todas as avaliações de um usuário (recebidas)
 */
export async function getUserReviews(userId: string): Promise<ReviewWithReviewer[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      reviewer:profiles!reviews_reviewer_id_fkey(*)
    `)
    .eq("reviewed_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }

  return (data || []) as ReviewWithReviewer[];
}

/**
 * Buscar avaliações feitas por um usuário
 */
export async function getReviewsByUser(userId: string): Promise<ReviewWithReviewer[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      reviewed:profiles!reviews_reviewed_id_fkey(*)
    `)
    .eq("reviewer_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar avaliações feitas:", error);
    return [];
  }

  return data || [];
}

/**
 * Criar uma nova avaliação
 */
export async function createReview(
  reviewerId: string,
  reviewedId: string,
  rating: number,
  comment?: string,
  orderId?: string
): Promise<Review | null> {
  // Validar rating
  if (rating < 1 || rating > 5) {
    console.error("Rating deve estar entre 1 e 5");
    return null;
  }

  // Verificar se já existe avaliação para este pedido
  if (orderId) {
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("order_id", orderId)
      .single();

    if (existingReview) {
      console.error("Já existe uma avaliação para este pedido");
      return null;
    }
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      reviewer_id: reviewerId,
      reviewed_id: reviewedId,
      rating,
      comment: comment || null,
      order_id: orderId || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar avaliação:", error);
    return null;
  }

  // Atualizar a média de rating e contagem do usuário avaliado
  await updateUserRating(reviewedId);

  return data;
}

/**
 * Atualizar a média de rating e contagem de reviews de um usuário
 */
export async function updateUserRating(userId: string): Promise<void> {
  // Buscar todas as avaliações do usuário
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("reviewed_id", userId);

  if (error || !reviews) {
    console.error("Erro ao buscar avaliações para atualizar rating:", error);
    return;
  }

  const reviewsCount = reviews.length;
  const averageRating =
    reviewsCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount
      : 0;

  // Atualizar o perfil
  await supabase
    .from("profiles")
    .update({
      rating: Math.round(averageRating * 10) / 10, // Arredondar para 1 casa decimal
      reviews_count: reviewsCount,
    })
    .eq("id", userId);
}

/**
 * Deletar uma avaliação
 */
export async function deleteReview(reviewId: string, reviewerId: string): Promise<boolean> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("reviewer_id", reviewerId);

  if (error) {
    console.error("Erro ao deletar avaliação:", error);
    return false;
  }

  return true;
}

/**
 * Verificar se o usuário pode avaliar outro usuário
 */
export async function canUserReview(
  reviewerId: string,
  reviewedId: string
): Promise<boolean> {
  // Não pode avaliar a si mesmo
  if (reviewerId === reviewedId) {
    return false;
  }

  // Verificar se tem alguma transação/pedido entre eles
  const { data: orders } = await supabase
    .from("orders")
    .select("id")
    .or(`buyer_id.eq.${reviewerId},seller_id.eq.${reviewerId}`)
    .or(`buyer_id.eq.${reviewedId},seller_id.eq.${reviewedId}`)
    .limit(1);

  return (orders?.length || 0) > 0;
}
