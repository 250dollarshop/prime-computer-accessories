import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, formatPKR } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    route,
    navigate,
    cartCount,
    setCartOpen,
    wishlist,
  } = useStore();

  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const suggestions = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate({ name: 'shop' });
      return;
    }
    setSearchFocused(false);
    setMobileSearchOpen(false);
    navigate({ name: 'shop', searchFilter: searchQuery.trim() });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/88 dark:bg-[#0B1224]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4 lg:gap-7">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 -ml-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'home' })}
            aria-label="PRIME COMPUTER ACCESSORIES Home"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6BFF] rounded-xl bg-white px-2.5 py-1 border border-slate-200/80 dark:border-white/25 shadow-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-[1.03] transition-all duration-200 shrink-0"
          >
            <img
              src="/assets/aistudio/prime_computer_logo_45976eac.png"
              alt="PRIME COMPUTER ACCESSORIES"
              className="h-9 sm:h-11 w-auto object-contain select-none"
            />
          </button>
        </div>

        {/* Desktop Nav Links + Mega Menu */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-normal text-slate-600 dark:text-slate-300">
          <div ref={megaRef} className="relative">
            <button
              type="button"
              onClick={() => setMegaOpen((o) => !o)}
              onMouseEnter={() => setMegaOpen(true)}
              className="flex items-center gap-1 py-2 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {megaOpen && (
              <div
                onMouseLeave={() => setMegaOpen(false)}
                className="absolute left-0 top-full pt-2 w-[660px]"
              >
                <div className="rounded-3xl bg-white dark:bg-[#101A36]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/12 shadow-2xl p-5 grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setMegaOpen(false);
                        navigate({ name: 'shop', categoryFilter: cat.slug });
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/8 text-left transition-colors group"
                    >
                      <div className="w-12 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-[#0B1224]">
                        <ProductImage
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {cat.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {cat.tagline}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate({ name: 'shop', categoryFilter: 'all' })}
            className={`py-2 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 dark:hover:text-white ${
              route.name === 'shop' ? 'text-[#2F6BFF] dark:text-[#22D3EE] font-medium' : ''
            }`}
          >
            Shop All
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'shop', collectionFilter: 'flash-sale' })}
            className="py-2 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Flash Deals
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'about' })}
            className={`py-2 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 dark:hover:text-white ${
              route.name === 'about' ? 'text-[#2F6BFF] dark:text-[#22D3EE] font-medium' : ''
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'contact' })}
            className={`py-2 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 dark:hover:text-white ${
              route.name === 'contact' ? 'text-[#2F6BFF] dark:text-[#22D3EE] font-medium' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Live Search (Desktop) */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-xs lg:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              placeholder="Search keyboards, mice, SSDs..."
              aria-label="Search products"
              className="w-full h-10 pl-10 pr-8 rounded-full text-sm bg-slate-100/90 dark:bg-white/8 border border-slate-200 dark:border-white/12 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white dark:bg-[#101A36] border border-slate-200 dark:border-white/12 shadow-2xl overflow-hidden z-50">
              {suggestions.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-white/8">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        navigate({ name: 'product', param: item.slug });
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/8 text-left transition-colors"
                    >
                      <div className="w-12 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-[#0B1224]">
                        <ProductImage
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.brand} · {item.categoryName}
                        </p>
                      </div>
                      <span className="text-xs font-semibold font-mono-num text-[#2F6BFF] dark:text-[#22D3EE] shrink-0">
                        {formatPKR(item.price)}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 text-xs font-medium text-center text-[#2F6BFF] dark:text-[#22D3EE] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo;
                  </button>
                </div>
              ) : (
                <div className="p-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                  No accessories matched &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Search"
            className="md:hidden p-2.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="h-9 px-2.5 sm:px-3 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/80 dark:bg-white/8 text-slate-700 dark:text-slate-200 hover:border-[#2F6BFF]/50 flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F5C26B]" />
                <span className="hidden xl:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#2F6BFF]" />
                <span className="hidden xl:inline">Navy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'account' })}
            aria-label="Account and Orders"
            title="Account & Order History"
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'wishlist' })}
            aria-label="Wishlist"
            title="Saved Wishlist"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#F5C26B] text-slate-950 text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
            className="btn-prime h-10 px-4 text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[11px] font-mono-num">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1224]">
          <form onSubmit={handleSearchSubmit} className="relative pt-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-6 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full h-10 pl-10 pr-24 rounded-full text-sm bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/12 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            />
            <button
              type="submit"
              className="btn-prime absolute right-1.5 top-4 px-3.5 py-1.5 text-xs"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1733] px-4 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'shop', categoryFilter: 'all' });
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/8 text-sm font-medium text-left text-slate-900 dark:text-white"
            >
              All Products
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'shop', collectionFilter: 'flash-sale' });
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-[#2F6BFF]/15 text-[#2F6BFF] dark:text-[#22D3EE] text-sm font-medium text-left"
            >
              Flash Deals
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'account' });
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/8 text-sm font-medium text-left text-slate-900 dark:text-white"
            >
              My Orders
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'contact' });
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/8 text-sm font-medium text-left text-slate-900 dark:text-white"
            >
              Contact Us
            </button>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ name: 'shop', categoryFilter: cat.slug });
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-normal text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/8"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'about' });
              }}
            >
              About Store
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'faq' });
              }}
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ name: 'shipping-returns' });
              }}
            >
              Shipping &amp; Returns
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
