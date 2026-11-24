import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Grid,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import { BRANDS, CATEGORIES, PRODUCTS, formatPKR, getDiscountPercent } from '../data/catalog';
import { CategorySlug, SortOption } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { route } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>(
    route.categoryFilter || 'all'
  );
  const [selectedCollection, setSelectedCollection] = useState<
    'all' | 'flash-sale' | 'best-sellers' | 'new-arrivals' | 'featured'
  >(route.collectionFilter || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    route.brandFilter ? [route.brandFilter] : []
  );
  const [maxPrice, setMaxPrice] = useState<number>(160000);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>(route.searchFilter || '');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(route.categoryFilter || 'all');
    setSelectedCollection(route.collectionFilter || 'all');
    setSelectedBrands(route.brandFilter ? [route.brandFilter] : []);
    setSearchTerm(route.searchFilter || '');
  }, [route.categoryFilter, route.collectionFilter, route.brandFilter, route.searchFilter]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedBrands([]);
    setMaxPrice(160000);
    setMinRating(0);
    setSearchTerm('');
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedCollection === 'flash-sale' && !p.isFlashSale) return false;
      if (selectedCollection === 'best-sellers' && !p.isBestSeller) return false;
      if (selectedCollection === 'new-arrivals' && !p.isNewArrival) return false;
      if (selectedCollection === 'featured' && !p.isFeatured) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        return (
          getDiscountPercent(b.price, b.oldPrice) - getDiscountPercent(a.price, a.oldPrice)
        );
      }
      return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    });
    return sorted;
  }, [
    selectedCategory,
    selectedCollection,
    selectedBrands,
    maxPrice,
    minRating,
    searchTerm,
    sortBy,
  ]);

  const filterSidebarContent = (
    <div className="space-y-6">
      <div>
        <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">
          Search Catalog
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Keyword, model, SKU..."
            className="w-full h-10 pl-10 pr-3 rounded-full text-sm bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/12 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
          />
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5">
          Category
        </h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white font-medium shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/8'
            }`}
          >
            <span>All Categories</span>
            <span className="text-xs opacity-80 font-mono-num">{PRODUCTS.length}</span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white font-medium shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/8'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-xs opacity-80 font-mono-num">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Max Price (PKR)
          </h3>
          <span className="text-xs font-semibold font-mono-num text-[#2F6BFF] dark:text-[#22D3EE]">
            {formatPKR(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={3000}
          max={160000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#2F6BFF] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-mono-num mt-1">
          <span>Rs. 3,000</span>
          <span>Rs. 160,000</span>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5">
          Brand
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {BRANDS.map((brand) => {
            const active = selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border text-left transition-colors truncate ${
                  active
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/15 text-[#2F6BFF] dark:text-[#22D3EE]'
                    : 'border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2.5">
          Minimum Rating
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All', value: 0 },
            { label: '4.7+', value: 4.7 },
            { label: '4.8+', value: 4.8 },
            { label: '4.9+', value: 4.9 },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMinRating(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border inline-flex items-center gap-1 transition-colors ${
                minRating === opt.value
                  ? 'border-[#F5C26B] bg-[#F5C26B]/15 text-slate-900 dark:text-[#F5C26B]'
                  : 'border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-300'
              }`}
            >
              {opt.value > 0 && <Star className="w-3 h-3 fill-[#F5C26B] text-[#F5C26B]" />}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full h-10 rounded-full border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/8 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hidden dark:block pointer-events-none absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-[#2F6BFF]/16 blur-[120px]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#2F6BFF] dark:text-[#22D3EE] mb-1.5">
              Prime Computer Accessories Catalog
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
              {selectedCategory === 'all'
                ? selectedCollection === 'flash-sale'
                  ? 'Flash Sale Deals'
                  : 'All Hardware & Peripherals'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-300/80 mt-1 tabular-nums">
              Showing {filteredProducts.length} of {PRODUCTS.length} verified original items
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden h-10 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-white/8 text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={selectedCollection}
              onChange={(e) =>
                setSelectedCollection(
                  e.target.value as 'all' | 'flash-sale' | 'best-sellers' | 'new-arrivals' | 'featured'
                )
              }
              aria-label="Filter collection"
              className="h-10 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#111B3A] text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            >
              <option value="all">All Collections</option>
              <option value="flash-sale">Flash Sale</option>
              <option value="best-sellers">Best Sellers</option>
              <option value="new-arrivals">New Arrivals</option>
              <option value="featured">Featured</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort products"
              className="h-10 px-4 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#111B3A] text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <div className="inline-flex p-1 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#111B3A]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#2F6BFF] to-[#22D3EE] text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 glass-panel rounded-3xl p-5">
              {filterSidebarContent}
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
                <Filter className="w-10 h-10 text-slate-400 mx-auto" strokeWidth={1.5} />
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                  No matching hardware found
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try adjusting your PKR price slider, clearing brand filters, or searching a broader term.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-prime px-6 py-2.5 text-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="list" />
                ))}
              </div>
            )}
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#050914]/70 backdrop-blur-sm"
            />
            <div className="relative z-10 w-80 max-w-[85vw] h-full bg-white dark:bg-[#0D152B] p-5 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-white/10">
                <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Filter Products
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterSidebarContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
