import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, PackageCheck } from 'lucide-react';
import { STORE_INFO, formatPKR } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, orders, navigate } = useStore();
  const order = lastOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <PackageCheck className="w-12 h-12 text-[#2F6BFF] mx-auto" />
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">No recent order found</h1>
        <button type="button" onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })} className="btn-prime px-7 py-2.5 text-sm">Browse Catalog</button>
      </div>
    );
  }

  const waReceiptUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Assalam-o-Alaikum ${STORE_INFO.name},\nI just placed Order #${order.orderId} (${formatPKR(
      order.total
    )}) via ${order.paymentMethod}.\nName: ${order.customer.fullName}\nCity: ${
      order.customer.city
    }\nPlease share tracking updates.`
  )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <div className="inline-flex bg-white rounded-2xl px-4 py-2 border border-slate-200/80 dark:border-white/20 shadow-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02] transition-all duration-200">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/prime_computer_logo_45976eac.png`}
                alt="PRIME COMPUTER ACCESSORIES"
                className="h-12 sm:h-14 w-auto object-contain select-none"
              />
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#22D3EE]">Order Confirmed — Preparing Dispatch</p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">Thank you, {order.customer.fullName}!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Order Reference:{' '}
            <strong className="font-mono-num text-slate-900 dark:text-white">{order.orderId}</strong>{' '}
            · Placed on {order.createdAt}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/8 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="font-medium text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-[0.14em]">Delivering To</p>
            <p className="font-semibold text-slate-900 dark:text-white">{order.customer.fullName}</p>
            <p className="text-slate-600 dark:text-slate-300">{order.customer.phone}</p>
            <p className="text-slate-600 dark:text-slate-300">{order.customer.address}, {order.customer.city}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-[0.14em]">Payment &amp; Status</p>
            <p className="font-semibold text-slate-900 dark:text-white">{order.paymentMethod}</p>
            <p className="text-emerald-600 dark:text-[#22D3EE] font-medium">Status: {order.status}</p>
            <p className="text-slate-500 dark:text-slate-400">Estimated Arrival: 1–3 Working Days</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Items Ordered</h2>
          <div className="divide-y divide-slate-100 dark:divide-white/8">
            {order.items.map((item, idx) => (
              <div key={`${item.productId}-${idx}`} className="py-3 flex items-center gap-3">
                <div className="w-14 h-11 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0B1224] shrink-0">
                  <ProductImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.variant} × {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold font-mono-num text-slate-900 dark:text-white">{formatPKR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Subtotal</span><span className="font-mono-num">{formatPKR(order.subtotal)}</span></div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Express Delivery</span><span className="font-mono-num">{order.shippingFee === 0 ? 'FREE' : formatPKR(order.shippingFee)}</span></div>
            <div className="flex justify-between text-base font-semibold text-slate-900 dark:text-white pt-1"><span>Total</span><span className="font-mono-num">{formatPKR(order.total)}</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a href={waReceiptUrl} target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="w-4 h-4" /><span>Send Receipt on WhatsApp</span>
          </a>
          <button type="button" onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })} className="btn-prime flex-1 h-11 text-sm flex items-center justify-center gap-2">
            <span>Continue Shopping</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
