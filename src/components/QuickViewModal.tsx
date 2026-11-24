import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, X } from 'lucide-react';
import { formatPKR, getDiscountPercent } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const discount = getDiscountPercent(quickViewProduct.price, quickViewProduct.oldPrice);
  const wishlisted = isInWishlist(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#050914]/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl rounded-3xl bg-white dark:bg-[#101A36] border border-slate-200 dark:border-white/12 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close quick view"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative bg-slate-100 dark:bg-[#0B1224] aspect-[4/3] md:aspect-auto md:h-full">
            <ProductImage
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F5C26B] text-slate-950 text-xs font-semibold font-mono-num">
                Save {discount}%
              </span>
            )}
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300/80 mb-2">
                <span>{quickViewProduct.brand}</span>
                <span>·</span>
                <span>{quickViewProduct.categoryName}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-[#F5C26B] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#F5C26B] text-[#F5C26B]" />
                  {quickViewProduct.rating.toFixed(1)}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white leading-snug">
                {quickViewProduct.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-semibold font-mono-num text-slate-900 dark:text-white">
                  {formatPKR(quickViewProduct.price)}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm font-mono-num text-slate-400 line-through">
                    {formatPKR(quickViewProduct.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>

              {quickViewProduct.variants.length > 0 && (
                <div className="mt-4">
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Select Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
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

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-[#22D3EE] font-medium">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({quickViewProduct.stock} units)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2F6BFF]" />
                  {quickViewProduct.warranty}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/8 h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-full flex items-center justify-center text-slate-600 dark:text-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold font-mono-num text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))
                    }
                    aria-label="Increase quantity"
                    className="w-9 h-full flex items-center justify-center text-slate-600 dark:text-slate-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct.id, selectedVariant, quantity, true);
                    setQuickViewProduct(null);
                  }}
                  className="btn-prime flex-1 h-11 text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label="Toggle wishlist"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                    wishlisted
                      ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                      : 'border-slate-200 dark:border-white/15 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const slug = quickViewProduct.slug;
                  setQuickViewProduct(null);
                  navigate({ name: 'product', param: slug });
                }}
                className="w-full h-10 rounded-full border border-slate-200 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/8 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Specifications &amp; Reviews</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
