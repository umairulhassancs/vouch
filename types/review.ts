export interface Review {
  reviewId: string;
  productSlug: string;
  createdAt: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  text: string;
  verifiedPurchase: boolean;
  orderId?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  distribution: Record<number, number>; // 1-5 star counts
}
