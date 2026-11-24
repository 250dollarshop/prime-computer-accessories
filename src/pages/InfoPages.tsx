import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { FAQ_ITEMS, IMG, STORE_INFO } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE]">
            About Our Store
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white leading-tight">
            {STORE_INFO.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded for Pakistan&rsquo;s engineers, creators, and competitive gamers,{' '}
            <strong>{STORE_INFO.name}</strong> eliminates the guesswork of grey-market tech
            shopping. Every mechanical keyboard, esports mouse, 4K monitor, NVMe SSD, and GaN
            charger in our catalog is sourced directly from verified distributors and delivered
            factory-sealed to your doorstep.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
              className="btn-prime h-11 px-6 text-sm inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate({ name: 'contact' })}
              className="h-11 px-6 rounded-full border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/8 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
        <div className="lg:col-span-6 aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/12 shadow-xl">
          <ProductImage
            src={IMG.heroFlagship}
            alt="Prime Computer Accessories Flagship Desk Setup"
            eager
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Zero Counterfeits',
            body: 'We guarantee 100% genuine Logitech, Razer, Keychron, Anker, Crucial, Dell, and HyperX hardware with verifiable serial numbers.',
          },
          {
            title: 'Transparent PKR Pricing',
            body: 'Clear pricing in Pakistani Rupees with zero surprise card surcharges, plus Free Express Delivery on orders above Rs. 15,000.',
          },
          {
            title: 'Nationwide Reach',
            body: 'Fast insured courier delivery across Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and 150+ cities.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="glass-panel p-6 rounded-2xl space-y-2"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {card.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { navigate } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE]">
          Help Center
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Everything you need to know about product authenticity, Cash on Delivery, and warranty claims.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-display text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#22D3EE]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/8 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-navy-gradient border border-white/12 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold">Still have a compatibility question?</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Message our hardware specialists directly on WhatsApp or via Contact page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate({ name: 'contact' })}
          className="btn-prime h-10 px-6 text-xs shrink-0"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE]">
          Store Policies
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
          Shipping &amp; 7-Day Returns
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <Truck className="w-6 h-6 text-[#2F6BFF] dark:text-[#22D3EE]" />
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            Shipping Rates
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
            Free Express Delivery on all orders of Rs. 15,000 or more. Orders under Rs. 15,000 ship nationwide for a flat Rs. 250.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <RefreshCw className="w-6 h-6 text-[#2F6BFF] dark:text-[#22D3EE]" />
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            7-Day Replacement
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
            If your item arrives physically damaged or exhibits a factory fault within 7 days of delivery, we replace it free of cost.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#F5C26B]" />
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            Brand Warranty
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
            All hardware includes official distributor or store warranty (6 months to 5 years). Retain your invoice and box for claims.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          Delivery Timelines Across Pakistan
        </h3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Lahore:</strong> Same-day or next-day rider delivery for orders placed before 4:00 PM PKT.
          </li>
          <li>
            <strong>Karachi, Islamabad &amp; Rawalpindi:</strong> 1–2 working days via TCS / Leopards Express.
          </li>
          <li>
            <strong>Faisalabad, Multan, Peshawar, Quetta &amp; All Other Cities:</strong> 2–4 working days nationwide.
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `Inquiry from ${name.trim() || 'Customer'} — ${STORE_INFO.name}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${STORE_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
    showToast(`Opening your email client to send message to ${STORE_INFO.email}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE]">
          Direct Support
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
          Contact {STORE_INFO.name}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Need bulk corporate quotes, warranty help, or PC peripheral recommendations? Reach us directly via email or WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-slate-400">
                  Phone / WhatsApp
                </p>
                <p className="text-sm font-semibold font-mono-num text-slate-900 dark:text-white mt-0.5">
                  {STORE_INFO.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-slate-400">
                  Email
                </p>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="text-sm font-medium text-[#2F6BFF] dark:text-[#22D3EE] hover:underline mt-0.5 block break-all"
                >
                  {STORE_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#2F6BFF] dark:text-[#22D3EE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-slate-400">
                  Pickup &amp; Office
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                  {STORE_INFO.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#F5C26B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-slate-400">
                  Business Hours
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                  {STORE_INFO.hours}
                </p>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Assalam-o-Alaikum ${STORE_INFO.name}, I would like to speak with support.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Instant WhatsApp Chat</span>
          </a>
        </div>

        <form
          onSubmit={handleMailtoSubmit}
          className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-4"
        >
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
            Send Us an Email
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Product availability, corporate order, warranty..."
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              Message *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question or inquiry here..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#0B1224]/80 border border-slate-200 dark:border-white/12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            />
          </div>

          <button
            type="submit"
            className="btn-prime h-11 px-7 text-sm inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send to {STORE_INFO.email}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { navigate } = useStore();
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center space-y-5">
      <p className="font-mono-num text-5xl font-semibold text-[#2F6BFF] dark:text-[#22D3EE]">404</p>
      <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        The hardware page or link you followed could not be located.
      </p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ name: 'home' })}
          className="btn-prime px-6 py-2.5 text-sm"
        >
          Back to Home
        </button>
        <button
          type="button"
          onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
          className="px-6 py-2.5 rounded-full border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-sm font-medium"
        >
          Browse Shop
        </button>
      </div>
    </div>
  );
};
