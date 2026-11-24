import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Headphones,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react';
import {
  BRANDS,
  CATEGORIES,
  IMG,
  PRODUCTS,
  TESTIMONIALS,
  formatPKR,
} from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'Flagship Workstation Series',
    headlineStart: 'Precision Hardware for',
    headlineHighlight: 'Builders & Creators',
    subhead:
      'CNC mechanical keyboards, sub-60g wireless mice, and color-calibrated 4K displays delivered across Pakistan with Cash on Delivery.',
    image: IMG.keyboard,
    captionTitle: 'Keychron Q1 Pro CNC',
    captionPrice: 'Rs. 38,500',
    primaryCta: { label: 'Shop Now', action: { name: 'shop' as const, categoryFilter: 'all' as const } },
    secondaryCta: {
      label: 'View Deals',
      action: { name: 'shop' as const, collectionFilter: 'flash-sale' as const },
    },
  },
  {
    id: 'slide-2',
    kicker: 'Lossless Wireless Audio',
    headlineStart: 'Studio Clarity With',
    headlineHighlight: 'Zero-Latency Control',
    subhead:
      'Verified original HyperX Cloud III Wireless, Logitech G PRO X Superlight 2, and Razer hardware sealed with official warranty.',
    image: IMG.headset,
    captionTitle: 'HyperX Cloud III Wireless',
    captionPrice: 'Rs. 31,500',
    primaryCta: { label: 'Explore Audio', action: { name: 'shop' as const, categoryFilter: 'headsets' as const } },
    secondaryCta: {
      label: 'Shop Mice',
      action: { name: 'shop' as const, categoryFilter: 'mouse' as const },
    },
  },
  {
    id: 'slide-3',
    kicker: 'Creator & Esports Displays',
    headlineStart: '4K Ultrawide Color &',
    headlineHighlight: '165Hz Precision',
    subhead:
      'Upgrade your studio with Dell UltraSharp IPS Black 4K hubs, Fast-IPS gaming monitors, and 100W GaN charging.',
    image: IMG.monitor,
    captionTitle: 'Dell UltraSharp 27" 4K',
    captionPrice: 'Rs. 148,500',
    primaryCta: { label: 'Shop Monitors', action: { name: 'shop' as const, categoryFilter: 'monitors' as const } },
    secondaryCta: {
      label: 'Power & Cables',
      action: { name: 'shop' as const, categoryFilter: 'cables-chargers' as const },
    },
  },
];

type ShowcaseTab = 'featured' | 'best-sellers' | 'new-arrivals';

