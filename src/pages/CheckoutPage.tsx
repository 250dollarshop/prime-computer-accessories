import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Lock,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { PAKISTAN_CITIES, STORE_INFO, formatPKR } from '../data/catalog';
import { CustomerDetails, PaymentMethod } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';

const PAYMENT_OPTIONS: Array<{
  id: PaymentMethod;
  label: string;
  desc: string;
}> = [
  {
    id: 'Cash on Delivery (COD)',
    label: 'Cash on Delivery (COD)',
    desc: 'Pay in cash when our courier delivers to your doorstep.',
  },
  {
    id: 'JazzCash',
    label: 'JazzCash Mobile Account',
    desc: 'Instant transfer to our verified JazzCash merchant wallet (+923298025766).',
  },
  {
    id: 'Easypaisa',
    label: 'Easypaisa Mobile Account',
    desc: 'Fast transfer via Easypaisa App (+923298025766).',
  },
  {
    id: 'Bank Transfer',
    label: 'IBFT / Bank Transfer',
    desc: 'Meezan Bank / HBL online transfer with instant receipt confirmation.',
  },
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    getProductById,
    subtotal,
    shippingFee,
    total,
    placeOrder,
    buildWhatsAppOrderUrl,
    navigate,
  } = useStore();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery (COD)');
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/8 flex items-center justify-center text-slate-400 mx-auto">
          <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          Your cart is empty
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add computer accessories to your cart before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
          className="btn-prime px-7 py-2.5 text-sm"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  const validateCustomer = (): boolean => {
    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setError('Please fill in your full name, phone number, and complete delivery address.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomer()) return;
    placeOrder(customer, paymentMethod);
    navigate({ name: 'order-confirmation' });
  };

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppOrderUrl(customer, paymentMethod);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="pb-6 mb-8 border-b border-slate-200/80 dark:border-white/10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE] mb-1.5">
          Secure Nationwide Checkout
        </p>
        <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
          Shipping &amp; Payment
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE]" />
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                1. Delivery Details (Pakistan)
              </h2>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Muhammad Usman"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="03XX-XXXXXXX"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white font-mono-num focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  Email (For Invoice)
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  City *
                </label>
                <select
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                >
                  {PAKISTAN_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Complete Street Address &amp; Landmark *
              </label>
              <textarea
                rows={2}
                required
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="House / Office No., Street, Sector / Block, Area"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Call before arrival, office hours delivery, etc."
                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
              />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE]" />
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                2. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_OPTIONS.map((opt) => {
                const active = paymentMethod === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      active
                        ? 'border-[#2F6BFF] bg-[#2F6BFF]/12'
                        : 'border-slate-200 dark:border-white/12 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {opt.label}
                      </span>
                      {active && (
                        <CheckCircle2 className="w-4 h-4 text-[#2F6BFF] dark:text-[#22D3EE] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {paymentMethod !== 'Cash on Delivery (COD)' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {paymentMethod} Instructions:
                </p>
                <p>
                  Send <strong className="font-mono-num">{formatPKR(total)}</strong> to{' '}
                  <strong>{STORE_INFO.name}</strong> ({STORE_INFO.phone}) and share the screenshot
                  with your Order ID on WhatsApp after placing the order.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Order Summary ({cart.reduce((a, c) => a + c.quantity, 0)} items)
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => {
              const prod = getProductById(item.productId);
              if (!prod) return null;
              return (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/8 last:border-b-0"
                >
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0B1224] shrink-0">
                    <ProductImage
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
                      {prod.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.variant} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold font-mono-num text-slate-900 dark:text-white shrink-0">
                    {formatPKR(prod.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-white/10 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono-num">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Express Courier</span>
              <span className="font-mono-num">
                {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
              <span>Total Payable</span>
              <span className="font-mono-num">{formatPKR(total)}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="btn-prime w-full h-12 text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Confirm &amp; Place Order</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp ({STORE_INFO.phone})</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#F5C26B]" />
            <span>100% Sealed Hardware · 7-Day Replacement Guarantee</span>
          </div>
        </div>
      </form>
    </div>
  );
};
