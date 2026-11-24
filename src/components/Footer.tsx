import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { CATEGORIES, STORE_INFO } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterEmail('');
    showToast('Subscribed to PRIME COMPUTER ACCESSORIES drops & deals!');
  };

  return (
    <footer className="bg-[#080E1F] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => navigate({ name: 'home' })}
              aria-label="PRIME COMPUTER ACCESSORIES Home"
              className="inline-block bg-white rounded-2xl px-4 py-2.5 border border-white/20 shadow-lg hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              <img
                src="/assets/aistudio/prime_computer_logo_45976eac.png"
                alt="PRIME COMPUTER ACCESSORIES"
                className="h-14 sm:h-16 w-auto object-contain select-none"
              />
            </button>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&rsquo;s dedicated luxury storefront for factory-sealed mechanical keyboards,
              esports mice, studio headsets, 4K displays, NVMe storage, and GaN power accessories.
            </p>

            <form onSubmit={handleNewsletter} className="pt-2 max-w-sm">
              <label className="block text-[11px] font-medium uppercase tracking-[0.15em] text-slate-300 mb-2">
                Restock Alerts &amp; PKR Deals
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 h-10 px-4 rounded-full bg-white/8 border border-white/12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="btn-prime h-10 px-4 text-xs flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'shop', collectionFilter: 'flash-sale' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Flash Sale Deals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'about' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'faq' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  FAQ &amp; Warranty
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'shipping-returns' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Shipping &amp; Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'account' })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Order History
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Categories
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'shop', categoryFilter: cat.slug })}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment Methods */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Contact &amp; Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-mono-num"
                >
                  {STORE_INFO.phone} (WhatsApp / Call)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {STORE_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400 mb-2">
                Accepted Payment Methods
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
                <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-200">
                  Cash on Delivery
                </span>
                <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-[#F5C26B]">
                  JazzCash
                </span>
                <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-emerald-300">
                  Easypaisa
                </span>
                <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-cyan-300">
                  Bank Transfer
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {STORE_INFO.name}. All rights reserved. Prices in PKR.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate({ name: 'contact' })}
              className="hover:text-slate-300 transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => navigate({ name: 'shipping-returns' })}
              className="hover:text-slate-300 transition-colors"
            >
              7-Day Return Policy
            </button>
            <button
              type="button"
              onClick={() => navigate({ name: 'faq' })}
              className="hover:text-slate-300 transition-colors"
            >
              Warranty Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
