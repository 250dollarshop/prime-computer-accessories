import React from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, getDiscountPercent } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  surface?: 'auto' | 'light' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
  surface = 'auto',
}) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const wishlisted = isInWishlist(product.id);
  const discount = getDiscountPercent(product.price, product.oldPrice);

  const cardSurfaceClass =
    surface === 'light'
      ? 'bg-white border border-slate-200/80 shadow-[0_14px_34px_-14px_rgba(15,23,42,0.12)] hover:shadow-[0_22px_44px_-14px_rgba(47,107,255,0.22)] hover:border-[#2F6BFF]/40'
      : surface === 'dark'
      ? 'bg-[#111B3A]/65 backdrop-blur-xl border border-white/12 shadow-[0_20px_42px_-16px_rgba(3,8,22,0.72)] hover:border-cyan-400/40 hover:shadow-[0_22px_48px_-12px_rgba(34,211,238,0.2)]'
      : 'glass-panel hover:border-[#2F6BFF]/45 dark:hover:border-cyan-400/45 hover:shadow-[0_20px_44px_-14px_rgba(47,107,255,0.25)]';

  const titleColorClass =
    surface === 'light'
      ? 'text-slate-900 group-hover:text-[#2F6BFF]'
      : surface === 'dark'
      ? 'text-white group-hover:text-[#22D3EE]'
      : 'text-slate-900 dark:text-white group-hover:text-[#2F6BFF] dark:group-hover:text-[#22D3EE]';

  const metaColorClass =
    surface === 'light'
      ? 'text-slate-500'
      : surface === 'dark'
      ? 'text-slate-300/80'
      : 'text-slate-500 dark:text-slate-300/80';

  const priceColorClass =
    surface === 'light'
      ? 'text-slate-900'
      : surface === 'dark'
      ? 'text-white'
      : 'text-slate-900 dark:text-white';

  const dividerClass =
    surface === 'light'
      ? 'border-slate-100'
      : surface === 'dark'
      ? 'border-white/10'
      : 'border-slate-100 dark:border-white/10';

  const imgBgClass =
    surface === 'light'
      ? 'bg-slate-100'
      : surface === 'dark'
      ? 'bg-[#091022]'
      : 'bg-slate-100 dark:bg-[#091022]';

  if (layout === 'list') {
    return (
      <div
        className={`group flex flex-col sm:flex-row gap-5 p-4 rounded-[20px] transition-all duration-300 ${cardSurfaceClass}`}
      >
        <button
          type="button"
          onClick={() => navigate({ name: 'product', param: product.slug })}
          className={`relative w-full sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 ${imgBgClass}`}
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#F5C26B] text-slate-950 text-[11px] font-semibold font-mono-num shadow-sm">
              -{discount}%
            </span>
          )}
        </button>

        <div className="flex-1 flex flex-col justify-between gap-3">
          <div>
            <div className={`flex items-center justify-between gap-2 text-xs mb-1.5 ${metaColorClass}`}>
              <span className="uppercase tracking-[0.12em] text-[11px]">
                {product.brand} · {product.categoryName}
              </span>
              <span className="flex items-center gap-1 text-[#F5C26B] font-medium tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#F5C26B] text-[#F5C26B]" />
                {product.rating.toFixed(1)}
                <span className="opacity-70">({product.reviewCount})</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate({ name: 'product', param: product.slug })}
              className="text-left"
            >
              <h3 className={`text-base sm:text-lg font-semibold transition-colors ${titleColorClass}`}>
                {product.name}
              </h3>
            </button>
            <p className={`text-sm mt-1.5 line-clamp-2 leading-relaxed ${metaColorClass}`}>
              {product.shortDescription}
            </p>
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-4 pt-3 border-t ${dividerClass}`}>
            <div className="flex items-baseline gap-2.5">
              <span className={`text-lg font-semibold font-mono-num ${priceColorClass}`}>
                {formatPKR(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs font-mono-num text-slate-400 line-through">
                  {formatPKR(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className={`p-2.5 rounded-full border transition-colors ${
                  wishlisted
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-500'
                    : 'border-slate-200 dark:border-white/15 text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                aria-label="Quick view"
                className="p-2.5 rounded-full border border-slate-200 dark:border-white/15 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => addToCart(product.id)}
                className="btn-prime h-10 px-5 text-xs flex items-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex flex-col rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${cardSurfaceClass}`}
    >
      {/* Studio Image */}
      <div className={`relative aspect-[4/3] overflow-hidden ${imgBgClass}`}>
        <button
          type="button"
          onClick={() => navigate({ name: 'product', param: product.slug })}
          className="w-full h-full block"
          aria-label={product.name}
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </button>

        {discount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#F5C26B] text-slate-950 text-[11px] font-semibold font-mono-num pointer-events-none shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-colors ${
              wishlisted
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-[#0B1224]/65 text-white border-white/15 hover:bg-[#0B1224]/90'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            aria-label="Quick view product"
            className="w-9 h-9 rounded-full bg-[#0B1224]/65 hover:bg-[#0B1224]/90 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-3.5">
        <div>
          <div className={`flex items-center justify-between gap-2 text-[11px] mb-2 ${metaColorClass}`}>
            <span className="truncate uppercase tracking-[0.12em]">
              {product.brand} · {product.categoryName}
            </span>
            <span className="flex items-center gap-1 shrink-0 tabular-nums font-medium text-[#F5C26B]">
              <Star className="w-3.5 h-3.5 fill-[#F5C26B] text-[#F5C26B]" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate({ name: 'product', param: product.slug })}
            className="text-left w-full"
          >
            <h3 className={`text-[15px] font-semibold leading-snug line-clamp-2 transition-colors ${titleColorClass}`}>
              {product.name}
            </h3>
          </button>
        </div>

        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${dividerClass}`}>
          <div className="flex flex-col">
            <span className={`text-base font-semibold font-mono-num ${priceColorClass}`}>
              {formatPKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] font-mono-num text-slate-400 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="btn-prime h-9 px-4 text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
