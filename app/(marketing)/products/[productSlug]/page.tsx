'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Star, Minus, Plus, BadgeCheck, ArrowLeft, Check, Loader, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, getReviewsForProduct } from '@/lib/mock-data';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getInitials } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ProductImageShowcase } from '@/components/marketing/ProductImageShowcase';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, addDoc, orderBy } from 'firebase/firestore';

const productEmojis: Record<string, string> = {
  sticker: '🏷️',
  classic: '🔑',
  whistle: '📯',
  gps: '📍',
};

const getBadgeStyles = (type: string) => {
  switch (type) {
    case 'sticker':
      return 'bg-purple-500/25 text-purple-200 border border-purple-500/30 backdrop-blur-md';
    case 'classic':
      return 'bg-slate-500/25 text-slate-200 border border-slate-500/30 backdrop-blur-md';
    case 'whistle':
      return 'bg-teal-500/25 text-teal-200 border border-teal-500/30 backdrop-blur-md';
    case 'gps':
      return 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 text-yellow-200 border border-yellow-500/40 backdrop-blur-md shadow-md shadow-yellow-500/5';
    default:
      return 'bg-muted text-foreground/80 border border-border';
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.productSlug as string;
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setReviewsLoading(true);
        const q = query(
          collection(db, 'reviews'),
          where('productSlug', '==', slug),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const docsData: any[] = [];
        querySnapshot.forEach((doc) => {
          docsData.push({ reviewId: doc.id, ...doc.data() });
        });

        if (docsData.length > 0) {
          setReviews(docsData);
        } else {
          setReviews(getReviewsForProduct(slug));
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews(getReviewsForProduct(slug));
      } finally {
        setReviewsLoading(false);
      }
    }
    fetchReviews();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-primary hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.slug !== slug).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWriteReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    setIsSubmittingReview(true);
    try {
      const newReview = {
        productSlug: slug,
        reviewerName: reviewName.trim(),
        rating: reviewRating,
        text: reviewText.trim(),
        verifiedPurchase: false,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'reviews'), newReview);
      
      setReviews((prev) => [
        { reviewId: docRef.id, ...newReview },
        ...prev,
      ]);
      setReviewName('');
      setReviewText('');
      setReviewRating(5);
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    } catch (err) {
      console.error('Error writing review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 pt-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Products
          </Link>
        </div>

        {/* Product hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-square w-full">
            <ProductImageShowcase
              images={product.images}
              name={product.name}
              badge={product.badge}
              badgeClassName={getBadgeStyles(product.productType)}
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating) ? 'fill-warning text-warning' : 'text-muted'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{product.tagline}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="success">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              {product.comingSoon ? (
                <motion.button
                  onClick={() => alert(`${product.name} is coming soon and is not available for purchase yet!`)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-muted text-muted-foreground border border-border rounded-xl font-semibold hover:bg-muted/80 transition-all cursor-pointer"
                  whileTap={{ scale: 0.96 }}
                >
                  Coming Soon
                </motion.button>
              ) : (
                <>
                  <div className="flex items-center border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-surface-overlay transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 text-sm font-semibold min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-surface-overlay transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer"
                    whileTap={{ scale: 0.96 }}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart — {formatPrice(product.price * quantity)}
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              💵 Cash on Delivery • 🚚 Free shipping over Rs. 2,000
            </p>

            {/* Specs */}
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-xl bg-surface-elevated border border-border/30">
                    <p className="text-xs text-muted-foreground mb-0.5">{key}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-border/50 pt-6 mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Visual Feature Breakdown */}
        {product.imageDetails && product.imageDetails.length > 0 && (
          <section className="mt-20 border-t border-border/50 pt-16">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-12 text-center text-gradient">
              Visual Feature Breakdown
            </h2>
            <div className="space-y-16">
              {product.imageDetails.map((detail, index) => (
                <div
                  key={detail.url}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Image container */}
                  <div className={`aspect-[3/2] w-full rounded-2xl overflow-hidden bg-black border border-border/50 relative flex items-center justify-center ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.06),transparent_60%)] pointer-events-none" />
                    <img
                      src={detail.url}
                      alt={detail.title}
                      className="w-full h-full object-contain p-2 pointer-events-none select-none"
                    />
                  </div>
                  {/* Description container */}
                  <div className={`space-y-4 p-4 md:p-8 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <h3 className="text-2xl sm:text-3xl font-semibold font-[family-name:var(--font-display)] text-gradient">
                      {detail.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-20 border-t border-border/50 pt-16">
          <div className="grid md:grid-cols-[1fr_360px] gap-12">
            {/* Reviews list */}
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8">
                Customer Reviews ({reviews.length})
              </h2>
              {reviewsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <div key={review.reviewId} className="p-5 rounded-2xl bg-surface-elevated border border-border/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-teal/30 flex items-center justify-center text-sm font-bold">
                          {getInitials(review.reviewerName)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold">{review.reviewerName}</p>
                            {review.verifiedPurchase && <BadgeCheck className="w-4 h-4 text-teal" />}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {!reviewsLoading && reviews.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No reviews yet for this product.</p>
              )}
            </div>

            {/* Write a review form */}
            <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 self-start w-full">
              <h3 className="text-lg font-bold mb-4">Write a Review</h3>
              {reviewSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Review Submitted!</h4>
                  <p className="text-xs text-muted-foreground">Thank you for sharing your feedback.</p>
                </div>
              ) : (
                <form onSubmit={handleWriteReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmed Raza"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      disabled={isSubmittingReview}
                      className="w-full px-3.5 py-2 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          disabled={isSubmittingReview}
                          className="text-muted hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Review Text</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your experience with this Vouch item..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      disabled={isSubmittingReview}
                      className="w-full px-3.5 py-2 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !reviewName.trim() || !reviewText.trim()}
                    className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmittingReview ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-20 border-t border-border/50 pt-16">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="group p-3 xs:p-5 rounded-2xl bg-surface-elevated border border-border/50 hover:border-primary/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-24 xs:h-32 w-full rounded-xl overflow-hidden bg-surface flex items-center justify-center mb-3 xs:mb-4">
                    <img
                      src={rp.imageUrl}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                      draggable="false"
                    />
                  </div>
                  <h3 className="font-semibold text-sm xs:text-base group-hover:text-primary transition-colors truncate">{rp.name}</h3>
                  <p className="text-xs xs:text-sm text-muted-foreground mt-0.5 xs:mt-1 line-clamp-1">{rp.tagline}</p>
                </div>
                <p className="text-base xs:text-lg font-bold mt-2">{formatPrice(rp.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
