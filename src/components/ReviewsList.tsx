"use client";

import { useEffect, useState } from "react";
import { getUserReviews, type ReviewWithReviewer } from "@/lib/reviews";
import { ReviewCard } from "./ReviewCard";

export type ReviewsListProps = {
  userId: string;
};

export function ReviewsList({ userId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<ReviewWithReviewer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      const data = await getUserReviews(userId);
      setReviews(data);
      setIsLoading(false);
    }

    if (userId) {
      loadReviews();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
        <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">
          star_rate
        </span>
        <p className="text-gray-500 text-sm">
          Este usuário ainda não recebeu avaliações.
        </p>
      </div>
    );
  }

  // Calcular estatísticas
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Resumo de avaliações */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-8">
          {/* Média geral */}
          <div className="text-center">
            <p className="text-5xl font-bold text-[#111813] mb-2">
              {averageRating.toFixed(1)}
            </p>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[20px] ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                >
                  star
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">{totalReviews} avaliações</p>
          </div>

          {/* Distribuição de estrelas */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-xs font-semibold w-8">{rating} ★</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de avaliações */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Avaliações recebidas</h3>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
