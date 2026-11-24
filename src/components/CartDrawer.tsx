import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { STORE_INFO, formatPKR } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    getProductById,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    total,
    navigate,
    buildWhatsAppOrderUrl,
  } = useStore();

  const remainingForFreeShipping = Math.max(0, STORE_INFO.freeShippingThreshold - subtotal);
  const freeProgress = Math.min(100, (subtotal / STORE_INFO.freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#050914]/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md h-full bg-white dark:bg-[#0D152B] border-l border-slate-200 dark:border-white/12 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE]" />
                <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Shopping Cart
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Progress */}
            {cart.length > 0 && (
              <div className="px-5 py-3 bg-[#F5F7FB] dark:bg-white/[0.04] border-b border-slate-200 dark:border-white/10">
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  {remainingForFreeShipping === 0 ? (
                    <span className="font-medium text-emerald-600 dark:text-[#22D3EE]">
                      Unlocked Free Express Delivery across Pakistan
                    </span>
                  ) : (
                    <>
                      Add{' '}
                      <span className="font-semibold font-mono-num text-slate-900 dark:text-white">
                        {formatPKR(remainingForFreeShipping)}
                      </span>{' '}
                      more for Free Nationwide Delivery
                    </>
                  )}
                </p>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] transition-all duration-300"
                    style={{ width: `${freeProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/8 flex items-center justify-center text-slate-400 mb-4">
                    <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                    Your cart is currently empty
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    Explore mechanical keyboards, wireless mice, 4K monitors, and GaN chargers.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
                    className="btn-prime mt-5 px-6 py-2.5 text-sm"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const prod = getProductById(item.productId);
                  if (!prod) return null;
                  return (
                    <div
                      key={`${item.productId}-${item.variant}`}
                      className="flex gap-3.5 pb-4 border-b border-slate-100 dark:border-white/8 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => navigate({ name: 'product', param: prod.slug })}
                        className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0B1224] shrink-0"
                      >
                        <ProductImage
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => navigate({ name: 'product', param: prod.slug })}
                            className="text-left text-sm font-medium text-slate-900 dark:text-white hover:text-[#2F6BFF] dark:hover:text-[#22D3EE] line-clamp-2"
                          >
                            {prod.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId, item.variant)}
                            aria-label="Remove item"
                            className="text-slate-400 hover:text-rose-500 p-1 shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {item.variant}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/8">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.productId, item.variant, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold font-mono-num text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.productId, item.variant, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold font-mono-num text-slate-900 dark:text-white">
                            {formatPKR(prod.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 dark:border-white/10 bg-[#F5F7FB] dark:bg-[#0B1224] space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono-num">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Nationwide Delivery</span>
                    <span className="font-mono-num">
                      {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-slate-900 dark:text-white pt-1.5 border-t border-slate-200 dark:border-white/10">
                    <span>Total</span>
                    <span className="font-mono-num">{formatPKR(total)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'checkout' })}
                    className="btn-prime w-full h-11 text-sm flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={buildWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
