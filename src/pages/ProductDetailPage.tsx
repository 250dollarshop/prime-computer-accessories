import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  ZoomIn,
} from 'lucide-react';
import { PRODUCTS, STORE_INFO, formatPKR, getDiscountPercent } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    route,
    getProductBySlug,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    customReviews,
    addProductReview,
  } = useStore();

  const product = useMemo(
    () => (route.param ? getProductBySlug(route.param) : undefined) || PRODUCTS[0],
    [route.param, getProductBySlug]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [isZooming, setIsZooming] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [detailTab, setDetailTab] = useState<'specs' | 'description' | 'reviews'>('specs');

  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('Lahore');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  useEffect(() => {
    setActiveImage(0);
    setSelectedVariant(product.variants[0] || 'Standard');
    setQuantity(1);
    setDetailTab('specs');
  }, [product]);

  const allReviews = useMemo(
    () => [...(customReviews[product.id] || []), ...product.reviews],
    [customReviews, product]
  );

  const relatedProducts = useMemo(
    () =>
      PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
        .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
        .slice(0, 4),
    [product]
  );

  const discount = getDiscountPercent(product.price, product.oldPrice);
  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const whatsappDirectUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Assalam-o-Alaikum ${STORE_INFO.name}, I want to inquire/order:\n• ${product.name} (${selectedVariant})\n• Quantity: ${quantity}\n• Listed Price: ${formatPKR(product.price)}`
  )}`;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addProductReview(product.id, {
      author: revName.trim(),
      city: revCity.trim() || 'Pakistan',
      rating: revRating,
      comment: revComment.trim(),
    });
    setRevName('');
    setRevComment('');
    setRevRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={() => navigate({ name: 'home' })}
          className="hover:text-slate-900 dark:hover:text-white"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => navigate({ name: 'shop', categoryFilter: product.category })}
          className="hover:text-slate-900 dark:hover:text-white"
        >
          {product.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[240px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          <div
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#0D152B] border border-slate-200 dark:border-white/12 shadow-xl cursor-zoom-in"
          >
            <div
              className="w-full h-full transition-transform duration-200"
              style={{
                transformOrigin: zoomOrigin,
                transform: isZooming ? 'scale(1.65)' : 'scale(1)',
              }}
            >
              <ProductImage
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                eager
                className="w-full h-full object-cover"
              />
            </div>

            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F5C26B] text-slate-950 text-xs font-semibold font-mono-num">
                Save {discount}%
              </span>
            )}

            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#0B1224]/75 backdrop-blur-md text-white text-[11px] flex items-center gap-1.5 pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Hover to zoom</span>
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === idx
                      ? 'border-[#2F6BFF] ring-2 ring-[#22D3EE]/30'
                      : 'border-slate-200 dark:border-white/12 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300/80 mb-2">
              <span>
                {product.brand} · SKU: <span className="font-mono-num">{product.sku}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#F5C26B] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#F5C26B] text-[#F5C26B]" />
                {product.rating.toFixed(1)} ({product.reviewCount + (customReviews[product.id]?.length || 0)})
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold font-mono-num text-slate-900 dark:text-white">
                {formatPKR(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base font-mono-num text-slate-400 line-through">
                  {formatPKR(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {product.variants.length > 0 && (
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
              <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5">
                Configuration / Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                      selectedVariant === variant
                        ? 'border-[#2F6BFF] bg-[#2F6BFF]/15 text-[#2F6BFF] dark:text-[#22D3EE]'
                        : 'border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.04] p-4 rounded-2xl border border-slate-200/70 dark:border-white/8">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-[#22D3EE] font-medium">
              <Check className="w-4 h-4" />
              <span>In Stock ({product.stock} sealed units ready for dispatch)</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2F6BFF]" />
              <span>
                {product.price >= STORE_INFO.freeShippingThreshold
                  ? 'Qualifies for Free Express Delivery Nationwide'
                  : 'Flat Rs. 250 Delivery (Free above Rs. 15,000)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5C26B]" />
              <span>{product.warranty} · 7-Day Replacement Guarantee</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/8 h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold font-mono-num text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product.id, selectedVariant, quantity, true)}
                className="btn-prime flex-1 h-12 text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to wishlist"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                  wishlisted
                    ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                    : 'border-slate-200 dark:border-white/15 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, selectedVariant, quantity, false);
                  navigate({ name: 'checkout' });
                }}
                className="h-11 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 text-xs sm:text-sm font-medium transition-opacity"
              >
                Buy Now (COD / Online)
              </button>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 pb-6 mb-6 border-b border-slate-200/80 dark:border-white/10">
          {(
            [
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'description', label: 'Product Overview' },
              { id: 'reviews', label: `Customer Reviews (${allReviews.length})` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setDetailTab(t.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                detailTab === t.id
                  ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/12'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {detailTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/8 text-sm"
              >
                <span className="text-slate-500 dark:text-slate-400 font-normal">{spec.label}</span>
                <span className="text-slate-900 dark:text-white font-medium text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {detailTab === 'description' && (
          <div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>{product.description}</p>
            <p>
              Every order from <strong>{STORE_INFO.name}</strong> is packed in anti-static
              protective wrapping and shipped via insured courier across Pakistan with a 7-day
              replacement guarantee.
            </p>
          </div>
        )}

        {detailTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              {allReviews.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No written reviews yet for this model. Be the first verified customer to share feedback.
                </p>
              ) : (
                allReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/8 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {rev.author}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          · {rev.city}
                        </span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-[#22D3EE] font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#F5C26B]">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={handleSubmitReview}
              className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 space-y-3.5 self-start"
            >
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                Write a Customer Review
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Your Name"
                  className="h-10 px-3.5 rounded-xl bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                />
                <input
                  type="text"
                  value={revCity}
                  onChange={(e) => setRevCity(e.target.value)}
                  placeholder="City (e.g. Karachi)"
                  className="h-10 px-3.5 rounded-xl bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Rating:
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      aria-label={`Rate ${star} stars`}
                      className="p-1"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= revRating
                            ? 'fill-[#F5C26B] text-[#F5C26B]'
                            : 'text-slate-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                required
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                placeholder="Share your experience with build quality and delivery..."
                className="w-full p-3.5 rounded-xl bg-white dark:bg-[#0B1224] border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
              />

              <button
                type="submit"
                className="btn-prime w-full h-10 text-xs"
              >
                Publish Review
              </button>
            </form>
          </div>
        )}
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Related Hardware
          </h2>
          <button
            type="button"
            onClick={() => navigate({ name: 'shop', categoryFilter: product.category })}
            className="text-sm font-medium text-[#2F6BFF] dark:text-[#22D3EE] hover:underline"
          >
            View All {product.categoryName}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};
