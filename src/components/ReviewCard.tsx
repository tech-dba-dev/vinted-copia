"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ReviewWithReviewer } from "@/lib/reviews";

export type ReviewCardProps = {
  review: ReviewWithReviewer;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = review.reviewer?.username || "Usuário";
  const reviewerAvatar = review.reviewer?.avatar_url;

  function formatDate(dateString: string) {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return "";
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar do avaliador */}
        <Link href={`/perfil/${review.reviewer?.username}`}>
          {reviewerAvatar ? (
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold border-2 border-gray-100">
              {reviewerName.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>

        <div className="flex-1">
          {/* Nome e data */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link
                href={`/perfil/${review.reviewer?.username}`}
                className="font-bold hover:text-primary transition-colors"
              >
                {reviewerName}
              </Link>
              {review.created_at && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {formatDate(review.created_at)}
                </p>
              )}
            </div>

            {/* Estrelas */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[18px] ${
                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                >
                  star
                </span>
              ))}
            </div>
          </div>

          {/* Comentário */}
          {review.comment && (
            <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
          )}
        </div>
      </div>
    </div>
  );
}