export const HomePage: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('featured');
  const [tabLoading, setTabLoading] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 38 * 60 + 45);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 14 * 3600 + 38 * 60 + 45));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotator = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(rotator);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const flashProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isFlashSale).slice(0, 4),
    []
  );

  const tabProducts = useMemo(() => {
    if (activeTab === 'best-sellers') return PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
    if (activeTab === 'new-arrivals') return PRODUCTS.filter((p) => p.isNewArrival).slice(0, 8);
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  }, [activeTab]);

  const handleTabSwitch = (tab: ShowcaseTab) => {
    if (tab === activeTab) return;
    setTabLoading(true);
    setActiveTab(tab);
    window.setTimeout(() => setTabLoading(false), 180);
  };

  const currentSlide = HERO_SLIDES[slideIdx];
  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  return (
    <div>
      {/* 1. HERO BANNER (DEEP MIDNIGHT NAVY WITH SOFT BLUE & PURPLE GLOW SPOTS) */}
      <section className="relative overflow-hidden bg-navy-gradient text-white border-b border-white/10">
        {/* Ambient Radial Glow Spots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-[#2F6BFF]/22 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-1/4 w-[320px] h-[320px] rounded-full bg-[#22D3EE]/12 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#F5C26B]">
                    {currentSlide.kicker}
                  </p>
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.12] tracking-tight text-balance">
                    {currentSlide.headlineStart}{' '}
                    <span className="bg-gradient-to-r from-[#2F6BFF] via-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">
                      {currentSlide.headlineHighlight}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-xl font-normal">
                    {currentSlide.subhead}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate(currentSlide.primaryCta.action)}
                      className="btn-prime h-12 px-7 text-sm inline-flex items-center gap-2"
                    >
                      <span>{currentSlide.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(currentSlide.secondaryCta.action)}
                      className="h-12 px-7 rounded-full bg-white/8 hover:bg-white/15 border border-white/18 text-white text-sm font-medium backdrop-blur-md transition-all hover:border-cyan-400/50"
                    >
                      {currentSlide.secondaryCta.label}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex items-center gap-4 pt-3">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSlideIdx(idx)}
                      aria-label={`Show slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === slideIdx
                          ? 'w-9 bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE]'
                          : 'w-2.5 bg-white/25 hover:bg-white/45'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-auto sm:ml-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                    }
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Right-Side Floating Product Showcase */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                {/* Soft Luminous Halo Behind Product */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#2F6BFF]/30 via-purple-500/20 to-[#22D3EE]/30 blur-2xl opacity-85"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.image}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="animate-float-slow relative rounded-3xl p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_70px_-15px_rgba(11,18,36,0.9)]"
                  >
                    <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#0E1733]">
                      <ProductImage
                        src={currentSlide.image}
                        alt={currentSlide.captionTitle}
                        eager
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1224]/85 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300 font-medium">
                            Featured Unit
                          </p>
                          <p className="font-display text-sm sm:text-base font-semibold text-white">
                            {currentSlide.captionTitle}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#F5C26B] text-slate-950 text-xs font-semibold font-mono-num shrink-0">
                          {currentSlide.captionPrice}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 10-CATEGORY GRID (LIGHT SECTION #F5F7FB WITH CLEAN WHITE CARDS) */}
      <section className="bg-[#F5F7FB] text-slate-900 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] mb-1.5">
                Hardware Departments
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900">
                Shop by Category
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
              className="text-sm font-medium text-[#2F6BFF] hover:text-cyan-600 inline-flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>Browse Full Catalog ({PRODUCTS.length} Items)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => navigate({ name: 'shop', categoryFilter: cat.slug })}
                  className="group text-left rounded-[20px] bg-white border border-slate-200/80 shadow-[0_12px_28px_-14px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_38px_-12px_rgba(47,107,255,0.22)] hover:border-[#2F6BFF]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <ProductImage
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-semibold text-slate-900 group-hover:text-[#2F6BFF] transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                      {count} {count === 1 ? 'Product' : 'Products'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FLASH SALE (DEEP MIDNIGHT NAVY WITH GLASSMORPHISM CARDS & GOLD ACCENTS) */}
      <section className="relative overflow-hidden bg-navy-gradient text-white py-16 sm:py-20 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#2F6BFF]/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/5 w-96 h-96 rounded-full bg-purple-600/18 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/12 shadow-[0_24px_60px_-15px_rgba(3,8,22,0.75)] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 mb-7 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5C26B] mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Limited Time Flash Drop</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  Flash Sale — Save up to 24%
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 font-mono-num">
                  <div className="px-3 py-2 rounded-2xl bg-white/8 border border-white/12 text-center min-w-[54px]">
                    <div className="text-lg font-semibold leading-none">{hours}</div>
                    <div className="text-[10px] text-slate-400 mt-1 tracking-wider">HRS</div>
                  </div>
                  <span className="text-slate-400 font-semibold">:</span>
                  <div className="px-3 py-2 rounded-2xl bg-white/8 border border-white/12 text-center min-w-[54px]">
                    <div className="text-lg font-semibold leading-none">{minutes}</div>
                    <div className="text-[10px] text-slate-400 mt-1 tracking-wider">MIN</div>
                  </div>
                  <span className="text-slate-400 font-semibold">:</span>
                  <div className="px-3 py-2 rounded-2xl bg-[#F5C26B]/18 border border-[#F5C26B]/40 text-center min-w-[54px]">
                    <div className="text-lg font-semibold leading-none text-[#F5C26B]">{seconds}</div>
                    <div className="text-[10px] text-[#F5C26B]/90 mt-1 tracking-wider">SEC</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ name: 'shop', collectionFilter: 'flash-sale' })}
                  className="btn-prime h-10 px-5 text-xs inline-flex items-center gap-1.5"
                >
                  <span>All Flash Deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {flashProducts.map((product) => (
                <ProductCard key={product.id} product={product} surface="dark" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED / BEST SELLERS / NEW ARRIVALS (LIGHT SECTION #EEF2FA WITH WHITE CARDS) */}
      <section className="bg-[#EEF2FA] text-slate-900 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] mb-1.5">
                Curated Selection
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900">
                Prime Hardware Showcase
              </h2>
            </div>

            <div className="inline-flex p-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm self-start">
              {(
                [
                  { id: 'featured', label: 'Featured' },
                  { id: 'best-sellers', label: 'Best Sellers' },
                  { id: 'new-arrivals', label: 'New Arrivals' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSwitch(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {tabLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[20px] bg-white border border-slate-200/80 overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-2/5 rounded bg-slate-200" />
                    <div className="h-4 w-4/5 rounded bg-slate-200" />
                    <div className="h-8 w-full rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} surface="light" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. PROMO OFFER BANNERS & BRANDS (ADAPTIVE NAVY IN DARK / CLEAN WHITE IN LIGHT) */}
      <section className="relative overflow-hidden bg-[#F5F7FB] dark:bg-navy-gradient py-16 sm:py-20 border-b border-slate-200/80 dark:border-white/10">
        <div
          aria-hidden="true"
          className="hidden dark:block pointer-events-none absolute top-1/2 left-0 w-96 h-96 rounded-full bg-purple-600/18 blur-[120px]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#0E1733] border border-slate-200/80 dark:border-white/12 min-h-[270px] flex items-end p-6 sm:p-8 group shadow-[0_22px_48px_-16px_rgba(11,18,36,0.45)]">
              <ProductImage
                src={IMG.monitor}
                alt="4K Creator Displays"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1224]/95 via-[#0B1224]/50 to-transparent" />
              <div className="relative z-10 max-w-md space-y-2.5 text-white">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#22D3EE]">
                  Workstation Display Drop
                </span>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  Dell UltraSharp 4K &amp; QHD 165Hz Monitors
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Single-cable 90W USB-C power delivery starting at {formatPKR(89500)}.
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'shop', categoryFilter: 'monitors' })}
                  className="btn-prime mt-2 h-10 px-5 text-xs inline-flex items-center gap-1.5"
                >
                  <span>Shop Monitors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#0E1733] border border-slate-200/80 dark:border-white/12 min-h-[270px] flex items-end p-6 sm:p-8 group shadow-[0_22px_48px_-16px_rgba(11,18,36,0.45)]">
              <ProductImage
                src={IMG.cablesChargers}
                alt="Anker & UGREEN GaN Chargers"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1224]/95 via-[#0B1224]/50 to-transparent" />
              <div className="relative z-10 max-w-md space-y-2.5 text-white">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5C26B]">
                  GaN II Power Architecture
                </span>
                <h3 className="font-display text-2xl font-semibold leading-tight">
                  Anker Prime 100W &amp; UGREEN 140W Chargers
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Power MacBook Pro, laptop, and phone from one compact block.
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'shop', categoryFilter: 'cables-chargers' })}
                  className="mt-2 h-10 px-5 rounded-full bg-white text-slate-950 hover:bg-slate-100 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Shop Power Gear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Authorized Brands Strip */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                Verified Brands We Carry
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300/80">
                Select any brand to filter inventory
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => navigate({ name: 'shop', brandFilter: brand })}
                  className="h-12 px-3 rounded-2xl border border-slate-200/80 dark:border-white/12 bg-slate-50/80 dark:bg-white/[0.04] hover:border-[#2F6BFF] dark:hover:border-[#22D3EE] hover:bg-[#2F6BFF]/8 text-sm font-display font-medium tracking-wide text-slate-800 dark:text-slate-100 transition-all"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (LIGHT SECTION #F5F7FB WITH CRISP WHITE CARDS) */}
      <section className="bg-[#F5F7FB] text-slate-900 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] mb-1.5">
              The Prime Standard
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900">
              Built for Reliability Across Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                icon: Award,
                title: '100% Original Products',
                desc: 'Factory-sealed units with verifiable manufacturer serial numbers.',
              },
              {
                icon: ShieldCheck,
                title: 'Official Warranty',
                desc: '6-month to 5-year brand & store coverage plus 7-day replacement.',
              },
              {
                icon: Truck,
                title: 'Express Delivery',
                desc: 'Same-day dispatch in Lahore and 1–3 day courier across Pakistan.',
              },
              {
                icon: Wallet,
                title: 'Cash on Delivery',
                desc: 'Pay in cash at your doorstep or via JazzCash, Easypaisa & IBFT.',
              },
              {
                icon: Headphones,
                title: '24/7 WhatsApp Support',
                desc: 'Direct compatibility advice & instant order tracking on WhatsApp.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-[20px] bg-white border border-slate-200/80 shadow-[0_12px_30px_-14px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_38px_-14px_rgba(47,107,255,0.18)] transition-all duration-300 space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2F6BFF]/15 to-[#22D3EE]/15 text-[#2F6BFF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS & NEWSLETTER (DEEP MIDNIGHT NAVY WITH SOFT GLOWS) */}
      <section className="relative overflow-hidden bg-navy-gradient text-white py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-[#2F6BFF]/22 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/5 w-96 h-96 rounded-full bg-purple-600/18 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Customer Testimonials Carousel */}
          <div className="rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/12 p-6 sm:p-10 shadow-[0_24px_60px_-15px_rgba(3,8,22,0.75)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5C26B] mb-1.5">
                  Verified Pakistani Buyers
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  What Engineers &amp; Gamers Say
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIdx(
                      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                    )
                  }
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                  }
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-8 space-y-4">
                  <Quote className="w-8 h-8 text-[#22D3EE]/45" />
                  <p className="text-lg sm:text-xl font-normal text-slate-100 leading-relaxed">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="lg:col-span-4 lg:border-l border-white/12 lg:pl-8 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F5C26B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>
                  <p className="font-display text-base font-semibold text-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-xs text-slate-300/80">
                    {currentTestimonial.role} · {currentTestimonial.city}
                  </p>
                  <p className="text-xs font-medium text-[#22D3EE] pt-1">
                    Purchased: {currentTestimonial.product}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Newsletter Signup */}
          <div className="rounded-3xl bg-gradient-to-r from-[#132046]/80 via-[#162654]/80 to-[#111B3A]/80 backdrop-blur-xl border border-white/15 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#22D3EE] uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#F5C26B]" />
                <span>Priority Hardware Drops</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Get Restock Alerts &amp; Exclusive PKR Discounts
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Be first to know when new Keychron, Logitech, Crucial Gen5, and Anker shipments land in Pakistan.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newsletterEmail.trim()) return;
                setNewsletterEmail('');
                showToast('You are subscribed to Prime Hardware alerts!');
              }}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 px-5 rounded-full bg-white/10 border border-white/18 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] sm:w-72"
              />
              <button
                type="submit"
                className="btn-prime h-12 px-7 text-sm whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
