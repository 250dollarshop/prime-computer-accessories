import React from 'react';
import { MessageCircle, Package, ShoppingBag } from 'lucide-react';
import { STORE_INFO, formatPKR } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, cartCount, navigate } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE] mb-1.5">
            Customer Hub
          </p>
          <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
            Orders &amp; Account Summary
          </h1>
        </div>
        <div className="flex gap-2.5 text-xs font-medium">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-slate-300 font-mono-num">
            {orders.length} Orders
          </span>
          <button
            type="button"
            onClick={() => navigate({ name: 'wishlist' })}
            className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-slate-300 hover:text-[#2F6BFF] font-mono-num"
          >
            {wishlist.length} Wishlist
          </button>
          <span className="px-3.5 py-1.5 rounded-full bg-[#2F6BFF]/15 text-[#2F6BFF] dark:text-[#22D3EE] font-mono-num">
            {cartCount} In Cart
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <Package className="w-10 h-10 text-slate-400 mx-auto" strokeWidth={1.5} />
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
            No orders placed in this browser yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Once you complete an order at checkout, your full receipt, Order ID, and WhatsApp tracking link will appear right here.
          </p>
          <button
            type="button"
            onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
            className="btn-prime px-7 py-2.5 text-sm inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/8">
                <div>
                  <p className="font-mono-num text-sm font-semibold text-slate-900 dark:text-white">
                    {order.orderId}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {order.createdAt} · {order.paymentMethod}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-emerald-600 dark:text-[#22D3EE]">
                    {order.status}
                  </span>
                  <span className="font-mono-num text-base font-semibold text-slate-900 dark:text-white">
                    {formatPKR(order.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {order.items.map((it, idx) => (
                  <div key={`${it.productId}-${idx}`} className="flex justify-between gap-4">
                    <span className="truncate">
                      {it.name} ({it.variant}) × {it.quantity}
                    </span>
                    <span className="font-mono-num shrink-0">
                      {formatPKR(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Ship to: {order.customer.fullName}, {order.customer.city}
                </span>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${STORE_INFO.name}, please share tracking status for Order ${order.orderId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-[#22D3EE] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Track on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
