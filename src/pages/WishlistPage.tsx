import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PRODUCTS, formatPKR } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigate } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE] mb-1.5">
            Saved Hardware
          </p>
          <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
            Your Wishlist ({savedProducts.length})
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
          className="text-sm font-medium text-[#2F6BFF] dark:text-[#22D3EE] hover:underline self-start sm:self-auto"
        >
          Continue Shopping
        </button>
      </div>

      {savedProducts.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/8 flex items-center justify-center text-slate-400 mx-auto">
            <Heart className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
            No saved items yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Tap the heart icon on any keyboard, mouse, monitor, or SSD to save it here for quick comparison.
          </p>
          <button
            type="button"
            onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
            className="btn-prime px-7 py-2.5 text-sm"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="glass-panel rounded-[20px] overflow-hidden flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => navigate({ name: 'product', param: product.slug })}
                className="aspect-[4/3] bg-slate-100 dark:bg-[#0B1224] overflow-hidden block"
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    {product.brand} · {product.categoryName}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'product', param: product.slug })}
                    className="text-left"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </button>
                  <p className="text-base font-semibold font-mono-num text-slate-900 dark:text-white mt-2">
                    {formatPKR(product.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/8">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="btn-prime flex-1 h-9 text-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 text-slate-500 hover:text-rose-500 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
